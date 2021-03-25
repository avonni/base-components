import { SummaryDetail } from '../__examples__/summaryDetail';
import { SummaryDetailWithActionButton } from '../__examples__/summaryDetailWithActionButton';

export default {
    title: 'Example/Summary Detail',
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
        fullWidthHeader: {
            name: 'full-width-header',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If true, the header takes the full width of the summary detail.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        shrinkIconName: {
            name: 'shrink-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevrondown',
            description: 'Icon used to close the summary detail.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:chevrondown' }
            }
        },
        expandIconName: {
            name: 'expand-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevronright',
            description: 'Icon used to expand the summary detail.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:chevronright' }
            }
        },
        closed: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    }
};

const Template = (args) => SummaryDetail(args);
const TemplateWithButton = (args) => SummaryDetailWithActionButton(args);

export const Base = Template.bind({});

export const Closed = TemplateWithButton.bind({});
Closed.args = {
    closed: true,
    title: 'Summary detail closed by default'
};

export const FullWidthHeader = TemplateWithButton.bind({});
FullWidthHeader.args = {
    fullWidthHeader: true,
    title: 'Summary detail with a full width header'
};

export const CustomIcons = TemplateWithButton.bind({});
CustomIcons.args = {
    title: 'Summary detail with custom expand and shrink icons',
    shrinkIconName: 'utility:contract_alt',
    expandIconName: 'utility:expand_alt'
};
