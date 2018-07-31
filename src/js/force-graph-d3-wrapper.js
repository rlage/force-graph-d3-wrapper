const defaultOptions = {
  svg : {
    width: '100%',
    height: '100%',
  }
}
function forceGraphD3Wrapper(classElement, data, options = defaultOptions) {
  const svgOptions = options.svg
  let svg = d3.select(`.${classElement}`).append('svg')
  svg.attr('height', svgOptions.height)
  svg.attr('width', svgOptions.width)
  return this
}
