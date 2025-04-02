import { EntityDecorator } from "../decorators/EntityDecorator";
import { IEntity } from "../interfaces/IEntity";
import { ComponentManager } from "./Injector";
/**
 * Entity is a class that represents an entity in the game engine.
 * It is a base class for all entities and provides a incremental ID for each entity.
 */
@EntityDecorator.registerEntity
export class Entity extends ComponentManager implements IEntity {
    private static _id: number = 0;
    id: number;
    constructor(){
        super();
        this.id = Entity._id++;
    }
}