import { IEntity } from "./IEntity";
import { IGameObject } from "./IGameObject";

export interface IScene {
    id: number;
    entities: IEntity[];
    objects: IGameObject[];
}

export interface IRenderStrategy {
    render(): void;
}