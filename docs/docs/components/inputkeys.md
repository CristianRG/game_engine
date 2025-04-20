# InputKeys

The `InputKeys` component allows you to listen for keydown events and trigger specific actions using a hashmap of keys and events. This component can be added to Entities or GameObjects to handle keyboard input effectively.

## Properties

- **hashEvents**: `Map<string, IEvent>`  
  A hashmap where the key is a string representing the key to listen for, and the value is an `IEvent` object that defines the action to be triggered when the key is pressed. Default is an empty `Map`.

## Methods

### `trigger(key: string): void`

Triggers the event associated with the specified key. If no event is mapped to the key, nothing happens.

## Example

```ts
import { InputKeys } from "@cristianrg/game_engine";

const jumpEvent = {
    event: () => console.log("Jump!")
};

const inputKeys = new InputKeys(new Map([
    ["Space", jumpEvent]
]));

// Now just press "Space" to execute event. 
```

## Usage

The `InputKeys` component is designed to be added to Entities or GameObjects to handle keyboard input. By mapping keys to specific events, you can easily define custom behaviors for your game objects.

For example, you can use this component to handle player movement, actions, or other interactions triggered by keyboard input.