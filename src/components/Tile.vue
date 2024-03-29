<script setup lang="ts">
import { computed } from 'vue'
import { useRumDataStore, Dimension } from '@/stores/rumdata'

const props = defineProps<{ dimension: Dimension; title: string }>()

const rumData = useRumDataStore()
const data = rumData.data[props.dimension]

const total = computed(() => {
  return data.value.reduce((acc, curr) => acc + curr.count, 0)
})
</script>

<template>
  <section class="tile" :class="{ loading: rumData.loading }">
    <header>{{ props.title }}</header>
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Count</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="rumData.hasFilter({ dimension, name: item.name }) ? 'active' : undefined"
          v-for="item in data"
          :key="item.name"
          @click="
            () => {
              if (!rumData.loading) {
                rumData.toggleFilter({ dimension, name: item.name })
              }
            }
          "
        >
          <td>{{ item.name }}</td>
          <td>{{ item.count }}</td>
          <td></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>{{ total }}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<style scoped>
.tile {
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 400px;
  height: min-content;
  overflow: hidden;

  * {
    cursor: default;
  }
}

header {
  padding: 8px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 4px 8px;
  white-space: nowrap;
}

td:nth-child(2) {
  text-align: right;
}

tr.active {
  background-color: #89ddff;
}

.tile:not(.loading) {
  tbody tr {
    cursor: pointer;
  }

  tbody tr:hover {
    background-color: #dcf8ff;
  }

  tr.active:hover {
    background-color: #74c6e7;
  }
}

td:nth-child(3) {
  width: 30%;
}

thead tr,
tfoot tr {
  background-color: #f2f2f2;
}

thead td,
tfoot td {
  font-weight: 500;
  color: #666;
}

.tile.loading {

  * {
    cursor: wait;
  }

  tbody,
  tfoot {
    opacity: 0.4;
  }
}
</style>
