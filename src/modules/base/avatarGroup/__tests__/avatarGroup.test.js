import { createElement } from 'lwc';
import AvatarGroup from 'c/avatarGroup';

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
});
