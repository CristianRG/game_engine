import { IGameObject } from "../interfaces/IGameObject";
import { ComponentManager } from "./Injector";
export declare class GameObject extends ComponentManager implements IGameObject {
    private static _id;
    id: number;
    constructor();
}
