import { IEntity } from "./IEntity";
import { IObject } from "./IObject";

export interface IScene {
    id: number;
    entities: IEntity[];
    objects: IObject[];
}

export interface IRenderStrategy {
    render(): void;
}