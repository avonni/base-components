import { Chip } from '../__examples__/chip';
import ChipVariantsComponent from './variants/variants';
import ChipVariantsWithIconComponent from './variantsWithIcon/variantsWithIcon';
import ChipVariantsCircleComponent from './variantsCircle/variantsCircle';

export default {
    title: 'Example/Chip',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Label display in the chip',
            table: {
                type: { summary: 'string' }
            }
        },
        outline: {
            control: {
                type: 'boolean'
            },
            description: 'If present, display an outline style button.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideText: {
            name: 'hide-text',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the text is hidden and the chip is displayed as a colored circle.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'brand',
                'inverse',
                'alt-inverse',
                'success',
                'info',
                'warning',
                'error',
                'offline'
            ],
            description:
                'The variant changes the appearance of the chip. Accepted variants include base, brand, inverse, alt-inverse, success, info, warning, error, offline.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        backgroundColor: {
            name: 'background-color',
            control: {
                type: 'color'
            },
            description:
                'If present, it replaces the default variant background color of the chip.',
            table: {
                type: { summary: 'string' }
            }
        },
        textColor: {
            name: 'text-color',
            control: {
                type: 'color'
            },
            description:
                'If present, it replaces the default variant text color. If outline is set to true, this attribute is ignored.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        hideText: false,
        outline: false,
        variant: 'base'
    }
};

/**
 * Example with different combinations of sizes, fallback icon types.
 * Allows to quickly scan if there is any problems.
 */
customElements.define(
    'ac-base-chip-variants',
    ChipVariantsComponent.CustomElementConstructor
);
customElements.define(
    'ac-base-chip-variants-with-icon',
    ChipVariantsWithIconComponent.CustomElementConstructor
);
customElements.define(
    'ac-base-chip-variants-circle',
    ChipVariantsCircleComponent.CustomElementConstructor
);

const ChipVariants = ({ outline }) => {
    const element = document.createElement('ac-base-chip-variants');
    element.outline = outline;
    return element;
};
const TemplateVariants = (args) => ChipVariants(args);
export const Variants = TemplateVariants.bind({});
export const OutlineVariants = TemplateVariants.bind({});
OutlineVariants.args = {
    outline: true
};

const TemplateVariantsWithIcon = ({ outline }) => {
    const element = document.createElement('ac-base-chip-variants-with-icon');
    element.outline = outline;
    return element;
};
export const VariantsWithIcon = TemplateVariantsWithIcon.bind({});
export const OutlineVariantsWithIcon = TemplateVariantsWithIcon.bind({});
OutlineVariantsWithIcon.args = {
    outline: true
};

const TemplateVariantsCircle = ({ outline }) => {
    const element = document.createElement('ac-base-chip-variants-circle');
    element.outline = outline;
    return element;
};
export const VariantsCircle = TemplateVariantsCircle.bind({});
export const OutlineVariantsCircle = TemplateVariantsCircle.bind({});
OutlineVariantsCircle.args = {
    outline: true
};

const Template = (args) => Chip(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Chip'
};

export const BaseOutline = Template.bind({});
BaseOutline.args = {
    label: 'Chip',
    outline: true
};

export const Brand = Template.bind({});
Brand.args = {
    label: 'Chip',
    variant: 'brand'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    label: 'Chip',
    variant: 'brand',
    outline: true
};

export const Inverse = Template.bind({});
Inverse.args = {
    label: 'Chip',
    variant: 'inverse'
};

export const InverseOutline = Template.bind({});
InverseOutline.args = {
    label: 'Chip',
    variant: 'inverse',
    outline: true
};

export const AltInverse = Template.bind({});
AltInverse.args = {
    label: 'Chip',
    variant: 'alt-inverse'
};

export const AltInverseOutline = Template.bind({});
AltInverseOutline.args = {
    label: 'Chip',
    variant: 'alt-inverse',
    outline: true
};

export const Success = Template.bind({});
Success.args = {
    label: 'Chip',
    variant: 'success'
};

export const SuccessOutline = Template.bind({});
SuccessOutline.args = {
    label: 'Chip',
    variant: 'success',
    outline: true
};

export const Info = Template.bind({});
Info.args = {
    label: 'Chip',
    variant: 'info'
};

export const InfoOutline = Template.bind({});
InfoOutline.args = {
    label: 'Chip',
    variant: 'info',
    outline: true
};

export const Warning = Template.bind({});
Warning.args = {
    label: 'Chip',
    variant: 'warning'
};

export const WarningOutline = Template.bind({});
WarningOutline.args = {
    label: 'Chip',
    variant: 'warning',
    outline: true
};

export const Error = Template.bind({});
Error.args = {
    label: 'Chip',
    variant: 'error'
};

export const ErrorOutline = Template.bind({});
ErrorOutline.args = {
    label: 'Chip',
    variant: 'error',
    outline: true
};

export const Offline = Template.bind({});
Offline.args = {
    label: 'Chip',
    variant: 'offline'
};

export const OfflineOutline = Template.bind({});
OfflineOutline.args = {
    label: 'Chip',
    variant: 'offline',
    outline: true
};
