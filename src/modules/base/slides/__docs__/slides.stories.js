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

import { Slides } from '../__examples__/slides';

export default {
    title: 'Example/Slides',
    argTypes: {
        slidesPerView: {
            name: 'slides-per-view',
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 1,
            description: 'Number of slides to be displayed per view.',
            table: {
                defaultValue: { summary: '1' },
                type: { summary: 'number' }
            }
        },
        spaceBetween: {
            name: 'space-between',
            control: {
                type: 'number',
                min: 0
            },
            description: 'Distance between slides in px.',
            defaultValue: '0',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        autoplayDelay: {
            name: 'autoplay-delay',
            control: {
                type: 'number',
                min: 0
            },
            table: {
                type: { summary: 'number' }
            }
        },
        initialSlide: {
            name: 'initial-slide',
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: '0',
            description: 'Index number of initial slide.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        speed: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 300,
            description: 'Duration of transition between slides (in ms).',
            table: {
                defaultValue: { summary: '300' },
                type: { summary: 'number' }
            }
        },
        width: {
            control: {
                type: 'text'
            },
            description:
                'Slider width 100px,  50% and etc. Required for the effect "cube".',
            table: {
                type: { summary: 'string' }
            }
        },
        height: {
            control: {
                type: 'text'
            },
            description:
                'Slider height 100px,  50% and etc. Required for the effect "cube".',
            table: {
                type: { summary: 'string' }
            }
        },
        coverflowSlideWidth: {
            name: 'coverflow-slide-width',
            control: {
                type: 'text'
            },
            description: 'Slide width in px. 100, 200 and etc.',
            table: {
                type: { summary: 'string' }
            }
        },
        coverflowSlideHeight: {
            name: 'coverflow-slide-height',
            control: {
                type: 'text'
            },
            description: 'Slide height in px. 100, 200 and etc.',
            table: {
                type: { summary: 'string' }
            }
        },
        direction: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            defaultValue: 'horizontal',
            description:
                "Could be 'horizontal' or 'vertical' (for vertical slider).",
            table: {
                defaultValue: { summary: 'horizontal' },
                type: { summary: 'string' }
            }
        },
        effect: {
            control: {
                type: 'select'
            },
            options: ['slide', 'fade', 'cube', 'coverflow', 'flip', 'none'],
            defaultValue: 'slide',
            description:
                'Transition effect. Could be "slide", "fade", "cube", "coverflow", "flip" or “none”.',
            table: {
                defaultValue: { summary: 'slide' },
                type: { summary: 'string' }
            }
        },
        loop: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Set to true to enable continuous loop mode.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        navigation: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, display previous and next buttons.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Buttons'
            }
        },
        buttonInner: {
            name: 'button-inner',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, display button inside slides.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Buttons'
            }
        },
        previousButtonIconName: {
            name: 'previous-button-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:left',
            description:
                'The name of an icon to display for the previous button.',
            table: {
                defaultValue: { summary: 'utility:left' },
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        previousButtonLabel: {
            name: 'previous-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the previous button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        nextButtonIconName: {
            name: 'next-button-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:right',
            description: 'The name of an icon to display for the next button.',
            table: {
                defaultValue: { summary: 'utility:right' },
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        nextButtonLabel: {
            name: 'next-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the next button.',
            table: {
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        previousButtonIconPosition: {
            name: 'previous-button-icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description:
                'Describes the position of the icon with respect to body. Options include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        previousButtonVariant: {
            name: 'previous-button-variant',
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'neutral',
                'brand',
                'brand-outline',
                'inverse',
                'destructive',
                'destructive-text',
                'success'
            ],
            defaultValue: 'neutral',
            description:
                'Change the appearance of the previous button. Valid values include bare, neutral, brand, brand-outline, inverse, destructive, destructive-text, success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        nextButtonIconPosition: {
            name: 'next-button-icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'right',
            description:
                'Describes the position of the icon with respect to body. Options include left and right.',
            table: {
                defaultValue: { summary: 'right' },
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        nextButtonVariant: {
            name: 'next-button-variant',
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'neutral',
                'brand',
                'brand-outline',
                'inverse',
                'destructive',
                'destructive-text',
                'success'
            ],
            defaultValue: 'neutral',
            description:
                'Change the appearance of the next button. Valid values include bare, neutral, brand, brand-outline, inverse, destructive, destructive-text, success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        buttonPosition: {
            name: 'button-position',
            control: {
                type: 'select'
            },
            options: ['top', 'middle', 'bottom'],
            defaultValue: 'middle',
            description:
                'Set the position of the button. Valid values include top, middle, bottom.',
            table: {
                defaultValue: { summary: 'middle' },
                type: { summary: 'string' },
                category: 'Buttons'
            }
        },
        indicators: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, display the indicator. The indicator can be a progress bar, bullet, dynamic bullet or fraction.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Indicator'
            }
        },
        indicatorInner: {
            name: 'indicator-inner',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, display the indicator inside the slider.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Indicator'
            }
        },
        indicatorType: {
            name: 'indicator-type',
            control: {
                type: 'select'
            },
            options: [
                'progress-bar',
                'bullets',
                'dynamic-bullets',
                'fractions'
            ],
            defaultValue: 'bullets',
            description:
                'Set the indicator’s type. Valid values include progress-bar, bullets, dynamic-bullets, fractions.',
            table: {
                defaultValue: { summary: 'bullets' },
                type: { summary: 'string' },
                category: 'Indicator'
            }
        },
        indicatorPosition: {
            name: 'indicator-position',
            control: {
                type: 'select'
            },
            options: [
                'top-left',
                'bottom-left',
                'top-right',
                'bottom-right',
                'top-center',
                'bottom-center'
            ],
            defaultValue: 'bottom-center',
            description:
                'Position of the indicators. Valid values include top-left, bottom-left, top-right, bottom-right, top-center, bottom-center.',
            table: {
                defaultValue: { summary: 'bottom-center' },
                type: { summary: 'string' },
                category: 'Indicator'
            }
        },
        fractionPrefixLabel: {
            name: 'fraction-prefix-label',
            control: {
                type: 'text'
            },
            description:
                'Label displayed in front of fraction. \nExample: fraction-prefix-label == “Steps” => Steps 1 of 3.',
            table: {
                type: { summary: 'string' },
                category: 'Indicator'
            }
        },
        fractionLabel: {
            name: 'fraction-label',
            control: {
                type: 'text'
            },
            defaultValue: '/',
            description:
                'Label displayed between current index and max number of slides. \nExample: fraction-label == “of” => 1 of 3',
            table: {
                defaultValue: { summary: '/' },
                type: { summary: 'string' },
                category: 'Indicator'
            }
        }
    },
    args: {
        loop: false,
        navigation: false,
        buttonInner: false,
        indicators: false,
        indicatorInner: false
    }
};

const Template = (args) => Slides(args);

export const Base = Template.bind({});

export const EffectFade = Template.bind({});
EffectFade.args = {
    effect: 'fade',
    height: '300px'
};

export const EffectCube = Template.bind({});
EffectCube.args = {
    effect: 'cube',
    height: '300px',
    width: '300px'
};

export const EffectCoverflow = Template.bind({});
EffectCoverflow.args = {
    effect: 'coverflow',
    height: '320px',
    coverflowSlideHeight: '300',
    coverflowSlideWidth: '300'
};

export const EffectFlip = Template.bind({});
EffectFlip.args = {
    effect: 'flip',
    height: '300px',
    width: '300px'
};

export const EffectNone = Template.bind({});
EffectNone.args = {
    effect: 'none',
    height: '300px',
    navigation: true
};

export const Vertical = Template.bind({});
Vertical.args = {
    height: '300px',
    direction: 'vertical'
};

export const MultipleSlidesWithIndicator = Template.bind({});
MultipleSlidesWithIndicator.args = {
    slidesPerView: 3,
    height: '300px',
    spaceBetween: '10',
    indicators: true
};

export const TopProgressBarIndicator = Template.bind({});
TopProgressBarIndicator.args = {
    height: '300px',
    indicators: true,
    indicatorType: 'progress-bar',
    indicatorPosition: 'top-left'
};

export const InnerFractionsAndNavigation = Template.bind({});
InnerFractionsAndNavigation.args = {
    height: '300px',
    indicators: true,
    indicatorType: 'fractions',
    indicatorPosition: 'bottom-right',
    indicatorInner: true,
    navigation: true,
    buttonInner: true,
    fractionLabel: 'of',
    fractionPrefixLabel: 'Slide'
};

export const CustomNavigationButtons = Template.bind({});
CustomNavigationButtons.args = {
    navigation: true,
    nextButtonLabel: 'Next',
    nextButtonVariant: 'brand',
    nextButtonIconName: 'utility:forward',
    previousButtonLabel: 'Back',
    previousButtonVariant: 'inverse',
    previousButtonIconName: 'utility:back',
    width: '50%',
    buttonPosition: 'top'
};

export const DynamicBulletAutoplay = Template.bind({});
DynamicBulletAutoplay.args = {
    indicators: true,
    indicatorType: 'dynamic-bullets',
    loop: true,
    autoplayDelay: '3000',
    slidesPerView: 2
};
