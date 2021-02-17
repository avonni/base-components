import { SummaryDetail } from '../__examples__/summaryDetail';

export default {
    title: 'Example/Summary Detail',
    argTypes: {
        title: {
            control: {
                type: 'text'
            }
        },
        closed: {
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

const Template = (args) => SummaryDetail(args);

export const Base = Template.bind({});
Base.args = {};
