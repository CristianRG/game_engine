import type { GameObject } from "../models/GameObject";
/**
 * ObjectDecorator is a decorator that registers an object in the global state.
 * It is used to register objects in the global state when they are created.
 */
export declare class ObjectDecorator {
    static registerObject(constructor: new (...args: any[]) => GameObject): typeof GameObject;
}
