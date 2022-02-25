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

import { PillContainer } from '../__examples__/pillContainer';
import { ITEMS, ACTIONS } from './data';

export default {
    title: 'Example/Pill Container',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description:
                'Array of actions to display to the right of each pill.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        isCollapsible: {
            name: 'is-collapsible',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the pill list can be collapsed. Use is-collapsible with the is-expanded attribute to expand and collapse the list of pills.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isExpanded: {
            name: 'is-expanded',
            control: {
                type: 'boolean'
            },
            description:
                'If present and is-collapsible too, the list of pills is expanded. This attribute is ignored when is-collapsible is false, and the list of pills is expanded even if is-expanded is false or not set.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description:
                'Array of item objects to display as pills in the container.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'Label used as assistive text for the container, to describe the list of options.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Selected Options:' }
            }
        },
        singleLine: {
            name: 'single-line',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the pills are limited to one line. This attribute overrides the is-collapsible and is-expanded attributes.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        sortable: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the pills are sortable.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        isCollapsible: false,
        isExpanded: false,
        label: 'Selected Options:',
        singleLine: false,
        sortable: false
    }
};

const Template = (args) => PillContainer(args);

export const Base = Template.bind({});
Base.args = {
    items: ITEMS
};

export const Actions = Template.bind({});
Actions.args = {
    actions: ACTIONS,
    items: ITEMS
};

export const Collapsible = Template.bind({});
Collapsible.args = {
    isCollapsible: true,
    items: ITEMS
};

export const Sortable = Template.bind({});
Sortable.args = {
    actions: [ACTIONS[0]],
    items: ITEMS,
    label: 'Sortable options',
    sortable: true
};
