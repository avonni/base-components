import { Panel } from '../__examples__/panel';
import { PanelWithButtons } from '../__examples__/panelWithButtons';
import { PanelWithDatatable } from '../__examples__/panelWithDatatable';
import { PanelWithContentInside } from '../__examples__/panelWithContentInside';
import { FiltersPanel } from '../__examples__/filtersPanel';

export default {
    title: 'Example/Panel',
    argTypes: {
        position: {
            control: {
                type: 'select'
            },
            options: ['right', 'left'],
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
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'x-large', 'full'],
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
const PanelWithContentInsideTemplate = (args) => PanelWithContentInside(args);
const FiltersPanelTemplate = (args) => FiltersPanel(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Panel Header',
    showPanel: true
};

export const Small = Template.bind({});
Small.args = {
    title: 'Small Panel Header',
    showPanel: true,
    size: 'small'
};

export const Large = Template.bind({});
Large.args = {
    title: 'Large Panel Header',
    showPanel: true,
    size: 'Large'
};

export const X_Large = Template.bind({});
X_Large.args = {
    title: 'X-Large Panel Header',
    showPanel: true,
    size: 'x-Large'
};

export const Full = Template.bind({});
Full.args = {
    title: 'Full Panel Header',
    showPanel: true,
    size: 'full'
};

export const PanelButtons = PanelWithButtonsTemplate.bind({});
PanelButtons.args = {};

export const PanelDatatable = PanelWithDatatableTemplate.bind({});
PanelDatatable.args = {};

export const PanelFilter = FiltersPanelTemplate.bind({});
PanelFilter.args = {};

export const PanelWithContent = PanelWithContentInsideTemplate.bind({});
PanelWithContent.args = {
    showPanel: true
};
