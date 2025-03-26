import { IColliderStrategy } from "../interfaces/IStrategy";
import { GlobalState } from "../state/GlobalState";
import { Collider as ColliderComponent } from "../../components/common/Collider";
import { Transform } from "../../components/common/Transform";
export class Collider implements IColliderStrategy {
    public globalState = GlobalState.getInstance();
    public entitiesColliderExecuting = false;
    public objectsColliderExecuting = false;

    collide(): void {
        this.entityCollide();
        this.objectCollide();
    }

    entityCollide(): void {
        const entities = this.globalState.entities.filter(e => e.getComponent(ColliderComponent));
        for (const entity of entities) {
            const collider = entity.getComponent(ColliderComponent)!;
    
            for (const entityTwo of entities) {
                if(entity === entityTwo) continue;
                const colliderTwo = entityTwo.getComponent(ColliderComponent)!;
                collider.isColliding(colliderTwo);
            }

        }
    }

    objectCollide(): void {
        const objects = this.globalState.objects.filter(e => e.getComponent(ColliderComponent));
        for (const object of objects) {
            const collider = object.getComponent(ColliderComponent)!;
            
            for (const entity of this.globalState.entities) {
                const colliderTwo = entity.getComponent(ColliderComponent)!;
                if(collider.isColliding(colliderTwo)){
                    collider.onCollision(colliderTwo);
                }
            }
        }
    }
}