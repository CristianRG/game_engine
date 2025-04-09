# Welcome to @cristianrg/game_engine

## What is this package?

A game engine written in TypeScript and transpiled to JavaScript.  
It includes features that allow you to create games directly from the browser in a simple and easy way, thanks to the flexibility to modify or scale the source code.

Here is a quick and simple example using TypeScript on how to use it in your project:

```ts
import { Engine, Entity, Transform, Renderable, Entities, GlobalState } 
from "@cristianrg/game_engine";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const engine = new Engine(canvas);
const scene = GlobalState.getInstance().currentScene!;
const entity = new Entity().addComponent(new Transform(50, 50, 100, 200))
.addComponent(new Renderable("red"));

scene.addComponent(new Entities());
scene.getComponent(Entities)!.addEntity(entity);

engine.start();
```

## Live Example
<ClientOnly>
  <GameEnginePlayground />
</ClientOnly>
The code above demonstrates the core features of the engine:

* **Engine**: The main class responsible for the engine's functionality.
* **GlobalState**: A class instantiated when the engine starts. It allows you to retrieve some instantiated objects.
* **Scene**: This class is used as a reference when rendering elements on the canvas.
* **Entity**: This class is used to create entities within the engine. An example could be a `Player`