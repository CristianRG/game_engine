import { IGlobalState } from "../interfaces/IGlobalState";
import { Entity } from "../models/Entity";
import { GameObject } from "../models/GameObject";
import { Scene } from "../models/Scene";

export class GlobalState implements IGlobalState<Scene | Entity | GameObject> {
    private static instance: GlobalState;
    currentScene: Scene | null;
    private scenes: Scene[];
    private entities: Entity[];
    private objects: GameObject[];

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

    getCurrentScene(): Scene | null {
        return this.currentScene;
    }

    setCurrentScene(id: number): void {
        this.currentScene = this.scenes.find(s => s.id === id) || null;
    }

    nextScene(): void {
        const index = this.scenes.indexOf(this.currentScene as Scene);
        if (index + 1 < this.scenes.length) {
            this.currentScene = this.scenes[index + 1];
        }
    }

    get<U>(model: U, id: number): Scene | Entity | GameObject | null {
        if (model instanceof Scene) {
            return this.scenes.find(s => s.id === id) || null;
        }
        if (model instanceof Entity) {
            return this.entities.find(e => e.id === id) || null;
        }
        if (model instanceof GameObject) {
            return this.objects.find(o => o.id === id) || null;
        }
        return null;
    }

    getMany<U>(model: U): (Scene | Entity | GameObject)[] {
        if (model instanceof Scene) {
            return this.scenes;
        }
        if (model instanceof Entity) {
            return this.entities;
        }
        if (model instanceof GameObject) {
            return this.objects;
        }
        return [];
    }

    add<U>(model: U, object: Scene | Entity | GameObject): void {
        if (model instanceof Scene) {
            if (this.currentScene === null) this.currentScene = object as Scene;
            this.scenes.push(object as Scene);
        }
        if (model instanceof Entity) {
            this.entities.push(object as Entity);
        }
        if (model instanceof GameObject) {
            this.objects.push(object as GameObject);
        }
    }

    update<U>(model: U, id: number, object: Scene | Entity | GameObject): void {
        if (model instanceof Scene) {
            const scene = this.scenes.find(s => s.id === id) as Scene;
            if (scene) {
                this.scenes[this.scenes.indexOf(scene)] = object as Scene;
            }
        }
        if (model instanceof Entity) {
            const entity = this.entities.find(e => e.id === id) as Entity;
            if (entity) {
                this.entities[this.entities.indexOf(entity)] = object as Entity;
            }
        }
        if (model instanceof GameObject) {
            const object = this.objects.find(o => o.id === id) as GameObject;
            if (object) {
                this.objects[this.objects.indexOf(object)] = object as GameObject;
            }
        }
    }

    remove<U>(model: U, id: number): void {
        if (model instanceof Scene) {
            this.scenes = this.scenes.filter(s => s.id !== id);
        }
        if (model instanceof Entity) {
            this.entities = this.entities.filter(e => e.id !== id);
        }
        if (model instanceof GameObject) {
            this.objects = this.objects.filter(o => o.id !== id);
        }
    }
}