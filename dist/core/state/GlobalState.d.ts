import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Scene } from "../models/Scene";
export declare class GlobalState {
    private static instance;
    currentScene: Scene | null;
    scenes: Scene[];
    entities: Entity[];
    objects: GameObject[];
    private constructor();
    static getInstance(): GlobalState;
}
