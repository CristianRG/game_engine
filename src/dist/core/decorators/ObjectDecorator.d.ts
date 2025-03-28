import type { GameObject } from "../models/GameObject";
export declare class ObjectDecorator {
    static registerObject(constructor: new (...args: any[]) => GameObject): typeof GameObject;
}
