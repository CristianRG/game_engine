import { Renderable } from "../../components/Renderable";
import { Transform } from "../../components/Transform";
import { IRenderEntityStrategy } from "../interfaces/IStrategy";
import { Entity } from "../models/Entity";

export class RenderByRenderable implements IRenderEntityStrategy {
    private entity: Entity;
    private ctx: CanvasRenderingContext2D;
    
    constructor(Entity: Entity, ctx: CanvasRenderingContext2D) {
        this.entity = Entity;
        this.ctx = ctx;
    }
    
    render(): void {
        if (this.entity.hasComponent(Renderable)) {
            this.renderByRenderable();
        }
    }

    renderByRenderable(): void {
        const renderable = this.entity.getComponent(Renderable)!;
        const transform = this.entity.getComponent(Transform);

        if (!transform) return;

        this.ctx.fillStyle = renderable.color;
        this.ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
    }
    
}