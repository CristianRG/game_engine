import { IKeyEventStrategy } from "../interfaces/IStrategy";
export declare class InputKeyEvent implements IKeyEventStrategy {
    private entities;
    trigger(key: string): void;
}
