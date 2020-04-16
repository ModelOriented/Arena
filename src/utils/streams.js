export default {
  mapChildren (obj, f) {
    return Object.keys(obj).reduce((acu, key) => {
      acu[key] = obj[key].map(f)
      return acu
    }, {})
  },
  filterChildren (obj, f) {
    return Object.keys(obj).reduce((acu, key) => {
      acu[key] = obj[key].filter(f)
      return acu
    }, {})
  },
  findIndexAll (arr, f) {
    return arr.reduce((acu, x, index) => {
      if (f(x)) acu.push(index)
      return acu
    }, [])
  },
  createObjectWithArrays (keys) {
    return keys.reduce((acu, key) => {
      acu[key] = []
      return acu
    }, {})
  }
}
