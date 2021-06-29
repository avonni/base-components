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

import { Illustration } from '../__examples__/illustration';
import { IllustrationWithSlot } from '../__examples__/illustrationWithSlot';

export default {
    title: 'Base/Illustration',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['small', 'large'],
            defaultValue: 'small',
            table: {
                defaultValue: { summary: 'small' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'text-only',
                'going-camping',
                'gone_fishing',
                'maintenance',
                'desert',
                'open-road',
                'no-access',
                'no-connection',
                'not-available-in-lightning',
                'page-not-available',
                'walkthrough-not-available',
                'fishing-deals',
                'lake-mountain',
                'no-events',
                'no-events-2',
                'no-task',
                'no-task-2',
                'setup',
                'gone-fishing',
                'no-access-2',
                'no-content',
                'no-preview',
                'preview',
                'research'
            ],
            defaultValue: 'text-only',
            table: {
                defaultValue: { summary: 'text-only' }
            }
        }
    }
};

const Template = (args) => Illustration(args);
const TemplateWithSlots = (args) => IllustrationWithSlot(args);

export const SmallSize = Template.bind({});
SmallSize.args = {
    title: 'Going camping',
    variant: 'going-camping'
};

export const LargeSize = Template.bind({});
LargeSize.args = {
    title: 'Going camping',
    size: 'large',
    variant: 'going-camping'
};

export const WithSlot = TemplateWithSlots.bind({});
WithSlot.args = {
    title: 'Going camping',
    size: 'large',
    variant: 'going-camping'
};

export const VariantTextOnly = TemplateWithSlots.bind({});
VariantTextOnly.args = {
    title: 'Text only',
    size: 'large',
    variant: 'text-only'
};

export const VariantGoingCamping = TemplateWithSlots.bind({});
VariantGoingCamping.args = {
    title: 'Going camping',
    size: 'large',
    variant: 'going-camping'
};

export const VariantGoneFishing = TemplateWithSlots.bind({});
VariantGoneFishing.args = {
    title: 'Gone Fishing',
    size: 'large',
    variant: 'gone_fishing'
};

export const VariantMaintenance = TemplateWithSlots.bind({});
VariantMaintenance.args = {
    title: 'Maintenance',
    size: 'large',
    variant: 'maintenance'
};

export const VariantDesert = TemplateWithSlots.bind({});
VariantDesert.args = {
    title: 'Desert',
    size: 'large',
    variant: 'desert'
};

export const VariantOpenRoad = TemplateWithSlots.bind({});
VariantOpenRoad.args = {
    title: 'Open Road',
    size: 'large',
    variant: 'open-road'
};

export const VariantNoAccess = TemplateWithSlots.bind({});
VariantNoAccess.args = {
    title: 'No access',
    size: 'large',
    variant: 'no-access'
};

export const VariantNoAccess2 = TemplateWithSlots.bind({});
VariantNoAccess2.args = {
    title: 'No access 2',
    size: 'large',
    variant: 'no-access-2'
};

export const VariantNoConnection = TemplateWithSlots.bind({});
VariantNoConnection.args = {
    title: 'No connection',
    size: 'large',
    variant: 'no-connection'
};

export const VariantNotAvailableInLightning = TemplateWithSlots.bind({});
VariantNotAvailableInLightning.args = {
    title: 'Not Available In Lightning',
    size: 'large',
    variant: 'not-available-in-lightning'
};

export const VariantPageNotAvailable = TemplateWithSlots.bind({});
VariantPageNotAvailable.args = {
    title: 'Variant Page Not Available',
    size: 'large',
    variant: 'page-not-available'
};

export const VariantWalkthroughNotAvailable = TemplateWithSlots.bind({});
VariantWalkthroughNotAvailable.args = {
    title: 'Walkthrough Not Available',
    size: 'large',
    variant: 'walkthrough-not-available'
};

export const VariantFishingDeals = TemplateWithSlots.bind({});
VariantFishingDeals.args = {
    title: 'Fishing Deals',
    size: 'large',
    variant: 'fishing-deals'
};

export const VariantLakeMountain = TemplateWithSlots.bind({});
VariantLakeMountain.args = {
    title: 'Lake Mountain',
    size: 'large',
    variant: 'lake-mountain'
};

export const VariantNoEvents = TemplateWithSlots.bind({});
VariantNoEvents.args = {
    title: 'No Events',
    size: 'large',
    variant: 'no-events'
};

export const VariantNoEvents2 = TemplateWithSlots.bind({});
VariantNoEvents2.args = {
    title: 'No Events 2',
    size: 'large',
    variant: 'no-events-2'
};

export const VariantNoTask = TemplateWithSlots.bind({});
VariantNoTask.args = {
    title: 'No Task',
    size: 'large',
    variant: 'no-task'
};

export const VariantNoTask2 = TemplateWithSlots.bind({});
VariantNoTask2.args = {
    title: 'No Task 2',
    size: 'large',
    variant: 'no-task-2'
};

export const VariantSetup = TemplateWithSlots.bind({});
VariantSetup.args = {
    title: 'Setup',
    size: 'large',
    variant: 'setup'
};

export const VariantNoContent = TemplateWithSlots.bind({});
VariantNoContent.args = {
    title: 'No Content',
    size: 'large',
    variant: 'no-content'
};

export const VariantNoPreview = TemplateWithSlots.bind({});
VariantNoPreview.args = {
    title: 'No Preview',
    size: 'large',
    variant: 'no-preview'
};

export const VariantPreview = TemplateWithSlots.bind({});
VariantPreview.args = {
    title: 'Preview',
    size: 'large',
    variant: 'preview'
};

export const VariantResearch = TemplateWithSlots.bind({});
VariantResearch.args = {
    title: 'Research',
    size: 'large',
    variant: 'research'
};
