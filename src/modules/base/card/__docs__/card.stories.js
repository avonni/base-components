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
import { CardCenterBottom } from '../__examples__/centerBottom';
import { CardTopMedia } from '../__examples__/cardTopMedia';

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
    },
    args: {
        mediaPosition: 'top'
    }
};

const BaseTemplate = (args) => Card(args);
const CenterBottomTemplate = (args) => CardCenterBottom(args);
const TopMediaTemplate = (args) => CardTopMedia(args);

export const Base = BaseTemplate.bind({});
Base.args = {
    title: 'Card Title',
    iconName: 'custom:custom102'
};

export const MediaTop = TopMediaTemplate.bind({});
MediaTop.args = {
    title: 'Real-time Collaborative Docs',
    iconName: 'standard:custom_notification',
    mediaSrc:
        'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg'
};

export const MediaLeft = BaseTemplate.bind({});
MediaLeft.args = {
    title: 'Card Title',
    iconName: 'standard:article',
    mediaPosition: 'left',
    mediaSrc:
        'https://images.unsplash.com/photo-1560141343-966cb5212777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=80'
};

export const MediaRight = BaseTemplate.bind({});
MediaRight.args = {
    title: 'Card Title',
    iconName: 'standard:article',
    mediaPosition: 'right',
    mediaSrc:
        'https://images.unsplash.com/photo-1560141343-966cb5212777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=80'
};

export const MediaCenter = CenterBottomTemplate.bind({});
MediaCenter.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'center',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaBottom = CenterBottomTemplate.bind({});
MediaBottom.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'bottom',
    mediaSrc:
        'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaBackground = BaseTemplate.bind({});
MediaBackground.args = {
    title: 'Salesforce Tower',
    iconName: 'standard:store_group',
    mediaPosition: 'background',
    mediaSrc:
        'https://images.unsplash.com/photo-1556038024-07f7daf0b84f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=450&q=80'
};

export const MediaOverlay = BaseTemplate.bind({});
MediaOverlay.args = {
    title: 'Salesforce Tower',
    iconName: 'standard:store_group',
    mediaPosition: 'overlay',
    mediaSrc:
        'https://images.unsplash.com/photo-1556038024-07f7daf0b84f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=450&q=80'
};
