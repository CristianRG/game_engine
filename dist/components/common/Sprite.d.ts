import { Component } from "../../core/models/Component";
import { Sprite as SpriteModel } from "../../core/models/Sprite";
/**
 * Sprite component
 * This component is used to render the entity or gameObject with a sprite.
 * @param sprite SpriteModel[] array of sprites to be rendered
 * @param speed number speed of the sprite animation
 */
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
