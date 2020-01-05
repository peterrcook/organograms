var bitmapCanvas = d3.select('#bitmap-canvas').node();
var bitmapCtx = bitmapCanvas.getContext('2d');

function updateBitmapCanvas() {
    d3.select('#bitmap-canvas')
        .attr('width', state.width)
        .attr('height', state.height);

    bitmapCtx.fillStyle = '#000';
    bitmapCtx.fillRect(0, 0, state.width, state.height);

    var vt = state.vectorTransform;
    var bt = state.bitmapTransform;

    var k = bt.k;
    var x = bt.x;
    var y = bt.y;
    bitmapCtx.drawImage(vectorNoTransformCanvas, 0, 0, state.width, state.height, x, y, state.width * k, state.height * k);

    // Now find transform 'delta' that takes us from vector-canvas's 
    // image (transformed by vt) to the original image transformed by bt

    // The underlying matrix math is:
    // [delta][vt] = [bt]   (e.g. to transform p it's [delta][vt]p = [bt]p)
    // so:
    // [delta][vt][vtInv] = [bt][vtInv]
    // so:
    // [delta] = [bt][vtInv]

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

    k = delta._data[0][0];
    x = delta._data[0][2];
    y = delta._data[1][2];

    bitmapCtx.drawImage(vectorCanvas, 0, 0, state.width, state.height, x, y, state.width * k, state.height * k);
}

