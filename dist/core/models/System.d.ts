import { ISystem } from "../interfaces/ISystem";
/**
 * System is a base class for all systems in the game engine.
 * It provides a unique ID for each system and an abstract execute method that must be implemented by subclasses.
 * This class is used to create systems that can be executed in the engine.
 */
export declare abstract class System implements ISystem {
    private static _id;
    id: number;
    abstract execute(): void;
}
