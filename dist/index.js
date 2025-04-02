/**
 * System is a base class for all systems in the game engine.
 * It provides a unique ID for each system and an abstract execute method that must be implemented by subclasses.
 * This class is used to create systems that can be executed in the engine.
 */
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
        this.currentScene = null;
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

var GlobalState$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GlobalState: GlobalState
});

class ComponentManager {
    constructor() {
        this._components = new Map();
    }
    addComponent(component) {
        this._components.set(component.constructor.name, component);
        if ("setObject" in component && typeof component.setObject === "function") {
            component.setObject(this);
        }
        return this;
    }
    getComponent(type) {
        return this._components.get(type.name);
    }
    hasComponent(type) {
        return this._components.has(type.name);
    }
}
class ObjectBinder {
    setObject(object) {
        this.object = object;
    }
}

/**
 * Base class for all components in the engine. Components are used to add functionality to entities and game objects.
 */
class Component extends ObjectBinder {
}

/**
 * Transform component
 * This component is used to move the entity or gameObject in the scene.
 */
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
    }
    translate(move) {
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
        this.trackMovementDirection(x, y);
        this.resetMovementTimeout();
    }
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
    trackMovementDirection(x, y) {
        if (x < 0)
            this.direction = "left";
        if (x > 0)
            this.direction = "right";
        if (y < 0)
            this.direction = "up";
        if (y > 0)
            this.direction = "down";
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

/**
 * Collider component
 * This component is used to detect collisions between entities or gameObjects.
 * It uses the Transform component to get the position and size of the entity.
 * It uses the onCollision method to call the collision function of the other entity.
 */
let Collider$1 = class Collider extends Component {
    constructor(onCollision = () => { }) {
        super();
        this.onCollision = onCollision;
    }
    /**
     * Check if this entity is colliding with another entity
     * @param collider Collider component of the other entity that this entity is colliding with
     * @returns true if this entity is colliding with the other entity, false otherwise
     * Also calls the collisionEnter method of the other entity
     */
    isColliding(collider) {
        const entityCollider = this.object.getComponent(Collider);
        const otherCollider = collider.object.getComponent(Collider);
        if (!entityCollider || !otherCollider)
            return false;
        const t = this.object.getComponent(Transform);
        const otherT = collider.object.getComponent(Transform);
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
        const transform = this.object.getComponent(Transform);
        const otherTransform = collider.object.getComponent(Transform);
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

/**
 * Physics component
 * This component is used to apply physics to the entity or gameObject.
 */
let Physics$2 = class Physics extends Component {
    constructor(physics = []) {
        super();
        this.physics = physics;
    }
    /**
     * Apply physics to the entity or gameObject.
     * This method is used to apply physics to the entity or gameObject.
     */
    applyPhysics() {
        if (this.physics.length > 0) {
            for (const physic of this.physics) {
                if (!physic.object) {
                    physic.setObject(this.object);
                }
                physic.applyPhysics();
            }
        }
    }
};

class Entities extends Component {
    constructor() {
        super();
        this.entities = [];
    }
    setEntities(entities) {
        this.entities = entities;
    }
    getEntities() {
        return this.entities;
    }
    getEntityById(id) {
        return this.entities.find(e => e.id === id);
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    removeEntity(entity) {
        const index = this.entities.findIndex(e => e.id === entity.id);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }
}

class GameObjects extends Component {
    constructor() {
        super();
        this.objects = [];
    }
    setObjects(objects) {
        this.objects = objects;
    }
    getObjects() {
        return this.objects;
    }
    getObjectById(id) {
        return this.objects.find(e => e.id === id);
    }
    addObject(object) {
        this.objects.push(object);
    }
    removeObject(object) {
        const index = this.objects.findIndex(e => e.id === object.id);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
    }
}

let Physics$1 = class Physics {
    constructor() {
        this.entities = [];
        this.gameObjects = [];
    }
    applyPhysics() {
        const scene = GlobalState.getInstance().currentScene;
        if (scene.hasComponent(Entities)) {
            this.entities = scene.getComponent(Entities).getEntities().filter(entity => entity.hasComponent(Physics$2));
        }
        if (scene.hasComponent(GameObjects)) {
            this.gameObjects = scene.getComponent(GameObjects).getObjects().filter(object => object.hasComponent(Physics$2));
        }
        for (const entity of this.entities) {
            const physics = entity.getComponent(Physics$2);
            if (physics) {
                physics.applyPhysics();
            }
        }
        for (const object of this.gameObjects) {
            const physics = object.getComponent(Physics$2);
            if (physics) {
                physics.applyPhysics();
            }
        }
    }
};

/**
 * Renderable component
 * This component is used to render the entity or gameObject with a solid color.
 */
class Renderable extends Component {
    constructor(color = "black") {
        super();
        this.color = color;
    }
}

/**
 * Sprite component
 * This component is used to render the entity or gameObject with a sprite.
 * @param sprite SpriteModel[] array of sprites to be rendered
 * @param speed number speed of the sprite animation
 */
let Sprite$1 = class Sprite extends Component {
    constructor(sprite = [], speed = 0, loop = false) {
        super();
        this.sprite = sprite;
        this.speed = speed;
        this.loop = loop;
        this.currentSpriteIndex = 0;
    }
    bindObject(sprite) {
        sprite.setObject(this.object);
    }
    getCurrentSprite() {
        var _a, _b;
        if (!((_a = this.sprite[this.currentSpriteIndex]) === null || _a === void 0 ? void 0 : _a.object) && this.sprite.length > 0) {
            this.bindObject(this.sprite[this.currentSpriteIndex]);
        }
        return (_b = this.sprite[this.currentSpriteIndex]) !== null && _b !== void 0 ? _b : null;
    }
    nextSprite() {
        this.currentSpriteIndex = this.currentSpriteIndex + 1 >= this.sprite.length ? 0 : this.currentSpriteIndex + 1;
    }
};

/**
 * SpriteAnimationController is a class that implements the ISpriteSheetDrawMethods interface.
 * It is responsible for controlling the animation of sprite sheets in the game engine.
 */
class SpriteAnimationController {
    constructor() {
        this.stopped = true;
        this.index = 0;
    }
    /**
     *
     * @param ctx Canvas context to draw the sprites on
     * @param sprites Sprites list to be drawn
     * This method draws the sprites on the canvas context.
     */
    draw(ctx, sprites) {
        for (const sprite of sprites) {
            if (!sprite.getCurrentSprite())
                continue;
            const { x_offset, initialX, initialY, y_offset, frameWidth, frameHeight, resizeWidth, resizeHeight, currentFrame, image, object } = sprite.getCurrentSprite();
            const transform = object.getComponent(Transform);
            if (!transform)
                continue;
            const { x, y } = transform;
            ctx.drawImage(image, initialX + (currentFrame - 1) * (frameWidth + x_offset), initialY + y_offset, frameWidth, frameHeight, x, y, resizeWidth, resizeHeight);
            const currentSprite = sprite.getCurrentSprite();
            currentSprite.currentFrame = currentSprite.currentFrame + 1 >= currentSprite.frameCount ? 1 : currentSprite.currentFrame + 1;
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

class RenderScene extends SpriteAnimationController {
    constructor() {
        super();
        this.scene = undefined;
        this.canvas = undefined;
    }
    render() {
        this.scene = GlobalState.getInstance().currentScene;
        this.canvas = this.scene.canvas;
        const ctx = this.canvas.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.renderScene(ctx);
            this.renderElements(ctx);
        }
    }
    renderScene(ctx) {
        var _a;
        if ((_a = this.scene) === null || _a === void 0 ? void 0 : _a.hasComponent(Transform)) {
            if (this.scene.hasComponent(Renderable)) {
                const transform = this.scene.getComponent(Transform);
                const renderable = this.scene.getComponent(Renderable);
                ctx.fillStyle = renderable.color;
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
            if (this.scene.hasComponent(Sprite$1)) {
                const sprite = this.scene.getComponent(Sprite$1);
                this.play(ctx, [sprite]);
            }
        }
    }
    renderElements(ctx) {
        var _a, _b;
        let entities = [];
        let gameObjects = [];
        if ((_a = this.scene) === null || _a === void 0 ? void 0 : _a.hasComponent(Entities)) {
            entities = this.scene.getComponent(Entities).getEntities();
        }
        if ((_b = this.scene) === null || _b === void 0 ? void 0 : _b.hasComponent(GameObjects)) {
            gameObjects = this.scene.getComponent(GameObjects).getObjects();
        }
        for (const entity of entities) {
            if (entity.hasComponent(Transform) && entity.hasComponent(Renderable)) {
                const transform = entity.getComponent(Transform);
                const renderable = entity.getComponent(Renderable);
                ctx.fillStyle = renderable.color;
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
            if (entity.hasComponent(Sprite$1)) {
                const sprite = entity.getComponent(Sprite$1);
                this.play(ctx, [sprite]);
            }
        }
        for (const object of gameObjects) {
            if (object.hasComponent(Transform) && object.hasComponent(Renderable)) {
                const transform = object.getComponent(Transform);
                const renderable = object.getComponent(Renderable);
                ctx.fillStyle = renderable.color;
                ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
            }
            if (object.hasComponent(Sprite$1)) {
                const sprite = object.getComponent(Sprite$1);
                this.play(ctx, [sprite]);
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

/**
 * ECS (Engine Controller System) is a singleton class that manages the execution of systems in the engine.
 */
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
    /**
     * Executes all systems in the ECS.
     * This method is called to update all systems in the engine.
     */
    execute() {
        this.systems.forEach(system => system.execute());
    }
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

/**
 * SceneDecorator is a decorator that registers a scene in the global state.
 * It is used to register scenes in the global state when they are created.
 */
class SceneDecorator {
    static registerScene(constructor) {
        const original = constructor;
        const newConstructor = function (...args) {
            const instance = new original(...args);
            Promise.resolve().then(function () { return GlobalState$1; }).then(({ GlobalState }) => {
                const globalState = GlobalState.getInstance();
                const exits = globalState.scenes.find((scene) => scene.id === instance.id);
                if (exits) {
                    return exits;
                }
                globalState.scenes.push(instance);
            });
            return instance;
        };
        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);
        return newConstructor;
    }
}

var Scene_1;
/**
 * Scene is a class that represents a scene in the game engine.
 * It is a base class for all scenes and provides a incremental ID for each scene.
 * It also provides a canvas element for rendering the scene.
 * This class is the first class to be rendered in the game engine and is used to add entities or gameObjects to the scene.
 */
let Scene = Scene_1 = class Scene extends ComponentManager {
    constructor(canvas) {
        super();
        this.id = Scene_1._id++;
        this.canvas = canvas;
    }
};
Scene._id = 0;
Scene = Scene_1 = __decorate([
    SceneDecorator.registerScene,
    __metadata("design:paramtypes", [HTMLCanvasElement])
], Scene);

/**
 * Engine is the main class that manages the game loop and the execution of systems.
 */
class Engine {
    constructor(canvas) {
        this.isRunning = false;
        this.lastTime = 0;
        this.ecs = ECS.getInstance();
        const scene = new Scene(canvas);
        GlobalState.getInstance().scenes.push(scene);
        GlobalState.getInstance().currentScene = scene;
        this.ecs.addSystem(new ColliderSystem(new Collider()));
        this.ecs.addSystem(new PhysicSystem(new Physics$1()));
        this.ecs.addSystem(new InputKeySystem(false, new InputKeyEvent()));
        this.ecs.addSystem(new RenderSystem(new RenderSceneStrategy([
            new RenderScene()
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

/**
 * EntityDecorator is a decorator that registers an entity in the global state.
 * It is used to register entities in the global state when they are created.
 */
class EntityDecorator {
    static registerEntity(constructor) {
        const original = constructor;
        const newConstructor = function (...args) {
            const instance = new original(...args);
            Promise.resolve().then(function () { return GlobalState$1; }).then(({ GlobalState }) => {
                const globalState = GlobalState.getInstance();
                const exits = globalState.entities.find((entity) => entity.id === instance.id);
                if (exits) {
                    return exits;
                }
                globalState.entities.push(instance);
            });
            return instance;
        };
        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);
        return newConstructor;
    }
}

var Entity_1;
/**
 * Entity is a class that represents an entity in the game engine.
 * It is a base class for all entities and provides a incremental ID for each entity.
 */
let Entity = Entity_1 = class Entity extends ComponentManager {
    constructor() {
        super();
        this.id = Entity_1._id++;
    }
};
Entity._id = 0;
Entity = Entity_1 = __decorate([
    EntityDecorator.registerEntity,
    __metadata("design:paramtypes", [])
], Entity);

/**
 * ObjectDecorator is a decorator that registers an object in the global state.
 * It is used to register objects in the global state when they are created.
 */
class ObjectDecorator {
    static registerObject(constructor) {
        const original = constructor;
        const newConstructor = function (...args) {
            const instance = new original(...args);
            Promise.resolve().then(function () { return GlobalState$1; }).then(({ GlobalState }) => {
                const globalState = GlobalState.getInstance();
                const exits = globalState.objects.find((object) => object.id === instance.id);
                if (exits) {
                    return exits;
                }
                globalState.objects.push(instance);
            });
            return instance;
        };
        newConstructor.prototype = original.prototype;
        Object.assign(newConstructor, original);
        return newConstructor;
    }
}

var GameObject_1;
/**
 * GameObject is a class that represents an gameObject in the game engine.
 * It is a base class for all entities and provides a incremental ID for each gameObject.
 */
let GameObject = GameObject_1 = class GameObject extends ComponentManager {
    constructor() {
        super();
        this.id = GameObject_1._id++;
    }
};
GameObject._id = 0;
GameObject = GameObject_1 = __decorate([
    ObjectDecorator.registerObject,
    __metadata("design:paramtypes", [])
], GameObject);

/**
 * Sprite is a class that represents a sprite sheet in the game engine.
 * It is a base class for all sprite sheets and provides a incremental ID for each sprite sheet.
 */
class Sprite extends ObjectBinder {
    constructor(imageSrc, frameWidth, frameHeight, resizeWidth, resizeHeight, frameCount, x, y, x_offset, y_offset, initialX, initialY) {
        super();
        this.image = new Image();
        this.initialX = 0;
        this.initialY = 0;
        this.imageSrc = imageSrc;
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
        this.loadImage();
    }
    /**
     * This method is used to load the image for the sprite sheet.
     */
    loadImage() {
        this.image.src = this.imageSrc;
        this.image.onload = () => {
            this.image = this.image;
        };
    }
}

/**
 * Physics is a class that represents a physics engine in the game engine.
 * Provides a abstract method to apply physics to an entity or gameObject.
 */
class Physics extends ObjectBinder {
    constructor() {
        super(...arguments);
        this.apply = true;
        this.type = "physics";
    }
}

/**
 * * Gravity class to apply gravity to an object (the object is a reference to an entity or a game object).
 * * The gravity is applied to the object if it is not colliding with any other object or entity.
 */
class Gravity extends Physics {
    constructor(gravity) {
        super();
        this.type = "gravity";
        this.gravity = 9.8;
        this.scene = GlobalState.getInstance().currentScene;
        this.stop = false;
        this.gravity = gravity !== null && gravity !== void 0 ? gravity : this.gravity;
    }
    applyPhysics() {
        const transform = this.object.getComponent(Transform);
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
            transform.translate("down");
        }
    }
    checkPossibleCollision(transform) {
        let entities = [];
        let objects = [];
        if (this.scene.hasComponent(Entities)) {
            entities = this.scene.getComponent(Entities).getEntities();
        }
        if (this.scene.hasComponent(GameObjects)) {
            objects = this.scene.getComponent(GameObjects).getObjects();
        }
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
        let entities = [];
        let objects = [];
        if (this.scene.hasComponent(Entities)) {
            entities = this.scene.getComponent(Entities).getEntities();
        }
        if (this.scene.hasComponent(GameObjects)) {
            objects = this.scene.getComponent(GameObjects).getObjects();
        }
        const entity = entities.find(e => {
            const t = e.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                e.id !== this.object.id);
        });
        const object = objects.find(o => {
            const t = o.getComponent(Transform);
            return (transform.x < t.x + t.width &&
                transform.x + transform.width > t.x &&
                o.id !== this.object.id);
        });
        return entity === undefined && object === undefined;
    }
}

/**
 * * Jump class to apply jump to an object (the object is a reference to an entity or a game object).
 * * The jump is applied to the object if it is not colliding with any other object or entity or if it is on the ground.
 */
class Jump extends Physics {
    constructor(jumpSpeed) {
        super();
        this.type = "jump";
        this.scene = GlobalState.getInstance().currentScene;
        this.movementTimeout = null;
        this.apply = false;
        this.stop = true;
        this.jumpSpeed = 10;
        this.jumpSpeed = jumpSpeed !== null && jumpSpeed !== void 0 ? jumpSpeed : this.jumpSpeed;
    }
    applyPhysics() {
        const transform = this.object.getComponent(Transform);
        if (!transform || !this.apply)
            return;
        const hasGravity = this.checkIfHasGravity();
        if (!hasGravity)
            return;
        const gravity = this.object.getComponent(Physics$2).physics.find(p => p.type === "gravity");
        if (!gravity.stop && this.isOnGround(transform)) {
            gravity.stop = true;
            this.stop = false;
            this.resetTimeout(this.jumpSpeed, gravity);
        }
        if (!this.stop && this.checkIfCanJump(transform)) {
            transform.translate("up");
        }
        else {
            this.apply = false;
            this.stop = true;
            gravity.stop = false;
        }
    }
    checkIfHasGravity() {
        var _a;
        const physics = this.object.getComponent(Physics$2);
        return (_a = physics === null || physics === void 0 ? void 0 : physics.physics.some(p => p.type === "gravity")) !== null && _a !== void 0 ? _a : false;
    }
    isOnGround(transform) {
        let entity;
        let object;
        if (this.scene.hasComponent(Entities)) {
            entity = this.scene.getComponent(Entities).getEntities().find(e => {
                const t = e.getComponent(Transform);
                return (transform.x < t.x + t.width &&
                    transform.x + transform.width > t.x &&
                    transform.y + transform.height === t.y &&
                    e !== this.object);
            });
        }
        if (this.scene.hasComponent(GameObjects)) {
            object = this.scene.getComponent(GameObjects).getObjects().find(o => {
                const t = o.getComponent(Transform);
                return (transform.x < t.x + t.width &&
                    transform.x + transform.width > t.x &&
                    transform.y + transform.height === t.y &&
                    o !== this.object);
            });
        }
        return entity !== undefined || object !== undefined;
    }
    checkIfCanJump(transform) {
        let entities = [];
        let objects = [];
        if (this.scene.hasComponent(Entities)) {
            entities = this.scene.getComponent(Entities).getEntities();
        }
        if (this.scene.hasComponent(GameObjects)) {
            objects = this.scene.getComponent(GameObjects).getObjects();
        }
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
                transform.y === t.y + t.height);
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

export { Collider$1 as Collider, Component, ECS, Engine, Entities, Entity, GameObject, GameObjects, GlobalState, Gravity, InputKeys, Jump, Physics, Physics$2 as PhysicsComponent, Renderable, Scene, Sprite, SpriteAnimationController, Sprite$1 as SpriteComponent, System, Transform };
//# sourceMappingURL=index.js.map
