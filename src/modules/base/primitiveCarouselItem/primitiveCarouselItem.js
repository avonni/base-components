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
import { classSet } from 'c/utils';

export default class PrimitiveCarouselItem extends LightningElement {
    @api title;
    @api description;
    @api infos;
    @api imageAssistiveText;
    @api href;
    @api src;
    @api actions;
    @api itemIndex;
    @api panelIndex;
    @api isBottomPosition;
    @api actionsPosition;
    @api actionsVariant;
    @api hasActions;
    @api isMenuVariant;
    @api computedCarouselContentSize;

    @api panelItems;
    @api activeIndexPanel;

    /**
     * Retrieve image class - set to relative if not in bottom position.
     *
     * @type {string}
     */
    get computedCarouselImageClass() {
        return classSet('slds-carousel__image')
            .add({
                'slds-is-relative': !this.isBottomPosition
            })
            .toString();
    }

    /**
     * Computed actions container class styling based on action position attributes.
     *
     * @type {string}
     */
    get computedActionsContainerClass() {
        return classSet('avonni-carousel__actions')
            .add({
                'avonni-carousel__actions-bottom-center':
                    this._actionsPosition === 'bottom-center',
                'avonni-carousel__actions-right':
                    this._actionsPosition === 'bottom-right' ||
                    this._actionsPosition === 'top-right',
                'avonni-carousel__actions-left':
                    this._actionsPosition === 'bottom-left' ||
                    this._actionsPosition === 'top-left'
            })
            .add({
                'slds-p-around_small': !this.isBottomPosition,
                'slds-is-absolute': !this.isBottomPosition
            })
            .toString();
    }

    /**
     * Set actions variant button icon to bare if the action variant is bare, if not , set the button icon to border-filled.
     *
     * @type {string}
     */
    get computedActionsVariantButtonIcon() {
        return this._actionsVariant === 'bare' ? 'bare' : 'border-filled';
    }

    /**
     * Action button icon class styling based on attributes.
     *
     * @type {string}
     */
    get computedLightningButtonIconActionClass() {
        return classSet('')
            .add({
                'slds-m-horizontal_xx-small': this._actionsVariant === 'border',
                'slds-m-right_x-small slds-m-top_xx-small':
                    this._actionsVariant === 'bare'
            })
            .toString();
    }

    /**
     * Computed carousel content class - set to display content bottom if position is bottom.
     *
     * @type {string}
     */
    get computedCarouselContentClass() {
        return classSet('slds-carousel__content')
            .add({
                'avonni-carousel__content-bottom': this.isBottomPosition
            })
            .toString();
    }

    /**
     * Item clicked event handler.
     *
     * @param {event}
     */
    handleItemClicked(event) {
        const panelNumber = parseInt(
            event.currentTarget.dataset.panelIndex,
            10
        );
        const itemNumber = parseInt(event.currentTarget.dataset.itemIndex, 10);
        const itemData = this.panelItems[panelNumber].items[itemNumber];
        /**
         * The event fired when an item is clicked.
         *
         * @event
         * @name itemclick
         * @param {object} item The item data clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    item: itemData
                }
            })
        );
    }

    /**
     * Action click event handler.
     *
     * @param {Event}
     */
    handleActionClick(event) {
        const name = event.currentTarget.name;

        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name Name of the action clicked.
         * @param {object} item Item clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name,
                    item: this.panelItems[this.activeIndexPanel].items[
                        this.activeIndexPanel
                    ]
                }
            })
        );
    }
}
