import { Component } from "../core/models/Component";
import { Physics as BasePhysics } from "../core/models/Physics";

export class Physics extends Component {
    constructor(
        public physics: BasePhysics[] = []
    ) {
        super();
    }

    public applyPhysics(): void {
        if (this.physics.length > 0) {
            for (const physic of this.physics) {
                if (!physic.object) { physic.setObject(this.object) };
                physic.applyPhysics();
            }
        }
    }
}