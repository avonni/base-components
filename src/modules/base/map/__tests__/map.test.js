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
