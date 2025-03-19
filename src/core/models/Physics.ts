import { PhysicsInjector } from "./Injector";

export abstract class Physics extends PhysicsInjector {
    public apply: boolean = true;
    public type: "physics" | "gravity" | "jump" = "physics";
    public abstract applyPhysics(): void;
}