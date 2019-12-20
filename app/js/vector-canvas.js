var twoPi = 2 * Math.PI;

var vectorCanvas = d3.select('#vector-canvas').node();
var vectorCtx = vectorCanvas.getContext('2d');


function updateVectorCanvas() {
    console.time('update');

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

    vectorCtx.fillStyle = "#aaa";
    vectorCtx.lineWidth = 1;
    var radius = 2;


    var t = state.vectorTransform;
    vectorCtx.translate(t.x, t.y);
    vectorCtx.scale(t.k, t.k);

    vectorCtx.lineWidth = 1 / t.k;
    radius /= t.k;

    vectorCtx.translate(0.5 * state.width, 0.5 * state.height);

    // Nodes
    state.nodes.forEach(d => {
        vectorCtx.beginPath();
        vectorCtx.arc(d.x, d.y, radius, 0, twoPi);
        vectorCtx.fill();
    });

    
    // Links
    vectorCtx.strokeStyle = "#aaa";
    state.links.forEach(d => {
        var c = d.cubic;
        vectorCtx.beginPath();
        vectorCtx.moveTo(c.p0.x, c.p0.y);
        vectorCtx.bezierCurveTo(c.p1.x, c.p1.y, c.p2.x, c.p2.y, c.p3.x, c.p3.y);
        vectorCtx.stroke();
    });

    vectorCtx.restore();

    console.timeEnd('update');
}

function updateAndCopyVectorCanvas() {
    updateVectorCanvas();
    updateBitmapCanvas();  
}
