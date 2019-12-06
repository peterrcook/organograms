let allIds, allParentIds;

let size = 350;
let delay = 0.5;

function radToDeg(a) {
    return a * 180 / Math.PI;
}

function ptFromAngDis(a, d) {
    let x = d * Math.sin(a);
    let y = -d * Math.cos(a);

    return {x: x, y: y};
}

function getRoot(data) {
    let stratify = d3.stratify()
        .id(d => d.id)
        .parentId(d => d.parentId);

    let root = stratify(data);

    return root;
}

function update(root) {
    let treeLayout = d3.tree()
        .size([2 * Math.PI, size]);

    treeLayout(root);

    d3.select('.points')
        .selectAll('circle')
        .data(root.descendants())
        .join('circle')
        .each(function(d) {
            var pt = ptFromAngDis(d.x, d.y);
            d3.select(this)
                .attr('cx', pt.x)
                .attr('cy', pt.y);
        })
        .attr('r', 1)
        .style('fill', '#555')
        .style('opacity', 0)
        .transition()
        .delay((d, i) => i * delay)
        .style('opacity', 1);

    d3.select('.lines')
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr('d', d => {
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

            return `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`
        })
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-width', 1)
        .style('opacity', 0)
        .transition()
        .delay((d, i) => i * delay)
        .style('opacity', 1);
}

d3.csv('data/moj.csv')
    .then(data => {
        let root = getRoot(data);
        update(root);
    });
