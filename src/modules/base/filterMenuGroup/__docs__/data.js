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

const contact = [
    {
        label: 'Call',
        value: 'call',
        prefixIconName: 'standard:call',
        iconName: 'utility:voicemail_drop'
    },
    {
        label: 'Email',
        value: 'email',
        prefixIconName: 'standard:email'
    },
    {
        label: 'Meeting',
        value: 'meeting',
        prefixIconName: 'standard:service_appointment',
        disabled: true
    },
    {
        label: 'Other',
        value: 'other',
        prefixIconName: 'standard:all'
    }
];

const prices = [
    {
        label: 'Free',
        value: 'free'
    },
    {
        label: 'Paid',
        value: 'paid'
    }
];

const editions = [
    {
        label: 'Essentials',
        value: 'essentials'
    },
    {
        label: 'Professional',
        value: 'professional'
    },
    {
        label: 'Enterprise',
        value: 'enterprise'
    },
    {
        label: 'Unlimited',
        value: 'unlimited'
    },
    {
        label: 'Force.com',
        value: 'forcecom'
    },
    {
        label: 'Developer',
        value: 'developer'
    },
    {
        label: 'Performance',
        value: 'performance'
    }
];

const languages = [
    {
        label: 'Dutch',
        value: 'dutch'
    },
    {
        label: 'English',
        value: 'english'
    },
    {
        label: 'Finnish',
        value: 'finnish'
    },
    {
        label: 'French',
        value: 'french'
    },
    {
        label: 'German',
        value: 'german'
    },
    {
        label: 'Danish',
        value: 'danish'
    },
    {
        label: 'Italian',
        value: 'italian'
    },
    {
        label: 'Japanese',
        value: 'japanese'
    },
    {
        label: 'Korean',
        value: 'korean'
    },
    {
        label: 'Portuguese',
        value: 'portuguese'
    }
];

const MENUS = [
    {
        name: 'contact',
        label: 'Type',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        items: contact,
        tooltip: 'Type of contact',
        value: 'email'
    },
    {
        name: 'prices',
        disabled: true,
        label: 'Prices',
        items: prices,
        dropdownWidth: 'large',
        droddownNubbin: true,
        hideSelectedItems: true
    },
    {
        name: 'editions',
        items: editions,
        label: 'Editions',
        showSearchBox: true,
        dropdownLength: '5-items',
        isMultiSelect: true
    },
    {
        name: 'ratings',
        label: 'Ratings',
        isLoading: true,
        loadingStateAlternativeText: 'Waiting for the items to load...'
    },
    {
        name: 'languages',
        items: languages,
        label: 'Laguages',
        dropdownLength: '10-items',
        isMultiSelect: true,
        value: ['dutch', 'english']
    }
];

const ICONS_MENUS = [
    {
        name: 'contact',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        items: contact,
        iconName: 'utility:call',
        tooltip: 'Type of contact',
        value: 'email'
    },
    {
        name: 'prices',
        disabled: true,
        items: prices,
        iconName: 'utility:currency',
        dropdownWidth: 'large',
        droddownNubbin: true,
        hideSelectedItems: true
    },
    {
        name: 'editions',
        items: editions,
        iconName: 'utility:knowledge_base',
        buttonVariant: 'bare',
        showSearchBox: true,
        dropdownLength: '5-items'
    },
    {
        name: 'ratings',
        iconName: 'utility:favorite',
        isLoading: true,
        loadingStateAlternativeText: 'Waiting for the items to load...'
    },
    {
        name: 'languages',
        iconName: 'utility:world',
        items: languages,
        dropdownLength: '10-items',
        isMultiSelect: true,
        value: ['dutch', 'english']
    }
];

const NO_VALUE_MENU = [
    {
        name: 'contact',
        label: 'Type',
        accessKey: 'k',
        alternativeText: 'Open contact type filter',
        items: [
            {
                label: 'Call',
                value: 'call',
                prefixIconName: 'standard:call',
                iconName: 'utility:voicemail_drop'
            },
            {
                label: 'Email',
                value: 'email',
                prefixIconName: 'standard:email'
            }
        ],
        tooltip: 'Type of contact'
    }
];

export { MENUS, ICONS_MENUS, NO_VALUE_MENU };
