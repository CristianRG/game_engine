import { IEngine } from "../interfaces/IEngine";
import { IEngineControllerSystem } from "../interfaces/IEngineControllerSystem";
/**
 * Engine is the main class that manages the game loop and the execution of systems.
 */
export declare class Engine implements IEngine {
    isRunning: boolean;
    lastTime: number;
    ecs: IEngineControllerSystem;
    constructor(canvas: HTMLCanvasElement);
    loop(timestamp: number): void;
    start(): void;
    stop(): void;
}
