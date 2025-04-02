import type { Entity } from "../models/Entity";
/**
 * EntityDecorator is a decorator that registers an entity in the global state.
 * It is used to register entities in the global state when they are created.
 */
export declare class EntityDecorator {
    static registerEntity(constructor: new (...args: any[]) => Entity): typeof Entity;
}
