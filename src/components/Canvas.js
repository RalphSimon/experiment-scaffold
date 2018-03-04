import {getRange, Scale} from '../helpers'

export default class Canvas {
  constructor (data) {
    this.elm = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.objects = []
    this.width = data.width || 980
    this.height = data.height || (this.width / 2)
    this.class = data.class || 'context' 
    this.t0 = Date.now()

    this.elm.setAttribute('width', this.width)
    this.elm.setAttribute('height', this.height)
    this.elm.classList.add(this.class)
  }

  append (obj) {
    this.objects.push(obj)
    this.elm.appendChild(obj)
  }

  grid (xDomain, yDomain) {
    let xRange = getRange(xDomain)
    let xLines = []
    for (let i = 1; i < xRange.length - 1; i++) {
      let line = {
        x1: i * Scale(xDomain, [0, this.width]),
        y1: 0,
        x2: i * Scale(xDomain, [0, this.height]),
        y2: this.height
      }
      xLines.push(line)
      this.addLine(line)
    }
    console.log(xLines)
  }

  addLine (data) {
    let line = document.createElement('line')
    line.classList.add('grid-line')
    line.setAttribute('x1', data.x1)
    line.setAttribute('y1', data.y1)
    line.setAttribute('x2', data.x2)
    line.setAttribute('y2', data.x2)

    this.append(line)
  }
}