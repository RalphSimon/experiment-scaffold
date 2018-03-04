import * as d3 from 'd3'
import {getRange, structureData, structureSmooth } from '../helpers'

export default class Ball {
  constructor (data) {
    this.elm = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    this.cx = data.x
    this.cy = data.y
    this.r = data.r
    this.vy = data.vy
    this.xDomain = data.xDomain
    this.yDomain = data.yDomain
    this.xSize = data.xSize
    this.ySize = data.ySize
    this.vx = getRange(this.xDomain).length / (this.xSize / data.vx)
    this.t = Date.now()
    this.elapsed = 0
    this.color = data.color || '#26a69a'
    this.scaleX = d3.scaleLinear().domain(this.xDomain).range([24, this.xSize - 24])
    this.scaleY = d3.scaleLinear().domain(this.yDomain).range([this.ySize - 24, 24])
    this.elm.classList.add('ball')
    // console.log(getRange(this.xDomain))
    // console.log("scale: ", this.scaleY(this.yDomain[0]))
  }

  draw (plotter) {
    let ball = this
    // this.elm.setAttribute('cx', this.scaleX(-3.43))
    // this.elm.setAttribute('cy', this.scaleY(-7))
    this.elm.setAttribute('r', this.r)
    this.elm.setAttribute('fill', this.color)
    this.elm.setAttribute('stroke', 'none')
    this.elm.setAttribute('style', `
      transform: translate(${this.scaleX(this.xDomain[0])}px, ${this.scaleY(this.yDomain[0])}px);
    `)

    return this.elm
  }

  /*
    Velocity in pixels/second = Velocity in pixels/frame * Frames/second 
    x = vx * fps
  */
  update (t, raf, plotter) {
    let y = this.scaleY(plotter(-1))
    let plotX = this.xDomain[0]
    plotX += this.vx * this.timer(t) // = [-4, 4]
    y = plotter(plotX)
    console.log(plotX)
    if (plotX >= this.xDomain[1]) cancelAnimationFrame(raf)

    this.elm.setAttribute('style', `
      transform: translate(${this.scaleX(plotX)}px, ${this.scaleY(y)}px);
    `)
  }

  timer (start, duration) {
    let elapsed = (Date.now() - start) / 1000
    start = Date.now()
    return elapsed
  }
}