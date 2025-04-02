import { IGameObject } from "../interfaces/IGameObject";
import { ComponentManager } from "./Injector";
/**
 * Scene is a class that represents a scene in the game engine.
 * It is a base class for all scenes and provides a incremental ID for each scene.
 * It also provides a canvas element for rendering the scene.
 * This class is the first class to be rendered in the game engine and is used to add entities or gameObjects to the scene.
 */
export declare class Scene extends ComponentManager implements IGameObject {
    private static _id;
    id: number;
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
}
