window.colorPicker = (({ EventEmitter }) => {
  class Color extends EventEmitter {
    constructor(color) {
      super()
      this.color = color
    }

    addClickListener(callback) {
      this.on('click', callback)
    }

    render(offset = 0) {
      const div = document.createElement('div')
      div.classList.add('color-box')
      div.style.backgroundColor = this.color
      div.style.bottom = '10px'
      div.style.left = offset + 'px'
      document.body.appendChild(div)

      div.addEventListener('click', () => {
        this.emit('click', this)
      })
    }
  }

  class ColorPicker extends EventEmitter {
    constructor(colors) {
      super()
      this.colors = colors
    }

    addClickListener(callback) {
      this.on('click', callback)
    }

    render() {
      this.colors.forEach((color, index) => {
        color.render(index * 30 + 10)

        color.addClickListener(selectedColor => {
          this.emit('click', selectedColor.color)
        })
      })
    }
  }

  const colorNames = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  const colors = colorNames.map(colorName => new Color(colorName))

  return new ColorPicker(colors)
})(window)
