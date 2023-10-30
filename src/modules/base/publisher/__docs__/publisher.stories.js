import { Publisher } from '../__examples__/publisher';
import { PublisherWithFigureSlot } from '../__examples__/publisherWithFigureSlot';
import { PublisherWithActionsSlot } from '../__examples__/publisherWithActionsSlot';

export default {
    title: 'Example/Publisher',
    argTypes: {
        placeholder: {
            control: {
                type: 'text'
            },
            description:
                'Text that is displayed when the field is empty, to prompt the user for a valid entry.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'comment'],
            description: 'Values include base and comment.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        buttonLabel: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: 'The HTML content in the rich text editor.',
            table: {
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: "If present, the publisher can't be used by users.",
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        disabled: false,
        variant: 'base'
    }
};

const Template = (args) => Publisher(args);
const TemplatePublisherWithFigureSlot = (args) => PublisherWithFigureSlot(args);
const TemplatePublisherWithActionsSlot = (args) =>
    PublisherWithActionsSlot(args);

export const VariantBase = Template.bind({});
VariantBase.args = {
    placeholder: 'Write a comment',
    buttonLabel: 'Comment'
};

export const VariantComment = Template.bind({});
VariantComment.args = {
    placeholder: 'Write a comment',
    buttonLabel: 'Comment',
    variant: 'comment'
};

export const Disabled = Template.bind({});
Disabled.args = {
    placeholder: 'Write a comment',
    buttonLabel: 'Comment',
    disabled: true
};

export const WithActionsSlot = TemplatePublisherWithActionsSlot.bind({});
WithActionsSlot.args = {
    placeholder: 'Write a comment',
    buttonLabel: 'Comment',
    variant: 'comment'
};

export const WithFigureSlot = TemplatePublisherWithFigureSlot.bind({});
WithFigureSlot.args = {
    placeholder: 'Write a comment',
    buttonLabel: 'Comment',
    variant: 'comment'
};
