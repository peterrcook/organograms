var zoom = d3.zoom()
    .scaleExtent([1, 20])
    .on("zoom", handleZoom);

d3.select('#chart')
    .call(zoom);

function handleZoom() {
    var transform = d3.event.transform;

    action('updateZoomTransform', {transform: transform});
}

function resetZoom() {
    // Based on https://github.com/d3/d3-zoom#zoom_transform
    d3.select('#chart')
        .call(zoom.transform, d3.zoomIdentity);
}
