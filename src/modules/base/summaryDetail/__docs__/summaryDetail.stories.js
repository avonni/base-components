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
    title: 'Summary detail title'
};
