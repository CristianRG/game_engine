import { IEngineControllerSystem } from "../interfaces/IEngineControllerSystem";
import { ISystem } from "../interfaces/ISystem";

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

    execute(): void {
        this.systems.forEach(system => system.execute());
    }
}