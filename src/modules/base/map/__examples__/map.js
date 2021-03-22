import Component from 'base/map';

customElements.define('ac-base-map', Component.CustomElementConstructor);

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
    const element = document.createElement('ac-base-map');
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
