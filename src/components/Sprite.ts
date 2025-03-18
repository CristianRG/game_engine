import { Component } from "../core/models/Component";
import { Sprite as SpriteModel } from "../core/models/Sprite";

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

    getCurrentSprite(): SpriteModel {
        return this.sprite[this.currentSpriteIndex];
    }

    nextSprite(): void {
        this.currentSpriteIndex = this.currentSpriteIndex + 1 >= this.sprite.length ? 0 : this.currentSpriteIndex + 1;
    }
}