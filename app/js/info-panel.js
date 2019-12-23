function updateInfoPanel() {
    console.log(state.hoveredData);

    var data = state.hoveredData;
    
    var items = [
        {
            name: 'Job title',
            id: 'jobTitle'
        },
        {
            name: 'Unit',
            id: 'unit'
        },
        {
            name: 'Group',
            id: 'professionalOccupationalGroup'
        },
        {
            name: 'Level',
            id: 'level'
        },
        {
            name: 'Name',
            id: 'name'
        },
        {
            name: 'Pay floor',
            id: 'payFloor'
        },
        {
            name: 'Pay ceiling',
            id: 'payCeil'
        }
    ];

    d3.select('#info-panel')
        .selectAll('.item')
        .data(items)
        .join('div')
        .classed('item', true)
        .html(function(d) {
            return d.name + ': ' + data[d.id];
        });
}
