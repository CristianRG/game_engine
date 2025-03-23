import { IRenderEntityStrategy } from "../interfaces/IStrategy";
import { Sprite } from "../../components/Sprite";
import { SpriteAnimationController } from "../models/SpriteMethods";
import { GlobalState } from "../state/GlobalState";
import { Scene } from "../models/Scene";
import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Entities } from "../../components/scene/Entities";
import { GameObjects } from "../../components/scene/GameObjects";
import { SpriteComponent } from "../..";

export class RenderBySprite extends SpriteAnimationController implements IRenderEntityStrategy {
    private scene: Scene;
    private entities: Entity[] = [];
    private gameObjects: GameObject[] = [];
    ctx: CanvasRenderingContext2D | null = null;
    stopped: boolean = false;

    constructor(scene: Scene) {
        super();
        this.scene = scene;
        this.ctx = scene.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    render(): void {
        const sprites: SpriteComponent[] = []
        if (this.stopped || !this.ctx) return;

        if (this.scene.hasComponent(SpriteComponent)) {
            sprites.push(this.scene.getComponent(SpriteComponent) as SpriteComponent);
        }

        if (this.scene.hasComponent(Entities)) {
            this.entities = this.scene.getComponent(Entities)!.getEntities();
        }

        if (this.scene.hasComponent(GameObjects)) {
            this.gameObjects = this.scene.getComponent(GameObjects)!.getObjects();
        }

        sprites.push(
            ...this.entities.filter(e => e.hasComponent(SpriteComponent)).map(e => e.getComponent(SpriteComponent) as SpriteComponent),
            ...this.gameObjects.filter(o => o.hasComponent(SpriteComponent)).map(o => o.getComponent(SpriteComponent) as SpriteComponent)
        );

        this.play(this.ctx, sprites);
    }
}