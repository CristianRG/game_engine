import { IColliderStrategy } from "../interfaces/IStrategy";
import { GlobalState } from "../state/GlobalState";
export declare class Collider implements IColliderStrategy {
    globalState: GlobalState;
    entitiesColliderExecuting: boolean;
    objectsColliderExecuting: boolean;
    collide(): void;
    entityCollide(): void;
    objectCollide(): void;
}
