import { IRenderEntityStrategy } from "../interfaces/IStrategy";
import { Sprite } from "../../components/Sprite";
import { SpriteAnimationController } from "../models/SpriteMethods";
import { GlobalState } from "../state/GlobalState";

export class RenderBySprite extends SpriteAnimationController implements IRenderEntityStrategy {
    sprites: Sprite[] = [];
    ctx: CanvasRenderingContext2D | null = null;
    stopped: boolean = false;

    constructor(ctx: CanvasRenderingContext2D, sprites: Sprite[]) {
        super();
        this.ctx = ctx;
        //this.sprites = sprites;
    }

    render(): void {
        if (this.stopped || !this.ctx) return;
        const scene = GlobalState.getInstance().scenes[0];

        this.sprites = [
            ...scene.entities.filter(e => e.hasComponent(Sprite)).map(e => e.getComponent(Sprite)!),
            ...scene.objects.filter(e => e.hasComponent(Sprite)).map(e => e.getComponent(Sprite)!)
        ];

        this.play(this.ctx, this.sprites);
    }
}