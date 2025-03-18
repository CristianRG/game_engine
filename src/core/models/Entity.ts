import { EntityDecorator } from "../decorators/EntityDecorator";
import { IComponent } from "../interfaces/IComponent";
import { IEntity } from "../interfaces/IEntity";

@EntityDecorator.registerEntity
export class Entity implements IEntity {
    private static _id: number = 0;
    public id: number;
    _components: Map<string, IComponent>;

    constructor() {
        this.id = Entity._id++;
        this._components = new Map<string, IComponent>();
    }

    addComponent(component: IComponent) {
        this._components.set(component.constructor.name, component);
        return this;
    }
    getComponent<T extends IComponent>(type: new () => T): T | undefined {
        return this._components.get(type.name) as T;
    }
    hasComponent<T extends IComponent>(type: new () => T): boolean {
        return this._components.has(type.name);
    }
}