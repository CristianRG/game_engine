import { Sprite } from "../../components/common/Sprite";
export interface ISpriteSheet {
    image: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    frameCount: number;
    currentFrame: number;
    x: number;
    y: number;
    x_offset: number;
    y_offset: number;
}
export interface ISpriteSheetDrawMethods {
    stopped: boolean;
    draw(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void;
    update(): void;
    reset(): void;
    play(ctx: CanvasRenderingContext2D, sprites: Sprite[]): void;
    stop(): void;
}
