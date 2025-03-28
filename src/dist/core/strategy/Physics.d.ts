import { IPhysicStrategy } from "../interfaces/IStrategy";
export declare class Physics implements IPhysicStrategy {
    private entities;
    private gameObjects;
    applyPhysics(): void;
}
