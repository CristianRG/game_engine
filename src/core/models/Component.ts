import { IComponent } from "../interfaces/IComponent";
import { ObjectBinder } from "./Injector";
import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
/**
 * Base class for all components in the engine. Components are used to add functionality to entities and game objects.
 */
export abstract class Component extends ObjectBinder<Entity | GameObject> implements IComponent {}