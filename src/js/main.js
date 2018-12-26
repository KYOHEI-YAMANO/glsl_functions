import "../scss/main.scss"


window.addEventListener('DOMContentLoaded', () => {
  const clamp = new Clamp("clamp")
  const dot = new Dot("dot")
})



class Common {
  constructor(target) {
    this.target = target
    this.el = document.getElementById(target)

    this.form = this.el.querySelector('form')
    this.button = this.el.querySelector('button')
    this.result = this.el.querySelector('.result')
  }

  init() {
    this.addEvent()
  }

  addEvent() {
    this.form.addEventListener('submit', this.calc)
    this.button.addEventListener('click', this.calc)
  }

  calc() {}

  showResult(result) {
    this.result.innerText = result
    console.log(this.target + "::: ", result)
  }

}


class Clamp extends Common {
  constructor(target) {
    super(target)

    this.x = this.el.querySelector('.x')
    this.a = this.el.querySelector('.a')
    this.b = this.el.querySelector('.b')

    this.init()
  }

  init() {
    this.addEvent()
  }

  calc = e => {
    e.preventDefault()
    const x = this.x.value
    const a = this.a.value
    const b = this.b.value

    this.showResult(this.clamp(x, a, b))
  }

  clamp(x, a, b) {
    return Math.min(Math.max(x, a), b)
  }

}


class Dot extends Common {
  constructor(target) {
    super(target)

    this.x = this.el.querySelector('.x')
    this.y = this.el.querySelector('.y')

    this.init()
  }

  init() {
    this.addEvent()
  }

  calc = e => {
    e.preventDefault()
    const x = this.x.value
    const y = this.y.value

    this.showResult(this.dot(x, y))
  }

  dot(x, y) {
    let tmpV0 = x.split(',')
    let v0 = {
      x: tmpV0[0],
      y: tmpV0[1]
    }
    let tmpV1 = y.split(',')
    let v1 = {
      x: tmpV1[0],
      y: tmpV1[1]
    }
    console.log(tmpV0, tmpV1)
    return v0.x * v1.x + v0.y + v1.y
  }

}
