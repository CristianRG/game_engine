import { Renderable } from "../../components/Renderable";
import { Entities } from "../../components/scene/Entities";
import { GameObjects } from "../../components/scene/GameObjects";
import { Sprite } from "../../components/Sprite";
import { Transform } from "../../components/Transform";
import { IRenderStrategy } from "../interfaces/IScene";
import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Scene } from "../models/Scene";
import { SpriteAnimationController } from "../models/SpriteMethods";

export class RenderScene extends SpriteAnimationController implements IRenderStrategy {
    scene: Scene;
    canvas: HTMLCanvasElement;

    constructor(scene: Scene) {
        super();
        this.canvas = scene.canvas;
        this.scene = scene;
    }
    
    render(): void {
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.renderScene(ctx);
            this.renderElements(ctx);
        }
    }

    renderScene(ctx: CanvasRenderingContext2D): void {
        
        if (this.scene.hasComponent(Transform)) {

            if (this.scene.hasComponent(Renderable)) {
                const transform = this.scene.getComponent(Transform)!;
                const renderable = this.scene.getComponent(Renderable)!;
                ctx.fillStyle = renderable.color;
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }

            if (this.scene.hasComponent(Sprite)) {
                const sprite = this.scene.getComponent(Sprite)!;
                this.play(ctx, [sprite])
            }
        }
    }

    renderElements(ctx: CanvasRenderingContext2D): void {
        let entities: Entity[] = [];
        let gameObjects: GameObject[] = [];

        if (this.scene.hasComponent(Entities)) {
            entities = this.scene.getComponent(Entities)!.getEntities();
        }

        if (this.scene.hasComponent(GameObjects)) {
            gameObjects = this.scene.getComponent(GameObjects)!.getObjects();
        }

        for (const entity of entities) {
            if (entity.hasComponent(Transform) && entity.hasComponent(Renderable)) {
                const transform = entity.getComponent(Transform)!;
                const renderable = entity.getComponent(Renderable)!;
                ctx.fillStyle = renderable.color;
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }

            if (entity.hasComponent(Sprite)) {
                const sprite = entity.getComponent(Sprite)!;
                this.play(ctx, [sprite]);
            }
        }

        for (const object of gameObjects) {
            if (object.hasComponent(Transform) && object.hasComponent(Renderable)) {
                const transform = object.getComponent(Transform)!;
                const renderable = object.getComponent(Renderable)!;
                ctx.fillStyle = renderable.color;
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }

            if (object.hasComponent(Sprite)) {
                const sprite = object.getComponent(Sprite)!;
                this.play(ctx, [sprite]);
            }
        }
    }
}