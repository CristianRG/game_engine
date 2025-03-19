import { Renderable } from "../../components/Renderable";
import { Transform } from "../../components/Transform";
import { IRenderStrategy } from "../interfaces/IScene";
import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Scene } from "../models/Scene";

export class RenderScene implements IRenderStrategy {
    scene: Scene;
    canvas: HTMLCanvasElement;

    constructor(scene: Scene) {
        this.canvas = scene.canvas;
        this.scene = scene;
    }
    
    render(): void {
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const entities = this.scene.entities;
            const objects = this.scene.objects;
            this.renderEntities(entities, ctx);
            this.renderObjects(objects, ctx);
        }
    }

    renderEntities(entities: Entity[], ctx: CanvasRenderingContext2D): void {
        for (const entity of entities) {

            const transform = entity.getComponent(Transform);
            const entityRenderable = entity.getComponent(Renderable);
            if (transform && entityRenderable) {

                ctx.fillStyle = entityRenderable?.color || "black";
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
        }
    }

    renderObjects(objects: GameObject[], ctx: CanvasRenderingContext2D): void {
        for (const object of objects) {

            const transform = object.getComponent(Transform);
            const objectRenderable = object.getComponent(Renderable);

            if (transform) {

                ctx.fillStyle = objectRenderable?.color || "black";
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
        }
    }
}