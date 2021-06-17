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

import { VisualPickerLink } from '../__examples__/visualPickerLink';
import { VisualPickerLinkWithSlot } from '../__examples__/visualPickerLinkWithSlot';

export default {
    title: 'Example/VisualPickerLink',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' }
            }
        },
        href: {
            control: {
                type: 'text'
            },
            description: 'The URL of the page that the link goes to.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            defaultValue: 'left',
            description: 'Values include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' }
            }
        },
        completed: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Show as completed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        infoOnly: {
            name: 'info-only',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'The <a> tags are removed from the tiles. The tiles also lose their button appearance, removing borders and shadows.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        completed: false,
        infoOnly: false
    }
};

const Template = (args) => VisualPickerLink(args);
const TemplateWithSlots = (args) => VisualPickerLinkWithSlot(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Share the knowledge'
};

export const IconPositionLeft = Template.bind({});
IconPositionLeft.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    iconPosition: 'left'
};

export const IconPositionRight = Template.bind({});
IconPositionRight.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    iconPosition: 'right'
};

export const Link = Template.bind({});
Link.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    href: 'https://www.lightningdesignsystem.com/components/visual-picker/#Link'
};

export const Completed = Template.bind({});
Completed.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    completed: true
};

export const InfoOnly = Template.bind({});
InfoOnly.args = {
    title: 'Share the knowledge',
    iconName: 'utility:knowledge_base',
    infoOnly: true
};

export const WithSlots = TemplateWithSlots.bind({});
WithSlots.args = {
    iconName: 'utility:knowledge_base'
};
