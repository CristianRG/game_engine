import type { Entity } from "../models/Entity";
/**
 * EntityDecorator is a decorator that registers an entity in the global state.
 * It is used to register entities in the global state when they are created.
 */
export class EntityDecorator {

    static registerEntity(constructor: new (...args: any[]) => Entity){
        const original = constructor;

        const newConstructor = function(...args: any) {
            const instance = new original(...args);
            import("../state/GlobalState").then(({ GlobalState }) => { 
                const globalState = GlobalState.getInstance();
                const exits = globalState.entities.find((entity) => entity.id === instance.id);
                if (exits) {
                    return exits;
                }
                globalState.entities.push(instance);
             });
            return instance;
        }

        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);

        return newConstructor as unknown as typeof Entity;
    }
}