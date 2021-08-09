import { LightningElement } from 'lwc';

let selectedMarkerValue;

export default class MapMultipleMarkers extends LightningElement {
    
    onchange(event){
        selectedMarkerValue = event.detail.selectedMarkerValue;
    }
    
    selectedMarkerValue = selectedMarkerValue;
    mapMarkers = [
        {
            value: 'France1',
            location: {
                City: "Cap-d'Ail",
                Country: 'France'
            },

            icon: 'custom:custom26',
            title: "Cap-d'Ail"
        },
        {
            value: 'France2',
            location: {
                City: 'Beaulieu-sur-Mer',
                Country: 'France'
            },

            icon: 'custom:custom96',
            title: 'Beaulieu-sur-Mer'
        },
        {
            value: 'France3',
            location: {
                City: 'Saint-Jean-Cap-Ferrat',
                Country: 'France'
            },

            title: 'Saint-Jean-Cap-Ferrat'
        },
        {
            value: 'France4',
            location: {
                City: 'Villefranche-sur-Mer',
                Country: 'France'
            },

            icon: 'custom:custom92',
            title: 'Villefranche-sur-Mer'
        },
        {
            value: 'France5',
            location: {
                City: 'Antibes',
                Country: 'France'
            },

            icon: 'custom:custom61',
            title: 'Antibes'
        },
        {
            value: 'France6',
            location: {
                City: 'Juan-les-Pins',
                Country: 'France'
            },

            icon: 'custom:custom74',
            title: 'Juan-les-Pins'
        },
        {
            value: 'France7',
            location: {
                City: 'Cannes',
                Country: 'France'
            },

            icon: 'custom:custom3',
            title: 'Cannes'
        },
        {
            value: 'France8',
            location: {
                City: 'Saint-Raphaël',
                Country: 'France'
            },

            icon: 'custom:custom54',
            title: 'Saint-Raphaël'
        },
        {
            value: 'France9',
            location: {
                City: 'Fréjus',
                Country: 'France'
            },

            icon: 'custom:custom88',
            title: 'Fréjus'
        },
        {
            value: 'France10',
            location: {
                City: 'Sainte-Maxime',
                Country: 'France'
            },

            icon: 'custom:custom92',
            title: 'Sainte-Maxime'
        }
    ]
}