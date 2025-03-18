import { Object as CustomObject } from "../models/Object";

export class ObjectDecorator {

    static registerObject(constructor: new (...args: any[]) => CustomObject){
            //const globalEntityState = GlobalEntityState.getInstance();
            const original = constructor;
    
            // Create a new constructor
            const newConstructor = function(...args: any) {
                const instance = new original(...args);
                //globalEntityState.entities.push(instance);
                return instance;
            }
    
            // Copy prototype so intanceof operator still works
            newConstructor.prototype = original.prototype;
            // Copy static properties
            Object.assign(newConstructor, original);
    
            return newConstructor as unknown as typeof CustomObject;
        }
}