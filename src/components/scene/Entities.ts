import { Component } from "../../core/models/Component";
import { Entity } from "../../core/models/Entity";

export class Entities extends Component {
    private entities: Entity[] = [];
    constructor() {
        super();
    }

    setEntities(entities: Entity[]): void {
        this.entities = entities;
    }

    getEntities(): Entity[] {
        return this.entities
    }

    getEntityById(id: number): Entity | undefined {
        return this.entities.find(e => e.id === id);
    }

    addEntity(entity: Entity): void {
        this.entities.push(entity);
    }

    removeEntity(entity: Entity): void {
        const index = this.entities.findIndex(e => e.id === entity.id);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }
}