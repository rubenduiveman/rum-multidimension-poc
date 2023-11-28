import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import data from './data.json'

export interface DataSet {
  name: string
  count: number
}

export const useRumDataStore = defineStore('counter', () => {
  const filteredData = computed(() => {
    return data
  })

  const pages = computed(() => {
    const unique = [...new Set(filteredData.value.map((m) => m.Page))]
    return unique.map((u) => ({
      name: u,
      count: filteredData.value.filter((fd) => fd.Page === u).length
    })) as DataSet[]
  })

  const deviceTypes = computed(() => {
    const unique = [...new Set(filteredData.value.map((m) => m.Devicetype))]
    return unique.map((u) => ({
      name: u,
      count: filteredData.value.filter((fd) => fd.Devicetype === u).length
    })) as DataSet[]
  })

  const countries = computed(() => {
    const unique = [...new Set(filteredData.value.map((m) => m.Country))]
    return unique.map((u) => ({
      name: u,
      count: filteredData.value.filter((fd) => fd.Country === u).length
    })) as DataSet[]
  })

  const browsers = computed(() => {
    const unique = [...new Set(filteredData.value.map((m) => m.Browser))]
    return unique.map((u) => ({
      name: u,
      count: filteredData.value.filter((fd) => fd.Browser === u).length
    })) as DataSet[]
  })

  const operatingSystems = computed(() => {
    const unique = [...new Set(filteredData.value.map((m) => m.OperatingSystem))]
    return unique.map((u) => ({
      name: u,
      count: filteredData.value.filter((fd) => fd.OperatingSystem === u).length
    })) as DataSet[]
  })

  return { countries, pages, deviceTypes, browsers, operatingSystems }
})
