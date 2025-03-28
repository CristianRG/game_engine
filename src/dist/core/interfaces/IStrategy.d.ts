export interface IColliderStrategy {
    collide(): void;
}
export interface IKeyEventStrategy {
    trigger(key: string): void;
}
export interface IPhysicStrategy {
    applyPhysics(): void;
}
export interface IRenderEntityStrategy {
    render(): void;
}
