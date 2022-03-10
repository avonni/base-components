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

import { PageHeader } from '../__examples__/pageHeader';

export default {
    title: 'Example/Page Header',
    argTypes: {
        iconName: {
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header before the title.",
            table: {
                type: { summary: 'String' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'The label can include text. To include additional markup or another component, use the label slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text. To include additional markup or another component, use the title slot.The title can include text. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        info: {
            control: {
                type: 'text'
            },
            description:
                'The info can include text. To include additional markup or another component, use the info slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'object-home',
                'record-home',
                'record-home-vertical'
            ],
            description:
                'The type of component. Valid values include base, object-home, record-home and record-home-vertical.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'String' }
            }
        },
        isJoined: {
            control: {
                type: 'boolean'
            },
            name: 'is-joined',
            description:
                'If present, the lower border is removed to allow the header to sit flush on an element.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => PageHeader(args);

export const Base = Template.bind({});
Base.args = {
    variant: 'base',
    iconName: 'standard:opportunity',
    title: 'Title',
    info: 'Info'
};

export const ObjectHome = Template.bind({});
ObjectHome.args = {
    variant: 'object-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const RecordHome = Template.bind({});
RecordHome.args = {
    variant: 'record-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const RecordHomeVertical = Template.bind({});
RecordHomeVertical.args = {
    variant: 'record-home-vertical',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const MobileRecordHome = Template.bind({});
MobileRecordHome.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
MobileRecordHome.args = {
    variant: 'record-home',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};

export const MobileRecordHomeVertical = Template.bind({});
MobileRecordHomeVertical.parameters = {
    viewport: {
        defaultViewport: 'mobile1'
    }
};
MobileRecordHomeVertical.args = {
    variant: 'record-home-vertical',
    iconName: 'standard:opportunity',
    label: 'Label',
    title: 'Title',
    info: 'Info'
};
