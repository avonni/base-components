import { Splitter } from '../__examples__/splitter';
import { DoubleOrientationSplitter } from '../__examples__/doubleOrientationSplitter';

export default {
    title: 'Example/Splitter',
    argTypes: {
        orientation: {
            control: {
                type: 'radio'
            },
            options: ['horizontal', 'vertical'],
            defaultValue: 'horizontal',
            description:
                'Specifies the orientation of the widget. Supported values are "horizontal" and "vertical".',
            table: {
                defaultValue: { summary: 'horizontal' },
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => Splitter(args);
const DoubleTemplate = (args) => DoubleOrientationSplitter(args);

export const Base = Template.bind({});

export const Vertical = Template.bind({});
Vertical.args = {
    orientation: 'vertical'
};

export const Double = DoubleTemplate.bind({});
Double.args = {};
