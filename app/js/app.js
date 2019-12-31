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

    console.log('item', item);

    action('setHoveredItem', {
        item: item
    });

    // console.log(item.data.data);
}

function init() {
    d3.select('#chart')
        .on('mousemove', handleMousemove);

    action('resize');
}

var debouncedResize = _.debounce(function() {
    action('resize');
}, 500);

window.onresize = debouncedResize;

init();
