import { System } from "../core/models/System";
import { Physics } from "../core/strategy/Physics";
export declare class PhysicSystem extends System {
    private strategy;
    constructor(strategy: Physics);
    execute(): void;
}
