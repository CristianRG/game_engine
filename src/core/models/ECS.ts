import { IEngineControllerSystem } from "../interfaces/IEngineControllerSystem";
import { ISystem } from "../interfaces/ISystem";

/**
 * ECS (Engine Controller System) is a singleton class that manages the execution of systems in the engine.
 */
export class ECS implements IEngineControllerSystem {
    private static instance: ECS;
    systems: ISystem[];

    private constructor() {
        this.systems = [];
    }

    static getInstance(): ECS {
        if (!ECS.instance) {
            ECS.instance = new ECS();
        }
        return ECS.instance;
    }

    addSystem(system: ISystem): this {
        this.systems.push(system);
        return this;
    }
    /**
     * Executes all systems in the ECS.
     * This method is called to update all systems in the engine.
     */
    execute(): void {
        this.systems.forEach(system => system.execute());
    }
}