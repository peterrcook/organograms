var treeLayout = d3.tree();

function ptFromAngDis(a, d) {
    var x = d * Math.sin(a);
    var y = -d * Math.cos(a);

    return {x: x, y: y};
}

function getRoot(data) {
    let stratify = d3.stratify()
        .id(d => d.id)
        .parentId(d => d.parentId);

    let root = stratify(data);

    return root;
}

function applyTreeLayout(root) {
    var size = 0.5 * Math.min(state.width, state.height) - 20;
    treeLayout
        .size([2 * Math.PI, size]);
    treeLayout(root);
}

function getNodes(root) {
    var nodes = root.descendants().map(function(d) {
        var pt = ptFromAngDis(d.x, d.y);
        return {
            x: pt.x,
            y: pt.y,
            data: d.data
        };
    });

    return nodes;
}

function getLinks(root) {
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
