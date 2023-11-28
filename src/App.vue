<script setup lang="ts">
import Tile from '@/components/Tile.vue';
import { useRumDataStore } from '@/stores/rumdata';

const rumData = useRumDataStore()
</script>

<template>
  <Tile/>
</template>

<style scoped>

</style>
