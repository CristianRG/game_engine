import { IComponent, IComponentMehtods } from "./IComponent";

export interface IEntity extends IComponentMehtods {
    id: number;
    _components: Map<string, IComponent>;
}