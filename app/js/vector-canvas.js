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


    vectorCtx.fillStyle = "#aaa";
    vectorCtx.lineWidth = 1;
    var radius = 2;

    vectorCtx.save();

    vectorCtx.clearRect(0, 0, state.width, state.height);

    var t = state.vectorTransform;
    vectorCtx.translate(t.x, t.y);
    vectorCtx.scale(t.k, t.k);

    vectorCtx.lineWidth = 1 / t.k;
    radius /= t.k;

    vectorCtx.translate(0.5 * state.width, 0.5 * state.height);

    var size = 0.5 * Math.min(state.width, state.height) - padding;
    vectorCtx.scale(size, size);
    vectorCtx.lineWidth /= size;
    radius /= size;

    // Nodes
    state.nodes.forEach(d => {
        var pt = ptFromAngDis(d.x, d.y);
        vectorCtx.beginPath();
        vectorCtx.arc(pt.x, pt.y, radius, 0, twoPi);
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
