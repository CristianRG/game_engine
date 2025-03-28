export interface IComponent {
}
export interface IComponentMehtods {
    _components: Map<string, IComponent>;
    addComponent(component: IComponent): this;
    getComponent<T extends IComponent>(type: new () => T): T | undefined;
    hasComponent<T extends IComponent>(type: new () => T): boolean;
}
