import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { ObjectBinder } from "./Injector";
/**
 * Physics is a class that represents a physics engine in the game engine.
 * Provides a abstract method to apply physics to an entity or gameObject.
 */
export declare abstract class Physics extends ObjectBinder<Entity | GameObject> {
    apply: boolean;
    type: "physics" | "gravity" | "jump";
    /**
     * applyPhysics is an abstract method that must be implemented by subclasses.
     * It is responsible for applying physics to the entity or gameObject.
     */
    abstract applyPhysics(): void;
}
