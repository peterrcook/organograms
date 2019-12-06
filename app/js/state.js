var state = {
    width: null,
    height: null,

    selectedId: null,
    data: null,
    root: null
}

function action(type, args) {
    console.log('action', type, args);
    switch(type) {
    case 'selectDepartment':
        state.selectedId = args.id;
        loadData();
        break;
    case 'deselect':
        state.selectedId = null;
        update();
        break;
    case 'newData':
        state.data = args.data;
        state.root = getRoot(state.data);
        update();
        break;
    case 'resize':
        state.width = window.innerWidth;
        state.height = window.innerHeight;
        update();
        break;
    default:
        console.log('Unknown action', type);
    }

}
