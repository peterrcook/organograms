var twoPi = 2 * Math.PI;

var vectorCanvas = d3.select('#vector-canvas').node();
var vectorCtx = vectorCanvas.getContext('2d');

function radToDeg(a) {
    return a * 180 / Math.PI;
}

function ptFromAngDis(a, d) {
    var x = d * Math.sin(a);
    var y = -d * Math.cos(a);

    return {x: x, y: y};
}

function updateVectorCanvas() {
    console.time('update');

    action('setVectorTransform', {
        transform: state.bitmapTransform
    });

    d3.select('#vector-canvas')
        .attr('width', state.width)
        .attr('height', state.height);

    var padding = 20;
    var treeLayout = d3.tree()
        .size([2 * Math.PI, state.size - padding]);

    treeLayout(state.root);

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

    // Nodes
    state.root.descendants().forEach(d => {
        var pt = ptFromAngDis(d.x, d.y);
        vectorCtx.beginPath();
        vectorCtx.arc(pt.x, pt.y, radius, 0, twoPi);
        vectorCtx.fill();
    });

    
    // Links
    vectorCtx.strokeStyle = "#aaa";
    state.root.links().forEach(d => {
        var ang0 = d.source.x;
        var dis0 = d.source.y;
        var ang3 = d.target.x;
        var dis3 = d.target.y;

        var ang1 = ang0;
        var dis1 = 0.5 * (dis0 + dis3);

        var ang2 = ang3;
        var dis2 = dis1;

        var p0 = ptFromAngDis(ang0, dis0);
        var p1 = ptFromAngDis(ang1, dis1);
        var p2 = ptFromAngDis(ang2, dis2);
        var p3 = ptFromAngDis(ang3, dis3);

        vectorCtx.beginPath();
        vectorCtx.moveTo(p0.x, p0.y);
        vectorCtx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        vectorCtx.stroke();
    });

    vectorCtx.restore();

    console.timeEnd('update');
}

function updateAndCopyVectorCanvas() {
    updateVectorCanvas();
    updateBitmapCanvas();  
}
