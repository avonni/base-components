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

import { Panel } from '../__examples__/panel';
import { PanelWithButtons } from '../__examples__/panelWithButtons';
import { PanelWithDatatable } from '../__examples__/panelWithDatatable';
import { PanelWithContentInside } from '../__examples__/panelWithContentInside';
import { FiltersPanel } from '../__examples__/filtersPanel';

export default {
    title: 'Example/Panel',
    argTypes: {
        position: {
            control: {
                type: 'select'
            },
            options: ['right', 'left'],
            defaultValue: 'right',
            description: 'Valid values include left and right.',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'right' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the panel header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'String' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'x-large', 'full'],
            defaultValue: 'medium',
            description:
                'Valid values include small, medium, large, x-large and full.',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'medium' }
            }
        }
    }
};

const Template = (args) => Panel(args);
const PanelWithButtonsTemplate = (args) => PanelWithButtons(args);
const PanelWithDatatableTemplate = (args) => PanelWithDatatable(args);
const PanelWithContentInsideTemplate = (args) => PanelWithContentInside(args);
const FiltersPanelTemplate = (args) => FiltersPanel(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Panel Header',
    showPanel: true
};

export const Small = Template.bind({});
Small.args = {
    title: 'Small Panel Header',
    showPanel: true,
    size: 'small'
};

export const Large = Template.bind({});
Large.args = {
    title: 'Large Panel Header',
    showPanel: true,
    size: 'Large'
};

export const X_Large = Template.bind({});
X_Large.args = {
    title: 'X-Large Panel Header',
    showPanel: true,
    size: 'x-Large'
};

export const Full = Template.bind({});
Full.args = {
    title: 'Full Panel Header',
    showPanel: true,
    size: 'full'
};

export const PanelButtons = PanelWithButtonsTemplate.bind({});
PanelButtons.args = {};

export const PanelDatatable = PanelWithDatatableTemplate.bind({});
PanelDatatable.args = {};

export const PanelFilter = FiltersPanelTemplate.bind({});
PanelFilter.args = {};

export const PanelWithContent = PanelWithContentInsideTemplate.bind({});
PanelWithContent.args = {
    showPanel: true
};
