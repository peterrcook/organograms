function updatePanels() {
    d3.select('#wrapper')
        .classed('gallery-active', !state.selectedId && !state.showHelp)
        .classed('chart-active', state.selectedId && !state.showHelp)
        .classed('help-active', state.showHelp);
}
