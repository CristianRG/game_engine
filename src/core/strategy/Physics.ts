import { IPhysicStrategy } from "../interfaces/IStrategy";
import { GlobalState } from "../state/GlobalState";
import { Physics as PhysicComponent } from "../../components/Physics";

export class Physics implements IPhysicStrategy {
    private entities = GlobalState.getInstance().entities;

    applyPhysics(): void {
        const entities = this.entities.filter(e => e.getComponent(PhysicComponent));

        for (const entity of entities) {
            const physics = entity.getComponent(PhysicComponent);
            if(physics){
                physics.applyPhysics();
            }
        }
    }
}