import { IColliderStrategy } from "../core/interfaces/IStrategy";
import { System } from "../core/models/System";

export class ColliderSystem extends System {

    constructor(public strategy: IColliderStrategy | null = null) {
        super();
    }

    execute(): void {
        if(this.strategy){
            this.strategy.collide();
        }
    }
}