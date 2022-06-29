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
import Skeleton from '../skeleton';

let element;
describe('Skeleton', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-skeleton', {
            is: Skeleton
        });
        document.body.appendChild(element);
    });

    it('Skeleton: Default attributes', () => {
        expect(element.animation).toBeUndefined();
        expect(element.height).toBeUndefined();
        expect(element.variant).toBe('text');
        expect(element.width).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // skeleton-base
    it('Skeleton: base', () => {
        const skeleton = element.shadowRoot.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
        return Promise.resolve().then(() => {
            expect(skeleton.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeleton.className).toContain(
                'avonni-skeleton__animation-undefined'
            );
        });
    });

    // skeleton-variant rectangular
    it('Skeleton: rectangular variant', () => {
        element.variant = 'rectangular';
        const skeleton = element.shadowRoot.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
        return Promise.resolve().then(() => {
            expect(skeleton.className).toContain(
                'avonni-skeleton__variant-rectangular'
            );
            expect(skeleton.className).toContain(
                'avonni-skeleton__animation-undefined'
            );
        });
    });

    // skeleton-variant circular
    it('Skeleton: circular variant', () => {
        element.variant = 'circular';
        const skeleton = element.shadowRoot.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
        return Promise.resolve().then(() => {
            expect(skeleton.className).toContain(
                'avonni-skeleton__variant-circular'
            );
            expect(skeleton.className).toContain(
                'avonni-skeleton__animation-undefined'
            );
        });
    });

    // skeleton-height undefined
    it('Skeleton: undefined height should set component height to undefined and DOM avonni-skeleton height to default height for text variant (0.7em)', () => {
        element.variant = 'text';
        element.height = undefined;
        const skeleton = element.shadowRoot.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
        return Promise.resolve().then(() => {
            expect(skeleton.style.height).toBe('0.7em');
            expect(element.height).toBe(undefined);
        });
    });

    // skeleton-height defined
    it('Skeleton: 100px height should set component and DOM avonni-skeleton height to 100px', () => {
        element.variant = 'rectangular';
        element.height = '100px';
        const skeleton = element.shadowRoot.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
        return Promise.resolve().then(() => {
            expect(element.height).toBe('100px');
            expect(skeleton.style.height).toBe('100px');
        });
    });

    // skeleton-width undefined
    it('Skeleton: undefined width should set component height to undefined and DOM avonni-skeleton height to default width for text variant (0.7em)', () => {
        element.variant = 'text';
        element.width = undefined;
        const skeleton = element.shadowRoot.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
        return Promise.resolve().then(() => {
            expect(skeleton.style.width).toBe('100%');
            expect(element.width).toBe(undefined);
        });
    });

    // skeleton-width defined
    it('Skeleton: 100px width should set component and DOM avonni-skeleton width to 100px', () => {
        element.variant = 'rectangular';
        element.width = '100px';
        const skeleton = element.shadowRoot.querySelector(
            '[data-element-id="avonni-skeleton"]'
        );
        return Promise.resolve().then(() => {
            expect(element.width).toBe('100px');
            expect(skeleton.style.width).toBe('100px');
        });
    });

    // avatar variant
    it('Skeleton Avatar: pulse animation', () => {
        element.variant = 'avatar';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'circle',
            size: 'x-large',
            primaryText: 'primary',
            secondaryText: 'secondary',
            tertiaryText: 'tertiary'
        };

        return Promise.resolve().then(() => {
            const skeletonAvatarFigure = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__avatar-figure"]'
            );
            const skeletonAvatarPrimaryText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__avatar-primary-text"]'
            );
            const skeletonAvatarSecondaryText =
                element.shadowRoot.querySelector(
                    '[data-element-id="avonni-skeleton__avatar-secondary-text"]'
                );
            const skeletonAvatarTertiaryText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__avatar-tertiary-text"]'
            );
            expect(skeletonAvatarFigure.className).toContain('slds-avatar');
            expect(skeletonAvatarFigure.className).toContain(
                'avonni-skeleton__avatar-animation-pulse'
            );
            expect(skeletonAvatarFigure.className).toContain(
                'avonni-skeleton__avatar_x-large'
            );
            expect(skeletonAvatarPrimaryText.className).toContain(
                'slds-m-bottom_xx-small'
            );
            expect(skeletonAvatarPrimaryText.className).toContain(
                'avonni-skeleton__avatar-primary-text'
            );
            expect(skeletonAvatarPrimaryText.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonAvatarPrimaryText.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonAvatarSecondaryText.className).toContain(
                'slds-m-bottom_xx-small'
            );
            expect(skeletonAvatarSecondaryText.className).toContain(
                'avonni-skeleton__avatar-secondary-text'
            );
            expect(skeletonAvatarSecondaryText.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonAvatarSecondaryText.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonAvatarTertiaryText.className).toContain(
                'avonni-skeleton__avatar-tertiary-text'
            );
            expect(skeletonAvatarTertiaryText.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonAvatarTertiaryText.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
        });
    });

    // avatar variant
    it('Skeleton Avatar: size medium', () => {
        element.variant = 'avatar';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'circle',
            size: 'medium',
            primaryText: 'primary',
            secondaryText: 'secondary',
            tertiaryText: 'tertiary'
        };

        return Promise.resolve().then(() => {
            const skeletonAvatar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__avatar-figure"]'
            );
            const skeletonAvatarPrimaryText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__avatar-primary-text"]'
            );
            const skeletonAvatarSecondaryText =
                element.shadowRoot.querySelector(
                    '[data-element-id="avonni-skeleton__avatar-secondary-text"]'
                );
            const skeletonAvatarTertiaryText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__avatar-tertiary-text"]'
            );
            expect(skeletonAvatar).toBeTruthy();
            expect(skeletonAvatarPrimaryText).toBeTruthy();
            expect(skeletonAvatarSecondaryText).toBeTruthy();
            expect(skeletonAvatarTertiaryText).not.toBeTruthy();
        });
    });

    // badge variant
    it('Skeleton Badge: base variant with left icon', () => {
        element.variant = 'badge';
        element.animation = 'pulse';
        element.variantAttributes = {
            hasIcon: true,
            variant: 'base',
            iconPosition: 'left'
        };

        return Promise.resolve().then(() => {
            const skeletonBadge = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-badge-wrapper"]'
            );
            const skeletonBadgeLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-badge-label"]'
            );
            const skeletonBadgeLeftIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__badge-left-icon"]'
            );

            expect(skeletonBadgeLeftIcon).toBeTruthy();
            expect(skeletonBadge.className).toContain('avonni-skeleton__badge');
            expect(skeletonBadge.className).not.toContain(
                'avonni-chip_outline'
            );
            expect(skeletonBadge.className).toContain(
                'avonni-badge_theme-base'
            );
            expect(skeletonBadge.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonBadgeLabel.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonBadgeLabel.className).toContain(
                'avonni-skeleton__badge-label'
            );
        });
    });

    it('Skeleton Badge: base variant with right icon', () => {
        element.variant = 'badge';
        element.animation = 'pulse';
        element.variantAttributes = {
            hasIcon: true,
            variant: 'base',
            iconPosition: 'right'
        };

        return Promise.resolve().then(() => {
            const skeletonBadge = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-badge-wrapper"]'
            );
            const skeletonBadgeLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-badge-label"]'
            );
            const skeletonBadgeRightIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__badge-right-icon"]'
            );

            expect(skeletonBadgeRightIcon).toBeTruthy();
            expect(skeletonBadge.className).toContain('avonni-skeleton__badge');
            expect(skeletonBadge.className).not.toContain(
                'avonni-chip_outline'
            );
            expect(skeletonBadge.className).toContain(
                'avonni-badge_theme-base'
            );
            expect(skeletonBadge.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonBadgeLabel.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonBadgeLabel.className).toContain(
                'avonni-skeleton__badge-label'
            );
        });
    });

    // Button variant
    it('Skeleton Button: base variant with left icon', () => {
        element.variant = 'button';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'base',
            hasIcon: true,
            iconPosition: 'left'
        };

        return Promise.resolve().then(() => {
            const skeletonButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-button-wrapper"]'
            );
            const skeletonButtonLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-button-label"]'
            );
            const skeletonButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-button-left-icon"]'
            );

            expect(skeletonButtonIcon).toBeTruthy();
            expect(skeletonButton.className).toContain('slds-button');
            expect(skeletonButton.className).toContain(
                'slds-p-vertical_xx-small'
            );
            expect(skeletonButton.className).toContain(
                'slds-p-horizontal_x-small'
            );
            expect(skeletonButton.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonButtonLabel.className).toContain(
                'avonni-skeleton__button-label'
            );
            expect(skeletonButtonLabel.className).toContain(
                'slds-m-vertical_xx-small'
            );
            expect(skeletonButtonLabel.className).toContain(
                'slds-m-horizontal_x-small'
            );
        });
    });

    // Button variant
    it('Skeleton Button: base variant with right icon', () => {
        element.variant = 'button';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'base',
            hasIcon: true,
            iconPosition: 'right'
        };

        return Promise.resolve().then(() => {
            const skeletonButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-button-right-icon"]'
            );

            expect(skeletonButtonIcon).toBeTruthy();
        });
    });

    // Button Icon variant
    it('Skeleton Button Icon: base variant', () => {
        element.variant = 'button-icon';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'base'
        };

        return Promise.resolve().then(() => {
            const skeletonButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-button-icon"]'
            );

            expect(skeletonButtonIcon.className).toContain('slds-button');
            expect(skeletonButtonIcon.className).toContain('slds-button_icon');
            expect(skeletonButtonIcon.className).toContain(
                'avonni-skeleton__buttonIcon-animation-pulse'
            );
        });
    });

    // Chip variant
    it('Skeleton Chip: base variant with icon', () => {
        element.variant = 'chip';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'base',
            hasIcon: true,
            outline: false
        };

        return Promise.resolve().then(() => {
            const skeletonChip = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-chip-wrapper"]'
            );

            const skeletonChipLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-chip-label"]'
            );

            expect(skeletonChip.className).toContain('avonni-skeleton__chip');
            expect(skeletonChip.className).toContain(
                'slds-p-vertical_xx-small'
            );
            expect(skeletonChip.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonChipLabel.className).toContain(
                'avonni-skeleton__chip-label'
            );
        });
    });

    // Combobox variant
    it('Skeleton Combobox: standard variant with required input', () => {
        element.variant = 'combobox';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'standard',
            required: true
        };

        return Promise.resolve().then(() => {
            const skeletonCombobox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-combobox-wrapper"]'
            );

            const skeletonComboboxInputLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-combobox-input-label"]'
            );

            const skeletonComboboxInputLabelTag =
                element.shadowRoot.querySelector(
                    '[data-element-id="avonni-skeleton-combobox-input-label-tag"]'
                );

            const skeletonComboboxLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-combobox-label"]'
            );

            expect(skeletonCombobox.className).toContain('slds-form-element');
            expect(skeletonComboboxInputLabel.className).toContain(
                'slds-list_horizontal'
            );
            expect(skeletonComboboxInputLabel.className).toContain(
                'avonni-skeleton__input-label'
            );
            expect(skeletonComboboxInputLabelTag.className).toContain(
                'avonni-skeleton__input-label-tag'
            );
            expect(skeletonComboboxInputLabelTag.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonComboboxLabel.className).toContain(
                'avonni-skeleton__combobox-label'
            );
            expect(skeletonComboboxLabel.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonComboboxLabel.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
        });
    });

    // Datatable variant
    it('Skeleton Datatable: with 3 colummns and 7 rows', () => {
        element.variant = 'datatable';
        element.animation = 'pulse';
        element.variantAttributes = {
            columns: 3,
            rows: 7,
            hideCheckboxColumn: false,
            hideTableHeader: false
        };

        return Promise.resolve().then(() => {
            const skeletonDatatableCheckbox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-datatable-checkbox"]'
            );

            expect(skeletonDatatableCheckbox.className).toContain(
                'slds-checkbox_faux'
            );
            expect(skeletonDatatableCheckbox.className).toContain(
                'avonni-skeleton__datatable-checkbox'
            );
            expect(skeletonDatatableCheckbox.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
        });
    });

    // Input variant
    it('Skeleton Input: standard variant with required input', () => {
        element.variant = 'input';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'standard',
            required: true
        };

        return Promise.resolve().then(() => {
            const skeletonInputWrapper = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-input-wrapper"]'
            );

            const skeletonInputLabelTag = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-input-label-tag"]'
            );

            const skeletonInput = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-input"]'
            );

            expect(skeletonInputWrapper.className).toContain(
                'slds-form-element'
            );
            expect(skeletonInputLabelTag.className).toContain(
                'avonni-skeleton__input-label-tag'
            );
            expect(skeletonInputLabelTag.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonInput.className).toContain('slds-input');
            expect(skeletonInput.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonInput.className).toContain('avonni-skeleton__input');
        });
    });

    // Progress Indicator variant
    it('Skeleton Progress Indicator: base variant with 3 steps', () => {
        element.variant = 'progress-indicator';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: '',
            steps: 3
        };

        return Promise.resolve().then(() => {
            const skeletonProgressIndicatorBar =
                element.shadowRoot.querySelector(
                    '[data-element-id="avonni-skeleton-progress-indicator-bar"]'
                );
            expect(skeletonProgressIndicatorBar.className).toContain(
                'slds-progress-bar'
            );
            expect(skeletonProgressIndicatorBar.className).toContain(
                'slds-progress-bar_x-small'
            );
            expect(skeletonProgressIndicatorBar.className).toContain(
                'avonni-skeleton__buttonIcon-animation-pulse'
            );
        });
    });

    // Tabset variant
    it('Skeleton Tabset: base variant with 3 tabs', () => {
        element.variant = 'tabset';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'base',
            tabs: 3
        };

        return Promise.resolve().then(() => {
            const skeletonTabset = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-tabset-container"]'
            );
            const skeletonTabsetList = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-tabset-list"]'
            );
            expect(skeletonTabset.className).toContain('slds-tabs_default');
            expect(skeletonTabsetList.className).toContain(
                'slds-tabs_default__nav'
            );
            expect(skeletonTabsetList.className).toContain(
                'avonni-skeleton__tabset-base'
            );
        });
    });

    it('Skeleton Tabset: scoped variant with 3 tabs', () => {
        element.variant = 'tabset';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'scoped',
            tabs: 3
        };

        return Promise.resolve().then(() => {
            const skeletonTabset = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-tabset-container"]'
            );
            const skeletonTabsetList = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-tabset-list"]'
            );
            expect(skeletonTabsetList.className).toContain(
                'slds-tabs_scoped__nav'
            );
            expect(skeletonTabsetList.className).toContain('slds-truncate');
            expect(skeletonTabset.className).toContain('slds-tabs_scoped');
        });
    });

    it('Skeleton Tabset: vertical variant with 3 tabs', () => {
        element.variant = 'tabset';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'vertical',
            tabs: 3
        };

        return Promise.resolve().then(() => {
            const skeletonTabset = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-tabset-container"]'
            );
            const skeletonTabsetList = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-tabset-list"]'
            );
            expect(skeletonTabset.className).toContain('slds-vertical-tabs');
            expect(skeletonTabsetList.className).toContain(
                'slds-vertical-tabs__nav'
            );
        });
    });

    // Tree variant
    it('Skeleton Tree: path variant with 3 steps', () => {
        element.variant = 'tree';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'path',
            steps: 3
        };

        return Promise.resolve().then(() => {
            const skeletonTreeHeader = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-tree-header"]'
            );
            expect(skeletonTreeHeader.className).toContain(
                'slds-tree__group-header'
            );
            expect(skeletonTreeHeader.className).toContain(
                'avonni-skeleton__tree-header'
            );
            expect(skeletonTreeHeader.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonTreeHeader.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
        });
    });

    it('Skeleton Datatable: with 3 columns and 7 rows', () => {
        element.variant = 'datatable';
        element.animation = 'pulse';
        element.variantAttributes = {
            columns: 3,
            rows: 7,
            hideCheckboxColumn: false,
            hideTableHeader: false
        };

        return Promise.resolve().then(() => {
            const skeletonDatatableHeader = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-datatable-header"]'
            );
            console.log(
                `header children length: ${skeletonDatatableHeader.children.length}`
            );
            console.log(
                `header childnodes length: ${skeletonDatatableHeader.childNodes.length}`
            );
            expect(skeletonDatatableHeader.className).toBe('');
        });
    });

    it('Skeleton: handle variant not regular and with empty variant attributes', () => {
        element.variant = 'badge';
        element.animation = 'pulse';
        element.variantAttributes = {};

        return Promise.resolve().then(() => {
            const badgeElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-badge-wrapper"]'
            );
            const badgeLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-badge-label"]'
            );

            expect(badgeElement.className).toContain('avonni-skeleton__badge');
            expect(badgeElement.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(badgeLabel.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(badgeLabel.className).toContain(
                'avonni-skeleton__badge-label'
            );
        });
    });

    // Paragraph variant
    it('Skeleton: with 3 rows', () => {
        element.variant = 'paragraph';
        element.animation = 'pulse';
        element.variantAttributes = {
            rows: 3
        };

        return Promise.resolve().then(() => {
            const paragraphElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-paragraph-list"]'
            );
            console.log(
                element.shadowRoot.querySelector(
                    '[data-element-id="avonni-skeleton-paragraph-list"]'
                ).children
            );
            expect(paragraphElement.className).toBe('');
        });
    });
});
