let allIds, allParentIds;

let size = 400;

const canvas = d3.select('#chart-canvas').node();
const ctx = canvas.getContext('2d');

function radToDeg(a) {
    return a * 180 / Math.PI;
}

function ptFromAngDis(a, d) {
    let x = d * Math.sin(a);
    let y = -d * Math.cos(a);

    return {x: x, y: y};
}

function update() {
    console.time('update');
    if(!state.selectedId) {
        d3.select('#chart')
            .transition()
            .style('opacity', 0)
            .on('end', function() {
                d3.select(this)
                    .style('display', 'none');
            });
        return;
    }

    d3.select('#chart')
        .style('display', 'inline')
        // .transition()
        // .duration(1000)
        .style('opacity', 1);

    d3.select('#chart-canvas')
        .attr('width', state.width)
        .attr('height', state.height);


    const padding = 20;
    let treeLayout = d3.tree()
        .size([2 * Math.PI, size - padding]);

    treeLayout(state.root);

    ctx.fillStyle = "#aaa";
    ctx.lineWidth = 1;

    ctx.save();

    ctx.clearRect(0, 0, 2 * size, 2 * size);

    if(state.zoomTransform) {
        var t = state.zoomTransform;
        ctx.translate(t.x, t.y);
        ctx.scale(t.k, t.k);

        ctx.lineWidth = 1 / t.k;
    }

    ctx.translate(size, size);

    // Nodes
    state.root.descendants().forEach(d => {
        let pt = ptFromAngDis(d.x, d.y);
        ctx.fillRect(pt.x, pt.y, 2, 2);
    });

    
    // Links
    ctx.strokeStyle = "#aaa";
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

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.stroke();
    });

    ctx.restore();

    console.timeEnd('update');
}

