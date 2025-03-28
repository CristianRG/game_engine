import type { GameObject } from "../models/GameObject";

export class ObjectDecorator {

    static registerObject(constructor: new (...args: any[]) => GameObject){
            const original = constructor;
    
            // Create a new constructor
            const newConstructor = function(...args: any) {
                const instance = new original(...args);
                import("../state/GlobalState").then(({ GlobalState }) => {
                    const globalState = GlobalState.getInstance();
                    const exits = globalState.objects.find((object) => object.id === instance.id);
                    if (exits) {
                        return exits;
                    }
                    globalState.objects.push(instance);
                });
                return instance;
            }
    
            // Copy prototype so intanceof operator still works
            newConstructor.prototype = original.prototype;
            // Copy static properties
            Object.assign(newConstructor, original);
    
            return newConstructor as unknown as typeof GameObject;
        }
}