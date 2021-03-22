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
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        fluid: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        fluidGrow: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        thumbnail: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        left: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        right: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        center: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        blank: {
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

const Template = (args) => Image(args);

export const Base = Template.bind({});
Base.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    blankColor: 'transparent'
};
