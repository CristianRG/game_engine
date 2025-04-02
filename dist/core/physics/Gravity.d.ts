import { Physics } from "../models/Physics";
/**
 * * Gravity class to apply gravity to an object (the object is a reference to an entity or a game object).
 * * The gravity is applied to the object if it is not colliding with any other object or entity.
 */
export declare class Gravity extends Physics {
    type: "physics" | "gravity" | "jump";
    private gravity;
    private scene;
    stop: boolean;
    constructor(gravity?: number);
    applyPhysics(): void;
    private checkPossibleCollision;
    private checkEmptySpace;
}
