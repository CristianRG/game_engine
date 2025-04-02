import { ISpriteSheetDrawMethods } from "../interfaces/ISpriteSheet";
import { Sprite } from "../../components/common/Sprite";
/**
 * SpriteAnimationController is a class that implements the ISpriteSheetDrawMethods interface.
 * It is responsible for controlling the animation of sprite sheets in the game engine.
 */
export declare class SpriteAnimationController implements ISpriteSheetDrawMethods {
    stopped: boolean;
    private index;
    /**
     *
     * @param ctx Canvas context to draw the sprites on
     * @param sprites Sprites list to be drawn
     * This method draws the sprites on the canvas context.
     */
    draw(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void;
    update(): void;
    reset(): void;
    play(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void;
    stop(): void;
}
