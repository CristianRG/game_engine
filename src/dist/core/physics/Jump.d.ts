import { Physics } from "../models/Physics";
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
