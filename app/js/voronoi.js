var voronoiGenerator = d3.voronoi();

function updateVoronoi(nodes) {
    voronoiGenerator
        .x(function(d) {return d.x + 0.5 * state.width;})
        .y(function(d) {return d.y + 0.5 * state.height;})
        .extent([[-1, -1], [state.width + 1, state.height + 1]]);

    var voronoi = voronoiGenerator(nodes);

    return voronoi;
}
