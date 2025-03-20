import { GameObject } from "../models/GameObject";
import { GlobalState } from "../state/GlobalState";

export class ObjectDecorator {

    static registerObject(constructor: new (...args: any[]) => GameObject){
            const globalState = GlobalState.getInstance();
            const original = constructor;
    
            // Create a new constructor
            const newConstructor = function(...args: any) {
                const instance = new original(...args);
                globalState.add(GameObject, instance);
                return instance;
            }
    
            // Copy prototype so intanceof operator still works
            newConstructor.prototype = original.prototype;
            // Copy static properties
            Object.assign(newConstructor, original);
    
            return newConstructor as unknown as typeof GameObject;
        }
}