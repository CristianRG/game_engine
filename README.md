# Introduction

A game engine written in TypeScript and transpiled to JavaScript.
It includes features that allow you to create games directly from the browser in a simple and easy way, thanks to the flexibility to modify or scale the source code.

## Quick start

### Installation

To install it in your project, use:

npm
```bash
npm i -D @cristianrg/game_engine
```
pnpm
```bash
pnpm add -D @cristianrg/game_engine
```

### Usage

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

If everything went well, you should see the following:
![quick start example](https://cristianrg.github.io/game_engine/quickstart.png)
