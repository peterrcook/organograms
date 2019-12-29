function updateHighlight() {
    updateBitmapCanvas();

    var hoveredId = state.hoveredData ? state.hoveredData.id : null;

    if(hoveredId === null) {
        return;
    }

    bitmapCtx.save();
    
    var t = state.bitmapTransform;
    bitmapCtx.translate(t.x, t.y);
    bitmapCtx.scale(t.k, t.k);

    // Calculate radius (the radius adapts to the zoom level)
    var radius = radiusScale(t.k);
    radius /= t.k;
    radius += 2 / t.k;
    var haloRadius = radius + 5 / t.k;

    var lineWidth = 1 / t.k;

    bitmapCtx.translate(0.5 * state.width, 0.5 * state.height);

    // Nodes
    bitmapCtx.lineWidth = lineWidth;
    bitmapCtx.shadowColor = '#fff';
    bitmapCtx.shadowBlur = 5;
    state.nodes.forEach(d => {
        if(d.data.id !== hoveredId) {
            return;
        }

        bitmapCtx.fillStyle = '#278ea5'; // From https://colorhunt.co/palette/132247
        bitmapCtx.beginPath();
        bitmapCtx.arc(d.x, d.y, radius, 0, twoPi);
        bitmapCtx.fill();

        bitmapCtx.strokeStyle = '#fff';
        bitmapCtx.beginPath();
        bitmapCtx.arc(d.x, d.y, haloRadius, 0, twoPi);
        bitmapCtx.stroke();
    });

    bitmapCtx.restore();
}
