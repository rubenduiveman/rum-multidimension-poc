<script setup lang="ts">
import Tile from '@/components/Tile.vue';
import { useRumDataStore } from '@/stores/rumdata';

const rumData = useRumDataStore()
</script>

<template>
  <div class="container">
    <Tile :data="rumData.pages" title="Pages"/>
    <Tile :data="rumData.deviceTypes" title="Device types"/>
    <Tile :data="rumData.countries" title="Countries"/>
    <Tile :data="rumData.browsers" title="Browsers"/>
    <Tile :data="rumData.operatingSystems" title="Operating systems"/>
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
