import { Component } from "../../core/models/Component";
import { Sprite as SpriteModel } from "../../core/models/Sprite";
/**
 * Sprite component
 * This component is used to render the entity or gameObject with a sprite.
 * @param sprite SpriteModel[] array of sprites to be rendered
 * @param speed number speed of the sprite animation
 */
export class Sprite extends Component {
    
    private currentSpriteIndex: number = 0;

    constructor
    (
        public sprite: SpriteModel[] = [], 
        public speed: number = 0,
        public loop: boolean = false
    ) {
        super();
    }

    private bindObject(sprite: SpriteModel): void {
        sprite.setObject(this.object);
    }

    getCurrentSprite(): SpriteModel | null {
        if (!this.sprite[this.currentSpriteIndex]?.object && this.sprite.length > 0) {
            this.bindObject(this.sprite[this.currentSpriteIndex]);
        }
        return this.sprite[this.currentSpriteIndex] ?? null;
    }

    nextSprite(): void {
        this.currentSpriteIndex = this.currentSpriteIndex + 1 >= this.sprite.length ? 0 : this.currentSpriteIndex + 1;
    }
}