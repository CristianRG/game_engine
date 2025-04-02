import { Component } from "../../core/models/Component";
import { IEvent } from "../../core/interfaces/IEvent";
/**
 * InputKeys is a component that listens for keydown events and triggers events when a key is pressed.
 * Using `Event` class to store the event to be triggered when the key is pressed.
 */
export declare class InputKeys extends Component {
    hashEvents: Map<string, IEvent>;
    constructor(hashEvents?: Map<string, IEvent>);
    trigger(key: string): void;
}
