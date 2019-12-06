function loadData() {
    d3.csv('data/' + state.selectedId + '.csv')
        .then(function(data) {
            action('newData', {data: data});
        });
}
