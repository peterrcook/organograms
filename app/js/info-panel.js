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

    console.log(data);

    d3.select('#info-panel')
        .style('display', data ? 'block' : 'none')
        .select('tbody')
        .selectAll('.item')
        .data(items)
        .join('tr')
        .classed('item', true)
        .html(function(d) {
            return '<td class="key">' + d.name.toUpperCase() + ':</td><td>' + d.value.toUpperCase() + '</td>';
        });
}
