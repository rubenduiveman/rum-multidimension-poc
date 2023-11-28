<script setup lang="ts">
import Tile from '@/components/Tile.vue';
import { useRumDataStore, Dimension } from '@/stores/rumdata';

const rumData = useRumDataStore()
</script>

<template>
  {{  rumData.filters }}
  <div class="container">
    <Tile :dimension="Dimension.page" title="Pages"/>
    <Tile :dimension="Dimension.deviceType" title="Device types"/>
    <Tile :dimension="Dimension.country" title="Countries"/>
    <Tile :dimension="Dimension.browser" title="Browsers"/>
    <Tile :dimension="Dimension.operatingSystem" title="Operating systems"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 80px;
  width: 100vw;
}
</style>
