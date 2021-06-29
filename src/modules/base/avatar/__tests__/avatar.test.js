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

import { createElement } from 'lwc';
import Avatar from 'c/avatar';

describe('Avatar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });

        expect(element.alternativeText).toBe('Avatar');
        expect(element.fallbackIconName).toBeUndefined();
        expect(element.initials).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.src).toBeUndefined();
        expect(element.variant).toBe('square');
        expect(element.status).toBeNull();
        expect(element.statusTitle).toBe('Status');
        expect(element.statusPosition).toBe('top-right');
        expect(element.presence).toBeNull();
        expect(element.presenceTitle).toBe('Presence');
        expect(element.presencePosition).toBe('bottom-right');
        expect(element.entityIconName).toBeUndefined();
        expect(element.entityVariant).toBe('square');
        expect(element.entitySrc).toBeUndefined();
        expect(element.entityTitle).toBe('Entity');
        expect(element.entityPosition).toBe('top-left');
        expect(element.hideAvatarDetails).toBeFalsy();
        expect(element.primaryText).toBeUndefined();
        expect(element.secondaryText).toBeUndefined();
        expect(element.tertiaryText).toBeUndefined();
        expect(element.textPosition).toBe('right');
    });

    /* ----- ATTRIBUTES ----- */

    // alternative-text
    it('Avatar alternative text with image', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.alternativeText).toBe('This is an alternative text');
        });
    });

    it('Avatar alternative text with icon', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        element.fallbackIconName = 'standard:account';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.alternativeText).toBe('This is an alternative text');
        });
    });

    it('Avatar alternative text with initials', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        element.initials = 'JD';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.alternativeText).toBe('This is an alternative text');
        });
    });

    // fallback icon name
    it('Avatar fallback icon name', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.fallbackIconName = 'standard:account';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.fallbackIconName).toBe('standard:account');
        });
    });

    // Itinitals
    it('Avatar initials', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.initials = 'JD';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.initials).toBe('JD');
        });
    });

    //size
    it('Avatar Size xx-small', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'xx-small';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.size).toBe('xx-small');
        });
    });

    it('Avatar Size x-small', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.size).toBe('x-small');
        });
    });

    it('Avatar Size small', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'small';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.size).toBe('small');
        });
    });

    it('Avatar Size medium', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'medium';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.size).toBe('medium');
        });
    });

    it('Avatar Size large', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.size).toBe('large');
        });
    });

    it('Avatar Size x-large', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'x-large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.size).toBe('x-large');
        });
    });

    it('Avatar Size xx-large', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'xx-large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.size).toBe('xx-large');
        });
    });

    // src
    it('Avatar Src', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'xx-large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.src).toBe(
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            );
        });
    });

    // variant
    it('Avatar variant square', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.variant = 'square';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.variant).toBe('square');
        });
    });

    it('Avatar variant circle', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.variant = 'circle';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.variant).toBe('circle');
        });
    });

    // status
    it('Avatar status approved', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.status).toBe('approved');
        });
    });

    it('Avatar status locked', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'locked';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.status).toBe('locked');
        });
    });

    it('Avatar status declined', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'declined';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.status).toBe('declined');
        });
    });

    it('Avatar status unknown', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'unknown';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.status).toBe('unknown');
        });
    });

    // status position
    it('Avatar status position top-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'top-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.statusPosition).toBe('top-right');
        });
    });

    it('Avatar status position top-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'top-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.statusPosition).toBe('top-left');
        });
    });

    it('Avatar status position bottom-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'bottom-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.statusPosition).toBe('bottom-right');
        });
    });

    it('Avatar status position bottom-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'bottom-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.statusPosition).toBe('bottom-left');
        });
    });

    // status title
    it('Avatar status title', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusTitle = 'Status title';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.statusTitle).toBe('Status title');
        });
    });

    // presence
    it('Avatar presence online', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presence).toBe('online');
        });
    });

    it('Avatar presence busy', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'busy';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presence).toBe('busy');
        });
    });

    it('Avatar presence focus', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'focus';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presence).toBe('focus');
        });
    });

    it('Avatar presence offline', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'offline';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presence).toBe('offline');
        });
    });

    it('Avatar presence blocked', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'blocked';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presence).toBe('blocked');
        });
    });

    it('Avatar presence away', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'away';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presence).toBe('away');
        });
    });

    // presence title
    it('Avatar presence title', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presenceTitle = 'Presence Title';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presenceTitle).toBe('Presence Title');
        });
    });

    // presence position
    it('Avatar presence bottom-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'bottom-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presencePosition).toBe('bottom-right');
        });
    });

    it('Avatar presence bottom-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'bottom-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presencePosition).toBe('bottom-left');
        });
    });

    it('Avatar presence top-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'top-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presencePosition).toBe('top-left');
        });
    });

    it('Avatar presence top-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'top-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.presencePosition).toBe('top-right');
        });
    });

    // entity-icon-name
    it('Avatar entity icon name', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityIconName).toBe('standard:account');
        });
    });

    // entity position
    it('Avatar entity top-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'top-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityPosition).toBe('top-right');
        });
    });

    it('Avatar entity top-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'top-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityPosition).toBe('top-left');
        });
    });

    it('Avatar entity bottom-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'bottom-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityPosition).toBe('bottom-right');
        });
    });

    it('Avatar entity bottom-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'bottom-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityPosition).toBe('bottom-left');
        });
    });

    // entity src
    it('Avatar entity src', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.hideAvatarDetails = true;
        element.fallbackIconName = 'standard:account';
        element.entitySrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entitySrc).toBe(
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            );
        });
    });

    // entity title
    it('Avatar entity title', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.hideAvatarDetails = true;
        element.fallbackIconName = 'standard:account';
        element.entitySrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.entityTitle = 'Entity Title';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityTitle).toBe('Entity Title');
        });
    });

    // entity variant
    it('Avatar entity circle', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityPosition = 'bottom-right';
        element.entityVariant = 'circle';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityVariant).toBe('circle');
        });
    });

    it('Avatar entity square', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityPosition = 'bottom-right';
        element.entityVariant = 'square';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                'c-primitive-avatar'
            );
            expect(avatar.entityVariant).toBe('square');
        });
    });

    // primary text
    it('Avatar primary text', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.primaryText = 'This is a primary text';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                '.slds-text-title_bold'
            );
            expect(text.textContent).toBe('This is a primary text');
        });
    });

    // secondary text
    it('Avatar secondary text', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.secondaryText = 'This is a secondary text';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                '.avonni-avatar__light-text'
            );
            expect(text.textContent).toBe('This is a secondary text');
        });
    });

    // tertiary text
    it('Avatar tertiary text', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        element.secondaryText = 'This is a secondary text';
        element.tertiaryText = 'This is a tertiary text';
        element.size = 'xx-large';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelectorAll(
                '.avonni-avatar__light-text'
            );
            expect(text[0].textContent).toBe('This is a secondary text');
            expect(text[1].textContent).toBe('This is a tertiary text');
        });
    });

    // text-position
    it('Avatar center', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
        element.primaryText = 'This is a primary Text';
        element.secondaryText = 'This is a secondary text';
        element.textPosition = 'center';
        element.size = 'large';

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject.inline).toBeTruthy();
            expect(mediaObject.className).toBe('slds-text-align_center');
        });
    });

    it('Avatar left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
        element.primaryText = 'This is a primary Text';
        element.secondaryText = 'This is a secondary text';
        element.textPosition = 'left';
        element.size = 'large';

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject.className).toBe('slds-text-align_right');
        });
    });
    // tags
    it('Avatar with default tags', () => {
        const tags = [{ label: 'default', variant: 'default' }];
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);
        element.tags = tags;
        return Promise.resolve().then(() => {
            const badge = element.shadowRoot.querySelector('lightning-badge');
            expect(badge.className).toBe('slds-badge');
            expect(badge.label).toBe('default');
        });
    });

    it('Avatar with inverse tags', () => {
        const tags = [{ label: 'inverse', variant: 'inverse' }];
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);
        element.tags = tags;
        return Promise.resolve().then(() => {
            const badge = element.shadowRoot.querySelector('lightning-badge');
            expect(badge.className).toBe('slds-badge_inverse');
            expect(badge.label).toBe('inverse');
        });
    });

    it('Avatar with lightest tags', () => {
        const tags = [{ label: 'lightest', variant: 'lightest' }];
        const element = createElement('base-avatar', {
            is: Avatar
        });

        document.body.appendChild(element);
        element.tags = tags;
        return Promise.resolve().then(() => {
            const badge = element.shadowRoot.querySelector('lightning-badge');
            expect(badge.className).toBe('slds-badge_lightest');
            expect(badge.label).toBe('lightest');
        });
    });

    it('Avatar with success tags', () => {
        const tags = [{ label: 'success', variant: 'success' }];
        const element = createElement('base-avatar', {
            is: Avatar
        });

        document.body.appendChild(element);
        element.tags = tags;
        return Promise.resolve().then(() => {
            const badge = element.shadowRoot.querySelector('lightning-badge');
            expect(badge.className).toBe('slds-theme_success');
            expect(badge.label).toBe('success');
        });
    });

    it('Avatar with warning tags', () => {
        const tags = [{ label: 'warning', variant: 'warning' }];
        const element = createElement('base-avatar', {
            is: Avatar
        });

        document.body.appendChild(element);
        element.tags = tags;
        return Promise.resolve().then(() => {
            const badge = element.shadowRoot.querySelector('lightning-badge');
            expect(badge.className).toBe('slds-theme_warning');
            expect(badge.label).toBe('warning');
        });
    });

    it('Avatar with error tags', () => {
        const tags = [{ label: 'error', variant: 'error' }];
        const element = createElement('base-avatar', {
            is: Avatar
        });

        document.body.appendChild(element);
        element.tags = tags;
        return Promise.resolve().then(() => {
            const badge = element.shadowRoot.querySelector('lightning-badge');
            expect(badge.className).toBe('slds-theme_error');
            expect(badge.label).toBe('error');
        });
    });
});
