import { System } from "../core/models/System";
import { Physics } from "../core/strategy/Physics";

export class PhysicSystem extends System {

    private strategy: Physics;

    constructor(strategy: Physics) {
        super();
        this.strategy = strategy;
    }

    execute(): void {
        this.strategy.applyPhysics();
    }
    
}