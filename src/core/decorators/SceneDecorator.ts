import type { Scene } from "../models/Scene";

export class SceneDecorator {

    static registerScene(constructor: new (...args: any[]) => Scene) {
        const original = constructor;
    
        const newConstructor = function(...args: any) {
            const instance = new original(...args);
            import("../state/GlobalState").then(({ GlobalState }) => { 
                const globalState = GlobalState.getInstance();
                
                import("../models/Scene").then(({ Scene }) => {
                    globalState.add(Scene, instance);
                });
            });
            return instance;
        }

        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);

        return newConstructor as unknown as typeof Scene;
    }
}