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

const columns = [
    {
        label: 'Staff',
        fieldName: 'avatarSrc',
        type: 'avatar',
        typeAttributes: {
            alternativeText: 'Avatar',
            fallbackIconName: { fieldName: 'avatarFallbackIconName' },
            initials: { fieldName: 'avatarInitials' },
            primaryText: { fieldName: 'firstName' }
        },
        initialWidth: 150
    },
    {
        label: 'Role',
        fieldName: 'role',
        hideDefaultActions: true
    }
];

const rows = [
    {
        id: 1,
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'NG',
        firstName: 'Nina',
        role: 'Lead developer'
    },
    {
        id: 2,
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'DM',
        firstName: 'Dave',
        role: 'UX Specialist'
    },
    {
        id: 3,
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'JP',
        firstName: 'Jung',
        role: 'Product Owner'
    },
    {
        id: 4,
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'LM',
        firstName: 'Lily',
        role: 'Graphic Designer'
    },
    {
        id: 5,
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'RM',
        firstName: 'Reginald',
        role: 'Developer'
    }
];

const headers = [
    {
        unit: 'month',
        span: 1,
        label: '<MMMM> <YYYY>'
    },
    // {
    //     unit: 'week',
    //     span: 1,
    //     label: 'Week'
    // },
    {
        unit: 'day',
        span: 1,
        label: '<DD>'
    },
    {
        unit: 'hour',
        span: 6,
        label: '<H>'
    }
    // {
    //     unit: 'minute',
    //     span: 30,
    //     label: '<mm>'
    // }
];

export { columns, rows, headers };
