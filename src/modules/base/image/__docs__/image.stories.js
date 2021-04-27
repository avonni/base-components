import { Image } from '../__examples__/image';

export default {
    title: 'Example/Image',
    argTypes: {
        src: {
            control: {
                type: 'text'
            },
            description: "URL to set for the 'src' attribute.",
            table: {
                type: { summary: 'string' }
            }
        },
        srcset: {
            control: {
                type: 'text'
            },
            description:
                'One or more strings separated by commas (or an array of strings), indicating possible image sources for the user agent to use.',
            table: {
                type: { summary: 'string' }
            }
        },
        sizes: {
            control: {
                type: 'text'
            },
            description:
                'One or more strings separated by commas (or an array of strings), indicating a set of source sizes. Optionally used in combination with the srcset prop.',
            table: {
                type: { summary: 'string' }
            }
        },
        alt: {
            control: {
                type: 'text'
            },
            description: "Value to set for the 'alt' attribute.",
            table: {
                type: { summary: 'string' }
            }
        },
        width: {
            control: {
                type: 'text'
            },
            description: "The value to set on the image's 'width' attribute.",
            table: {
                type: { summary: 'string' }
            }
        },
        height: {
            control: {
                type: 'text'
            },
            description: "The value to set on the image's 'height' attribute.",
            table: {
                type: { summary: 'string' }
            }
        },
        blankColor: {
            name: 'blank-color',
            control: {
                type: 'text'
            },
            description:
                'Sets the color of the blank image to the CSS color value specified.',
            table: {
                defaultValue: { summary: 'transparent' },
                type: { summary: 'string' }
            }
        },
        rounded: {
            control: {
                type: 'select'
            },
            options: ['top', 'right', 'bottom', 'left', 'circle', false, true],
            defaultValue: false,
            description:
                "When set to 'true', makes the image corners slightly rounded. Can also be used to disable rounded corners or make the image a circle/oval. See docs for details.",
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        block: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'Forces the image to display as a block element rather than the browser default of inline-block element.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        fluid: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: '',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        fluidGrow: {
            name: 'fluid-grow',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                "Makes the image responsive. The image will shrink as needed or grow up the the image's native width.",
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        thumbnail: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Adds a thumbnail border around the image.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        left: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Floats the image to the left when set.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        right: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Floats the image to the right when set.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        center: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Centers the image horizontally.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        blank: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'Creates a blank/transparent image via an SVG data URI.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        block: false,
        fluid: false,
        fluidGrow: false,
        thumbnail: false,
        left: false,
        right: false,
        center: false,
        blank: false
    }
};

const Template = (args) => Image(args);

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'transparent',
    width: '150',
    height: '75'
};

export const Base = Template.bind({});
Base.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'transparent'
};

export const BaseLarge = Template.bind({});
BaseLarge.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'transparent',
    width: '600',
    height: '300'
};

export const BaseBlankGrayLarge = Template.bind({});
BaseBlankGrayLarge.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'gray',
    width: '600',
    height: '300',
    blank: 'true'
};

export const Thumbnail = Template.bind({});
Thumbnail.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'transparent',
    thumbnail: 'true'
};

export const CenterCornerRounded = Template.bind({});
CenterCornerRounded.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    rounded: 'true',
    blankColor: 'transparent',
    center: 'true'
};

export const RightCornerTop = Template.bind({});
RightCornerTop.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    rounded: 'top',
    blankColor: 'transparent',
    right: 'true'
};

export const CornerBottom = Template.bind({});
CornerBottom.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    rounded: 'bottom',
    blankColor: 'transparent'
};

export const CornerRight = Template.bind({});
CornerRight.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    rounded: 'right',
    blankColor: 'transparent'
};

export const CornerLeft = Template.bind({});
CornerLeft.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    rounded: 'left',
    blankColor: 'transparent'
};

export const SmallCircle = Template.bind({});
SmallCircle.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/circle_4_inspire_2x.jpg',
    alt: 'Alt text',
    height: '50',
    width: '50',
    rounded: 'circle',
    blankColor: 'transparent'
};

export const MediumCircle = Template.bind({});
MediumCircle.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/circle_4_inspire_2x.jpg',
    alt: 'Alt text',
    height: '150',
    width: '150',
    rounded: 'circle',
    blankColor: 'transparent'
};

export const ThumbnailMediumCircle = Template.bind({});
ThumbnailMediumCircle.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/circle_4_inspire_2x.jpg',
    alt: 'Alt text',
    height: '150',
    width: '150',
    rounded: 'circle',
    blankColor: 'transparent',
    thumbnail: 'true'
};

export const LargeCircle = Template.bind({});
LargeCircle.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/circle_4_inspire_2x.jpg',
    alt: 'Alt text',
    height: '300',
    width: '300',
    rounded: 'circle',
    blankColor: 'transparent'
};

export const LargeBlankGrayCircle = Template.bind({});
LargeBlankGrayCircle.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/circle_4_inspire_2x.jpg',
    alt: 'Alt text',
    height: '300',
    width: '300',
    rounded: 'circle',
    blank: 'true',
    blankColor: 'gray'
};
