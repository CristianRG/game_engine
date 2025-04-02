import { Component } from "../../core/models/Component";
/**
 * Collider component
 * This component is used to detect collisions between entities or gameObjects.
 * It uses the Transform component to get the position and size of the entity.
 * It uses the onCollision method to call the collision function of the other entity.
 */
export declare class Collider extends Component {
    onCollision: (collider: Collider) => void;
    constructor(onCollision?: (collider: Collider) => void);
    /**
     * Check if this entity is colliding with another entity
     * @param collider Collider component of the other entity that this entity is colliding with
     * @returns true if this entity is colliding with the other entity, false otherwise
     * Also calls the collisionEnter method of the other entity
     */
    isColliding(collider: Collider): boolean;
    /**
     *
     * @param collider Collider component of the other entity that this entity is colliding with
     * Move this entity to the edge of the other entity using his transform component and the other entity's transform component.
     */
    collisionEnter(collider: Collider): void;
}
