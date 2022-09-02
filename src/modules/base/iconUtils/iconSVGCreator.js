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

import { fetchIconLibrary, getIconLibrary } from '../primitiveIcon/fetch'; 

const DEFAULT_ICON_NAME = 'empty';
const DEFAULT_ICON_CATEGORY = 'standard';
const DEFAULT_ICON_PATH = '/assets';
const DEFAULT_ICON_WEBSITE_PATH = '/assets/slds';
const ICON_ELEMENT_TYPES = [
    'svg',
    'g',
    'path',
    'circle',
    'ellipse',
    'rect',
    'line',
    'polygon',
    'linearGradient',
    'defs',
    'mask',
    'stop'
];
const SVG_ICON_SIZE = 25;
const VALID_ICON_CATEGORIES = [
    'standard',
    'utility',
    'doctype',
    'action',
    'custom'
];


export class IconSVGCreator {
    _iconsFolderPath = DEFAULT_ICON_PATH;
    _iconLibraries = {
        standard: null,
        utility: null,
        action: null,
        doctype: null,
        custom: null,
    };
    _resetViewMethod;


    constructor(resetMethod) {
        this.testIconPath(DEFAULT_ICON_PATH);
        this._resetViewMethod = resetMethod;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     *  Check if all the icon's libraries are ready.
     *
     * @return {boolean}
     */
    get areIconLibrariesReady() {
        return Object.keys(this._iconLibraries).every((category)=> this._iconLibraries[category] !== null);
    }

    /**
     *  Check if icon's path is available.
     *
     * @return {boolean}
     */
    get isIconPathAvailable(){
        return this._iconsFolderPath !== '';
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     *  Add element to create icon to data structure.
     */
    addIconElement(allElements, element, tag) {
        allElements.push({
            tagName: tag,
            attributes: this.extractAllAttributesOfElement(element)
        });
    }

    /**
     *  Append all elements from icon's template to svg.
     */
    appendAllElementsToIconSVG(elementsToCreateIcon, iconSVG) {
        let containerElement;
        let elementToAdd;
        // Add all attributes to svg
        elementsToCreateIcon.forEach((element) => {
            // Append element to right container
            if (this.isElementAContainer(element)) {
                containerElement = iconSVG.append(element.tagName);
                elementToAdd = containerElement;
            } else if (containerElement) {
                elementToAdd = containerElement.append(element.tagName);
            } else {
                elementToAdd = iconSVG.append(element.tagName);
            }

            // Add all the attributes of element
            Object.keys(element.attributes).forEach((attribute) => {
                elementToAdd.attr(
                    attribute,
                    element.attributes[attribute]
                );
            });
        });
    }

    /**
     *  Create icon from one of the default path.
     */
    createIconFromDefaultPath(foreignObjectForIcon, iconInformation) {
        const iconContainer = foreignObjectForIcon
            .append('xhtml:span')
            .attr(
                'class',
                'slds-icon slds-icon_container ' +
                    iconInformation.categoryIconClass
            )

            .html(
                '<svg class="slds-icon"><use xlink:href=' +
                    iconInformation.xLinkHref +
                    '></use></svg>'
            );

        const iconSVG = iconContainer
            .select('svg')
            .attr(
                'class',
                `slds-icon slds-icon_${this.getIconSize(
                    iconInformation.category
                )} `
            );

        return iconSVG;
    }

    /**
     * Create icon from template found in libraries. This method will be used if the default path are invalid.
     */
    createIconFromTemplate(foreignObjectForIcon, iconInformation) {
        const elementsToCreateIcon = this.extractElementsFromIconTemplate(iconInformation);
        const svgAttributes = elementsToCreateIcon.svg;

        // Create svg to contain icon
        const iconSVG = foreignObjectForIcon
            .append('xhtml:span')
            .attr(
                'class',
                'slds-icon slds-icon_container ' +
                    iconInformation.categoryIconClass
            )
            .append('svg')
            .attr('width', SVG_ICON_SIZE)
            .attr('height', SVG_ICON_SIZE)
            .attr(
                'class',
                `slds-icon slds-icon_${this.getIconSize(
                    iconInformation.category
                )} `
            )
            .attr(
                'data-key',
                svgAttributes.dataKey
                    ? svgAttributes.dataKey
                    : iconInformation.iconName
            )
            .attr(
                'focusable',
                svgAttributes.focusable ? svgAttributes.focusable : 'false'
            )
            .attr(
                'viewBox',
                svgAttributes.viewBox ? svgAttributes.viewBox : '0 0 100 100'
            );

        this.appendAllElementsToIconSVG(elementsToCreateIcon.childrenElements, iconSVG);

        return iconSVG;
    }

    /**
     *  Extract all attributes from icon's element (string). The format will be : { attribute1: value, attribute2: value, ... }.
     *
     * @return {object}
     */
    extractAllAttributesOfElement(element) {
        element = this.sliceAttributes(element);
        const allAttributes = element.split(',');

        let attributes = {};
        allAttributes.forEach((attribute) => {
            const [attributeName, attributeValue] = attribute
                .replace(/"/g, '')
                .split(':');
            attributes[attributeName] = attributeValue.trim();
        });

        return attributes;
    }

    /**
     * Extract all elements and attributes from icon's template.
     *
     * @return {object}
     */
    extractElementsFromIconTemplate(iconInformation) {
        let elementsToCreateIcon = {
            svg: {},
            childrenElements: []
        };

        if (this.areIconLibrariesReady) {
            const template = this.findIconTemplate(iconInformation);

            if (template && template !== null) {
                const apiElements = template.split('api_element(');

                // Find all elements and attributes to create icon
                apiElements.forEach((element) => {
                    const elementType = ICON_ELEMENT_TYPES.find((type) =>
                        element.includes(`"${type}"`)
                    );

                    if (elementType && elementType === 'svg') {
                        elementsToCreateIcon.svg =
                            this.extractAllAttributesOfElement(element);
                    } else if (elementType && elementType !== -1) {
                        this.addIconElement(
                            elementsToCreateIcon.childrenElements,
                            element,
                            elementType
                        );
                    }
                });
            }
        }
        return elementsToCreateIcon;
    }

    /**
     * Get the icon's template from library and remove unwanted characters.
     *
     * @return {string}
     */
    findIconTemplate(iconInformation) {
        let template = null;

        if (this.areIconLibrariesReady) {
            const iconFileName = `${iconInformation.category}_${iconInformation.iconName}`;
            template = this._iconLibraries[iconInformation.category][iconFileName];

            if (template && template !== null) {
                // Removing different whitespace characters
                template = template
                    .toString()
                    .replace(/\s{2,}/g, '')
                    .replace(/\n/g, '');
            }
        }

        return template;
    }

    /**
     * Get size of icon depending of category.
     *
     * @return {string}
     */
    getIconSize(category) {
        if (category === 'action') {
            return 'x-small';
        }
        return 'small';
    }

    /**
     * Get xLink href of icon.
     *
     * @return {string}
     */
    getIconXLinkHref(iconCategory, iconName){
        return `${this._iconsFolderPath}/icons/${iconCategory}-sprite/svg/symbols.svg#${iconName}`;
    }

    /**
     *  Check if element is a container for the svg icon.
     *
     * @return {boolean}
     */
    isElementAContainer(element) {
        return element.tagName === 'g' || element.tagName === 'mask';
    }

    /**
     *  Set all the icon's libraries if the default paths are not working.
     */
    async setIconLibraries() {
        for(const category of VALID_ICON_CATEGORIES){
            this._iconLibraries[category] = getIconLibrary('ltr', category);
        }

        try {
            this._iconLibraries.standard = await fetchIconLibrary(
                'ltr',
                'standard'
            );
            this._iconLibraries.utility = await fetchIconLibrary('ltr', 'utility');
            this._iconLibraries.action = await fetchIconLibrary('ltr', 'action');
            this._iconLibraries.doctype = await fetchIconLibrary('ltr', 'doctype');
            this._iconLibraries.custom = await fetchIconLibrary('ltr', 'custom');

            // To re-render view that contains icons when libraries are ready.
            this._resetViewMethod();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     *  Extract attributes (type and value) from element of icon's template.
     *
     * @return {string}
     */
    sliceAttributes(element) {
        return element.slice(
            element.indexOf('attrs: {') + 'attrs: {'.length,
            element.indexOf('},')
        );
    }

    /**
     * Test if icon's path is correct to determine the best method to fetch icons.
     */
    async testIconPath(iconPath) {
        fetch(
            `${iconPath}/icons/${DEFAULT_ICON_CATEGORY}-sprite/svg/symbols.svg#${DEFAULT_ICON_NAME}`
        ).then((response) => {
            // The path is incorrect
            if (response.status === 404 || !response.ok) {
                if (iconPath === DEFAULT_ICON_PATH) {
                    this._iconsFolderPath = DEFAULT_ICON_WEBSITE_PATH;
                    this.testIconPath(DEFAULT_ICON_WEBSITE_PATH);
                } else {
                    // The two default paths are not working, we fetch the icon's libraries
                    this._iconsFolderPath = '';
                    this.setIconLibraries();
                }
            }
            // The path is correct
            else {
                this._iconsFolderPath = iconPath;
            }
        });
    }
}
