import { Component } from "../../core/models/Component";
import { IEvent } from "../../core/interfaces/IEvent";
/**
 * InputKeys is a component that listens for keydown events and triggers events when a key is pressed. 
 * Using `Event` class to store the event to be triggered when the key is pressed.
 */
export class InputKeys extends Component {
    constructor(
        public hashEvents: Map<string, IEvent> = new Map(), 
    ){ 
        super();
    }

    public trigger(key: string): void{
        this.hashEvents.get(key)?.event();
    }
}