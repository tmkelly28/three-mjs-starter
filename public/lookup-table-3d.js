window.LookupTable3D = (() => {
  class LookupTable3D {
    constructor() {
      this.data = {}
    }

    key({ x, y, z }) {
      return [x, y, z].join('_')
    }

    check({ x, y, z }) {
      return this.data[this.key({ x, y, z })]
    }

    add(object) {
      const { x, y, z } = object.position
      this.data[this.key({ x, y, z })] = object
    }

    remove({ x, y, z }) {
      delete this.data[this.key({ x, y, z })]
    }
  }

  return LookupTable3D
})()
