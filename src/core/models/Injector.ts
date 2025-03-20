import { IComponent, IComponentMehtods } from "../interfaces/IComponent";

export abstract class ComponentManager implements IComponentMehtods {
    _components: Map<string, IComponent> = new Map<string, IComponent>();
    addComponent(component: IComponent): this {
        this._components.set(component.constructor.name, component);

        if ("setObject" in component && typeof (component as any).setObject === "function") {
            (component as any).setObject(this);
        }

        return this
    }
    getComponent<T extends IComponent>(type: new () => T): T | undefined {
        return this._components.get(type.name) as T;
    }
    hasComponent<T extends IComponent>(type: new () => T): boolean {
        return this._components.has(type.name);
    }
}

export abstract class ObjectBinder<T> {
    object!: T;
    instance!: new () => T;
    type: string = this.instance.name;
    setObject(object: T): void {
        this.object = object;
    }
}