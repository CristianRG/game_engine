import type { Scene } from "../models/Scene";
/**
 * SceneDecorator is a decorator that registers a scene in the global state.
 * It is used to register scenes in the global state when they are created.
 */
export class SceneDecorator {

    static registerScene(constructor: new (...args: any[]) => Scene) {
        const original = constructor;
    
        const newConstructor = function(...args: any) {
            const instance = new original(...args);
            import("../state/GlobalState").then(({ GlobalState }) => { 
                const globalState = GlobalState.getInstance();
                const exits = globalState.scenes.find((scene) => scene.id === instance.id);
                if (exits) {
                    return exits;
                }
                globalState.scenes.push(instance);
            });
            return instance;
        }

        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);

        return newConstructor as unknown as typeof Scene;
    }
}