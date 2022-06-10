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
            description: 'Media position.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top' }
            }
        },
        iconName: {
            control: {
                type: 'text'
            },
            description: 'Media link of the card image.',
            table: {
                type: { summary: 'string' }
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

export const Base = Template.bind({});
Base.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'left'
};

export const MediaTop = Template.bind({});
MediaTop.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'top',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaLeft = Template.bind({});
MediaLeft.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'left',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaRight = Template.bind({});
MediaRight.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'right',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaCenter = Template.bind({});
MediaCenter.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'center',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaBottom = Template.bind({});
MediaBottom.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'bottom',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaBackground = Template.bind({});
MediaBackground.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'background',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaOverlay = Template.bind({});
MediaOverlay.args = {
    title: 'Card title',
    iconName: 'custom:custom102',
    mediaPosition: 'overlay',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};
