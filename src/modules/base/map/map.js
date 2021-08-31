/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

 import { LightningElement, api } from 'lwc';
 import {
     deepCopy,
     normalizeString,
     classListMutation,
     guid
 } from 'c/utilsPrivate';
 import {
     registerMessageHandler,
     createMessage,
     postMessage
 } from 'c/messageDispatcher';
 
 function getCoordinates(location) {
     let coordinates;
 
     if (location.Latitude && location.Longitude && !location.Street) {
         coordinates = `${location.Latitude}, ${location.Longitude}`;
     } else {
         coordinates = [location.Street, location.City, location.State]
             .filter((e) => e)
             .join(', ');
     }
 
     return coordinates;
 }
 
 function defineProperty(data, index, value) {
     if (index in data) {
         Object.defineProperty(data, index, {
             value: value,
             enumerable: true,
             configurable: true,
             writable: true
         });
     } else {
         data[index] = value;
     }
 
     return data;
 }
 
 const i18n = {
     openInGoogleMapsString: 'Open in Google Maps',
     coordinatesTitleString: 'Markers',
     primitiveMapIframeTitle: 'Map Container'
 };
 
 const mapHref = 'https://www.google.com/maps/place/';
 const config = {
     SET_MAP_PARAM: 'set-map-param'
 };
 
 /**
 * @class
 * @descriptor avonni-map
 * @storyId example-map--single-marker
 */
 export default class Map extends LightningElement {
     /**
     * If present, the footer element is displayed below the map. The footer shows an 'Open in Google Maps' link that opens an external window to display the selected marker location in Google Maps. Default value is false.
     *
     * @type {boolean}
     * @public
     * @default false
     */
     @api showFooter = false;
     /**
     * Displays or hides the list of locations. Valid values are visible, hidden, or auto. This value defaults to auto, which shows the list only when multiple markers are present.
     * Passing in an invalid value hides the list view.
     *
     * @type {string}
     * @public
     * @default auto
     */
     @api listView = 'auto';
 
     _mapHref = mapHref;
     _coordinates = [];
     _activeCoordinate = null;
     _markersTitle = i18n.coordinatesTitleString;
 
     privateZoomLevel = null;
     privateCenter = null;
     privateMarkers = null;
     privateCoordinateItems = [];
     mapDomain = 'https://maps.b.forceusercontent.com:443';
     mapSrc = `${this.mapDomain}/lightningmaps/mapsloader?resource=primitiveMap&version=224`;
 
     /**
     * The zoom levels as defined by Google Maps API. If a zoom level is not specified, a default zoom level is applied to accommodate all markers on the map.
     *
     * @type {number}
     * @public
     */
     @api
     get zoomLevel() {
         return this.privateZoomLevel;
     }
 
     set zoomLevel(value) {
         this.privateZoomLevel = value;
         this.sendMessage({
             zoomLevel: this.privateZoomLevel
         });
     }
 
     /**
     * A location to use as the map's center. If center is not specified, the map centers automatically.
     *
     * @type {object}
     * @public
     */
     @api
     get center() {
         return this.privateCenter;
     }
 
     set center(value) {
         this.privateCenter = value;
         const item = this.primitivifyMarker(deepCopy(this.center));
 
         this.sendMessage({
             center: item
         });
     }
 
     /**
     * Provides the heading title for the markers. Required if specifying multiple markers. The title is displayed below the map as a header for the list of clickable addresses.
     *
     * @type {string}
     * @public
     * @default Markers
     */
     @api
     get markersTitle() {
         return this._markersTitle;
     }
 
     set markersTitle(value) {
         this._markersTitle = normalizeString(value)
             .split(' ')
             .map((item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`)
             .join(' ');
     }
 
     /**
     * Provides the value of the currently selected marker. Returns undefined if you don’t pass value to map-markers.
     *
     * @type {string}
     * @public
     */
     @api
     get selectedMarkerValue() {
         if (this._coordinatesMapByKey) {
             const coordinates = this._coordinatesMapByKey[this._activeMarkerId];
 
             if (coordinates) {
                 return coordinates.value;
             }
         }
 
         return this._initialSelectedMarkerValue;
     }
 
     set selectedMarkerValue(value) {
         if (this.isMarkerReady) {
             const coordinates = this._coordinatesMapByValue[value];
             const key = coordinates && coordinates.key;
             this._activeMarkerId !== key && this.selectMarker(key);
         } else {
             this._initialSelectedMarkerValue = value;
         }
     }
 
     /**
     * One or more objects with the address or latitude and longitude to be displayed on the map. If latitude and longitude are provided, the address is ignored.
     *
     * @type {object[]}
     * @public
     * @required
     */
     @api
     get mapMarkers() {
         return this.privateMarkers;
     }
 
     set mapMarkers(value) {
         this.privateMarkers = value;
         this.initMarkers(value);
         this._activeCoordinate = value[0];
     }
 
     /**
      * Localization.
      * 
      * @type {object}
      */
     get i18n() {
         return i18n;
     }
 
     /**
      * Display marker if populated.
      * 
      * @type {boolean}
      */
     get isMarkerReady() {
         return (
             this._coordinatesMapByKey && this.privateCoordinateItems.length > 0
         );
     }
 
     /**
      * Retrieve map URI to link.
      * 
      * @type {string}
      */
     get mapHref() {
         const location = this._activeCoordinate.location;
         let link = '';
 
         if (location.Latitude && location.Longitude) {
             link = encodeURI(
                 `${mapHref}${location.Latitude},${location.Longitude}`
             );
         } else {
             link = encodeURI(
                 `${mapHref}${normalizeString(
                     location.Street
                 )}+${normalizeString(location.City)}+${normalizeString(
                     location.State
                 )}+${normalizeString(location.PostalCode)}`
             );
         }
 
         return link;
     }
 
     /**
      * Display side bar coordinates.
      * 
      * @type {object}
      */
     get showCoordinatesSidebar() {
         return {
             visible: true,
             hidden: false,
             auto: this._coordinates && this._coordinates.length > 1
         }[this.listView];
     }
 
     connectedCallback() {
         this._dispatchId = registerMessageHandler((value) => {
             this.handleMessage(value);
         });
         classListMutation(this.classList, {
             'slds-grid': true,
             'slds-has-coordinates': this.showCoordinatesSidebar
         });
     }
 
     renderedCallback() {
         if (this._initialSelectedMarkerValue) {
             const selectedMarkerValue = this._initialSelectedMarkerValue;
             this._initialSelectedMarkerValue = null;
             this.selectedMarkerValue = selectedMarkerValue;
         }
     }
 
     /**
      * Initialize map based on provided markers.
      * 
      * @param {object[]} mapMarkers 
      */
     initMarkers(mapMarkers) {
         const mapMarkersLength = mapMarkers.length;
         const coordinates = [];
         const coordinatesMapByKey = {};
         const coordinatesMapByValue = {};
         let key;
         let index = 0;
         let marker = {};
 
         for (; index < mapMarkersLength; index++) {
             key = guid();
             marker = deepCopy(mapMarkers[index]);
             marker.key = key;
             marker.formattedAddress = getCoordinates(marker.location);
 
             if (!marker.icon) {
                 marker.icon = 'standard:location';
             }
 
             coordinates.push(marker);
             coordinatesMapByKey[key] = marker;
 
             if (marker.value) {
                 coordinatesMapByValue[marker.value] = marker;
             }
         }
 
         this._coordinates = coordinates;
         this._coordinatesMapByKey = coordinatesMapByKey;
         this._coordinatesMapByValue = coordinatesMapByValue;
 
         const item = this._coordinates.map((e) => this.primitivifyMarker(e));
 
         this.sendMessage({
             markers: item
         });
     }
 
     /**
      * Coordinate register event handler.
      * 
      * @param {Event} event 
      */
     handleCoordinateRegister(event) {
         event.stopPropagation();
         this.privateCoordinateItems.push(event.srcElement);
     }
 
     /**
      * Coordinate click event handler.
      * 
      * @param {Event} event 
      */
     handleCoordinateClick(event) {
         const key = event.detail.key;
         this.selectMarker(key);
         this.sendMessage({
             activeMarkerId: this._activeMarkerId
         });
         this.dispatchSelectedMarkerValue();
     }
 
     /**
      * Coordinate hover event handler.
      * 
      * @param {Event} event 
      */
     handleCoordinateHover(event) {
         this._hoverMarkerId = event.detail.key;
         this.sendMessage({
             hoverMarkerId: this._hoverMarkerId
         });
     }
 
     /**
      * Message handler from item.
      * 
      * @param {object} item 
      */
     handleMessage(item) {
         if (item.event === 'markerselect') {
             const key = item.arguments.key;
             this.selectMarker(key);
             this.dispatchSelectedMarkerValue();
         }
     }
 
     /**
      * Selected Marker value event dispatcher.
      */
     dispatchSelectedMarkerValue() {
         /**
         * Event fired when the marker value changes.
         *
         * @event
         * @name change
         * @param {string} selectedMarkerValue
         * @public
         * @bubbles
         * @composed
         */
         this.dispatchEvent(
             new CustomEvent('change', {
                 composed: true,
                 bubbles: true,
                 detail: {
                     selectedMarkerValue: this.selectedMarkerValue
                 }
                })
                );
     }
 
     /**
      * Select marker method.
      * 
      * @param {string} key 
      */
     selectMarker(key) {
         const activeCoordinate = this._coordinatesMapByKey[key];
 
         this._activeCoordinate = activeCoordinate;
         this._activeMarkerId = key;
 
         this.privateCoordinateItems.forEach((item) => {
             if (item.guid === key) {
                 item.selected = true;
             } else {
                 item.selected = false;
             }
         });
 
         /**
         * The event that fires when the marker is selected.
         *
         * @event
         * @name markerselect
         * @param {string} selectedMarkerValue
         * @public
         * @bubbles
         * @composed
         */
         const event = new CustomEvent('markerselect', {
             bubbles: true,
             composed: true,
             detail: {
                 selectedMarkerValue: this.selectedMarkerValue
             }
         });
 
         this.dispatchEvent(event);
     }
 
     /**
      * Compute marker data to value.
      * 
      * @param {object} e 
      * @returns {object} value
      */
     primitivifyMarker(e) {
         let value = null;
 
         if (e && e.location) {
             value = (function (data) {
                 for (let index = 1; index < arguments.length; index++) {
                     let argument =
                         arguments[index] != null ? arguments[index] : {};
                     let keys = Object.keys(argument);
 
                     if (typeof Object.getOwnPropertySymbols == 'function') {
                         keys = keys.concat(
                             Object.getOwnPropertySymbols(argument).filter(
                                 function (e) {
                                     return Object.getOwnPropertyDescriptor(
                                         argument,
                                         e
                                     ).enumerable;
                                 }
                             )
                         );
                     }
 
                     keys.forEach(function (i) {
                         defineProperty(data, i, argument[i]);
                     });
                 }
                 return data;
             })(
                 { key: e.key, title: e.title, description: e.description },
                 e.location
             );
         }
 
         return value;
     }
 
     /**
      * Dispatch message on map load.
      * 
      * @param {object} e 
      * @param {object} t
      */
     sendMessage(e, t) {
         if (
             ((t = t || config.SET_MAP_PARAM),
             this.iframeLoaded && this._handler)
         ) {
             const i = createMessage(this._dispatchId, t, e);
             postMessage(this._handler, i, '*');
         }
     }
 
     /**
      * Window Iframe loaded handler.
      * 
      * @param {Event} event 
      */
     handleIframeLoad(event) {
         this._handler = event.detail.callbacks.postToWindow;
 
         const value = this.center
             ? this.primitivifyMarker(deepCopy(this.center))
             : null;
         const zoomLevel = this.zoomLevel;
         const markers = deepCopy(this._coordinates).map((e) =>
             this.primitivifyMarker(e)
         );
 
         this.iframeLoaded = true;
         this.mapIframe = event.detail;
         this.sendMessage({
             center: value,
             markers: markers,
             zoomLevel: zoomLevel
         });
     }
 }
 