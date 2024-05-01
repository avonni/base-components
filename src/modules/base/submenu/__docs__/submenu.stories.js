import { Submenu } from '../__examples__/submenu';
import { SubmenuLeftAlignment } from '../__examples__/leftAlignment';

export default {
    title: 'Example/Submenu',
    argTypes: {
        buttonMenuTriggers: {
            control: {
                type: 'select'
            },
            options: ['click', 'hover', 'focus'],
            description:
                "Specify which triggers will show the menu. Supported values are 'click', 'hover', 'focus'.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'click' }
            }
        }
    },
    args: {
        buttonMenuTriggers: 'click'
    }
};

const Template = (args) => Submenu(args);

export const Base = Template.bind({});
Base.args = {};

const TemplateLeftAlignment = (args) => SubmenuLeftAlignment(args);

export const LeftAlignment = TemplateLeftAlignment.bind({});
LeftAlignment.args = {};
