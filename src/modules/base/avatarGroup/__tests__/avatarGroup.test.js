import { createElement } from 'lwc';
import AvatarGroup from 'c/avatarGroup';

const items = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.'
    }
];

describe('Avatar Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        expect(element.size).toBe('medium');
        expect(element.variant).toBe('square');
        expect(element.items).toMatchObject([]);
        expect(element.layout).toBe('stack');
        expect(element.maxCount).toBeUndefined();
        expect(element.listButtonLabel).toBe('Show more');
        expect(element.listButtonVariant).toBe('neutral');
        expect(element.listButtonIconName).toBeUndefined();
        expect(element.listButtonIconPosition).toBe('left');
    });

    it('Avatar group size x-small', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector(
                '.slds-avatar_x-small'
            );
            expect(div).toBe('avonni-avatar_x-small');
        });
    });
});
