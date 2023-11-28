import { Dimension } from '@/stores/rumdata'
import type { Filter, DataSet } from '@/stores/rumdata'

import data from './../data.json'

function prepareFilters(filters: Filter[]) {
  const unique = [...new Set(filters.map((f) => f.dimension))]
  return unique.map((d) => ({
    dimension: d,
    values: filters.filter((f) => f.dimension === d).map((f) => f.name)
  }))
}

function itemIsFilterItem(
  dimension: Dimension,
  item: any,
  filters: Filter[]
) {
  return !!filters.find(
    (f) => f.name === valueForDimension(item, dimension) && f.dimension === dimension
  )
}

function doFilterData(dimension: Dimension, filters: Filter[]) {
  if (filters.filter((f) => f.dimension !== dimension).length === 0) {
    return data
  }

  // match one in every dimension
  const filtersPerDimension = prepareFilters(filters)
  return data.filter((item) => {
    const matchesPerDimension: (boolean | void)[] = Array.from(
      { length: filtersPerDimension.length },
      () => {}
    )

    filtersPerDimension.forEach((dimensionFilter, i) => {
      let itemMatches = false
      dimensionFilter.values.forEach((value) => {
        if (itemMatches) {
          return
        }

        if (
          dimensionFilter.dimension === dimension ||
          itemIsFilterItem(dimension, item, filters) ||
          valueForDimension(item, dimensionFilter.dimension) === value
        ) {
          itemMatches = true
        }
      })

      matchesPerDimension[i] = itemMatches
    })

    return matchesPerDimension.every(Boolean)
  })
}

function filterData(dimension: Dimension, filters: Filter[]) {
  if (filters.filter((f) => f.dimension !== dimension).length === 0) {
    return data
  }

  // fully OR match

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

function valueForDimension(item: any, dimension: Dimension) {
  switch (dimension) {
    case Dimension.browser:
      return item.Browser
    case Dimension.country:
      return item.Country
    case Dimension.deviceType:
      return item.Devicetype
    case Dimension.operatingSystem:
      return item.OperatingSystem
    case Dimension.page:
      return item.Page
  }
}

function filterPerDimension(item: any, needle: string, dimension: Dimension) {
  return valueForDimension(item, dimension) === needle
}

export function filtered(dimension: Dimension, filters: Filter[]) {
  const filteredData = doFilterData(dimension, filters)

  // TODO: fix count

  const unique = [...new Set(filteredData.map((m) => valueForDimension(m, dimension)))]
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
