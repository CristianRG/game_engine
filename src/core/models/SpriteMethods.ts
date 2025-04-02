import { ISpriteSheetDrawMethods } from "../interfaces/ISpriteSheet";
import { Sprite } from "../../components/common/Sprite";
import { Sprite as SpriteModel } from "./Sprite";
import { Transform } from "../../components/common/Transform";
/**
 * SpriteAnimationController is a class that implements the ISpriteSheetDrawMethods interface.
 * It is responsible for controlling the animation of sprite sheets in the game engine.
 */
export class SpriteAnimationController implements ISpriteSheetDrawMethods {
    stopped: boolean = true;
    private index: number = 0;
    /**
     * 
     * @param ctx Canvas context to draw the sprites on
     * @param sprites Sprites list to be drawn
     * This method draws the sprites on the canvas context.
     */
    draw(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void {
        for (const sprite of sprites) {

            if(!sprite.getCurrentSprite()) continue;
            const {
                x_offset, initialX, initialY, y_offset, frameWidth, frameHeight, resizeWidth, resizeHeight, currentFrame, image, object
            } = sprite.getCurrentSprite() as SpriteModel;

            const transform = object.getComponent(Transform);
            if (!transform) continue;

            const { x, y } = transform;

            ctx.drawImage(
                image,
                initialX + (currentFrame - 1) * (frameWidth + x_offset),
                initialY + y_offset, 
                frameWidth,
                frameHeight,
                x,
                y,
                resizeWidth,
                resizeHeight
            );
            const currentSprite = sprite.getCurrentSprite() as SpriteModel;
            currentSprite.currentFrame = currentSprite.currentFrame + 1 >= currentSprite.frameCount ? 1 : currentSprite.currentFrame + 1;
        }
    }
    update(): void {

    }
    reset(): void {

    }
    play(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void {
        this.stopped = false;
        this.draw(ctx, sprites);
    }
    stop(): void {
        this.stopped = true;
    }
}