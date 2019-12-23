var state = {
    width: null,
    height: null,

    selectedId: null,
    data: null,
    root: null,
    links: [],

    bitmapTransform: d3.zoomIdentity,
    vectorTransform: d3.zoomIdentity,

    voronoi: null,
    hoveredData: null,

    vectorUpdateTimer: null
}

function action(type, args) {
    // console.log('action', type, args);
    switch(type) {
    case 'selectDepartment':
        state.selectedId = args.id;
        loadData();
        break;
    case 'deselect':
        state.selectedId = null;
        state.bitmapTransform = d3.zoomIdentity;
        state.vectorTransform = d3.zoomIdentity;
        updateBitmapCanvas();
        updateGallery();
        break;
    case 'newData':
        state.data = args.data;
        state.root = getRoot(state.data);
        applyTreeLayout(state.root);

        state.nodes = getNodes(state.root);
        state.links = getLinks(state.root);
        state.voronoi = updateVoronoi(state.nodes);

        // updateAndCopyVectorCanvas();
        updateVectorCanvas();
        updateVectorNoTransformCanvas();
        updateBitmapCanvas();
        updateGallery();
        break;
    case 'updateZoomTransform':
        state.bitmapTransform = args.transform;
        updateBitmapCanvas();

        window.clearTimeout(state.vectorUpdateTimer);
        state.vectorUpdateTimer = window.setTimeout(updateAndCopyVectorCanvas, 300);
        break;
    case 'resize':
        state.width = window.innerWidth;
        state.height = window.innerHeight;
        break;
    case 'setVectorTransform':
        state.vectorTransform = args.transform;
        break;
    case 'setHoveredItem':
        state.hoveredData = args.itemData;
        updateInfoPanel();
        break;
    default:
        console.log('Unknown action', type);
    }

}
