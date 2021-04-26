import { Chip } from '../__examples__/chip';

export default {
    title: 'Example/Chip',
    argTypes: {
        label: {
            control: {
                type: 'text'
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
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        outline: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        outline: false
    }
};

const Template = (args) => Chip(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Chip'
};

export const BaseOutline = Template.bind({});
BaseOutline.args = {
    label: 'Chip',
    outline: 'true'
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
    outline: 'true'
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
    outline: 'true'
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
    outline: 'true'
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
    outline: 'true'
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
    outline: 'true'
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
    outline: 'true'
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
    outline: 'true'
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
    outline: 'true'
};
