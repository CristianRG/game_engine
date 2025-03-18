import { Component } from "../core/models/Component";

export class Transform extends Component {
    private movementTimeout: number | null = null;
    private readonly MOVEMENT_TIMEOUT_DURATION = 100; // ms
    public direction: "up" | "down" | "left" | "right" | "quiet" = "quiet";
    private lastPositions: { x: number, y: number }[] = [];

    constructor(
        public x: number = 0,
        public y: number = 0,
        public width: number = 50,
        public height: number = 50,
        public movementSpeed: number = 5,
        public rotation: number = 0,
    ) {
        super();
    }

    public move(move: "up" | "down" | "left" | "right"): void {
        let x, y: number;
        switch(move){
            case "up":
                x = 0;
                y = -this.movementSpeed;
                break;
            case "down":
                x = 0;
                y = this.movementSpeed;
                break;
            case "left":
                x = -this.movementSpeed;
                y = 0;
                break;
            case "right":
                x = this.movementSpeed;
                y = 0;
                break;
            default:
                x = 0;
                y = 0;
                break;
        }
        this.x += x;
        this.y += y;
        this.registerLastPosition(x, y);
        this.resetMovementTimeout();
    }

    // public moveOver(x: number, y: number): void {
    //     this.x += x;
    //     this.y += y;
    // }

    public undo(): void {
        switch (this.direction) {
            case "up":
                this.y += this.movementSpeed;
                break;
            case "down":
                this.y -= this.movementSpeed;
                break;
            case "left":
                this.x += this.movementSpeed;
                break;
            case "right":
                this.x -= this.movementSpeed;
                break;
            case "quiet":
                break;
            default:
                break;
        }

    }

    private registerLastPosition(x: number, y: number): void {
        if (this.lastPositions.length > 10) {
            this.lastPositions.shift();
        }

        if(x < 0) this.direction = "left";
        if(x > 0) this.direction = "right";
        if(y < 0) this.direction = "up";
        if(y > 0) this.direction = "down";
        this.lastPositions.push({ x: this.x, y: this.y });
    }

    private resetMovementTimeout(): void {
        if (this.movementTimeout !== null) {
            clearTimeout(this.movementTimeout);
        }

        this.movementTimeout = setTimeout(() => {
            this.direction = "quiet";
        }, this.MOVEMENT_TIMEOUT_DURATION) as unknown as number;
    }
}