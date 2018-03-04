import * as d3 from 'd3'
import {getRange, Scale, structureData, structureSmooth} from '../helpers'

export default class Graph {
  constructor (data, plotter) {
    this.ctx = data.ctx
    this.margin = data.margin
    this.xDomain = data.xDomain
    this.yDomain = data.yDomain
    this.xSize = this.ctx.getBoundingClientRect().width
    this.ySize = this.ctx.getBoundingClientRect().height

    this.scaleX = d3.scaleLinear()
                    .domain(this.xDomain)
                    .range([this.margin, this.xSize - this.margin])
    this.scaleY = d3.scaleLinear()
                    .domain(this.yDomain)
                    .range([this.ySize, this.margin * 2])
    this.axisX = d3.axisBottom(this.scaleX)
    this.axisY = d3.axisLeft(this.scaleY).ticks(
      (getRange(this.yDomain).length > 21) ? 
      getRange(this.yDomain).length / 4 : 
      getRange(this.yDomain).length
    )
  }

  centerAxisX (xMin) {
    // console.log("center axis X: ", (xMin < 0) ? this.xSize / 2 - this.margin : this.margin)
    return (xMin < 0) ? this.xSize / 2 : this.margin
  }

  centerAxisY (yMin) {
    // console.log("center axis y", this.ySize)
    return (yMin < 0) ? this.ySize / 2 : this.margin
  }

  drawGraph () {
    d3.select(this.ctx)
      .append('g')
        .attr('transform', `translate(${ this.centerAxisX(this.xDomain[0]) }, -${ this.margin })`)
        .call(this.axisY)

    d3.select(this.ctx)
      .append('g')
        .attr('transform', `translate(0, ${ this.centerAxisY(this.yDomain[0]) })`)
        .call(this.axisX)
  }

  drawLine (plotter) {
    let canvas = this
    this.line = d3.line()
                  .x(function (d) { return canvas.scaleX(d.x) - canvas.margin })
                  .y(function (d) { return canvas.scaleY(d.y) - canvas.margin })

    this.lineData = structureSmooth(getRange(this.xDomain), 1000, plotter)
    // console.log("Graph | Line Data: ", this.lineData)
    d3.select(this.ctx)
  	.append('path')
  		.attr('transform', `translate(${this.margin}, 0)`)
  		.attr('d', this.line(this.lineData))
  		.attr('stroke', '#FF6D48')
  		.attr('stroke-width', 1)
  		.attr('fill', 'none')
  }
}