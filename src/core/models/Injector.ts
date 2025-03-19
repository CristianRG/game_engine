import { IComponent, IComponentMehtods } from "../interfaces/IComponent";
import { Entity } from "./Entity";

export abstract class EntityInjector implements IComponentMehtods {
    _components: Map<string, IComponent> = new Map<string, IComponent>();
    addComponent(component: IComponent): this {
        this._components.set(component.constructor.name, component);

        if ("setEntity" in component && typeof (component as any).setEntity === "function") {
            (component as any).setEntity(this);
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

export abstract class ComponentInjector implements IComponent {
    entity!: Entity;
    setEntity(entity: Entity): void {
        this.entity = entity;
    }
}

export abstract class PhysicsInjector {
    entity!: Entity;
    setEntity(entity: Entity): void {
        this.entity = entity;
    }
}