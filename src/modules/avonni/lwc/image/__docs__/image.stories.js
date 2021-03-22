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
                options: [
                    'top',
                    'right',
                    'bottom',
                    'left',
                    'circle',
                    false,
                    true
                ]
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

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    src: 'https://picsum.photos/150/75/?image=41',
    alt: 'Alt text',
    blankColor: 'transparent',
    width: '150',
    height: '75'
};

export const Base = Template.bind({});
Base.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    blankColor: 'transparent'
};

export const BaseLarge = Template.bind({});
BaseLarge.args = {
    src: 'https://picsum.photos/600/300/?image=41',
    alt: 'Alt text',
    blankColor: 'transparent',
    width: '600',
    height: '300'
};

export const Thumbnail = Template.bind({});
Thumbnail.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    blankColor: 'transparent',
    thumbnail: 'true'
};

export const CenterCornerRounded = Template.bind({});
CenterCornerRounded.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    rounded: 'true',
    blankColor: 'transparent',
    center: 'true'
};

export const RightCornerTop = Template.bind({});
RightCornerTop.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    rounded: 'top',
    blankColor: 'transparent',
    right: 'true'
};

export const CornerBottom = Template.bind({});
CornerBottom.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    rounded: 'bottom',
    blankColor: 'transparent'
};

export const CornerRight = Template.bind({});
CornerRight.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    rounded: 'right',
    blankColor: 'transparent'
};

export const CornerLeft = Template.bind({});
CornerLeft.args = {
    src: 'https://picsum.photos/300/150/?image=41',
    alt: 'Alt text',
    rounded: 'left',
    blankColor: 'transparent'
};

export const Circle = Template.bind({});
Circle.args = {
    src: 'https://picsum.photos/300/300/?image=41',
    alt: 'Alt text',
    height: '300',
    width: '300',
    rounded: 'circle',
    blankColor: 'transparent'
};
