<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore();

</script>

<template>
  <div class="tile">
    tile {{  counter.count }}
    <button @click="counter.increment">more!</button>
  </div>
</template>

<style scoped>

</style>
