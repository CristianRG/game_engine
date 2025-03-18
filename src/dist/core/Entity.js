/**
 * Entity class. Represents identity of an object in the game. It is a container for components.
 */
export class Entity {
    static _id = 0;
    id;
    _components;
    constructor() {
        this.id = Entity._id++;
        this._components = new Map();
    }
    addComponent(component) {
        this._components.set(component.constructor.name, component);
        return this;
    }
    getComponent(type) {
        return this._components.get(type.name);
    }
    hasComponent(type) {
        return this._components.has(type.name);
    }
}
