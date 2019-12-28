function updateInfoPanel() {
    var data = state.hoveredData;

    var items = [];
    if(data) {
        items = [
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
    }

    d3.select('#info-panel')
        .style('display', data ? 'block' : 'none')
        .select('tbody')
        .selectAll('.item')
        .data(items)
        .join('tr')
        .classed('item', true)
        .html(function(d) {
            return '<td class="key">' + d.name.toUpperCase() + ':</td><td>' + data[d.id].toUpperCase() + '</td>';
        });
}
