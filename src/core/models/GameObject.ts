import { ObjectDecorator } from "../decorators/ObjectDecorator";
import { IGameObject } from "../interfaces/IGameObject";
import { ComponentManager } from "./Injector";
/**
 * GameObject is a class that represents an gameObject in the game engine.
 * It is a base class for all entities and provides a incremental ID for each gameObject.
 */
@ObjectDecorator.registerObject
export class GameObject extends ComponentManager implements IGameObject {
    private static _id: number = 0;
    id: number;
    constructor(){
        super();
        this.id = GameObject._id++;
    }
}