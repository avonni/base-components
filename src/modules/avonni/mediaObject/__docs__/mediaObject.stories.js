import { MediaObject } from '../__examples__/mediaObject';

export default {
    title: 'Example/Media Object',
    verticalAlign: {
        accessKey: {
            control: {
                type: 'text'
            }
        }
    }
};

const Template = (args) => MediaObject(args);

export const Base = Template.bind({});
Base.args = {};
