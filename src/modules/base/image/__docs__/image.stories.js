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

import { ImageList } from '../__examples__/imageList';

export default {
    title: 'Example/Image',
    argTypes: {
        alt: {
            control: {
                type: 'text'
            },
            description: "The value to set for the 'alt' attribute.",
            table: {
                type: { summary: 'string' }
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
                type: 'number',
                min: 0,
                max: 100,
                step: 1
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
                type: 'number',
                min: 0,
                max: 100,
                step: 1
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
        height: {
            control: {
                type: 'text'
            },
            description: "The value to set on the image's 'height' attribute.",
            table: {
                type: { summary: 'string' }
            }
        },
        lazyLoading: {
            name: 'lazy-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'Enables lazy loading for images that are offscreen. If set to true, the property ensures that offscreen images are loaded early enough so that they have finished loading once the user scrolls near them. Note: Keep in mind that the property uses the loading attribute of HTML <img> element which is not supported for Internet Explorer.',
            table: {
                default: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        position: {
            control: {
                type: 'select'
            },
            options: ['left', 'right', 'center'],
            defaultValue: 'left',
            description:
                'Specifies the position of the image. Valid values include left, center and right.',
            table: {
                defaultValue: { summary: 'left' },
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
        src: {
            control: {
                type: 'object'
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
        width: {
            control: {
                type: 'text'
            },
            description: "The value to set on the image's 'width' attribute.",
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        block: false,
        fluid: false,
        fluidGrow: false,
        thumbnail: false,
        blank: false,
        staticImages: false,
        lazyLoading: false
    }
};

const Template = (args) => Image(args);

const ListTemplate = (args) => ImageList(args);

export const Base = Template.bind({});
Base.args = {
    src: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text'
};

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    src: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    width: '150'
};

export const BaseLarge = Template.bind({});
BaseLarge.args = {
    src: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    width: '600'
};

export const BaseWithLazyLoading = ListTemplate.bind({});
BaseWithLazyLoading.args = {
    src: [
        'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
        'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg',
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg',
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg',
        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        'https://ik.imagekit.io/demo/img/image1.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image2.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image4.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image5.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image6.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image7.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image9.jpeg?tr=w-400,h-300',
        'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
    ],
    width: '400',
    alt: 'Alt text',
    lazyLoading: true
};

export const Thumbnail = Template.bind({});
Thumbnail.args = {
    src: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    thumbnail: true
};

export const Center = Template.bind({});
Center.args = {
    src: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    position: 'center',
    width: '600'
};

export const Right = Template.bind({});
Right.args = {
    src: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    position: 'right',
    width: '600'
};

export const CropImageStaticThumbnailMobile = Template.bind({});
CropImageStaticThumbnailMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
CropImageStaticThumbnailMobile.args = {
    src: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
    alt: 'Alt text',
    width: '280',
    cropSize: '1x1',
    cropFit: 'none',
    cropPositionX: '23',
    cropPositionY: '80',
    thumbnail: true,
    staticImages: true
};
