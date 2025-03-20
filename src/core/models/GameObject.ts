import { ObjectDecorator } from "../decorators/ObjectDecorator";
import { IGameObject } from "../interfaces/IGameObject";
import { ComponentManager } from "./Injector";

@ObjectDecorator.registerObject
export class GameObject extends ComponentManager implements IGameObject {
    private static _id: number = 0;
    id: number;
    constructor(){
        super();
        this.id = GameObject._id++;
    }
}