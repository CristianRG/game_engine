<script setup lang="ts">
import { Engine, GlobalState, Entity, Entities, Transform, Renderable, InputKeys } from "@cristianrg/game_engine";
import { onMounted } from "vue";

onMounted(() => {
    // create engine and get the current scene from the global state
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    if (!canvas) throw new Error("Canvas not found");
    const engine = new Engine(canvas);
    const state = GlobalState.getInstance();
    const scene = state.currentScene!;

    // create player and add the main components
    const player = new Entity().addComponent(new Transform(50, 50, 100, 100)).addComponent(new Renderable("red"));
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
})

</script>

<template>
    <div>
        <canvas ref="canvas" width="679" height="300" />
    </div>
</template>

<style scoped>
canvas {
    max-width: 100%;
    background: #1a1a1a;
    border-radius: 8px;
}
</style>