import { IEntity } from "../interfaces/IEntity";
import { ComponentManager } from "./Injector";
export declare class Entity extends ComponentManager implements IEntity {
    private static _id;
    id: number;
    constructor();
}
