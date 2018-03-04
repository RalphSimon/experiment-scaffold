export default function structureSmooth (range, smooth, callBack) {
  let dataPoints = []
  let smoothness = range.length / smooth
  // console.log("Range: ", range)
  // console.log("Smoothness (0.08): ", smoothness)
  for (let dP = 0; dP <= smooth; dP++) {
    let x = (dP - (smooth / 2)) * smoothness
    dataPoints.push({
      x: x, 
      y: callBack(x)
    })
  }

  return dataPoints
}