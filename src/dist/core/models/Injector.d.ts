import { IComponent, IComponentMehtods } from "../interfaces/IComponent";
export declare abstract class ComponentManager implements IComponentMehtods {
    _components: Map<string, IComponent>;
    addComponent(component: IComponent): this;
    getComponent<T extends IComponent>(type: new () => T): T | undefined;
    hasComponent<T extends IComponent>(type: new () => T): boolean;
}
export declare abstract class ObjectBinder<T> {
    object: T;
    setObject(object: T): void;
}
