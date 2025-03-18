import { ObjectDecorator } from "../decorators/ObjectDecorator";
import { IComponent } from "../interfaces/IComponent";
import { IObject } from "../interfaces/IObject";

@ObjectDecorator.registerObject
export class Object implements IObject {
    private static _id: number;
    public id: number;
    _components: Map<string, IComponent>;

    constructor() {
        this.id = Object._id++;
        this._components = new Map<string, IComponent>();
    }

    addComponent(component: IComponent): this {
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