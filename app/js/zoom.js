var zoom = d3.zoom()
    .scaleExtent([0.5, 20])
    .on("zoom", handleZoom);

d3.select('#chart-canvas')
    .call(zoom);

function handleZoom() {
    var transform = d3.event.transform;

    action('updateZoomTransform', {transform: transform});
}
