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
    // it('Skeleton: base', () => {
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-undefined'
    //         );
    //     });
    // });

    // // skeleton-variant text
    // it('Skeleton: text variant', () => {
    //     element.variant = 'text';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-undefined'
    //         );
    //     });
    // });

    // // skeleton-variant rectangular
    // it('Skeleton: rectangular variant', () => {
    //     element.variant = 'rectangular';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__animation-undefined avonni-skeleton__variant-rectangular'
    //         );
    //     });
    // });

    // // skeleton-variant rectangular
    // it('Skeleton: circular variant', () => {
    //     element.variant = 'circular';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__animation-undefined avonni-skeleton__variant-circular'
    //         );
    //     });
    // });

    // // skeleton-animation pulse
    // it('Skeleton: pulse animation', () => {
    //     element.animation = 'pulse';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-pulse'
    //         );
    //     });
    // });

    // // skeleton-animation pulse
    // it('Skeleton: wave animation', () => {
    //     element.animation = 'wave';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.className).toBe(
    //             'avonni-skeleton__base avonni-skeleton__variant-text avonni-skeleton__animation-wave'
    //         );
    //     });
    // });

    // // skeleton-height undefined
    // it('Skeleton: undefined height should set component height to undefined and DOM avonni-skeleton height to default height for text variant (0.7em)', () => {
    //     element.variant = 'text';
    //     element.height = undefined;
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.style.height).toBe('0.7em');
    //         expect(element.height).toBe(undefined);
    //     });
    // });

    // // skeleton-height defined
    // it('Skeleton: 100px height should set component and DOM avonni-skeleton height to 100px', () => {
    //     element.variant = 'rectangular';
    //     element.height = '100px';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(element.height).toBe('100px');
    //         expect(skeleton.style.height).toBe('100px');
    //     });
    // });

    // // skeleton-width undefined
    // it('Skeleton: undefined width should set component height to undefined and DOM avonni-skeleton height to default width for text variant (0.7em)', () => {
    //     element.variant = 'text';
    //     element.width = undefined;
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(skeleton.style.width).toBe('100%');
    //         expect(element.width).toBe(undefined);
    //     });
    // });

    // // skeleton-width defined
    // it('Skeleton: 100px width should set component and DOM avonni-skeleton width to 100px', () => {
    //     element.variant = 'rectangular';
    //     element.width = '100px';
    //     const skeleton = element.shadowRoot.querySelector(
    //         '[data-element-id="avonni-skeleton"]'
    //     );
    //     return Promise.resolve().then(() => {
    //         expect(element.width).toBe('100px');
    //         expect(skeleton.style.width).toBe('100px');
    //     });
    // });

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
                'avonni-avatar_x-large'
            );
            expect(skeletonAvatarPrimaryText.className).toContain(
                'slds-m-bottom_xx-small'
            );
            expect(skeletonAvatarPrimaryText.className).toContain(
                'avonni-avatar__primary-text'
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
                'avonni-avatar__secondary-text'
            );
            expect(skeletonAvatarSecondaryText.className).toContain(
                'avonni-skeleton__variant-text'
            );
            expect(skeletonAvatarSecondaryText.className).toContain(
                'avonni-skeleton__animation-pulse'
            );
            expect(skeletonAvatarTertiaryText.className).toContain(
                'avonni-avatar__tertiary-text'
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
    it('Skeleton Badge: size medium', () => {
        element.variant = 'badge';
        element.animation = 'pulse';
        element.variantAttributes = {
            hasIcon: true,
            variant: 'base',
            iconPosition: 'left'
        };

        return Promise.resolve().then(() => {
            const skeletonBadge = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__badge-wrapper"]'
            );
            const skeletonBadgeLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__badge-label"]'
            );

            expect(skeletonBadge.className).toContain('avonni-badge');
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

    // badge variant
    it('Skeleton Button: size medium', () => {
        element.variant = 'button';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'base',
            hasIcon: true,
            outline: false
        };

        return Promise.resolve().then(() => {
            const skeletonButton = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton-button-element"]'
            );
            const skeletonButtonLabel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-skeleton__button-label"]'
            );

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

    // Button Icon variant
    it('Skeleton Button Icon: size medium', () => {
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
    it('Skeleton Chip: size medium', () => {
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

            expect(skeletonChip.className).toContain('avonni-chip');
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
    it('Skeleton Combobox: size medium', () => {
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
    it('Skeleton Datatable: size medium', () => {
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
    it('Skeleton Input: size medium', () => {
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
    it('Skeleton Progress Indicator: size medium', () => {
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
    it('Skeleton Tabset: size medium', () => {
        element.variant = 'tabset';
        element.animation = 'pulse';
        element.variantAttributes = {
            variant: 'base',
            tabs: 3
        };

        return Promise.resolve().then(() => {});
    });

    // Tree variant
    it('Skeleton Tree: size medium', () => {
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
});