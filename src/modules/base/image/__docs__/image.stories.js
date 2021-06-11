/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
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
        cropSize: {
            name: 'crop-size',
            control: {
                type: 'select'
            },
            options: ['1x1', '4x3', '16x9', 'none'],
            defaultValue: 'none',
            description:
                'Specifies the cropping ratio for the image, which is constrained to the parents width. Options : 1:1, 4:3, 16:9, none',
            table: {
                defaultValue: { summary: 'none' },
                type: { summary: 'string' },
                category: 'Crop'
            }
        },
        cropFit: {
            name: 'crop-fit',
            control: {
                type: 'select'
            },
            options: ['cover', 'contain', 'fill', 'none'],
            defaultValue: 'cover',
            description:
                'Specifies the "fit" behaviour for the cropped image. Options: "cover"(default), "contain", "fill", "none"',
            table: {
                defaultValue: { summary: 'cover' },
                type: { summary: 'string' },
                category: 'Crop'
            }
        },
        cropPositionX: {
            name: 'crop-position-X(%)',
            control: {
                type: 'range'
            },
            defaultValue: '50',
            description:
                'Specifies the cropping point of interest on the X axis of the image, in percentage',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '50' },
                category: 'Crop',
                detail: 'Percent'
            }
        },
        cropPositionY: {
            name: 'crop-position-Y(%)',
            control: {
                type: 'range'
            },
            defaultValue: '50',
            description:
                'Specifies the cropping point of interest on the Y axis of the image, in percentage',
            table: {
                defaultValue: { summary: '50' },
                type: { summary: 'string' },
                category: 'Crop',
                detail: 'Percent'
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
        },
        staticImages: {
            name: 'static-images',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'Set Images as Static - images will be fixed dimensions and will not be responsive on resize',
            table: {
                default: { summary: false },
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
        blank: false,
        staticImages: false
    }
};

const Template = (args) => Image(args);

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'transparent',
    width: '150'
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
    width: '600'
};

export const BaseBlankGrayLarge = Template.bind({});
BaseBlankGrayLarge.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'gray',
    width: '600',
    height: '300',
    blank: true
};

export const Thumbnail = Template.bind({});
Thumbnail.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    blankColor: 'transparent',
    thumbnail: true
};

export const CenterCornerRounded = Template.bind({});
CenterCornerRounded.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    rounded: 'true',
    blankColor: 'transparent',
    center: true
};

export const RightCornerTop = Template.bind({});
RightCornerTop.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    rounded: 'top',
    blankColor: 'transparent',
    right: true
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
    thumbnail: true
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
    blank: true,
    blankColor: 'gray'
};

export const CropImageStaticCircleThumbnailMobile = Template.bind({});
CropImageStaticCircleThumbnailMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
CropImageStaticCircleThumbnailMobile.args = {
    src:
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    width: '300',
    cropSize: '1x1',
    rounded: 'circle',
    cropFit: 'none',
    cropPositionX: '23',
    cropPositionY: '80',
    thumbnail: true,
    staticImages: true
};
