export default function Scale (domain, range) {
  let domainLength = domain[1] - domain[0]
  let rangeLength = range[1] - range[0]

  return rangeLength / domainLength
}