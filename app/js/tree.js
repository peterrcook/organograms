var treeLayout = d3.tree()
    .size([2 * Math.PI, 1]);

function ptFromAngDis(a, d) {
    var x = d * Math.sin(a);
    var y = -d * Math.cos(a);

    return {x: x, y: y};
}

function applyTreeLayout(root) {
    treeLayout(root);
}

function computeLinkPositions(root) {
    console.log(root.links());

    var links = root.links().map(function(d) {
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

        return {
            source: d.source,
            target: d.target,
            cubic: {
                p0: p0,
                p1: p1,
                p2: p2,
                p3: p3
            }
        };
    });

    return links;
}
