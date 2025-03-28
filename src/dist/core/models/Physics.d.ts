import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { ObjectBinder } from "./Injector";
export declare abstract class Physics extends ObjectBinder<Entity | GameObject> {
    apply: boolean;
    type: "physics" | "gravity" | "jump";
    abstract applyPhysics(): void;
}
