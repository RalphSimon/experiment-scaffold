import './style.css'
import Ball from './components/Ball'
import Canvas from './components/Canvas'
import Graph from './components/Graph'
import { Scale } from './helpers'

const container = document.createElement('div')
container.classList.add('container')

document.body.insertAdjacentElement('afterbegin', container)

// SETUP CONTEXT
const canvasOptions = {
  width: container.getBoundingClientRect().width,
  height: container.getBoundingClientRect().height
}
const canvas = new Canvas(canvasOptions)
const canvasCenter = [canvasOptions.width / 2, canvasOptions.height / 2]
container.appendChild(canvas.elm)

// GRAPH
const graph = new Graph({
  ctx: canvas.elm,
  margin: 24,
  xDomain: [-2, 2],
  yDomain: [-5, 5]
})
graph.drawGraph()
graph.drawLine(plotPoly5)


// BALL
const ballOpts = {
  x: 20,
  y: 20,
  r: 20,
  vx: 100,
  xDomain: [-2, 2],
  yDomain: [-5, 5],
  xSize: graph.xSize,
  ySize: graph.ySize
}
const ball = new Ball(ballOpts)
canvas.append(ball.draw(plotPoly5))

// ANIMATION
var raf;
let x = 0
let t1 = Date.now()

function animate () {
  raf = requestAnimationFrame(animate)
  ball.update(t1, raf, plotPoly5)
}

function plotLinear (x) {
  let y = 2 * x + 1
  return y
}

function plotExDecay(x) {
  let y = Math.exp(-Math.pow(x, 2))
  // console.log("Decay: ", y)
  return y
}

function plotParabolic(x) {
  let y = -Math.pow(x, 2)
  return y
}

function plotPoly5 (x) {
	let y = -0.75 * Math.pow(x, 5) + 3 * Math.pow(x, 3) + x * x - 2
  return y
}

animate()