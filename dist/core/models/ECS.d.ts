import { IEngineControllerSystem } from "../interfaces/IEngineControllerSystem";
import { ISystem } from "../interfaces/ISystem";
/**
 * ECS (Engine Controller System) is a singleton class that manages the execution of systems in the engine.
 */
export declare class ECS implements IEngineControllerSystem {
    private static instance;
    systems: ISystem[];
    private constructor();
    static getInstance(): ECS;
    addSystem(system: ISystem): this;
    /**
     * Executes all systems in the ECS.
     * This method is called to update all systems in the engine.
     */
    execute(): void;
}
