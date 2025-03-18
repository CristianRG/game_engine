import { Scene } from "../models/Scene";
import { GlobalState } from "../state/GlobalState";

export class SceneDecorator {

    static registerScene(constructor: new (...args: any[]) => Scene) {
        const original = constructor;
        const globalState = GlobalState.getInstance();
    
        const newConstructor = function(...args: any) {
            const instance = new original(...args);
            globalState.scenes.push(instance);
            return instance;
        }

        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);

        return newConstructor as unknown as typeof Scene;
    }
}