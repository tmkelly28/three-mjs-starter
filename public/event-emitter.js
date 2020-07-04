window.EventEmitter = (() => {
  class EventEmitter {
    constructor() {
      this.callbacks = {}
    }

    on(event, callback) {
      this.callbacks[event] = this.callbacks[event] || []
      this.callbacks[event].push(callback)
    }

    emit(event, payload) {
      if (this.callbacks[event]) {
        this.callbacks[event].forEach(callback => {
          callback(payload)
        })
      }
    }
  }

  return EventEmitter
})()
