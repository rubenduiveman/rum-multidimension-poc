<script setup lang="ts">
import { type DataSet } from '@/stores/rumdata'
import { computed } from 'vue';
const props = defineProps<{ data: DataSet[]; title: string }>()

const total = computed(() => {
  return props.data.reduce(
    (acc, curr) => acc + curr.count, 0
  )
})
</script>

<template>
  <section class="tile">
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
        <tr v-for="item in props.data" :key="item.name">
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

td:nth-child(3) {
  width: 30%;
}

thead tr, tfoot tr {
  background-color: #f2f2f2;
}

thead td, tfoot td {
  font-weight: 500;
  color: #666;
}
</style>
