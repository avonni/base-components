import { createElement } from 'lwc';
import Map from 'c/map';

describe('Map', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-map', {
            is: Map
        });

        expect(element.center).toBeNull();
        expect(element.listView).toBe('auto');
        expect(element.mapMarkers).toBeNull();
        expect(element.markersTitle).toBe('Markers');
        expect(element.selectedMarkerValue).toBeUndefined();
        expect(element.showFooter).toBeFalsy();
        expect(element.zoomLevel).toBeNull();
    });

    // list-view
    // Depends on mapMarkers
    it('listView = auto, with one marker', () => {
        const element = createElement('base-map', {
            is: Map
        });
        document.body.appendChild(element);

        element.listView = 'auto';
        element.mapMarkers = [
            {
                location: {
                    Street: '1600 Pennsylvania Ave NW',
                    City: 'Washington',
                    State: 'DC'
                },

                title: 'The White House',
                description:
                    'Landmark, historic home & office of the United States president, with tours for visitors.'
            }
        ];

        return Promise.resolve().then(() => {
            const list = element.shadowRoot.querySelector('.slds-coordinates');
            expect(list).toBeFalsy();
        });
    });

    it('listView = auto, with several markers', () => {
        const element = createElement('base-map', {
            is: Map
        });
        document.body.appendChild(element);

        element.listView = 'auto';
        element.mapMarkers = [
            {
                location: {
                    Street: '1600 Pennsylvania Ave NW',
                    City: 'Washington',
                    State: 'DC'
                },

                title: 'The White House',
                description:
                    'Landmark, historic home & office of the United States president, with tours for visitors.'
            },
            {
                value: 'France1',
                location: {
                    City: "Cap-d'Ail",
                    Country: 'France'
                },

                icon: 'custom:custom26',
                title: "Cap-d'Ail"
            }
        ];

        return Promise.resolve().then(() => {
            const list = element.shadowRoot.querySelector('.slds-coordinates');
            expect(list).toBeTruthy();
        });
    });

    it('listView = visible', () => {
        const element = createElement('base-map', {
            is: Map
        });
        document.body.appendChild(element);

        element.listView = 'visible';

        return Promise.resolve().then(() => {
            const list = element.shadowRoot.querySelector('.slds-coordinates');
            expect(list).toBeTruthy();
        });
    });

    it('listView = hidden', () => {
        const element = createElement('base-map', {
            is: Map
        });
        document.body.appendChild(element);

        element.listView = 'hidden';

        return Promise.resolve().then(() => {
            const list = element.shadowRoot.querySelector('.slds-coordinates');
            expect(list).toBeFalsy();
        });
    });

    // markers-title
    // Depends on listView
    it('markersTitle', () => {
        const element = createElement('base-map', {
            is: Map
        });
        document.body.appendChild(element);

        element.listView = 'visible';
        element.markersTitle = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-coordinates__title'
            );
            const expected = expect.stringMatching(/^A String Title.+/);
            expect(title.textContent).toEqual(expected);
        });
    });

    // show-footer
    // Depends on mapMarkers
    it('showFooter = false', () => {
        const element = createElement('base-map', {
            is: Map
        });
        document.body.appendChild(element);

        element.showFooter = false;
        element.mapMarkers = [
            {
                location: {
                    Street: '1600 Pennsylvania Ave NW',
                    City: 'Washington',
                    State: 'DC'
                },

                title: 'The White House',
                description:
                    'Landmark, historic home & office of the United States president, with tours for visitors.'
            }
        ];

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector('c-external-link');
            expect(footer).toBeFalsy();
        });
    });

    it('showFooter = true', () => {
        const element = createElement('base-map', {
            is: Map
        });
        document.body.appendChild(element);

        element.showFooter = true;
        element.mapMarkers = [
            {
                location: {
                    Street: '1600 Pennsylvania Ave NW',
                    City: 'Washington',
                    State: 'DC'
                },

                title: 'The White House',
                description:
                    'Landmark, historic home & office of the United States president, with tours for visitors.'
            }
        ];

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector('c-external-link');
            expect(footer).toBeTruthy();
        });
    });
});
