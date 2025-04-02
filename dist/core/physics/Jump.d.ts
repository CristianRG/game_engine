import { Physics } from "../models/Physics";
/**
 * * Jump class to apply jump to an object (the object is a reference to an entity or a game object).
 * * The jump is applied to the object if it is not colliding with any other object or entity or if it is on the ground.
 */
export declare class Jump extends Physics {
    type: "physics" | "gravity" | "jump";
    private scene;
    private movementTimeout;
    apply: boolean;
    stop: boolean;
    jumpSpeed: number;
    constructor(jumpSpeed?: number);
    applyPhysics(): void;
    private checkIfHasGravity;
    private isOnGround;
    private checkIfCanJump;
    private resetTimeout;
}
