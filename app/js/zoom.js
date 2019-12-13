var zoom = d3.zoom()
    .scaleExtent([1, 20])
    .on("zoom", handleZoom);

d3.select('#chart')
    .call(zoom);

function handleZoom() {
    var transform = d3.event.transform;

    action('updateZoomTransform', {transform: transform});
}
