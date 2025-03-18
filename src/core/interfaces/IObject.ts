import { IComponent, IComponentMehtods } from "./IComponent";

export interface IObject extends IComponentMehtods {
    id: number;
    _components: Map<string, IComponent>;
}