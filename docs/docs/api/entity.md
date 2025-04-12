# Entity

In the context of video game development, an entity can be defined as a basic container or identifier that represents something in the game (such as a character, item, or light) but does not contain logic or data by itself.

In this engine, entities are a class that inherits from a parent class called `ComponentManager`, which contains methods that allow the `Entity` class to add components that extend functionality.

## Basic example

To create an entity, you only need to inherit from or directly create an instance of the `Entity` class. In this case, we will create a class called `Enemy`.

```ts
import { Entity } from "@cristianrg/game_engine";

class Enemy extends Entity {
    constructor() {
        super();
    }
}
```

As mentioned earlier, this class can add components that will extend its functionality.

```ts
import { Collider } from "@cristianrg/game_engine";

const enemy = new Enemy();
enemy.addComponent(new Collider());
```