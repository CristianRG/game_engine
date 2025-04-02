import { IRenderStrategy } from "../core/interfaces/IScene";
import { System } from "../core/models/System";
export declare class RenderSystem extends System {
    strategy: IRenderStrategy | null;
    constructor(strategy?: IRenderStrategy | null);
    execute(): void;
}
