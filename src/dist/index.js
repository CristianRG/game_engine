class System {
    constructor() {
        this.id = System._id++;
    }
}

class ColliderSystem extends System {
    constructor(strategy = null) {
        super();
        this.strategy = strategy;
    }
    execute() {
        if (this.strategy) {
            this.strategy.collide();
        }
    }
}

class InputKeySystem extends System {
    constructor(setupAlready = false, strategy = null) {
        super();
        this.setupAlready = setupAlready;
        this.strategy = strategy;
    }
    execute() {
        this.setup();
    }
    setup() {
        if (this.setupAlready)
            return;
        this.setupAlready = true;
        document.addEventListener('keydown', (e) => {
            if (this.strategy) {
                this.strategy.trigger(e.key);
            }
        });
    }
}

class PhysicSystem extends System {
    constructor(strategy) {
        super();
        this.strategy = strategy;
    }
    execute() {
        this.strategy.applyPhysics();
    }
}

class RenderSystem extends System {
    constructor(strategy = null) {
        super();
        this.strategy = strategy;
    }
    execute() {
        if (this.strategy) {
            this.strategy.render();
        }
    }
}

class GlobalState {
    constructor() {
        this.scenes = [];
        this.entities = [];
        this.objects = [];
    }
    static getInstance() {
        if (!GlobalState.instance) {
            GlobalState.instance = new GlobalState();
        }
        return GlobalState.instance;
    }
}

/**
 * Base class for all components in the engine. Components are used to add functionality to entities.
 */
class Component {
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class EntityDecorator {
    static registerEntity(constructor) {
        const globalState = GlobalState.getInstance();
        const original = constructor;
        // Create a new constructor
        const newConstructor = function (...args) {
            const instance = new original(...args);
            globalState.entities.push(instance);
            return instance;
        };
        // Copy prototype so intanceof operator still works
        newConstructor.prototype = original.prototype;
        // Copy static properties
        Object.assign(newConstructor, original);
        return newConstructor;
    }
}

var Entity_1;
let Entity = Entity_1 = class Entity {
    constructor() {
        this.id = Entity_1._id++;
        this._components = new Map();
    }
    addComponent(component) {
        this._components.set(component.constructor.name, component);
        return this;
    }
    getComponent(type) {
        return this._components.get(type.name);
    }
    hasComponent(type) {
        return this._components.has(type.name);
    }
};
Entity._id = 0;
Entity = Entity_1 = __decorate([
    EntityDecorator.registerEntity,
    __metadata("design:paramtypes", [])
], Entity);

class Transform extends Component {
    constructor(x = 0, y = 0, width = 50, height = 50, movementSpeed = 5, rotation = 0) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.movementSpeed = movementSpeed;
        this.rotation = rotation;
        this.movementTimeout = null;
        this.MOVEMENT_TIMEOUT_DURATION = 100; // ms
        this.direction = "quiet";
        this.lastPositions = [];
    }
    move(move) {
        let x, y;
        switch (move) {
            case "up":
                x = 0;
                y = -this.movementSpeed;
                break;
            case "down":
                x = 0;
                y = this.movementSpeed;
                break;
            case "left":
                x = -this.movementSpeed;
                y = 0;
                break;
            case "right":
                x = this.movementSpeed;
                y = 0;
                break;
            default:
                x = 0;
                y = 0;
                break;
        }
        this.x += x;
        this.y += y;
        this.registerLastPosition(x, y);
        this.resetMovementTimeout();
    }
    // public moveOver(x: number, y: number): void {
    //     this.x += x;
    //     this.y += y;
    // }
    undo() {
        switch (this.direction) {
            case "up":
                this.y += this.movementSpeed;
                break;
            case "down":
                this.y -= this.movementSpeed;
                break;
            case "left":
                this.x += this.movementSpeed;
                break;
            case "right":
                this.x -= this.movementSpeed;
                break;
        }
    }
    registerLastPosition(x, y) {
        if (this.lastPositions.length > 10) {
            this.lastPositions.shift();
        }
        if (x < 0)
            this.direction = "left";
        if (x > 0)
            this.direction = "right";
        if (y < 0)
            this.direction = "up";
        if (y > 0)
            this.direction = "down";
        this.lastPositions.push({ x: this.x, y: this.y });
    }
    resetMovementTimeout() {
        if (this.movementTimeout !== null) {
            clearTimeout(this.movementTimeout);
        }
        this.movementTimeout = setTimeout(() => {
            this.direction = "quiet";
        }, this.MOVEMENT_TIMEOUT_DURATION);
    }
}

let Collider$1 = class Collider extends Component {
    constructor(entity = new Entity(), onCollision = () => { }) {
        super();
        this.entity = entity;
        this.onCollision = onCollision;
    }
    isColliding(collider) {
        const entityCollider = this.entity.getComponent(Collider);
        const otherCollider = collider.entity.getComponent(Collider);
        if (!entityCollider || !otherCollider)
            return false;
        const t = this.entity.getComponent(Transform);
        const otherT = collider.entity.getComponent(Transform);
        if (!t || !otherT)
            return false;
        const collsionDetected = (t.x < otherT.x + otherT.width &&
            t.x + t.width > otherT.x &&
            t.y < otherT.y + otherT.height &&
            t.y + t.height > otherT.y);
        if (collsionDetected) {
            this.collisionEnter(collider);
            collider.collisionEnter(this);
        }
        return collsionDetected;
    }
    /**
     *
     * @param collider Collider component of the other entity that this entity is colliding with
     * Move this entity to the edge of the other entity using his transform component and the other entity's transform component.
     */
    collisionEnter(collider) {
        const transform = this.entity.getComponent(Transform);
        const otherTransform = collider.entity.getComponent(Transform);
        if (!transform || !otherTransform)
            return;
        if (transform.direction !== "quiet") {
            switch (transform.direction) {
                case "up":
                    transform.y = otherTransform.y + otherTransform.height;
                    break;
                case "down":
                    transform.y = otherTransform.y - transform.height;
                    break;
                case "left":
                    transform.x = otherTransform.x + otherTransform.width;
                    break;
                case "right":
                    transform.x = otherTransform.x - transform.width;
                    break;
            }
        }
        this.onCollision(collider);
    }
};

class Collider {
    constructor() {
        this.globalState = GlobalState.getInstance();
        this.entitiesColliderExecuting = false;
        this.objectsColliderExecuting = false;
    }
    collide() {
        this.entityCollide();
        this.objectCollide();
    }
    entityCollide() {
        const entities = this.globalState.entities.filter(e => e.getComponent(Collider$1));
        for (const entity of entities) {
            const collider = entity.getComponent(Collider$1);
            for (const entityTwo of entities) {
                if (entity === entityTwo)
                    continue;
                const colliderTwo = entityTwo.getComponent(Collider$1);
                collider.isColliding(colliderTwo);
            }
        }
    }
    objectCollide() {
        const objects = this.globalState.objects.filter(e => e.getComponent(Collider$1));
        for (const object of objects) {
            const collider = object.getComponent(Collider$1);
            for (const entity of this.globalState.entities) {
                const colliderTwo = entity.getComponent(Collider$1);
                if (collider.isColliding(colliderTwo)) {
                    collider.onCollision(colliderTwo);
                }
            }
        }
    }
}

/**
 * InputKeys is a component that listens for keydown events and triggers events when a key is pressed.
 * Using `Event` class to store the event to be triggered when the key is pressed.
 */
class InputKeys extends Component {
    constructor(hashEvents = new Map()) {
        super();
        this.hashEvents = hashEvents;
    }
    trigger(key) {
        var _a;
        (_a = this.hashEvents.get(key)) === null || _a === void 0 ? void 0 : _a.event();
    }
}

class InputKeyEvent {
    constructor() {
        this.entities = GlobalState.getInstance().entities;
    }
    trigger(key) {
        const entities = this.entities.filter(e => e.getComponent(InputKeys));
        for (const entity of entities) {
            const inputKey = entity.getComponent(InputKeys);
            inputKey === null || inputKey === void 0 ? void 0 : inputKey.trigger(key);
        }
    }
}

let Physics$2 = class Physics extends Component {
    constructor(physics = []) {
        super();
        this.physics = physics;
    }
    applyPhysics() {
        if (this.physics.length > 0) {
            for (const physic of this.physics) {
                physic.applyPhysics();
            }
        }
    }
};

let Physics$1 = class Physics {
    constructor() {
        this.entities = GlobalState.getInstance().entities;
    }
    applyPhysics() {
        const entities = this.entities.filter(e => e.getComponent(Physics$2));
        for (const entity of entities) {
            const physics = entity.getComponent(Physics$2);
            if (physics) {
                physics.applyPhysics();
            }
        }
    }
};

let Sprite$1 = class Sprite extends Component {
    constructor(sprite = [], speed = 0, loop = false) {
        super();
        this.sprite = sprite;
        this.speed = speed;
        this.loop = loop;
        this.currentSpriteIndex = 0;
    }
    getCurrentSprite() {
        return this.sprite[this.currentSpriteIndex];
    }
    nextSprite() {
        this.currentSpriteIndex = this.currentSpriteIndex + 1 >= this.sprite.length ? 0 : this.currentSpriteIndex + 1;
    }
};

class SpriteAnimationController {
    constructor() {
        this.stopped = true;
        this.index = 0;
    }
    draw(ctx, sprites) {
        for (const sprite of sprites) {
            const { entity, x_offset, initialX, initialY, y_offset, frameWidth, frameHeight, resizeWidth, resizeHeight, currentFrame, image } = sprite.getCurrentSprite();
            const transform = entity.getComponent(Transform);
            if (!transform)
                return;
            const { x, y } = transform;
            ctx.drawImage(image, initialX + (currentFrame - 1) * (frameWidth + x_offset), // Ajustado
            initialY + y_offset, // Considerando también initialY
            frameWidth, frameHeight, x, y, resizeWidth, resizeHeight);
            if (!sprite.loop) {
                sprite.loop = true;
                setInterval(() => {
                    const currentSprite = sprite.getCurrentSprite();
                    currentSprite.currentFrame = currentSprite.currentFrame + 1 >= currentSprite.frameCount ? 1 : currentSprite.currentFrame + 1;
                }, sprite.speed);
            }
        }
    }
    update() {
    }
    reset() {
    }
    play(ctx, sprites) {
        this.stopped = false;
        this.draw(ctx, sprites);
    }
    stop() {
        this.stopped = true;
    }
}

class RenderBySprite extends SpriteAnimationController {
    constructor(ctx, sprites) {
        super();
        this.sprites = [];
        this.ctx = null;
        this.stopped = false;
        this.ctx = ctx;
        //this.sprites = sprites;
    }
    render() {
        if (this.stopped || !this.ctx)
            return;
        const scene = GlobalState.getInstance().scenes[0];
        this.sprites = [
            ...scene.entities.filter(e => e.hasComponent(Sprite$1)).map(e => e.getComponent(Sprite$1)),
            ...scene.objects.filter(e => e.hasComponent(Sprite$1)).map(e => e.getComponent(Sprite$1))
        ];
        this.play(this.ctx, this.sprites);
    }
}

class Renderable extends Component {
    constructor(color = "black") {
        super();
        this.color = color;
    }
}

class RenderScene {
    constructor(scene) {
        this.canvas = scene.canvas;
        this.scene = scene;
    }
    render() {
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const entities = this.scene.entities;
            const objects = this.scene.objects;
            this.renderEntities(entities, ctx);
            this.renderObjects(objects, ctx);
        }
    }
    renderEntities(entities, ctx) {
        for (const entity of entities) {
            const transform = entity.getComponent(Transform);
            const entityRenderable = entity.getComponent(Renderable);
            if (transform && entityRenderable) {
                ctx.fillStyle = (entityRenderable === null || entityRenderable === void 0 ? void 0 : entityRenderable.color) || "black";
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
        }
    }
    renderObjects(objects, ctx) {
        for (const object of objects) {
            const transform = object.getComponent(Transform);
            const objectRenderable = object.getComponent(Renderable);
            if (transform) {
                ctx.fillStyle = (objectRenderable === null || objectRenderable === void 0 ? void 0 : objectRenderable.color) || "black";
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
        }
    }
}

class RenderSceneStrategy {
    constructor(renderStrategies) {
        this.renderStrategies = [];
        this.renderStrategies = renderStrategies || [];
    }
    render() {
        for (const renderStrategy of this.renderStrategies) {
            renderStrategy.render();
        }
    }
}

class ECS {
    constructor() {
        this.systems = [];
    }
    static getInstance() {
        if (!ECS.instance) {
            ECS.instance = new ECS();
        }
        return ECS.instance;
    }
    addSystem(system) {
        this.systems.push(system);
        return this;
    }
    execute() {
        this.systems.forEach(system => system.execute());
    }
}

class SceneDecorator {
    static registerScene(constructor) {
        const original = constructor;
        const globalState = GlobalState.getInstance();
        const newConstructor = function (...args) {
            const instance = new original(...args);
            globalState.scenes.push(instance);
            return instance;
        };
        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);
        return newConstructor;
    }
}

var Scene_1;
let Scene = Scene_1 = class Scene {
    constructor(canvas, entities = [], objects = []) {
        this.id = Scene_1._id++;
        this.canvas = canvas;
        this.entities = entities;
        this.objects = objects;
    }
};
Scene._id = 0;
Scene = Scene_1 = __decorate([
    SceneDecorator.registerScene,
    __metadata("design:paramtypes", [HTMLCanvasElement, Array, Array])
], Scene);

class Engine {
    constructor(canvas) {
        this.isRunning = false;
        this.lastTime = 0;
        this.ecs = ECS.getInstance();
        this.ecs.addSystem(new ColliderSystem(new Collider()));
        this.ecs.addSystem(new PhysicSystem(new Physics$1()));
        this.ecs.addSystem(new InputKeySystem(false, new InputKeyEvent()));
        this.ecs.addSystem(new RenderSystem(new RenderScene(new Scene(canvas))));
        this.ecs.addSystem(new RenderSystem(new RenderSceneStrategy([
            new RenderBySprite(canvas.getContext("2d"), [])
        ])));
    }
    loop(timestamp) {
        if (!this.isRunning)
            return;
        this.lastTime = timestamp;
        this.ecs.execute();
        requestAnimationFrame(this.loop.bind(this));
    }
    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }
    stop() {
        this.isRunning = false;
    }
}

class ObjectDecorator {
    static registerObject(constructor) {
        //const globalEntityState = GlobalEntityState.getInstance();
        const original = constructor;
        // Create a new constructor
        const newConstructor = function (...args) {
            const instance = new original(...args);
            //globalEntityState.entities.push(instance);
            return instance;
        };
        // Copy prototype so intanceof operator still works
        newConstructor.prototype = original.prototype;
        // Copy static properties
        Object.assign(newConstructor, original);
        return newConstructor;
    }
}

var Object_1;
let Object$1 = Object_1 = class Object {
    constructor() {
        this.id = Object_1._id++;
        this._components = new Map();
    }
    addComponent(component) {
        this._components.set(component.constructor.name, component);
        return this;
    }
    getComponent(type) {
        return this._components.get(type.name);
    }
    hasComponent(type) {
        return this._components.has(type.name);
    }
};
Object$1 = Object_1 = __decorate([
    ObjectDecorator.registerObject,
    __metadata("design:paramtypes", [])
], Object$1);

class Sprite {
    constructor(entity, image, frameWidth, frameHeight, resizeWidth, resizeHeight, frameCount, x, y, x_offset, y_offset, initialX, initialY) {
        this.initialX = 0;
        this.initialY = 0;
        this.entity = entity;
        this.image = image;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.resizeWidth = resizeWidth;
        this.resizeHeight = resizeHeight;
        this.frameCount = frameCount;
        this.currentFrame = 1;
        this.x = x !== null && x !== void 0 ? x : 0;
        this.y = y !== null && y !== void 0 ? y : 0;
        this.x_offset = x_offset !== null && x_offset !== void 0 ? x_offset : 0;
        this.y_offset = y_offset !== null && y_offset !== void 0 ? y_offset : 0;
        this.initialX = initialX !== null && initialX !== void 0 ? initialX : 0;
        this.initialY = initialY !== null && initialY !== void 0 ? initialY : 0;
    }
}

class Physics {
    constructor() {
        this.apply = true;
        this.type = "physics";
    }
}

class Gravity extends Physics {
    constructor(entity, gravity) {
        super();
        this.type = "gravity";
        this.gravity = 9.8;
        this.scene = GlobalState.getInstance().scenes[0];
        this.stop = false;
        this.entity = entity;
        this.gravity = gravity !== null && gravity !== void 0 ? gravity : this.gravity;
    }
    applyPhysics() {
        const transform = this.entity.getComponent(Transform);
        if (transform && !this.stop) {
            const collisons = this.checkPossibleCollision(transform);
            if (collisons) {
                if (collisons.getComponent(Transform).y == transform.y + transform.height) {
                    this.apply = false;
                }
                else
                    this.apply = true;
            }
            else if (this.checkEmptySpace(transform)) {
                this.apply = true;
            }
        }
        if (transform && this.apply && !this.stop) {
            transform.move("down");
        }
    }
    checkPossibleCollision(transform) {
        const entities = this.scene.entities.filter(e => e.hasComponent(Transform) && e.id !== this.entity.id);
        const objects = this.scene.objects.filter(o => o.hasComponent(Transform) && o.id !== this.entity.id);
        entities.sort((a, b) => a.getComponent(Transform).y - b.getComponent(Transform).y);
        objects.sort((a, b) => a.getComponent(Transform).y - b.getComponent(Transform).y);
        const entity = entities.find(e => {
            return (transform.x < e.getComponent(Transform).x + e.getComponent(Transform).width &&
                transform.x + transform.width > e.getComponent(Transform).x &&
                (transform.y + transform.height) <= e.getComponent(Transform).y);
        });
        const object = objects.find(o => {
            return (transform.x < o.getComponent(Transform).x + o.getComponent(Transform).width &&
                transform.x + transform.width > o.getComponent(Transform).x &&
                (transform.y + transform.height) <= o.getComponent(Transform).y);
        });
        if (!entity && !object) {
            return undefined;
        }
        else if (!entity) {
            return object;
        }
        else if (!object) {
            return entity;
        }
        return entity.getComponent(Transform).y < object.getComponent(Transform).y ? entity : object;
    }
    checkEmptySpace(transform) {
        const entity = this.scene.entities.find(e => {
            const t = e.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                e.id !== this.entity.id);
        });
        const object = this.scene.objects.find(o => {
            const t = o.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                o.id !== this.entity.id);
        });
        return entity === undefined && object === undefined;
    }
}

class Jump extends Physics {
    constructor(entity, jumpSpeed) {
        super();
        this.type = "jump";
        this.scene = GlobalState.getInstance().scenes[0];
        this.movementTimeout = null;
        this.apply = false;
        this.stop = true;
        this.jumpSpeed = 10;
        this.entity = entity;
        this.jumpSpeed = jumpSpeed !== null && jumpSpeed !== void 0 ? jumpSpeed : this.jumpSpeed;
    }
    applyPhysics() {
        const transform = this.entity.getComponent(Transform);
        if (!transform || !this.apply)
            return;
        const hasGravity = this.checkIfHasGravity();
        if (!hasGravity)
            return;
        const gravity = this.entity.getComponent(Physics$2).physics.find(p => p.type === "gravity");
        if (!gravity.stop && this.isOnGround(transform)) {
            gravity.stop = true;
            this.stop = false;
            this.resetTimeout(this.jumpSpeed, gravity);
        }
        if (!this.stop && this.checkIfCanJump(transform)) {
            transform.move("up");
        }
        else {
            this.apply = false;
            this.stop = true;
            gravity.stop = false;
        }
    }
    checkIfHasGravity() {
        var _a;
        const physics = this.entity.getComponent(Physics$2);
        return (_a = physics === null || physics === void 0 ? void 0 : physics.physics.some(p => p.type === "gravity")) !== null && _a !== void 0 ? _a : false;
    }
    isOnGround(transform) {
        const entity = this.scene.entities.find(e => {
            const t = e.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y + transform.height === t.y &&
                e.id !== this.entity.id);
        });
        const object = this.scene.objects.find(o => {
            const t = o.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y + transform.height === t.y &&
                o.id !== this.entity.id);
        });
        return entity !== undefined || object !== undefined;
    }
    checkIfCanJump(transform) {
        const entities = this.scene.entities.filter(e => e.hasComponent(Transform) && e.id !== this.entity.id);
        const objects = this.scene.objects.filter(o => o.hasComponent(Transform) && o.id !== this.entity.id);
        entities.sort((a, b) => a.getComponent(Transform).y - b.getComponent(Transform).y);
        objects.sort((a, b) => a.getComponent(Transform).y - b.getComponent(Transform).y);
        const entity = entities.find(e => {
            const t = e.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y === t.y + t.height);
        });
        const object = objects.find(o => {
            const t = o.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                transform.y <= t.y + t.height);
        });
        return entity === undefined && object === undefined;
    }
    resetTimeout(movementSpeed, gravity) {
        if (this.movementTimeout) {
            clearTimeout(this.movementTimeout);
        }
        this.movementTimeout = setTimeout(() => {
            this.apply = false;
            this.stop = true;
            gravity.stop = false;
        }, (Math.pow(movementSpeed, 3)));
    }
}

export { Collider$1 as Collider, Component, ECS, Engine, Entity, GlobalState, Gravity, InputKeys, Jump, Object$1 as Object, Physics, Physics$2 as PhysicsComponent, Renderable, Scene, Sprite, SpriteAnimationController, Sprite$1 as SpriteComponent, System, Transform };
