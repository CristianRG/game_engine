import { Transform } from "../../components/Transform";
import { Entity } from "../models/Entity";
import { Object } from "../models/Object";
import { Physics } from "../models/Physics";
import { GlobalState } from "../state/GlobalState";

export class Gravity extends Physics {
    public type: "physics" | "gravity" | "jump" = "gravity";
    private gravity: number = 9.8;
    private entity: Entity;
    private scene = GlobalState.getInstance().scenes[0];
    public stop: boolean = false;

    constructor(entity: Entity, gravity?: number) {
        super();
        this.entity = entity;
        this.gravity = gravity ?? this.gravity;
    }

    public applyPhysics(): void {
        const transform = this.entity.getComponent(Transform);
        if (transform && !this.stop) {

            const collisons = this.checkPossibleCollision(transform);
            if (collisons) {
                if (collisons.getComponent(Transform)!.y == transform.y + transform.height) {
                    this.apply = false;
                }
                else this.apply = true;
            } else if (this.checkEmptySpace(transform)) {
                this.apply = true;
            }
        }

        if (transform && this.apply && !this.stop) {
            transform.move("down")
        }
    }

    private checkPossibleCollision(transform: Transform): Entity | Object | undefined {
        const entities = this.scene.entities.filter(e => e.hasComponent(Transform) && e.id !== this.entity.id);
        const objects = this.scene.objects.filter(o => o.hasComponent(Transform) && o.id !== this.entity.id);
        entities.sort((a, b) => a.getComponent(Transform)!.y - b.getComponent(Transform)!.y);
        objects.sort((a, b) => a.getComponent(Transform)!.y - b.getComponent(Transform)!.y);

        const entity = entities.find(e => {
            return (
                transform.x < e.getComponent(Transform)!.x + e.getComponent(Transform)!.width &&
                transform.x + transform.width > e.getComponent(Transform)!.x &&
                (transform.y + transform.height) <= e.getComponent(Transform)!.y
            )
        })

        const object = objects.find(o => {
            return (
                transform.x < o.getComponent(Transform)!.x + o.getComponent(Transform)!.width &&
                transform.x + transform.width > o.getComponent(Transform)!.x &&
                (transform.y + transform.height) <= o.getComponent(Transform)!.y
            )
        });

        if (!entity && !object) {
            return undefined;
        } else if (!entity) {
            return object;
        } else if (!object) {
            return entity;
        }

        return entity!.getComponent(Transform)!.y < object!.getComponent(Transform)!.y ? entity : object;
    }

    private checkEmptySpace(transform: Transform): boolean {
        const entity = this.scene.entities.find(e => {
            const t = e.getComponent(Transform)!;
            return (
                transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                e.id !== this.entity.id
            )
        })

        const object = this.scene.objects.find(o => {
            const t = o.getComponent(Transform)!;
            return (
                transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                o.id !== this.entity.id
            )
        });

        return entity === undefined && object === undefined;
    }
}