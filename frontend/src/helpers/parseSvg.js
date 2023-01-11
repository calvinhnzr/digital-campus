export function parseSvg(svgString) {
  while (svgString.includes("/")) {
    svgString = svgString.replace("/", "")
  }

  const parser = new DOMParser()
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml")
  const rectElements = svgDoc.getElementsByTagName("rect")
  const rects = []

  console.log(svgDoc)

  for (let i = 0; i < rectElements.length; i++) {
    const rect = rectElements[i]
    rects.push({
      id: rect.getAttribute("id"),
      type: "",
      // type: rect.getAttribute("class"),
      coords: {
        x: parseInt(rect.getAttribute("x")),
        y: parseInt(rect.getAttribute("y")),
        width: parseInt(rect.getAttribute("width")),
        height: parseInt(rect.getAttribute("height")),
      },
    })
  }
  return rects
}
