import { IGameObject } from "../interfaces/IGameObject";
import { ComponentManager } from "./Injector";
export declare class Scene extends ComponentManager implements IGameObject {
    private static _id;
    id: number;
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
}
