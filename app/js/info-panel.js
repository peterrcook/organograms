function getItemsHtml() {
    var data = state.hoveredData;

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
            value: data.payCeil === '' ? '' : data.payCeil === '0' ? 'Unknown' : '£' + data.payFloor + ' - ' + data.payCeil
        }
    ];

    var html = '';

    items.forEach(function(d) {
        if(d.value) {
            html += '<div class="item"><div class="key">' + d.name.toUpperCase() + '</div><div>' + d.value.toUpperCase() + '</div></div>';
        }
    });

    return html;
}

function updateInfoPanel() {
    var data = state.hoveredData;

    d3.select('#info-panel .title')
        .text(state.selectedId ? datasets[state.selectedId].name : '');

    d3.select('#info-panel .items')
        .html(data ? getItemsHtml() : '');
}
