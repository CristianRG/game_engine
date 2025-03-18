import { IEngineControllerSystem } from "./IEngineControllerSystem";

export interface IEngine {
    isRunning: boolean;
    lastTime: number;
    ecs: IEngineControllerSystem;
    loop(timestamp: number): void;
    start(): void;
    stop(): void;
}