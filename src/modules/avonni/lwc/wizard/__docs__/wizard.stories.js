import { Wizard } from '../__examples__/wizard';

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
                defaultValue: 'base',
                type: { summary: 'string' }
            }
        },
        hideIndicator: {
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the indicator.',
            defaultValue: false,
            table: {
                defaultValue: 'false',
                type: { summary: 'boolean' }
            }
        },
        buttonPreviousIconName: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
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
                defaultValue: 'left',
                type: { summary: 'string' }
            }
        },
        buttonPreviousLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Previous',
            table: {
                defaultValue: 'Previous',
                type: { summary: 'string' }
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
                defaultValue: 'neutral',
                type: { summary: 'string' }
            }
        },
        buttonNextIconName: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
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
                defaultValue: 'left',
                type: { summary: 'string' }
            }
        },
        buttonNextLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Next',
            table: {
                defaultValue: 'Next',
                type: { summary: 'string' }
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
                defaultValue: 'neutral',
                type: { summary: 'string' }
            }
        },
        buttonFinishIconName: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
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
                defaultValue: 'left',
                type: { summary: 'string' }
            }
        },
        buttonFinishLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Finish',
            table: {
                defaultValue: 'Finish',
                type: { summary: 'string' }
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
                defaultValue: 'neutral',
                type: { summary: 'string' }
            }
        },
        buttonAlignmentBump: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
            description: 'Valid values include left and right.',
            table: {
                type: { summary: 'string' }
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
                type: { summary: 'string' },
                defaultValue: 'left'
            }
        },
        navigationPosition: {
            control: {
                type: 'select',
                options: ['top', 'bottom']
            },
            defaultValue: 'bottom',
            description: 'Valid values include top and bottom.',
            table: {
                type: { summary: 'string' },
                defaultValue: 'bottom'
            }
        },
        fractionPrefixLabel: {
            control: {
                type: 'text'
            },
            defaultValue: 'Steps',
            description:
                'Label displayed in front of fraction. Example: fraction-prefix-label == “Steps” => Steps 1 of 3',
            table: {
                defaultValue: 'Steps',
                type: { summary: 'string' }
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
                defaultValue: 'of',
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => Wizard(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Avonni Wizard',
    indicatorType: 'fractions',
    currentStep: 'step-3'
};
