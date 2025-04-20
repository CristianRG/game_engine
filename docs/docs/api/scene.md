# Scene

A scene is a class responsible for encapsulating entities, gameObjects, and any other properties or behaviors that need to be rendered. When the engine is initialized, it creates a scene and uses it as a default scene, which is referenced in the `ECS` class as `currentScene`.

Like other classes mentioned earlier, a `ComponentManager` is used to add features or behaviors that extend the functionality of scenes. **(This feature may change in future updates)**

## Basic Example

To create a scene, you only need to create an instance of the `Scene` class or extend its functionalities in a child class.

```ts
import { Scene } from "@cristianrg/game_engine";

// You need to pass a canvas element as a parameter
const testScene = new Scene(canvas);
```
