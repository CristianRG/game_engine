import { Transform } from "../../components/common/Transform";
import { Entity } from "../models/Entity";
import { Physics } from "../models/Physics";
import { Physics as PhysicsComponent } from "../../components/common/Physics";
import { Gravity } from "./Gravity";
import { GlobalState } from "../state/GlobalState";
import { Entities } from "../../components/scene/Entities";
import { GameObjects } from "../../components/scene/GameObjects";
import { Scene } from "../models/Scene";
/**
 * * Jump class to apply jump to an object (the object is a reference to an entity or a game object).
 * * The jump is applied to the object if it is not colliding with any other object or entity or if it is on the ground. 
 */
export class Jump extends Physics {
    public type: "physics" | "gravity" | "jump" = "jump";
    private scene = GlobalState.getInstance().currentScene as Scene;
    private movementTimeout: number | null = null;
    public apply: boolean = false;
    public stop: boolean = true;
    public jumpSpeed: number = 10;

    constructor(jumpSpeed?: number) {
        super();
        this.jumpSpeed = jumpSpeed ?? this.jumpSpeed;
    }

    public applyPhysics(): void {
        const transform = this.object.getComponent(Transform);
        if (!transform || !this.apply) return;

        const hasGravity = this.checkIfHasGravity();
        if (!hasGravity) return;

        const gravity = this.object.getComponent(PhysicsComponent)!.physics.find(p => p.type === "gravity") as Gravity;

        if (!gravity.stop && this.isOnGround(transform)) {
            gravity.stop = true;
            this.stop = false;
            this.resetTimeout(this.jumpSpeed, gravity);
        }

        if (!this.stop && this.checkIfCanJump(transform)) {
            transform.translate("up");
        } else {
            this.apply = false;
            this.stop = true;
            gravity.stop = false;
        }
    }

    private checkIfHasGravity(): boolean {
        const physics = this.object.getComponent(PhysicsComponent);
        return physics?.physics.some(p => p.type === "gravity") ?? false;
    }

    private isOnGround(transform: Transform): boolean {
        let entity: Entity | undefined;
        let object: Entity | undefined;
        if (this.scene.hasComponent(Entities)){
            entity = this.scene.getComponent(Entities)!.getEntities().find(e => {
                const t = e.getComponent(Transform)!;
                return (
                    transform.x < t.x + t.width &&
                    transform.x + transform.width > t.x &&
                    transform.y + transform.height === t.y &&
                    e !== this.object
                )
            })
        }

        if (this.scene.hasComponent(GameObjects)){
            object = this.scene.getComponent(GameObjects)!.getObjects().find(o => {
                const t = o.getComponent(Transform)!;
                return (
                    transform.x < t.x + t.width &&
                    transform.x + transform.width > t.x &&
                    transform.y + transform.height === t.y &&
                    o !== this.object
                )
            })
        }
        return entity !== undefined || object !== undefined;
    }

    private checkIfCanJump(transform: Transform): boolean {
        let entities: Entity[] = [];
        let objects: Entity[] = [];

        if (this.scene.hasComponent(Entities)) {
            entities = this.scene.getComponent(Entities)!.getEntities();
        }

        if (this.scene.hasComponent(GameObjects)) {
            objects = this.scene.getComponent(GameObjects)!.getObjects();
        }

        entities.sort((a, b) => a.getComponent(Transform)!.y - b.getComponent(Transform)!.y);
        objects.sort((a, b) => a.getComponent(Transform)!.y - b.getComponent(Transform)!.y);

        const entity = entities.find(e => {
            const t = e.getComponent(Transform)!;
            return (
                transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y === t.y + t.height
            )
        })

        const object = objects.find(o => {
            const t = o.getComponent(Transform)!;
            return (
                transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y === t.y + t.height
            )
        });
        return entity === undefined && object === undefined;
    }

    private resetTimeout(movementSpeed: number, gravity: Gravity): void {
        if (this.movementTimeout) {
            clearTimeout(this.movementTimeout);
        }
        this.movementTimeout = setTimeout(() => {
            this.apply = false;
            this.stop = true;
            gravity.stop = false;
        }, (movementSpeed ** 3)) as unknown as number;
    }

}