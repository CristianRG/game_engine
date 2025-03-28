import { Component } from "../../core/models/Component";
export declare class Transform extends Component {
    x: number;
    y: number;
    width: number;
    height: number;
    movementSpeed: number;
    rotation: number;
    private movementTimeout;
    private readonly MOVEMENT_TIMEOUT_DURATION;
    direction: "up" | "down" | "left" | "right" | "quiet";
    constructor(x?: number, y?: number, width?: number, height?: number, movementSpeed?: number, rotation?: number);
    translate(move: "up" | "down" | "left" | "right"): void;
    undo(): void;
    private trackMovementDirection;
    private resetMovementTimeout;
}
