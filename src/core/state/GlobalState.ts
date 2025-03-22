import { IGlobalState } from "../interfaces/IGlobalState";
import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Scene } from "../models/Scene";

export class GlobalState {
    private static instance: GlobalState;
    currentScene: Scene | null;
    scenes: Scene[];
    entities: Entity[];
    objects: GameObject[];

    private constructor() {
        this.currentScene = null;
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