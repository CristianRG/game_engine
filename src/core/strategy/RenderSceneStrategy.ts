import { IRenderStrategy } from "../interfaces/IScene";

export class RenderSceneStrategy implements IRenderStrategy {
    public renderStrategies: IRenderStrategy[] = [];

    constructor(renderStrategies?: IRenderStrategy[]) {
        this.renderStrategies = renderStrategies || [];
    }
    
    render(): void {
        for (const renderStrategy of this.renderStrategies) {
            renderStrategy.render();
        }
    }
}