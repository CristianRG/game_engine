import { IRenderStrategy } from "../core/interfaces/IScene";
import { System } from "../core/models/System";

export class RenderSystem extends System {

    constructor(public strategy: IRenderStrategy | null = null) {
        super();
    }

    execute(): void {
        if(this.strategy){
            this.strategy.render();
        }
    }
}