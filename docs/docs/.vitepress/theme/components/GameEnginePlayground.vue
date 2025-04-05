<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Engine, Entity, Transform, Renderable, Entities, GlobalState } from '@cristianrg/game_engine'

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvas.value) return

  const engine = new Engine(canvas.value)
  const scene = GlobalState.getInstance().currentScene!

  const entity = new Entity()
    .addComponent(new Transform(50, 50, 100, 200))
    .addComponent(new Renderable('red'))

  scene.addComponent(new Entities())
  scene.getComponent(Entities)!.addEntity(entity)

  engine.start()
})
</script>

<template>
  <div>
    <canvas ref="canvas" width="679" height="300"/>
  </div>
</template>

<style scoped>
canvas {
  max-width: 100%;
  background: #1a1a1a;
  border-radius: 8px;
}
</style>