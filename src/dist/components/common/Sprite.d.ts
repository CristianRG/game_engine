import { Component } from "../../core/models/Component";
import { Sprite as SpriteModel } from "../../core/models/Sprite";
export declare class Sprite extends Component {
    sprite: SpriteModel[];
    speed: number;
    loop: boolean;
    private currentSpriteIndex;
    constructor(sprite?: SpriteModel[], speed?: number, loop?: boolean);
    private bindObject;
    getCurrentSprite(): SpriteModel | null;
    nextSprite(): void;
}
