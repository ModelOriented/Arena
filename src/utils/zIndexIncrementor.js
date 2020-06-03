let z = 100

export default {
  get () {
    z += 1
    return z
  },
  getWithoutInc () {
    return z
  }
}
