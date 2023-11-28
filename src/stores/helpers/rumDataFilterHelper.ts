import { Dimension } from '@/stores/rumdata'
import type { Filter, DataSet } from '@/stores/rumdata'

import data from './../data.json'

function filterData(dimension: Dimension, filters: Filter[]) {
  // const unique = [...new Set(rumData.filters.map((f) => f.dimension))]
  
  if (filters.filter((f) => f.dimension !== dimension).length === 0) {
    return data
  }


  return data.filter((item) => {
    let itemMatches = true
    filters.forEach((f) => {
      if (!itemMatches) {
        return
      }
      switch (f.dimension) {
        case Dimension.deviceType:
          if (dimension === Dimension.deviceType) {
            return (itemMatches = true)
          }
          return (itemMatches = item.Devicetype === f.name)
        case Dimension.country:
          if (dimension === Dimension.country) {
            return (itemMatches = true)
          }
          return (itemMatches = item.Country === f.name)
        case Dimension.page:
          if (dimension === Dimension.page) {
            return (itemMatches = true)
          }
          return (itemMatches = item.Page === f.name)
        case Dimension.operatingSystem:
          if (dimension === Dimension.operatingSystem) {
            return (itemMatches = true)
          }
          return (itemMatches = item.OperatingSystem === f.name)
        case Dimension.browser:
          if (dimension === Dimension.browser) {
            return (itemMatches = true)
          }
          return (itemMatches = item.Browser === f.name)
      }
    })

    return itemMatches
  })
}

function mapPerDimension(item: any, dimension: Dimension) {
  switch (dimension) {
    case Dimension.browser:
      return item.Browser;
    case Dimension.country:
      return item.Country;
    case Dimension.deviceType:
      return item.Devicetype;
    case Dimension.operatingSystem:
      return item.OperatingSystem;
    case Dimension.page:
      return item.Page;
  }
}

function filterPerDimension(item: any, needle: string, dimension: Dimension) {
  switch (dimension) {
    case Dimension.browser:
      return item.Browser === needle
    case Dimension.country:
      return item.Country === needle
    case Dimension.deviceType:
      return item.Devicetype === needle
    case Dimension.operatingSystem:
      return item.OperatingSystem === needle
    case Dimension.page:
      return item.Page === needle
  }
}

export function filtered(dimension: Dimension, filters: Filter[]) {
  const filteredData = filterData(dimension, filters)
  
  const unique = [...new Set(filteredData.map((m) => mapPerDimension(m, dimension)))]
  const result = unique.map((u) => ({
    name: u,
    count: filteredData.filter((m) => filterPerDimension(m, u, dimension)).length
  })) as DataSet[]

  return result.sort(function (a, b) {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1
    }
    return 0
  })
}
