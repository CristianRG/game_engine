import { ISpriteSheetDrawMethods } from "../interfaces/ISpriteSheet";
import { Sprite } from "../../components/common/Sprite";
export declare class SpriteAnimationController implements ISpriteSheetDrawMethods {
    stopped: boolean;
    private index;
    draw(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void;
    update(): void;
    reset(): void;
    play(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void;
    stop(): void;
}
