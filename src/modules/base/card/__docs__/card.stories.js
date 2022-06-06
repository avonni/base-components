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

import { Card } from '../__examples__/card';
import { CardSlots } from '../__examples__/cardSlots';

export default {
    title: 'Example/Card',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header.',
            table: {
                type: { summary: 'string' }
            }
        },
        mediaPosition: {
            control: {
                type: 'select'
            },
            options: [
                'left',
                'right',
                'top',
                'bottom',
                'center',
                'background',
                'overlay'
            ],
            description: 'Image position.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top' }
            }
        },
        avatar: {
            control: {
                type: 'object'
            },
            description:
                'Avatar object. If present, the avatar is displayed to the left of the card.',
            table: {
                type: { summary: 'object' }
            }
        },
        mediaSrc: {
            control: {
                type: 'text'
            },
            description: 'Media link of the card image.',
            table: {
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => Card(args);
const SlotsTemplate = (args) => CardSlots(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Card title',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    }
};

export const ImageTop = Template.bind({});
ImageTop.args = {
    title: 'Card title',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    mediaPosition: 'top',
    mediaSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
};

export const ImageLeft = Template.bind({});
ImageLeft.args = {
    title: 'Card title',
    mediaPosition: 'left',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    mediaSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
};

export const ImageRight = Template.bind({});
ImageRight.args = {
    title: 'Card title',
    mediaPosition: 'right',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    mediaSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
};

export const ImageCenter = Template.bind({});
ImageCenter.args = {
    title: 'Card title card had long truncated title that will trucate',
    mediaPosition: 'center',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    mediaSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
};

export const ImageBottom = Template.bind({});
ImageBottom.args = {
    title: 'Card title',
    mediaPosition: 'bottom',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    mediaSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
};

export const ImageBackground = Template.bind({});
ImageBackground.args = {
    title: 'Card title card had long truncated title that will trucate',
    mediaPosition: 'background',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    mediaSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
};

export const OverlayCard = Template.bind({});
OverlayCard.args = {
    title: 'Card title',
    mediaPosition: 'overlay',
    avatar: {
        fallbackIconName: 'custom:custom1',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    mediaSrc: 'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300'
};

export const BaseWithSlots = SlotsTemplate.bind({});
BaseWithSlots.args = {
    mediaPosition: 'center'
};
