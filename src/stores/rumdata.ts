import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import data from './data.json'
import { filtered } from '@/stores/helpers/rumDataFilterHelper'

export interface DataSet {
  name: string
  count: number
}

export interface Filter {
  dimension: Dimension
  name: string
}

export enum Dimension {
  page = 'page',
  deviceType = 'deviceType',
  country = 'country',
  browser = 'browser',
  operatingSystem = 'operatingSystem'
}

export const useRumDataStore = defineStore('rum', () => {
  const filters = ref<Filter[]>([])
  const loading = ref<boolean>(false);

  const dataSet = computed(() => ({
    [Dimension.browser]: computed(() => filtered(Dimension.browser, filters.value)),
    [Dimension.country]: computed(() => filtered(Dimension.country, filters.value)),
    [Dimension.deviceType]: computed(() => filtered(Dimension.deviceType, filters.value)),
    [Dimension.operatingSystem]: computed(() => filtered(Dimension.operatingSystem, filters.value)),
    [Dimension.page]: computed(() => filtered(Dimension.page, filters.value))
  }))

  function addFilter(filter: Filter) {
    filters.value.push(filter)
  }

  function removeFilter(filter: Filter) {
    filters.value = filters.value.filter(
      (f) => !(f.dimension === filter.dimension && f.name === filter.name)
    )
  }

  function hasFilter(filter: Filter) {
    return filters.value.find((f) => f.dimension === filter.dimension && f.name === filter.name)
  }

  function toggleFilter(filter: Filter) {
    loading.value = true;
    setTimeout(() => {
      if (hasFilter(filter)) {
        removeFilter(filter)
      } else {
        addFilter(filter)
      }
      loading.value = false;
    }, 2300);
  }

  return {
    data: dataSet,
    filters,
    loading,
    addFilter,
    hasFilter,
    removeFilter,
    toggleFilter
  }
})
