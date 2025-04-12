# System

Systems are classes that run within the main loop of the game engine. These systems allow you to extend and create functionalities or behaviors for the engine.

## Basic example

To create a system, you only need to create a new class that inherits from the abstract `System` class and integrate the functionalities you want to be executed within the `execute()` method.

```ts
import { System } from "@cristianrg/game_engine";

class TestSystem extends System {

    // Implement whatever methods you need for your system
    execute(): void {
        // Say hello every second
        if (Date.now() % 1000 === 0) {
            console.log("Hello from TestSystem!");
        }
    }
}
```

In the code above, we created a system using the abstract `System` class that will display the message **"Hello world"** every second. To add it to the engine's logic, we need to use the `ECS` class, which is responsible for running all the systems.

```ts
import { ECS } from "@cristianrg/game_engine";

const testSystem = new TestSystem();
const ecs = ECS.getInstance();
ecs.addSystem(testSystem);
```

And that's it! Now your system will be executed by the engine. The `execute()` method runs with each iteration of the `loop`.
