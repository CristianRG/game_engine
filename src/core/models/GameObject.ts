import { ObjectDecorator } from "../decorators/ObjectDecorator";
import { IComponent } from "../interfaces/IComponent";
import { IGameObject } from "../interfaces/IGameObject";
import { EntityInjector } from "./Injector";

@ObjectDecorator.registerObject
export class GameObject extends EntityInjector implements IGameObject {
    private static _id: number = 0;
    id: number;
    constructor(){
        super();
        this.id = GameObject._id++;
    }
}