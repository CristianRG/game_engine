import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { ObjectBinder } from "./Injector";

export abstract class Physics extends ObjectBinder<Entity | GameObject> {
    public apply: boolean = true;
    public type: "physics" | "gravity" | "jump" = "physics";
    public abstract applyPhysics(): void;
}