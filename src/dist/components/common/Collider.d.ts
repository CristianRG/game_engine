import { Component } from "../../core/models/Component";
export declare class Collider extends Component {
    onCollision: (collider: Collider) => void;
    constructor(onCollision?: (collider: Collider) => void);
    isColliding(collider: Collider): boolean;
    /**
     *
     * @param collider Collider component of the other entity that this entity is colliding with
     * Move this entity to the edge of the other entity using his transform component and the other entity's transform component.
     */
    collisionEnter(collider: Collider): void;
}
