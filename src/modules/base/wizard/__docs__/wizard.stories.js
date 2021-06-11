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

import { Wizard } from '../__examples__/wizard';
import { ModalWizard } from '../__examples__/modal';
import { BeforeChangeWizard } from '../__examples__/beforeChange';

export default {
    title: 'Example/Wizard',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header before the title.",
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: false,
            defaultValue: 'base',
            description:
                'Variant of the wizard. Valid values include base, modal and card.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        currentStep: {
            control: {
                type: 'text'
            },
            description:
                'Set current-step to match the name attribute of one of wizard-step components. If current-step is not provided, the name of the first wizard-step component is used.',
            table: {
                type: { summary: 'string' }
            }
        },
        hideNavigation: {
            control: {
                type: 'boolean'
            },
            description:
                'If true, hide the navigation (buttons and indicator).',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
                category: 'Navigation'
            }
        },
        indicatorType: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'base-shaded',
                'path',
                'bullet',
                'fractions',
                'bar'
            ],
            defaultValue: 'base',
            description:
                'Changes the visual pattern of the indicator. Valid values are base, base-shaded, path, bullet, fractions, bar.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Indicator'
            }
        },
        indicatorPosition: {
            control: {
                type: 'select'
            },
            options: ['bottom', 'top', 'right', 'left'],
            defaultValue: 'bottom',
            description:
                'Changes the indicator position. Valid values are footer and header.',
            table: {
                defaultValue: { summary: 'footer' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Indicator'
            }
        },
        hideIndicator: {
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the indicator.',
            defaultValue: false,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Navigation',
                subcategory: 'Indicator'
            }
        },
        buttonPreviousIconName: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
            }
        },
        buttonPreviousIconPosition: {
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description: 'Valid values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
            }
        },
        buttonPreviousLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Previous',
            table: {
                defaultValue: { summary: 'Previous' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
            }
        },
        buttonPreviousVariant: {
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
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
            }
        },
        buttonNextIconName: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
            }
        },
        buttonNextIconPosition: {
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description: 'Valid values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
            }
        },
        buttonNextLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Next',
            table: {
                defaultValue: { summary: 'Next' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
            }
        },
        buttonNextVariant: {
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
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
            }
        },
        buttonFinishIconName: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        buttonFinishIconPosition: {
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description: 'Valid values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        buttonFinishLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Finish',
            table: {
                defaultValue: { summary: 'Finish' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        buttonFinishVariant: {
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
                'Valid values include bare, neutral, brand, brand-outline, inverse, destructive, destructive-text, success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        buttonAlignmentBump: {
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                category: 'Navigation'
            }
        },
        actionPosition: {
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description: 'Valid values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation'
            }
        },
        fractionPrefixLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Step',
            description:
                'Label displayed in front of fraction. Example: fraction-prefix-label == “Step” => Step 1 of 3',
            table: {
                defaultValue: { summary: 'Step' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Indicator'
            }
        },
        fractionLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'of',
            description:
                'Label displayed between current index and max number of slides. Example: fraction-label == “of” => 1 of 3',
            table: {
                defaultValue: { summary: 'of' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Indicator'
            }
        }
    },
    args: {
        hideNavigation: false,
        hideIndicator: false
    }
};

const Template = (args) => Wizard(args);
const ModalTemplate = (args) => ModalWizard(args);
const BeforeChangeTemplate = (args) => BeforeChangeWizard(args);

export const Base = Template.bind({});
export const IndicatorRight = Template.bind({});
export const PathLeft = Template.bind({});
export const Modal = ModalTemplate.bind({});
export const ModalLeft = ModalTemplate.bind({});
export const Card = Template.bind({});
export const CardRight = Template.bind({});
export const BeforeChangeOnSteps = BeforeChangeTemplate.bind({});

IndicatorRight.args = {
    indicatorPosition: 'right'
};

PathLeft.args = {
    indicatorType: 'path',
    indicatorPosition: 'left'
};

ModalLeft.args = {
    indicatorPosition: 'left',
    title: 'Modal Wizard Example',
    variant: 'modal',
    indicatorType: 'path',
    buttonPreviousLabel: 'Back',
    buttonPreviousIconName: 'utility:back',
    buttonNextIconName: 'utility:forward',
    buttonNextIconPosition: 'right',
    buttonNextLabel: 'Continue',
    buttonNextVariant: 'brand',
    buttonFinishIconName: 'utility:check',
    buttonFinishLabel: 'Done',
    buttonFinishVariant: 'success'
};

Modal.args = {
    title: 'Modal Wizard Example',
    variant: 'modal',
    indicatorPosition: 'top',
    indicatorType: 'path',
    buttonPreviousLabel: 'Back',
    buttonPreviousIconName: 'utility:back',
    buttonNextIconName: 'utility:forward',
    buttonNextIconPosition: 'right',
    buttonNextLabel: 'Continue',
    buttonNextVariant: 'brand',
    buttonFinishIconName: 'utility:check',
    buttonFinishLabel: 'Done',
    buttonFinishVariant: 'success'
};

Card.args = {
    title: 'Card Wizard Example',
    variant: 'card',
    iconName: 'custom:custom26',
    buttonAlignmentBump: 'right',
    actionPosition: 'right',
    indicatorType: 'fractions',
    buttonNextVariant: 'brand',
    buttonFinishVariant: 'destructive'
};

CardRight.args = {
    indicatorPosition: 'right',
    title: 'Card Wizard Example',
    variant: 'card',
    iconName: 'custom:custom26',
    buttonAlignmentBump: 'right',
    actionPosition: 'right',
    indicatorType: 'fractions',
    buttonNextVariant: 'brand',
    buttonFinishVariant: 'destructive'
};

BeforeChangeOnSteps.args = {
    iconName: 'utility:touch_action',
    indicatorType: 'bar'
};
