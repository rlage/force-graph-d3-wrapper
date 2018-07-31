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
  if(data && data.results){
    data = parseNeo4jD3toD3data(data)
  }
  console.log(data)
  return this
}


const parseNeo4jD3toD3data = data => {
  let parsedData = {
    nodes: [],
    relationships: []
  };
  data.results.forEach( result => {
    result.data.forEach( data => {
        data.graph.nodes.forEach( node => {
            if (!parsedData.nodes.includes(node.id)) {
              parsedData.nodes.push(node);
            }
        });

        data.graph.relationships.forEach( relationship => {
            relationship.source = relationship.startNode;
            relationship.target = relationship.endNode;
            parsedData.relationships.push(relationship);
        });

        data.graph.relationships.sort((a, b) => {
            if (a.source > b.source) {
                return 1;
            } else if (a.source < b.source) {
                return -1;
            } else {
                if (a.target > b.target) {
                    return 1;
                }

                if (a.target < b.target) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });

        for (let i = 0; i < data.graph.relationships.length; i++) {
            if (i !== 0 && data.graph.relationships[i].source === data.graph.relationships[i-1].source && data.graph.relationships[i].target === data.graph.relationships[i-1].target) {
                data.graph.relationships[i].linknum = data.graph.relationships[i - 1].linknum + 1;
            } else {
                data.graph.relationships[i].linknum = 1;
            }
        }
    });
  });

  return parsedData
}