// Vector canvas is where we draw the individual nodes and links

var twoPi = 2 * Math.PI;

var vectorCanvas = d3.select('#vector-canvas').node();
var vectorCtx = vectorCanvas.getContext('2d');

var circleColour = '#eee';
var linkColour = '#aaa';

var radiusScale = d3.scaleLinear().domain([1, 20]).range([2, 6]);

function updateVectorCanvas() {
    action('setVectorTransform', {
        transform: state.bitmapTransform
    });

    d3.select('#vector-canvas')
        .attr('width', state.width)
        .attr('height', state.height);

    var padding = 20;

    vectorCtx.save();

    // Paint black background, so that vectorNoTransformCanvas (which has been copied to bitmapCanvas)
    // gets overwritten (otherwise it can look blurry)
    vectorCtx.fillStyle = '#000';
    vectorCtx.fillRect(0, 0, state.width, state.height);

    // Apply zoom transform
    var t = state.vectorTransform;
    vectorCtx.translate(t.x, t.y);
    vectorCtx.scale(t.k, t.k);

    // Calculate radius (the radius adapts to the zoom level)
    var radius = radiusScale(t.k);

    // Scale line width and circle radius back to how they'd look without zoom transform
    // otherwise they get too big
    vectorCtx.lineWidth = 1 / t.k;
    radius /= t.k;

    vectorCtx.translate(0.5 * state.width, 0.5 * state.height);

    // Links
    vectorCtx.strokeStyle = linkColour;
    state.links.forEach(d => {
        var c = d.cubic;
        vectorCtx.beginPath();
        vectorCtx.moveTo(c.p0.x, c.p0.y);
        vectorCtx.bezierCurveTo(c.p1.x, c.p1.y, c.p2.x, c.p2.y, c.p3.x, c.p3.y);
        vectorCtx.stroke();
    });

    // Nodes
    vectorCtx.fillStyle = circleColour;
    state.nodes.forEach(d => {
        vectorCtx.beginPath();
        vectorCtx.arc(d.x, d.y, radius, 0, twoPi);
        vectorCtx.fill();
    });

    vectorCtx.restore();
}

function updateAndCopyVectorCanvas() {
    updateVectorCanvas();
    updateBitmapCanvas();  
}
