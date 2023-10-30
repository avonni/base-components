import { createElement } from 'lwc';
import PrimitiveVisualPickerTitle from 'c/primitiveVisualPickerTitle';

let element;
describe('PrimitiveVisualPickerTitle', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-visual-picker-title', {
            is: PrimitiveVisualPickerTitle
        });
        document.body.appendChild(element);
    });

    it('Visual picker title: Default attributes', () => {
        expect(element.avatar).toMatchObject({});
        expect(element.avatarPosition).toBe('left');
        expect(element.displayAvatar).toBeFalsy();
        expect(element.size).toBe('medium');
        expect(element.title).toBeUndefined();
    });

    it('Visual picker title: Avatar is left', () => {
        element.avatarPosition = 'left';
        element.avatar = {
            iconName: 'custom:custom68'
        };
        element.title = 'test';
        element.displayAvatar = true;
        return Promise.resolve().then(() => {
            const avatar =
                element.shadowRoot.querySelector('c-primitive-avatar');
            expect(avatar.fallbackIconName).toBe('custom:custom68');
            expect(avatar.size).toBe('medium');
            expect(avatar.classList).toContain('slds-m-right_x-small');
        });
    });

    it('Visual picker title: Avatar is right', () => {
        element.avatarPosition = 'right';
        element.avatar = {
            iconName: 'custom:custom68'
        };
        element.title = 'test';
        element.displayAvatar = true;
        return Promise.resolve().then(() => {
            const avatar =
                element.shadowRoot.querySelector('c-primitive-avatar');
            expect(avatar.fallbackIconName).toBe('custom:custom68');
            expect(avatar.size).toBe('medium');
            expect(avatar.classList).toContain('slds-m-left_x-small');
        });
    });
});
