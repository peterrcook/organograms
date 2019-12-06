function getRoot(data) {
    let stratify = d3.stratify()
        .id(d => d.id)
        .parentId(d => d.parentId);

    let root = stratify(data);

    return root;
}

function showChart(id) {
    action('selectDepartment', {id: id});
}

action('resize');
