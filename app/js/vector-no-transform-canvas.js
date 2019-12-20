// Cache an untransformed image to be used during zoom/pans e.g. when zooming out the user will
// see this image (until the vector canvas updates)
var vectorNoTransformCanvas = d3.select('#vector-no-transform-canvas').node();
var vectorNoTransformCtx = vectorNoTransformCanvas.getContext('2d');

function updateVectorNoTransformCanvas() {
    d3.select('#vector-no-transform-canvas')
        .attr('width', state.width)
        .attr('height', state.height);

    vectorNoTransformCtx.drawImage(vectorCanvas, 0, 0, state.width, state.height);
}
