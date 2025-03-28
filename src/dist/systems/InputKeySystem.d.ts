import { System } from "../core/models/System";
import { IKeyEventStrategy } from "../core/interfaces/IStrategy";
export declare class InputKeySystem extends System {
    private setupAlready;
    strategy: IKeyEventStrategy | null;
    constructor(setupAlready?: boolean, strategy?: IKeyEventStrategy | null);
    execute(): void;
    setup(): void;
}
