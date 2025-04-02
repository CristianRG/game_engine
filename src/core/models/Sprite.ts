import { ISpriteSheet } from "../interfaces/ISpriteSheet";
import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { ObjectBinder } from "./Injector";
import { Scene } from "./Scene";
/**
 * Sprite is a class that represents a sprite sheet in the game engine.
 * It is a base class for all sprite sheets and provides a incremental ID for each sprite sheet.
 */
export class Sprite extends ObjectBinder<Entity | GameObject | Scene> implements ISpriteSheet {
    imageSrc: string;
    image: HTMLImageElement = new Image();
    frameWidth: number;
    frameHeight: number;
    resizeWidth: number;
    resizeHeight: number;
    frameCount: number;
    currentFrame: number;
    x: number;
    y: number;
    initialX: number = 0;
    initialY: number = 0;
    x_offset: number;
    y_offset: number;

    constructor(imageSrc: string, frameWidth: number, frameHeight: number, resizeWidth: number, resizeHeight: number, frameCount: number, x?: number, y?: number, x_offset?: number, y_offset?: number, initialX?: number, initialY?: number) {
        super();
        this.imageSrc = imageSrc;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.resizeWidth = resizeWidth;
        this.resizeHeight = resizeHeight
        this.frameCount = frameCount;
        this.currentFrame = 1;
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.x_offset = x_offset ?? 0;
        this.y_offset = y_offset ?? 0;
        this.initialX = initialX ?? 0;
        this.initialY = initialY ?? 0;
        this.loadImage();
    }
    /**
     * This method is used to load the image for the sprite sheet.
     */
    private loadImage(): void {
        this.image.src = this.imageSrc;
        this.image.onload = () => {
            this.image = this.image;
        };
    }
}