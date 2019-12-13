function updateGallery() {
    d3.select('.gallery')
        .style('display', state.selectedId ? 'none' : 'block');
}
