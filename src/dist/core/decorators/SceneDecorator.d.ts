import type { Scene } from "../models/Scene";
export declare class SceneDecorator {
    static registerScene(constructor: new (...args: any[]) => Scene): typeof Scene;
}
