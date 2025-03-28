import { ISystem } from "./ISystem";
export interface IEngineControllerSystem {
    systems: ISystem[];
    addSystem(system: ISystem): this;
    execute(): void;
}
