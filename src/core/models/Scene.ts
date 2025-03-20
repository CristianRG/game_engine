import { SceneDecorator } from "../decorators/SceneDecorator";
import { IGameObject } from "../interfaces/IGameObject";
import { IScene } from "../interfaces/IScene";
import { GameObject } from "./GameObject";
import { ComponentManager } from "./Injector";

@SceneDecorator.registerScene
export class Scene extends GameObject {
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;
    }
}