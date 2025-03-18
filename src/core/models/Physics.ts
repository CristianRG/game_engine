export abstract class Physics {
    public apply: boolean = true;
    public type: "physics" | "gravity" | "jump" = "physics";
    public abstract applyPhysics(): void;
}