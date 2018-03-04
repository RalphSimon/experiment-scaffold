export default function structureData (range, callBack) {
  let dataPoints = []
  for (let dP = 0; dP < range.length; dP++) {
    dataPoints.push({
      x: range[dP], 
      y: callBack(range[dP])
    })
  }

  return dataPoints
}