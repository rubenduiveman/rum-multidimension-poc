import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import data from './data.json'

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

export const useRumDataStore = defineStore('counter', () => {
  const pages = computed(() => {
    const unique = [...new Set(data.map((m) => m.Page))]
    return unique.map((u) => ({
      name: u,
      count: data.filter((fd) => fd.Page === u).length
    })) as DataSet[]
  })

  const deviceTypes = computed(() => {
    const unique = [...new Set(data.map((m) => m.Devicetype))]
    return unique.map((u) => ({
      name: u,
      count: data.filter((fd) => fd.Devicetype === u).length
    })) as DataSet[]
  })

  const countries = computed(() => {
    const unique = [...new Set(data.map((m) => m.Country))]
    return unique.map((u) => ({
      name: u,
      count: data.filter((fd) => fd.Country === u).length
    })) as DataSet[]
  })

  const browsers = computed(() => {
    const unique = [...new Set(data.map((m) => m.Browser))]
    return unique.map((u) => ({
      name: u,
      count: data.filter((fd) => fd.Browser === u).length
    })) as DataSet[]
  })

  const operatingSystems = computed(() => {
    const unique = [...new Set(data.map((m) => m.OperatingSystem))]
    return unique.map((u) => ({
      name: u,
      count: data.filter((fd) => fd.OperatingSystem === u).length
    })) as DataSet[]
  })

  // --

  const filters = ref<Filter[]>([])

  const filteredPages = computed(() => {
    // ignore page filters
    const filteredData =
      filters.value.filter((f) => f.dimension !== Dimension.page).length === 0
        ? data
        : data.filter((item) => {
            for (let i = 0; i < filters.value.length; i++) {
              const f = filters.value[i]
              switch (f.dimension) {
                case Dimension.browser:
                  return item.Browser === f.name
                case Dimension.country:
                  return item.Country === f.name
                case Dimension.deviceType:
                  return item.Devicetype === f.name
                case Dimension.operatingSystem:
                  return item.OperatingSystem === f.name
              }
            }
          })

    const unique = [...new Set(filteredData.map((m) => m.Page))]
    const result = unique.map((u) => ({
      name: u,
      count: filteredData.filter((fd) => fd.Page === u).length
    })) as DataSet[]

    return result.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  })

  const filteredDeviceTypes = computed(() => {
    // ignore device type filters
    const filteredData =
      filters.value.filter((f) => f.dimension !== Dimension.deviceType).length === 0
        ? data
        : data.filter((item) => {
            for (let i = 0; i < filters.value.length; i++) {
              const f = filters.value[i]
              switch (f.dimension) {
                case Dimension.browser:
                  return item.Browser === f.name
                case Dimension.country:
                  return item.Country === f.name
                case Dimension.page:
                  return item.Page === f.name
                case Dimension.operatingSystem:
                  return item.OperatingSystem === f.name
              }
            }
          })

    const unique = [...new Set(filteredData.map((m) => m.Devicetype))]
    const result = unique.map((u) => ({
      name: u,
      count: filteredData.filter((fd) => fd.Devicetype === u).length
    })) as DataSet[]

    return result.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  })

  const filteredCountries = computed(() => {
    // ignore country filters
    const filteredData =
      filters.value.filter((f) => f.dimension !== Dimension.country).length === 0
        ? data
        : data.filter((item) => {
            for (let i = 0; i < filters.value.length; i++) {
              const f = filters.value[i]
              switch (f.dimension) {
                case Dimension.browser:
                  return item.Browser === f.name
                case Dimension.deviceType:
                  return item.Devicetype === f.name
                case Dimension.page:
                  return item.Page === f.name
                case Dimension.operatingSystem:
                  return item.OperatingSystem === f.name
              }
            }
          })

    const unique = [...new Set(filteredData.map((m) => m.Country))]
    const result = unique.map((u) => ({
      name: u,
      count: filteredData.filter((fd) => fd.Country === u).length
    })) as DataSet[]

    return result.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  })

  const filteredBrowsers = computed(() => {
    // ignore browser filters
    const filteredData =
      filters.value.filter((f) => f.dimension !== Dimension.browser).length === 0
        ? data
        : data.filter((item) => {
            for (let i = 0; i < filters.value.length; i++) {
              const f = filters.value[i]
              switch (f.dimension) {
                case Dimension.deviceType:
                  return item.Devicetype === f.name
                case Dimension.country:
                  return item.Country === f.name
                case Dimension.page:
                  return item.Page === f.name
                case Dimension.operatingSystem:
                  return item.OperatingSystem === f.name
              }
            }
          })

    const unique = [...new Set(filteredData.map((m) => m.Browser))]
    const result = unique.map((u) => ({
      name: u,
      count: filteredData.filter((fd) => fd.Browser === u).length
    })) as DataSet[]

    return result.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  })

  const filteredOperatingSystems = computed(() => {
    // ignore operating system filters
    const filteredData =
      filters.value.filter((f) => f.dimension !== Dimension.operatingSystem).length === 0
        ? data
        : data.filter((item) => {
            for (let i = 0; i < filters.value.length; i++) {
              const f = filters.value[i]
              switch (f.dimension) {
                case Dimension.browser:
                  return item.Browser === f.name
                case Dimension.country:
                  return item.Country === f.name
                case Dimension.page:
                  return item.Page === f.name
                case Dimension.deviceType:
                  return item.Devicetype === f.name
              }
            }
          })

    const unique = [...new Set(filteredData.map((m) => m.OperatingSystem))]
    const result = unique.map((u) => ({
      name: u,
      count: filteredData.filter((fd) => fd.OperatingSystem === u).length
    })) as DataSet[]

    return result.sort(function (a, b) {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  })

  const dataSet = computed(() => ({
    [Dimension.browser]: {
      all: browsers,
      filtered: filteredBrowsers
    },
    [Dimension.country]: {
      all: countries,
      filtered: filteredCountries
    },
    [Dimension.deviceType]: {
      all: deviceTypes,
      filtered: filteredDeviceTypes
    },
    [Dimension.operatingSystem]: {
      all: operatingSystems,
      filtered: filteredOperatingSystems
    },
    [Dimension.page]: {
      all: pages,
      filtered: filteredPages
    }
  }))

  // --

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
    if (hasFilter(filter)) {
      removeFilter(filter)
    } else {
      addFilter(filter)
    }
  }

  return {
    data: dataSet,
    filters,
    addFilter,
    hasFilter,
    removeFilter,
    toggleFilter
  }
})
