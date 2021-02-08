import { Image } from '../__examples__/image';

export default {
    title: 'Example/Image',
    argTypes: {
        src: {
            control: {
                type: 'text'
            }
        },
        srcset: {
            control: {
                type: 'text'
            }
        },
        sizes: {
            control: {
                type: 'text'
            }
        },
        alt: {
            control: {
                type: 'text'
            }
        },
        width: {
            control: {
                type: 'text'
            }
        },
        height: {
            control: {
                type: 'text'
            }
        },
        blankColor: {
            control: {
                type: 'text'
            }
        },
        rounded: {
            control: {
                type: 'select',
                options: ['top', 'right', 'bottom', 'left', 'circle', false]
            },
            defaultValue: false,
            table: {
                defaultValue: { summary: false }
            }
        },
        block: {
            control: {
                type: 'boolean'
            }
        },
        fluid: {
            control: {
                type: 'boolean'
            }
        },
        fluidGrow: {
            control: {
                type: 'boolean'
            }
        },
        thumbnail: {
            control: {
                type: 'boolean'
            }
        },
        left: {
            control: {
                type: 'boolean'
            }
        },
        right: {
            control: {
                type: 'boolean'
            }
        },
        center: {
            control: {
                type: 'boolean'
            }
        },
        blank: {
            control: {
                type: 'boolean'
            }
        }
    }
};

const Template = (args) => Image(args);

export const Base = Template.bind({});
Base.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    blankColor: 'transparent'
};
