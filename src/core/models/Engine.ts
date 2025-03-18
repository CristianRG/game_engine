import { ColliderSystem } from "../../systems/ColliderSystem";
import { InputKeySystem } from "../../systems/InputKeySystem";
import { PhysicSystem } from "../../systems/PhysicSystem";
import { RenderSystem } from "../../systems/RenderSystem";
import { IEngine } from "../interfaces/IEngine";
import { IEngineControllerSystem } from "../interfaces/IEngineControllerSystem";
import { GlobalState } from "../state/GlobalState";
import { Collider } from "../strategy/Collider";
import { InputKeyEvent } from "../strategy/InputKeyEvent";
import { Physics } from "../strategy/Physics";
import { RenderByRenderable } from "../strategy/RenderByRenderable";
import { RenderBySprite } from "../strategy/RenderBySprite";
import { RenderScene } from "../strategy/RenderScene";
import { RenderSceneStrategy } from "../strategy/RenderSceneStrategy";
import { ECS } from "./ECS";
import { Scene } from "./Scene";
import { Sprite } from "../../components/Sprite";

export class Engine implements IEngine {
    isRunning: boolean;
    lastTime: number;
    ecs: IEngineControllerSystem;

    constructor(canvas: HTMLCanvasElement) {
        this.isRunning = false;
        this.lastTime = 0;
        this.ecs = ECS.getInstance();
        this.ecs.addSystem(new ColliderSystem(new Collider()));
        this.ecs.addSystem(new PhysicSystem(new Physics()));
        this.ecs.addSystem(new InputKeySystem(false, new InputKeyEvent()));
        this.ecs.addSystem(new RenderSystem(new RenderScene(new Scene(canvas))));
        this.ecs.addSystem(new RenderSystem(new RenderSceneStrategy([
           new RenderBySprite(canvas.getContext("2d") as CanvasRenderingContext2D, [])
        ])))
    }

    loop(timestamp: number): void {
        if (!this.isRunning) return;
        this.lastTime = timestamp;
        this.ecs.execute();
        requestAnimationFrame(this.loop.bind(this));
    }
    start(): void {
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }
    stop(): void {
        this.isRunning = false;
    }
}