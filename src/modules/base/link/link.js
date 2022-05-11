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

/**
 * @class
 * @descriptor avonni-link
 */
export default class Link extends LightningElement {
    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Specify the class name for the link.
     *
     * @type {string}
     * @public
     */
    @api className;
    /**
     * The URL/URI for the link.
     *
     * @type {string}
     * @public
     */
    @api href;
    /**
     * The link label.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * The relationship between the current component and the link document.
     *
     * @type {string}
     * @public
     * @default
     */
    @api rel;
    /**
     * Target attribute that controls what happens when clicking on the link. Default is "_blank" which opens the link in a new window.
     *
     * @type {string}
     * @default _blank
     */
    @api target = '_blank';
    /**
     * The title for the link.
     *
     * @type {string}
     * @public
     */
    @api title;
    /**
     * The link type.
     *
     * @type {string}
     * @public
     */
    @api type;

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed Href from provided uri.
     *
     * @type {string}
     */
    get computedHref() {
        return this.href
            ? '/HelpAndTrainingDoor?version=2&resource=' +
                  encodeURIComponent(this.href)
            : '';
    }

    /**
     * Computed class for the link.
     *
     * @type {string}
     */
    get computedClass() {
        return this.className || '';
    }

    /**
     * Retrieve link DOM element.
     *
     * @type {Element}
     */
    get linkElement() {
        return this.template.querySelector('[data-element-id="a"]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set focus on the link element.
     *
     * @public
     */
    @api
    focus() {
        this.linkElement.focus();
    }

    /**
     * Removes focus on the link element.
     *
     * @public
     */
    @api
    blur() {
        this.linkElement.blur();
    }
}
