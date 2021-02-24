import Component from 'avonni/map';

customElements.define('ac-avonni-map', Component.CustomElementConstructor);

export const Map = ({
    mapMarkers,
    markersTitle,
    selectedMarkerValue,
    center,
    zoomLevel,
    showFooter,
    listView,
    onchange
}) => {
    const element = document.createElement('ac-avonni-map');
    element.mapMarkers = mapMarkers;
    element.markersTitle = markersTitle;
    element.selectedMarkerValue = selectedMarkerValue;
    element.center = center;
    element.zoomLevel = zoomLevel;
    element.showFooter = showFooter;
    element.listView = listView;
    element.onchange = onchange;
    return element;
};
