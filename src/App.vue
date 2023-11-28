<script setup lang="ts">
import Tile from '@/components/Tile.vue'
import { useRumDataStore, Dimension } from '@/stores/rumdata'
import { computed } from 'vue'

const rumData = useRumDataStore()

const filters = computed(() => {
  const unique = [...new Set(rumData.filters.map((f) => f.dimension))]

  return unique.map((d) => {
    return {
      dimension: d,
      values: rumData.filters.filter((f) => f.dimension === d).map((f) => f.name)
    }
  })
})
</script>

<template>
  <div class="filters">
    <template v-for="(filter, i) in filters" :key="filter.name">
      <div v-if="filter.values.length > 1">(</div>
      <template v-for="(value, j) in filter.values" :key="value">
        <div class="filter">{{ filter.dimension }}: {{ value }}</div>
        <div v-if="j < filter.values.length - 1" class="or">or</div>
      </template>
      <div v-if="i < filters.length - 1" class="or">and</div>
      <div v-if="filter.values.length > 1">)</div>
    </template>
  </div>
  <div class="container">
    <Tile :dimension="Dimension.page" title="Pages" />
    <Tile :dimension="Dimension.deviceType" title="Device types" />
    <Tile :dimension="Dimension.country" title="Countries" />
    <Tile :dimension="Dimension.browser" title="Browsers" />
    <Tile :dimension="Dimension.operatingSystem" title="Operating systems" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 80px;
  width: 100vw;
  max-width: 2256px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.or {
  opacity: 0.5;
}
</style>
