const fs = require('fs');
const d3 = require('d3');

const size = 250;

const { createCanvas } = require('canvas');
const canvas = createCanvas(size * 2, size * 2);
const ctx = canvas.getContext('2d');


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
    const padding = 20;
    let treeLayout = d3.tree()
        .size([2 * Math.PI, size - padding]);

    treeLayout(root);

    ctx.save();
    ctx.clearRect(0, 0, 2 * size, 2 * size);
    
    ctx.fillStyle = "#fff";
    ctx.translate(size, size);

    // Nodes
    root.descendants().forEach(d => {
        let pt = ptFromAngDis(d.x, d.y);
        ctx.fillRect(pt.x, pt.y, 2, 2);
    });

    
    // Links
    ctx.strokeStyle = "#555";
    root.links().forEach(d => {
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
}


// fs.readdir('../wrangling/processed/co.csv', (err, file
fs.readdir('../wrangling/processed', (err, files) => {
    files.forEach(file => {
        var f = fs.readFileSync('../wrangling/processed/' + file, 'utf8');
        let data = d3.csvParse(f);
        let root = getRoot(data);

        update(root);

        let buf = canvas.toBuffer('image/jpeg');
        fs.writeFileSync('img/' + file.replace('.csv', '') + '.jpg', buf);
    });
});

