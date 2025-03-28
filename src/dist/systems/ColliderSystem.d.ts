import { IColliderStrategy } from "../core/interfaces/IStrategy";
import { System } from "../core/models/System";
export declare class ColliderSystem extends System {
    strategy: IColliderStrategy | null;
    constructor(strategy?: IColliderStrategy | null);
    execute(): void;
}
