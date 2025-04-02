import { IGameObject } from "../interfaces/IGameObject";
import { ComponentManager } from "./Injector";
/**
 * GameObject is a class that represents an gameObject in the game engine.
 * It is a base class for all entities and provides a incremental ID for each gameObject.
 */
export declare class GameObject extends ComponentManager implements IGameObject {
    private static _id;
    id: number;
    constructor();
}
