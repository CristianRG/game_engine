# Quick Start 🚀

## What will we do?

* Using your favorite framework, for example: **Vue**, **React**, etc., you will create a new application.
* You will install the npm package using your favorite tool like **npm** or **pnpm**.
* You will create the entry point for your video game and add an entity.
* The entity will use a color of your choice and will be able to move.

## Installation

To install it in your project, use:

npm
```bash
npm i -D @cristianrg/game_engine
```
pnpm
```bash
pnpm add -D @cristianrg/game_engine
```

## Creating your web application

Vite
```bash
pnpm create vite@latest
```

When creating your application, it will ask you which framework you want to use. For this example, we will use `Vanilla` with `Typescript`.

## Creating the video game

In the `src` folder, create a file named `game.ts`.
Once created, in your `game.ts` file, do the following:

```ts
import 
{ Engine, GlobalState, Entity, Entities, Transform, Renderable, InputKeys } 
from "@cristianrg/game_engine";

export const setupGame = (canvas: HTMLCanvasElement) => {
    // create engine and get the current scene from the global state
    const engine = new Engine(canvas);
    const state = GlobalState.getInstance();
    const scene = state.currentScene!;

    // create player and add the main components
    const player = new Entity().addComponent(new Transform(50, 50, 100, 100))
    .addComponent(new Renderable("red"));
    // add Entities component to scene and add player to it
    scene.addComponent(new Entities())
    scene.getComponent(Entities)!.addEntity(player);

    // create input component and add it to player
    const input = new InputKeys(new Map([
        ["a", { event: () => player.getComponent(Transform)!.x += -5 }],
        ["d", { event: () => player.getComponent(Transform)!.x += 5 }],
        ["w", { event: () => player.getComponent(Transform)!.y += -5 }],
        ["s", { event: () => player.getComponent(Transform)!.y += 5 }],
    ]))
    player.addComponent(input);

    engine.start();
}
```

In the file named `main.ts` located in `src`, replace the main logic with the following:

```ts
import './style.css'

import { setupGame } from './game.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="display: flex; flex-direction: column; align-items: center;">
    <canvas style="background: #1a1a1a; border-radius: 8px;" id="canvas" width="800" height="600"></canvas>
  </div>
`

setupGame(document.querySelector<HTMLCanvasElement>('#canvas')!)
```

Remember to import `setupGame` from `game.ts`.

## Result
To move, remember to use the keys "a", "w", "s", and "d".

<QuickStart />