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
            name: 'icon-name',
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
            description:
                'Variant of the wizard. Valid values include base, modal, quickActionPanel and card.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        currentStep: {
            name: 'current-step',
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
            name: 'hide-navigation',
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
            name: 'indicator-type',
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
            name: 'indicator-position',
            control: {
                type: 'select'
            },
            options: ['bottom', 'top', 'right', 'left'],
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
            name: 'hide-indicator',
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the indicator.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Navigation',
                subcategory: 'Indicator'
            }
        },
        previousButtonIconName: {
            name: 'previous-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display for the previous button.',
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
            }
        },
        previousButtonIconPosition: {
            name: 'previous-button-icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body. Options include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
            }
        },
        previousButtonLabel: {
            name: 'previous-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the previous button.',
            table: {
                defaultValue: { summary: 'Previous' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
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
            description:
                'Change the appearance of the previous button. Valid values include bare, neutral, brand, brand-outline, inverse, destructive, destructive-text, success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Previous button'
            }
        },
        nextButtonIconName: {
            name: 'next-button-icon-name',
            control: {
                type: 'text'
            },
            description: 'The name of an icon to display for the next button.',
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
            }
        },
        nextButtonIconPosition: {
            name: 'next-button-icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body. Options include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
            }
        },
        nextButtonLabel: {
            name: 'next-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the next button.',
            table: {
                defaultValue: { summary: 'Next' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
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
            description:
                'Change the appearance of the next button. Valid values include bare, neutral, brand, brand-outline, inverse, destructive, destructive-text, success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Next button'
            }
        },
        finishButtonIconName: {
            name: 'finish-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display for the finish button.',
            table: {
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        finishButtonIconPosition: {
            name: 'finish-button-icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body. Options include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        finishButtonLabel: {
            name: 'finish-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the finish button.',
            table: {
                defaultValue: { summary: 'Finish' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        finishButtonVariant: {
            name: 'finish-button-variant',
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
            description:
                'Change the appearance of the finish button. Valid values include bare, neutral, brand, brand-outline, inverse, destructive, destructive-text, success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' },
                category: 'Navigation',
                subcategory: 'Finish button'
            }
        },
        buttonAlignmentBump: {
            name: 'button-alignment-bump',
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
            name: 'action-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'Navigation'
            }
        },
        fractionPrefixLabel: {
            name: 'fraction-prefix-label',
            control: {
                type: 'text'
            },
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
            name: 'fraction-label',
            control: {
                type: 'text'
            },
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
        actionPosition: 'left',
        finishButtonIconPosition: 'left',
        finishButtonLabel: 'Finish',
        finishButtonVariant: 'neutral',
        fractionLabel: 'of',
        fractionPrefixLabel: 'Step',
        hideNavigation: false,
        hideIndicator: false,
        indicatorType: 'base',
        indicatorPosition: 'bottom',
        nextButtonIconPosition: 'left',
        nextButtonLabel: 'Next',
        nextButtonVariant: 'neutral',
        previousButtonIconPosition: 'left',
        previousButtonLabel: 'Previous',
        previousButtonVariant: 'neutral',
        variant: 'base'
    }
};

const Template = (args) => Wizard(args);
const ModalTemplate = (args) => ModalWizard(args);
const BeforeChangeTemplate = (args) => BeforeChangeWizard(args);

export const Base = Template.bind({});
export const IndicatorRight = Template.bind({});
export const PathLeft = Template.bind({});
export const QuickActionPanel = Template.bind({});
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
    previousButtonLabel: 'Back',
    previousButtonIconName: 'utility:back',
    nextButtonIconName: 'utility:forward',
    nextButtonIconPosition: 'right',
    nextButtonLabel: 'Continue',
    nextButtonVariant: 'brand',
    finishButtonIconName: 'utility:check',
    finishButtonLabel: 'Done',
    finishButtonVariant: 'success'
};

Modal.args = {
    title: 'Modal Wizard Example',
    variant: 'modal',
    indicatorPosition: 'top',
    indicatorType: 'path',
    previousButtonLabel: 'Back',
    previousButtonIconName: 'utility:back',
    nextButtonIconName: 'utility:forward',
    nextButtonIconPosition: 'right',
    nextButtonLabel: 'Continue',
    nextButtonVariant: 'brand',
    finishButtonIconName: 'utility:check',
    finishButtonLabel: 'Done',
    finishButtonVariant: 'success'
};

QuickActionPanel.args = {
    title: 'Quick Action Panel Wizard Example',
    variant: 'quickActionPanel',
    iconName: 'custom:custom61'
};

Card.args = {
    title: 'Card Wizard Example',
    variant: 'card',
    iconName: 'custom:custom26',
    buttonAlignmentBump: 'right',
    actionPosition: 'right',
    indicatorType: 'fractions',
    nextButtonVariant: 'brand',
    finishButtonVariant: 'destructive'
};

CardRight.args = {
    indicatorPosition: 'right',
    title: 'Card Wizard Example',
    variant: 'card',
    iconName: 'custom:custom26',
    buttonAlignmentBump: 'right',
    actionPosition: 'right',
    indicatorType: 'fractions',
    nextButtonVariant: 'brand',
    finishButtonVariant: 'destructive'
};

BeforeChangeOnSteps.args = {
    iconName: 'utility:touch_action',
    indicatorType: 'bar'
};
