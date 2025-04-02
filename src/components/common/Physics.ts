import { Component } from "../../core/models/Component";
import { Physics as BasePhysics } from "../../core/models/Physics";
/**
 * Physics component
 * This component is used to apply physics to the entity or gameObject.
 */
export class Physics extends Component {
    constructor(
        public physics: BasePhysics[] = []
    ) {
        super();
    }
    /**
     * Apply physics to the entity or gameObject.
     * This method is used to apply physics to the entity or gameObject.
     */
    public applyPhysics(): void {
        if (this.physics.length > 0) {
            for (const physic of this.physics) {
                if (!physic.object) { physic.setObject(this.object) };
                physic.applyPhysics();
            }
        }
    }
}