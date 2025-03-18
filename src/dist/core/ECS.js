export class ECS {
    entities = [];
    systems = [];
    addEntity(entity) {
        this.entities.push(entity);
        return this;
    }
    addSystem(system) {
        this.systems.push(system);
        return this;
    }
    update(deltatime) {
        for (const system of this.systems) {
            system.update(this.entities, deltatime);
        }
    }
}
