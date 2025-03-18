import { ISpriteSheetDrawMethods } from "../interfaces/ISpriteSheet";
import { Sprite } from "../../components/Sprite";
import { Transform } from "../../components/Transform";

export class SpriteAnimationController implements ISpriteSheetDrawMethods {
    stopped: boolean = true;
    private index: number = 0;

    draw(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void {
        for (const sprite of sprites) {

            const {
                entity, x_offset, initialX, initialY, y_offset, frameWidth, frameHeight, resizeWidth, resizeHeight, currentFrame, image
            } = sprite.getCurrentSprite();

            const transform = entity.getComponent(Transform);
            if (!transform) return;

            const { x, y } = transform;

            ctx.drawImage(
                image,
                initialX + (currentFrame - 1) * (frameWidth + x_offset), // Ajustado
                initialY + y_offset, // Considerando también initialY
                frameWidth,
                frameHeight,
                x,
                y,
                resizeWidth,
                resizeHeight
            );

            if (!sprite.loop) {
                sprite.loop = true;

                setInterval(() => {
                    const currentSprite = sprite.getCurrentSprite();
                    currentSprite.currentFrame = currentSprite.currentFrame + 1 >= currentSprite.frameCount ? 1 : currentSprite.currentFrame + 1;
                }, sprite.speed);
            }
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