import { OrderedMap } from 'immutable'

export function generateId() {
  return Date.now() + Math.random()
}

export function fbToEntities(values, DataRecord) {
  if (values) {
    return new OrderedMap(
      Object.entries(values).map(([id, value]) => [
        id,
        new DataRecord({ id, ...value })
      ])
    )
  } else {
    return new OrderedMap()
  }
}
