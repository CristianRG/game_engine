# GameObject

A game object can be described as a more concrete representation that includes properties, behaviors, or a hierarchy. However, to facilitate their construction and allow functionalities to be shared between `entities` and `objects`, they have also been given the ability to inherit from the `ComponentManager` class.

## Basic example

To create an object, it is only necessary to inherit from the `GameObject` class. In this example, we will create a `Player` class that can move upward using the `w` key.

```ts
import { GameObject } from "@cristianrg/game_engine";

class Player extends GameObject {
    constructor() {
        super();
    }
}
```

Now we will use two components already created in the engine.

```ts
const player = new Player();
player.addComponent(new Transform(0, 0, 50, 50));
const input = new InputKeys(new Map([
    ["w", {event: () => player.getComponent(Transform)!.y -= 1}],
]));
player.addComponent(input);
```

This will allow the player to move upward by pressing the `w` key.