import { IEntity } from "../interfaces/IEntity";
import { ComponentManager } from "./Injector";
/**
 * Entity is a class that represents an entity in the game engine.
 * It is a base class for all entities and provides a incremental ID for each entity.
 */
export declare class Entity extends ComponentManager implements IEntity {
    private static _id;
    id: number;
    constructor();
}
