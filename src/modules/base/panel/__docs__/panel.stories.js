import { Panel } from '../__examples__/panel';
import { PanelWithButtons } from '../__examples__/panelWithButtons';
import { PanelWithDatatable } from '../__examples__/panelWithDatatable';

export default {
    title: 'Example/Panel',
    argTypes: {
        position: {
            control: {
                type: 'select',
                options: ['right', 'left']
            },
            defaultValue: 'right',
            description: 'Valid values include left and right.',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'right' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the panel header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large', 'x-large', 'full']
            },
            defaultValue: 'medium',
            description:
                'Valid values include small, medium, large, x-large and full.',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'medium' }
            }
        }
    }
};

const Template = (args) => Panel(args);
const PanelWithButtonsTemplate = (args) => PanelWithButtons(args);
const PanelWithDatatableTemplate = (args) => PanelWithDatatable(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Title'
};

export const PanelButtons = PanelWithButtonsTemplate.bind({});
PanelButtons.args = {
    title: 'Title'
};

export const PanelDatatable = PanelWithDatatableTemplate.bind({});
PanelDatatable.args = {
    title: 'Title'
};
