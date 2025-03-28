import { IRenderEntityStrategy } from "../interfaces/IStrategy";
import { SpriteAnimationController } from "../models/SpriteMethods";
import { Scene } from "../models/Scene";
export declare class RenderBySprite extends SpriteAnimationController implements IRenderEntityStrategy {
    private scene;
    private entities;
    private gameObjects;
    ctx: CanvasRenderingContext2D | null;
    stopped: boolean;
    constructor(scene: Scene);
    render(): void;
}
