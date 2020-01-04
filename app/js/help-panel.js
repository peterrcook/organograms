function updateHelpPanel() {
    d3.select('#help-panel')
        .classed('active', state.showHelp);
}
