import "../scss/main.scss"


window.addEventListener('DOMContentLoaded', () => {
  const clamp = new Clamp("clamp")
  const cross = new Cross("cross")
  const dot = new Dot("dot")
  const length = new Length("length")
  const mix = new Mix("mix")
  const mod = new Mod("mod")
  const normalize = new Normalize("normalize")
  const smoothstep = new Smoothstep("smoothstep")
})

function clamp(x, a, b) {
  console.log(`Math.min(Math.max(${x}, ${a}), ${b})`)
  return Math.min(Math.max(x, a), b)
}

function cross(x, y) {
  let tmpV0 = x.split(',')
  let v0 = {x: tmpV0[0], y: tmpV0[1], z: tmpV0[2]}
  let tmpV1 = y.split(',')
  let v1 = {x: tmpV1[0], y: tmpV1[1], z: tmpV1[2]}

  console.log(`[
    ${v0.y} * ${v1.z} - ${v1.y} * ${v0.z},
    ${v0.z} * ${v1.x} - ${v1.z} * ${v0.x},
    ${v0.x} * ${v1.y} - ${v1.x} * ${v0.y}
    ]`)

  let ary = [
    v0.y * v1.z - v1.y * v0.z,
    v0.z * v1.x - v1.z * v0.x,
    v0.x * v1.y - v1.x * v0.y
  ]
  return ary
}

function dot(x, y) {
  let tmpV0 = x.split(',')
  let v0 = {x: tmpV0[0], y: tmpV0[1]}
  let tmpV1 = y.split(',')
  let v1 = {x: tmpV1[0], y: tmpV1[1]}
  console.log(`${v0.x} * ${v1.x} + ${v0.y} + ${v1.y}`)
  return v0.x * v1.x + v0.y + v1.y
}

function length(x) {
  let v
  if(typeof x === "object") {
    v = x
  } else {
    let tmpVal = x.split(",")
    v = {
      x: tmpVal[0],
      y: tmpVal[1]
    }
  }

  console.log(`Math.sqrt(${v.x} * ${v.x} + ${v.y} * ${v.y})`)
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

function mix(x, y, a) {
  console.log(`${x} * (1 - ${a}) + ${y} * ${a}`)
  return x * (1 - a) + y * a
}

function mod(x, y) {
  console.log(`${x} % ${y}`)
  return x % y
}

function  normalize(x) {
  let tmpVal = x.split(",")
  let v = {x: tmpVal[0], y: tmpVal[1], z: tmpVal[2]}
  let l = length(v)
  v.x /= l
  v.y /= l
  v.z /= l
  return v
}

function  smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0)
  return t * t * (3 - 2 * t)
}

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
    if(typeof result === "object") {
      this.result.innerText = JSON.stringify(result)
    } else {
      this.result.innerText = result
    }
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

  calc = e => {
    e.preventDefault()
    const x = this.x.value
    const a = this.a.value
    const b = this.b.value

    this.showResult(clamp(x, a, b))
  }

}

class Cross extends Common {
  constructor(target) {
    super(target)

    this.v0 = this.el.querySelector('.v0')
    this.v1 = this.el.querySelector('.v1')

    this.init()
  }

  calc = e => {
    e.preventDefault()
    const v0 = this.v0.value
    const v1 = this.v1.value

    this.showResult(cross(v0, v1))
  }

}


class Dot extends Common {
  constructor(target) {
    super(target)

    this.x = this.el.querySelector('.x')
    this.y = this.el.querySelector('.y')

    this.init()
  }

  calc = e => {
    e.preventDefault()
    const x = this.x.value
    const y = this.y.value

    this.showResult(dot(x, y))
  }

}

class Length extends Common {
  constructor(target) {
    super(target)

    this.x = this.el.querySelector('.x')

    this.init()
  }

  calc = e => {
    e.preventDefault()
    const x = this.x.value

    this.showResult(length(x))
  }

}


class Normalize extends Common {
  constructor(target) {
    super(target)

    this.v = this.el.querySelector('.v')

    this.init()
  }

  calc = e => {
    e.preventDefault()
    const v = this.v.value

    this.showResult(normalize(v))
  }

}

class Mix extends Common {
  constructor(target) {
    super(target)

    this.x = this.el.querySelector('.x')
    this.y = this.el.querySelector('.y')
    this.a = this.el.querySelector('.a')

    this.init()
  }

  calc = e => {
    e.preventDefault()
    const x = this.x.value
    const y = this.y.value
    const a = this.a.value

    this.showResult(mix(x, y, a))
  }

}

class Mod extends Common {
  constructor(target) {
    super(target)

    this.x = this.el.querySelector('.x')
    this.y = this.el.querySelector('.y')

    this.init()
  }

  calc = e => {
    e.preventDefault()
    const x = this.x.value
    const y = this.y.value

    this.showResult(mod(x, y))
  }

}

class Smoothstep extends Common {
  constructor(target) {
    super(target)

    this.edge0 = this.el.querySelector('.edge0')
    this.edge1 = this.el.querySelector('.edge1')
    this.x = this.el.querySelector('.x')

    this.init()
  }

  calc = e => {
    e.preventDefault()
    const edge0 = this.edge0.value
    const edge1 = this.edge1.value
    const x = this.x.value

    this.showResult(smoothstep(edge0, edge1, x))
  }

}

