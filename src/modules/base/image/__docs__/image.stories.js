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
