import { SceneDecorator } from "../decorators/SceneDecorator";
import { IGameObject } from "../interfaces/IGameObject";
import { ComponentManager } from "./Injector";

@SceneDecorator.registerScene
export class Scene extends ComponentManager implements IGameObject {
    private static _id: number = 0;
    id: number;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.id = Scene._id++;
        this.canvas = canvas;
    }
}