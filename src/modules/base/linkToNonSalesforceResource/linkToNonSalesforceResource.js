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
 * @descriptor avonni-link-to-non-salesforce-resource
 */
export default class LinkToNonSalesforceResource extends LightningElement {
    /**
     * The link label.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * The link title.
     *
     * @type {string}
     * @public
     */
    @api title;
    /**
     * The URL/URI for the link.
     *
     * @type {string}
     * @public
     */
    @api href;
    /**
     * The relationship between the current component and the link document.
     *
     * @type {string}
     * @public
     */
    @api rel;

    /**
     * Parse the link dom element and the salesforce forcehelp-link.
     *
     * @type {Element|string}
     * @public
     */
    @api
    get parsedHref() {
        const element = this.template.querySelector('forcehelp-link');
        const link = element && element.shadowRoot.querySelector('a');
        return link && link.href;
    }
}

/**
 * Allow for interoperability of the current component's events to the link document.
 */
LinkToNonSalesforceResource.interopMap = {
    exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true
    }
};
