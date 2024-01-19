import { PageHeader } from '../__examples__/pageHeader';

export default {
    title: 'Example/Page Header',
    argTypes: {
        iconName: {
            control: {
                type: 'text'
            },
            name: 'icon-name',
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header before the title.",
            table: {
                type: { summary: 'String' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'The label can include text. To include additional markup or another component, use the label slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text. To include additional markup or another component, use the title slot.The title can include text. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        info: {
            control: {
                type: 'text'
            },
            description:
                'The info can include text. To include additional markup or another component, use the info slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'object-home',
                'record-home',
                'record-home-vertical'
            ],
            description:
                'The type of component. Valid values include base, object-home, record-home and record-home-vertical.',
            table: {
                type: { summary: 'String' }
            }
        },
        isJoined: {
            control: {
                type: 'boolean'
            },
            name: 'is-joined',
            description:
                'If present, the lower border is removed to allow the header to sit flush on an element.',
            table: {
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        isJoined: false,
        variant: 'base'
    }
};

const Template = (args) => PageHeader(args);

export const Base = Template.bind({});
Base.args = {
    variant: 'base',
    iconName: 'standard:opportunity',
    title: 'Title',
    info: 'Info'
};

export const ObjectHome = Template.bind({});
ObjectHome.args = {
    variant: 'object-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const RecordHome = Template.bind({});
RecordHome.args = {
    variant: 'record-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const RecordHomeVertical = Template.bind({});
RecordHomeVertical.args = {
    variant: 'record-home-vertical',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const MobileRecordHome = Template.bind({});
MobileRecordHome.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
MobileRecordHome.args = {
    variant: 'record-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const MobileRecordHomeVertical = Template.bind({});
MobileRecordHomeVertical.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
MobileRecordHomeVertical.args = {
    variant: 'record-home-vertical',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};
