import { InputKeys } from "../../components/InputKeys";
import { IKeyEventStrategy } from "../interfaces/IStrategy";
import { GlobalState } from "../state/GlobalState";

export class InputKeyEvent implements IKeyEventStrategy {
    private entities = GlobalState.getInstance().entities;

    trigger(key: string): void {
        const entities = this.entities.filter(e => e.getComponent(InputKeys))
        
        for (const entity of entities) {
            const inputKey = entity.getComponent(InputKeys);
            inputKey?.trigger(key);
        }
    }
}