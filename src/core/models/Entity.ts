import { EntityDecorator } from "../decorators/EntityDecorator";
import { IEntity } from "../interfaces/IEntity";
import { ComponentManager } from "./Injector";

@EntityDecorator.registerEntity
export class Entity extends ComponentManager implements IEntity {
    private static _id: number = 0;
    id: number;
    constructor(){
        super();
        this.id = Entity._id++;
    }
}