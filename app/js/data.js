var datasets = {
    'bis': {
        name: 'Department for Business, Innovation & Skills'
    },
    'co': {
        name: 'Cabinet Office'
    },
    'dclg': {
        name: 'Department for Communities and Local Government'
    },
    'dcms': {
        name: 'Department for Digital, Culture, Media & Sport'
    },
    'decc': {
        name: 'Department of Energy & Climate Change'
    },
    'defra': {
        name: 'Department for Environment, Food & Rural Affairs'
    },
    'dfe': {
        name: 'Department for Education'
    },
    'dfid': {
        name: 'Department for International Development'
    },
    'dft': {
        name: 'Department for Transport'
    },
    'dh': {
        name: 'Department of Health'
    },
    'dwp': {
        name: 'Department for Work and Pensions'
    },
    'fco': {
        name: 'Foreign and Commonwealth Office'
    },
    'hmrc': {
        name: "Her Majesty's Revenue and Customs"
    },
    'hmt': {
        name: "Her Majesty's Treasury"
    },
    'ho': {
        name: 'Home Office'
    },
    'mod': {
        name: 'Ministry of Defence'
    },
    'moj': {
        name: 'Ministry of Justice'
    },
};

function loadData() {
    d3.csv('data/' + state.selectedId + '.csv')
        .then(function(data) {
            action('newData', {data: data});
        });
}
