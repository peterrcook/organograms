var bitmapCanvas = d3.select('#bitmap-canvas').node();
var bitmapCtx = bitmapCanvas.getContext('2d');

function updateBitmapCanvas() {
    console.time('updateBitmapCanvas');
    if(!state.selectedId) {
        d3.select('#chart')
            // .transition()
            // .style('opacity', 0)
            // .on('end', function() {
            //     d3.select(this)
                    .style('display', 'none');
            // });
        return;
    }

    d3.select('#chart')
        .style('display', 'inline')
        // .transition()
        // .duration(1000)
        .style('opacity', 1);

    d3.select('#bitmap-canvas')
        .attr('width', state.width)
        .attr('height', state.height);

    bitmapCtx.clearRect(0, 0, state.width, state.height);

    // Now find transform 'delta' that takes us from vector-canvas's 
    // image (transformed by vt) to the original image transformed by bt

    // The underlying matrix math is:
    // [delta][vt] = [bt]   (e.g. to transform p it's [delta][vt]p = [bt]p)
    // so:
    // [delta][vt][vtInv] = [bt][vtInv]
    // so:
    // [delta] = [bt][vtInv]
    var vt = state.vectorTransform;
    var bt = state.bitmapTransform;

    var vMatrix = math.matrix([
        [vt.k, 0, vt.x],
        [0, vt.k, vt.y],
        [0, 0, 1]
    ]);
    var vMatrixInv = math.inv(vMatrix);

    var bMatrix = math.matrix([
        [bt.k, 0, bt.x],
        [0, bt.k, bt.y],
        [0, 0, 1]
    ]);

    var delta = math.multiply(bMatrix, vMatrixInv);

    var k = delta._data[0][0];
    var x = delta._data[0][2];
    var y = delta._data[1][2];

   
    bitmapCtx.drawImage(vectorCanvas, 0, 0, state.width, state.height, x, y, state.width * k, state.height * k);
    console.timeEnd('updateBitmapCanvas');
}

