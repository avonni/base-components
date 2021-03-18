import { Wizard } from '../__examples__/wizard';
import { ModalWizard } from '../__examples__/modal';

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
        indicatorType: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'base-shaded',
                    'path',
                    'bullet',
                    'fractions',
                    'bar'
                ]
            },
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
                type: 'select',
                options: ['footer', 'header']
            },
            defaultValue: 'footer',
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
                type: 'select',
                options: ['left', 'right']
            },
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
                type: 'select',
                options: [
                    'bare',
                    'neutral',
                    'brand',
                    'brand-outline',
                    'inverse',
                    'destructive',
                    'destructive-text',
                    'success'
                ]
            },
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
                type: 'select',
                options: ['left', 'right']
            },
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
                type: 'select',
                options: [
                    'bare',
                    'neutral',
                    'brand',
                    'brand-outline',
                    'inverse',
                    'destructive',
                    'destructive-text',
                    'success'
                ]
            },
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
                type: 'select',
                options: ['left', 'right']
            },
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
                type: 'select',
                options: [
                    'bare',
                    'neutral',
                    'brand',
                    'brand-outline',
                    'inverse',
                    'destructive',
                    'destructive-text',
                    'success'
                ]
            },
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
                type: 'select',
                options: ['left', 'right']
            },
            description: 'Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                category: 'Navigation'
            }
        },
        actionPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
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
    }
};

const Template = (args) => Wizard(args);
const ModalTemplate = (args) => ModalWizard(args);

export const Base = Template.bind({});
export const Modal = ModalTemplate.bind({});
export const Card = Template.bind({});

Base.args = {
    title: 'Avonni Wizard'
};

Modal.args = {
    variant: 'modal'
};

Card.args = {
    variant: 'card',
    iconName: 'utility:announcement'
};
