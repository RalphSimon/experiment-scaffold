export default function getRange (domain) {
  let xRange = []
  let xLength = domain[1] - domain[0]

  for (let xF = 0; xF < xLength + 1; xF++) {
    xRange.push(domain[0] + xF)
  }

  return xRange
}