import { Component } from "../../core/models/Component";
import { Physics as BasePhysics } from "../../core/models/Physics";
/**
 * Physics component
 * This component is used to apply physics to the entity or gameObject.
 */
export declare class Physics extends Component {
    physics: BasePhysics[];
    constructor(physics?: BasePhysics[]);
    /**
     * Apply physics to the entity or gameObject.
     * This method is used to apply physics to the entity or gameObject.
     */
    applyPhysics(): void;
}
