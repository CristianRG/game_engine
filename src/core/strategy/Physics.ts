import { IPhysicStrategy } from "../interfaces/IStrategy";
import { GlobalState } from "../state/GlobalState";
import { Physics as PhysicComponent } from "../../components/common/Physics";
import type { Entity } from "../models/Entity";
import type { Scene } from "../models/Scene";
import { Entities } from "../../components/scene/Entities";
import { GameObjects } from "../../components/scene/GameObjects";
import { GameObject } from "../models/GameObject";

export class Physics implements IPhysicStrategy {
    private entities: Entity[] = [];
    private gameObjects: GameObject[] = [];

    applyPhysics(): void {
        const scene = GlobalState.getInstance().currentScene as Scene;
        if (scene.hasComponent(Entities)) {
            this.entities = scene.getComponent(Entities)!.getEntities().filter(entity => entity.hasComponent(PhysicComponent));
        }
        if (scene.hasComponent(GameObjects)) {
            this.gameObjects = scene.getComponent(GameObjects)!.getObjects().filter(object => object.hasComponent(PhysicComponent));
        }

        for (const entity of this.entities) {
            const physics = entity.getComponent(PhysicComponent);
            if(physics){
                physics.applyPhysics();
            }
        }
        for (const object of this.gameObjects) {
            const physics = object.getComponent(PhysicComponent);
            if(physics){
                physics.applyPhysics();
            }
        }
    }
}