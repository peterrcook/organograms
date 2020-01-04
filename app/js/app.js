function showChart(id) {
    action('selectDepartment', {id: id});
}

function closeChart() {
    action('deselect');
}

function handleMousemove() {
    if(!state.selectedId) {
        return;
    }

    var pos = state.bitmapTransform.invert([d3.event.x, d3.event.y]);
    
    var item = state.voronoi.find(pos[0], pos[1], 10);

    action('setHoveredItem', {
        item: item
    });
}

function handleHelpButtonClick() {
    action('showHelp');
}

function init() {
    d3.select('#chart')
        .on('mousemove', handleMousemove);

    d3.select('#help-button')
        .on('click', handleHelpButtonClick);

    action('resize');
}

var debouncedResize = _.debounce(function() {
    action('resize');
}, 500);

window.onresize = debouncedResize;

init();
