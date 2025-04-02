import { IRenderStrategy } from "../interfaces/IScene";
import { Scene } from "../models/Scene";
import { SpriteAnimationController } from "../models/SpriteMethods";
export declare class RenderScene extends SpriteAnimationController implements IRenderStrategy {
    scene: Scene | undefined;
    canvas: HTMLCanvasElement | undefined;
    constructor();
    render(): void;
    renderScene(ctx: CanvasRenderingContext2D): void;
    renderElements(ctx: CanvasRenderingContext2D): void;
}
