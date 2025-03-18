import { RenderSystem } from "../systems/RenderSystem.js";
import { ECS } from "./ECS.js";
/**
 * The engine is the core of the game. It is responsible for managing the game loop, updating the game state, and rendering the game.
 */
export class Engine {
    ecs;
    lastTime = 0;
    isRunning = false;
    constructor(canvas) {
        this.ecs = new ECS();
        this.ecs.addSystem(new RenderSystem(canvas));
    }
    addEntity(entity) {
        this.ecs.addEntity(entity);
        return this;
    }
    loop = (timestamp) => {
        if (!this.isRunning)
            return;
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        //this.update(deltaTime);
        this.ecs.update(deltaTime);
        requestAnimationFrame(this.loop);
    };
    // private update(deltaTime: number) {
    //     console.log(`Updating... Delta Time: ${deltaTime}`);
    // }
    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop);
    }
    stop() {
        this.isRunning = false;
    }
}
