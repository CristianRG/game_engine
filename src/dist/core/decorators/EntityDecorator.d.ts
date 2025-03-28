import type { Entity } from "../models/Entity";
export declare class EntityDecorator {
    static registerEntity(constructor: new (...args: any[]) => Entity): typeof Entity;
}
