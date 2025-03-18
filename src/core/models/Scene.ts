import { SceneDecorator } from "../decorators/SceneDecorator";
import { IScene } from "../interfaces/IScene";
import { Entity } from "./Entity";
import { Object } from "./Object";

@SceneDecorator.registerScene
export class Scene implements IScene {
    private static _id: number = 0;
    id: number;
    canvas: HTMLCanvasElement;
    entities: Entity[];
    objects: Object[];

    constructor(canvas: HTMLCanvasElement, entities: Entity[] = [], objects: Object[] = []) {
        this.id = Scene._id++;
        this.canvas = canvas;
        this.entities = entities;
        this.objects = objects;
    }
}