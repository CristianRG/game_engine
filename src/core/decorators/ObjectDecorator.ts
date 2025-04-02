import type { GameObject } from "../models/GameObject";
/**
 * ObjectDecorator is a decorator that registers an object in the global state.
 * It is used to register objects in the global state when they are created.
 */
export class ObjectDecorator {

    static registerObject(constructor: new (...args: any[]) => GameObject){
            const original = constructor;
    
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
    
            newConstructor.prototype = original.prototype;
            Object.assign(newConstructor, original);
    
            return newConstructor as unknown as typeof GameObject;
        }
}