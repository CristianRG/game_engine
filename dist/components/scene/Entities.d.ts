import { Component } from "../../core/models/Component";
import { Entity } from "../../core/models/Entity";
export declare class Entities extends Component {
    private entities;
    constructor();
    setEntities(entities: Entity[]): void;
    getEntities(): Entity[];
    getEntityById(id: number): Entity | undefined;
    addEntity(entity: Entity): void;
    removeEntity(entity: Entity): void;
}
