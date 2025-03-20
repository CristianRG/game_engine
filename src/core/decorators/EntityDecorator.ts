import { Entity } from "../models/Entity";
import { GlobalState } from "../state/GlobalState";

export class EntityDecorator {

    static registerEntity(constructor: new (...args: any[]) => Entity){
        const globalState = GlobalState.getInstance();
        const original = constructor;

        // Create a new constructor
        const newConstructor = function(...args: any) {
            const instance = new original(...args);
            globalState.add(Entity, instance);
            return instance;
        }

        // Copy prototype so intanceof operator still works
        newConstructor.prototype = original.prototype;
        // Copy static properties
        Object.assign(newConstructor, original);

        return newConstructor as unknown as typeof Entity;
    }
}