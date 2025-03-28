import { IEngineControllerSystem } from "../interfaces/IEngineControllerSystem";
import { ISystem } from "../interfaces/ISystem";
export declare class ECS implements IEngineControllerSystem {
    private static instance;
    systems: ISystem[];
    private constructor();
    static getInstance(): ECS;
    addSystem(system: ISystem): this;
    execute(): void;
}
