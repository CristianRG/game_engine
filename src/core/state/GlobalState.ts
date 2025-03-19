import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Scene } from "../models/Scene";

export class GlobalState {
    private static instance: GlobalState;
    scenes: Scene[];
    entities: Entity[];
    objects: GameObject[];

    private constructor() {
        this.scenes = [];
        this.entities = [];
        this.objects = [];
    }

    static getInstance(): GlobalState {
        if (!GlobalState.instance) {
            GlobalState.instance = new GlobalState();
        }
        return GlobalState.instance;
    }
}