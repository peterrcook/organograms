function updateInfoPanel() {
    var data = state.hoveredData;

    var items = [];
    if(data) {
        items = [
            {
                name: 'Job title',
                value: data.jobTitle
            },
            {
                name: 'Unit / Group',
                value: data.unit + (data.professionalOccupationalGroup !== '' ? ' / ' + data.professionalOccupationalGroup : '')
            },
            {
                name: 'Level',
                value: data.level
            },
            {
                name: 'Name',
                value: data.name
            },
            {
                name: 'Pay range',
                // TODO: Check where 0 in data originates from
                value: data.payCeil === '0' ? 'Unknown' : '£' + data.payFloor + ' - ' + data.payCeil
            }
        ];
    }

    d3.select('#info-panel .title')
        .text(state.selectedId ? datasets[state.selectedId].name : '');

    d3.select('#info-panel .items')
        // .style('display', data ? 'block' : 'none')
        .selectAll('.item')
        .data(items)
        .join('div')
        .classed('item', true)
        .html(function(d) {
            return '<div class="key">' + d.name.toUpperCase() + '</div><div>' + d.value.toUpperCase() + '</div>';
        });
}
