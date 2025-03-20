import { Transform } from "../../components/Transform";
import { Entity } from "../models/Entity";
import { Physics } from "../models/Physics";
import { Physics as PhysicsComponent } from "../../components/Physics";
import { Gravity } from "./Gravity";
import { GlobalState } from "../state/GlobalState";

export class Jump extends Physics {
    public type: "physics" | "gravity" | "jump" = "jump";
    private scene = GlobalState.getInstance().scenes[0];
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
        const entity = this.scene.entities.find(e => {
            const t = e.getComponent(Transform)!;
            return (
                transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y + transform.height === t.y &&
                e.id !== this.object.id
            )
        })

        const object = this.scene.objects.find(o => {
            const t = o.getComponent(Transform)!;
            return (
                transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y + transform.height === t.y &&
                o.id !== this.object.id
            )
        });

        return entity !== undefined || object !== undefined;
    }

    private checkIfCanJump(transform: Transform): boolean {
        const entities = this.scene.entities.filter(e => e.hasComponent(Transform) && e.id !== this.object.id);
        const objects = this.scene.objects.filter(o => o.hasComponent(Transform) && o.id !== this.object.id);
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
                transform.y <= t.y + t.height
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