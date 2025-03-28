import { Component } from "../../core/models/Component";
import { GameObject } from "../../core/models/GameObject";
export declare class GameObjects extends Component {
    private objects;
    constructor();
    setObjects(objects: GameObject[]): void;
    getObjects(): GameObject[];
    getObjectById(id: number): GameObject | undefined;
    addObject(object: GameObject): void;
    removeObject(object: GameObject): void;
}
