import { Renderable } from "../components/Renderable.js";
import { Transform } from "../components/Transform.js";
import { System } from "../core/System.js";
export class RenderSystem extends System {
    ctx;
    constructor(canvas) {
        super();
        this.ctx = canvas.getContext("2d");
    }
    update(entities, deltatime) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (const entity of entities) {
            const transform = entity.getComponent(Transform);
            const renderable = entity.getComponent(Renderable);
            if (transform && renderable) {
                this.ctx.fillStyle = renderable.color;
                this.ctx.fillRect(transform.x, transform.y, renderable.width, renderable.height);
            }
        }
    }
}
