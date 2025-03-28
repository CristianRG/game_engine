import { Physics } from "../models/Physics";
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
