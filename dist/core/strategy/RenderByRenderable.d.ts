import { IRenderEntityStrategy } from "../interfaces/IStrategy";
import { Scene } from "../models/Scene";
export declare class RenderByRenderable implements IRenderEntityStrategy {
    private ctx;
    private entities;
    private gameObject;
    private scene;
    constructor(scene: Scene);
    render(): void;
    renderByRenderable(): void;
}
