import type { Scene } from "../models/Scene";
/**
 * SceneDecorator is a decorator that registers a scene in the global state.
 * It is used to register scenes in the global state when they are created.
 */
export declare class SceneDecorator {
    static registerScene(constructor: new (...args: any[]) => Scene): typeof Scene;
}
