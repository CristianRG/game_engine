import { IRenderStrategy } from "../interfaces/IScene";
export declare class RenderSceneStrategy implements IRenderStrategy {
    renderStrategies: IRenderStrategy[];
    constructor(renderStrategies?: IRenderStrategy[]);
    render(): void;
}
