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
        state.data = null;
        state.selectedId = null;
        state.hoveredData = null;
        state.bitmapTransform = d3.zoomIdentity;
        state.vectorTransform = d3.zoomIdentity;
        updateBitmapCanvas();
        updateGallery();
        updateInfoPanel();
        break;
    case 'newData':
        state.data = args.data;
        state.root = getRoot(state.data);
        applyTreeLayout(state.root);

        state.nodes = getNodes(state.root);
        state.links = getLinks(state.root);
        state.voronoi = updateVoronoi(state.nodes);

        updateVectorCanvas();
        updateVectorNoTransformCanvas();
        updateBitmapCanvas();
        updateInfoPanel();
        updateGallery();
        resetZoom();
        break;
    case 'updateZoomTransform':
        state.hoveredData = null;
        state.bitmapTransform = args.transform;
        updateBitmapCanvas();

        window.clearTimeout(state.vectorUpdateTimer);
        state.vectorUpdateTimer = window.setTimeout(updateAndCopyVectorCanvas, 300);
        break;
    case 'resize':
        state.width = window.innerWidth;
        state.height = window.innerHeight;

        if(state.data) {
            // If we use a normalised size of [2 * Math.PI, 1] in the tree layout
            // we won't need to recompute the tree here.
            applyTreeLayout(state.root);

            state.nodes = getNodes(state.root);
            state.links = getLinks(state.root);
            state.voronoi = updateVoronoi(state.nodes);

            updateVectorCanvas();
            updateVectorNoTransformCanvas();
            updateBitmapCanvas();
        }
        break;
    case 'setVectorTransform':
        state.vectorTransform = args.transform;
        break;
    case 'setHoveredItem':
        var prevHoveredData = state.hoveredData;
        state.hoveredData = args.item ? args.item.data.data : null;
        if(prevHoveredData !== state.hoveredData) {
            updateInfoPanel();
            updateHighlight();
        }
        break;
    default:
        console.log('Unknown action', type);
    }

}
