import { ScopedNotification } from '../__examples__/scopedNotification';
import { NoSlotScopedNotification } from '../__examples__/noSlotScopedNotification';

export default {
    title: 'Example/Scoped Notification',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description: 'The heading of the section message.',
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
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'dark', 'warning', 'error', 'success'],
            description:
                'The variant changes the look of the scoped notification. Valid values include base, light, dark, warning, error, success.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium, or large. This value defaults to medium.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        variant: 'base',
        iconSize: 'medium'
    }
};

const Template = (args) => ScopedNotification(args);
const NoSlotTemplate = (args) => NoSlotScopedNotification(args);

export const Base = Template.bind({});
Base.args = {
    title: 'base',
    iconName: 'utility:info'
};

export const DarkExtraSmallIcon = NoSlotTemplate.bind({});
DarkExtraSmallIcon.args = {
    iconName: 'utility:info',
    variant: 'dark',
    iconSize: 'x-small',
    title: 'Dark variant with extra small icon.'
};

export const WarningSmallIcon = NoSlotTemplate.bind({});
WarningSmallIcon.args = {
    iconName: 'utility:warning',
    variant: 'warning',
    iconSize: 'small',
    title: 'Warning variant with small icon.'
};

export const ErrorLargeIcon = NoSlotTemplate.bind({});
ErrorLargeIcon.args = {
    iconName: 'utility:error',
    variant: 'error',
    iconSize: 'large',
    title: 'Error variant with large icon.'
};
