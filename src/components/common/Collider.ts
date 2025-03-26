import { Component } from "../../core/models/Component";
import { Transform } from "./Transform";

export class Collider extends Component {
    constructor(
        public onCollision: (collider: Collider) => void = () => {}
    ){
        super();
    }

    public isColliding(collider: Collider): boolean {
        const entityCollider = this.object.getComponent(Collider);
        const otherCollider = collider.object.getComponent(Collider);

        if(!entityCollider || !otherCollider) return false;

        const t = this.object.getComponent(Transform);
        const otherT = collider.object.getComponent(Transform);

        if(!t || !otherT) return false;

        const collsionDetected = (
            t.x < otherT.x + otherT.width &&
            t.x + t.width > otherT.x &&
            t.y < otherT.y + otherT.height &&
            t.y + t.height > otherT.y
        );

        if(collsionDetected) {
            this.collisionEnter(collider);
            collider.collisionEnter(this);
        }

        return collsionDetected;
    }
    /**
     * 
     * @param collider Collider component of the other entity that this entity is colliding with
     * Move this entity to the edge of the other entity using his transform component and the other entity's transform component.
     */
    public collisionEnter(collider: Collider): void {
        const transform = this.object.getComponent(Transform);
        const otherTransform = collider.object.getComponent(Transform);

        if (!transform || !otherTransform) return;

        if (transform.direction !== "quiet") {
            switch (transform.direction) {
                case "up":
                    transform.y = otherTransform.y + otherTransform.height;
                    break;
                case "down":
                    transform.y = otherTransform.y - transform.height;
                    break;
                case "left":
                    transform.x = otherTransform.x + otherTransform.width;
                    break;
                case "right":
                    transform.x = otherTransform.x - transform.width;
                    break;
            }
        }
        this.onCollision(collider);
    }
}