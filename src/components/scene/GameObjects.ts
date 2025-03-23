import { Component } from "../../core/models/Component";
import { GameObject } from "../../core/models/GameObject";

export class GameObjects extends Component {
    private objects: GameObject[] = [];
    constructor() {
        super();
    }

    setObjects(objects: GameObject[]): void {
        this.objects = objects;
    }

    getObjects(): GameObject[] {
        return this.objects
    }

    getObjectById(id: number): GameObject | undefined {
        return this.objects.find(e => e.id === id);
    }

    addObject(object: GameObject): void {
        this.objects.push(object);
    }

    removeObject(object: GameObject): void {
        const index = this.objects.findIndex(e => e.id === object.id);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
    }
}