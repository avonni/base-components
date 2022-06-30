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

export const START = new Date(2021, 8, 2);

export const COLUMNS = [
    {
        label: 'First column',
        fieldName: 'col1'
    },
    {
        label: 'Second column',
        fieldName: 'col2'
    },
    {
        label: 'Third column',
        fieldName: 'col3'
    }
];

export const RESOURCES = [
    {
        name: 'resource-1',
        label: 'Resource 1',
        avatarSrc: 'some fake avatar src',
        avatarFallbackIconName: 'utility:user',
        avatarInitials: 'R1',
        col1: 'Resource 1, column 1',
        col2: 'Resource 1, column 2',
        col3: 'Resource 1, column 3'
    },
    {
        name: 'resource-2',
        label: 'Resource 2',
        col1: 'Resource 2, column 1',
        col2: 'Resource 2, column 2',
        col3: 'Resource 2, column 3'
    },
    {
        name: 'resource-3',
        label: 'Resource 3',
        col1: 'Resource 3, column 1',
        col2: 'Resource 3, column 2',
        col3: 'Resource 3, column 3'
    }
];

export const EVENTS = [
    {
        resourceNames: ['resource-2', 'resource-1'],
        name: 'event-1',
        title: 'Event 1',
        from: new Date(2021, 8, 2),
        to: new Date(2021, 8, 3),
        color: '#333'
    },
    {
        resourceNames: ['resource-3'],
        name: 'event-2',
        title: 'Event 2',
        from: new Date(2021, 8, 2),
        to: new Date(2021, 8, 3)
    },
    {
        resourceNames: ['resource-3'],
        name: 'event-3',
        title: 'Event 3',
        from: new Date(2021, 8, 3),
        to: new Date(2021, 8, 5)
    }
];

export const DISABLED_DATES_TIMES = [
    {
        resourceNames: ['resource-2', 'resource-1'],
        title: 'Disabled date 1',
        iconName: 'utility:apps',
        from: new Date(2021, 8, 2, 10),
        to: new Date(2021, 8, 3)
    },
    {
        resourceNames: ['resource-3'],
        title: 'Disabled date 2',
        from: new Date(2021, 8, 2),
        to: new Date(2021, 8, 3)
    },
    {
        resourceNames: ['resource-3'],
        title: 'Disabled date 3',
        from: new Date(2021, 7, 31),
        to: new Date(2021, 8, 5)
    }
];

export const MONTH_TIME_SPAN = {
    unit: 'month',
    span: 1
};

export const TIME_SPANS = [
    {
        name: 'monthSpan',
        unit: 'month',
        span: 3,
        label: '3 months',
        headers: 'weekMonthAndYear'
    },
    {
        unit: 'day',
        name: 'daySpan',
        span: 1,
        label: '1 day',
        headers: 'dayAndWeek',
        customHeaders: [
            {
                unit: 'day',
                span: 3,
                label: 'dd'
            },
            {
                unit: 'month',
                span: 1,
                label: 'mmmm'
            }
        ]
    },
    {
        unit: 'hour',
        name: 'hourSpan',
        span: 6,
        label: '6 hours',
        headers: 'hourDayAndWeek'
    },
    {
        unit: 'year',
        name: 'yearSpan',
        span: 2,
        label: '2 years',
        headers: 'quartersAndYear'
    }
];
