import { ButtonIconDialog } from '../__examples__/buttonIconDialog';

export default {
    title: 'Example/Button Icon Dialog',
    argTypes: {
        accessKey: {
            control: {
                type: 'text'
            }
        },
        alternativeText: {
            control: {
                type: 'text'
            }
        },
        tooltip: {
            control: {
                type: 'text'
            }
        },
        iconClass: {
            control: {
                type: 'text'
            }
        },
        iconName: {
            control: {
                type: 'text'
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'bare',
                    'container',
                    'brand',
                    'border',
                    'border-filled',
                    'bare-inverse',
                    'border-inverse'
                ]
            },
            defaultValue: 'border',
            table: {
                defaultValue: { summary: 'border' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => ButtonIconDialog(args);

export const Border = Template.bind({});
Border.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature'
};

export const BorderWithWarningIcon = Template.bind({});
BorderWithWarningIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:warning',
    iconClass: 'slds-icon-text-warning'
};

export const BorderWithErrorIcon = Template.bind({});
BorderWithErrorIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:error',
    iconClass: 'slds-icon-text-error'
};

export const BorderWithSuccessIcon = Template.bind({});
BorderWithSuccessIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:success',
    iconClass: 'slds-icon-text-success'
};

export const BorderWithLightIcon = Template.bind({});
BorderWithLightIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:check',
    iconClass: 'slds-icon-text-light'
};

export const BorderSmall = Template.bind({});
BorderSmall.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    size: 'small'
};

export const BorderDisabled = Template.bind({});
BorderDisabled.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    disabled: 'true'
};

export const Brand = Template.bind({});
Brand.args = {
    tooltip: 'Show modal',
    iconName: 'utility:einstein',
    variant: 'brand'
};

export const Container = Template.bind({});
Container.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'Container'
};

export const Bare = Template.bind({});
Bare.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'bare-inverse'
};

export const BorderFilled = Template.bind({});
BorderFilled.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'Border-Filled'
};

export const BorderInverse = Template.bind({});
BorderInverse.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'Border-inverse'
};
