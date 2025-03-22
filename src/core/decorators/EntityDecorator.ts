import type { Entity } from "../models/Entity";

export class EntityDecorator {

    static registerEntity(constructor: new (...args: any[]) => Entity){
        const original = constructor;

        // Create a new constructor
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

        // Copy prototype so intanceof operator still works
        newConstructor.prototype = original.prototype;
        // Copy static properties
        Object.assign(newConstructor, original);

        return newConstructor as unknown as typeof Entity;
    }
}