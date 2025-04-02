import { ISpriteSheet } from "../interfaces/ISpriteSheet";
import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { ObjectBinder } from "./Injector";
import { Scene } from "./Scene";
/**
 * Sprite is a class that represents a sprite sheet in the game engine.
 * It is a base class for all sprite sheets and provides a incremental ID for each sprite sheet.
 */
export declare class Sprite extends ObjectBinder<Entity | GameObject | Scene> implements ISpriteSheet {
    imageSrc: string;
    image: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    resizeWidth: number;
    resizeHeight: number;
    frameCount: number;
    currentFrame: number;
    x: number;
    y: number;
    initialX: number;
    initialY: number;
    x_offset: number;
    y_offset: number;
    constructor(imageSrc: string, frameWidth: number, frameHeight: number, resizeWidth: number, resizeHeight: number, frameCount: number, x?: number, y?: number, x_offset?: number, y_offset?: number, initialX?: number, initialY?: number);
    /**
     * This method is used to load the image for the sprite sheet.
     */
    private loadImage;
}
