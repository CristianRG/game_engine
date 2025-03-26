import { Renderable } from "../../components/common/Renderable";
import { Entities } from "../../components/scene/Entities";
import { GameObjects } from "../../components/scene/GameObjects";
import { Transform } from "../../components/common/Transform";
import { IRenderEntityStrategy } from "../interfaces/IStrategy";
import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Scene } from "../models/Scene";

export class RenderByRenderable implements IRenderEntityStrategy {
    private ctx: CanvasRenderingContext2D;
    private entities: Entity[] = [];
    private gameObject: GameObject[] = [];
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
        this.ctx = scene.canvas.getContext("2d") as CanvasRenderingContext2D;
    }
    
    render(): void {

        if (this.scene.hasComponent(Transform) && this.scene.hasComponent(Renderable)) {
            const transform = this.scene.getComponent(Transform)!;
            const renderable = this.scene.getComponent(Renderable)!;
            this.ctx.fillStyle = renderable.color;
            this.ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
        }

        if (this.scene.hasComponent(Entities)) {
            this.entities = this.scene.getComponent(Entities)!.getEntities();
        }
        if (this.scene.hasComponent(GameObjects)) {
            this.gameObject = this.scene.getComponent(GameObjects)!.getObjects();
        }

        if (this.entities.length === 0 && this.gameObject.length === 0) return;
        this.renderByRenderable();
    }

    renderByRenderable(): void {
        for (const entity of this.entities) {
            const transform = entity.getComponent(Transform);
            const renderable = entity.getComponent(Renderable);
            if (transform && renderable) {
                this.ctx.fillStyle = renderable.color;
                this.ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
        }

        for (const object of this.gameObject) {
            const transform = object.getComponent(Transform);
            const renderable = object.getComponent(Renderable);
            if (transform && renderable) {
                this.ctx.fillStyle = renderable.color;
                this.ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
        }
    }
    
}