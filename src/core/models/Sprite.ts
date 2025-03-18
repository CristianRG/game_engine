import { ISpriteSheet } from "../interfaces/ISpriteSheet";
import { Entity } from "./Entity";

export class Sprite implements ISpriteSheet {
    image: HTMLImageElement;
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
    entity: Entity;

    constructor(entity: Entity, image: HTMLImageElement, frameWidth: number, frameHeight: number, resizeWidth: number, resizeHeight: number, frameCount: number, x?: number, y?: number, x_offset?: number, y_offset?: number, initialX?: number, initialY?: number) {
        this.entity = entity;
        this.image = image;
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
    }
}