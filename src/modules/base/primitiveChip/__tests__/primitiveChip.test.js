import { createElement } from 'lwc';
import PrimitiveChip from '../primitiveChip';

const MOCK_AVATAR = {
    fallbackIconName: 'standard:user',
    variant: 'circle',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    position: 'left'
};

let element;
describe('Primitive Chip', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-chip', {
            is: PrimitiveChip
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.avatar).toMatchObject({});
        expect(element.hidden).toEqual(false);
        expect(element.iconName).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.outline).toEqual(false);
        expect(element.variant).toEqual('base');
    });

    /* ----- ATTRIBUTES ----- */

    //avatar
    it('Primitive Chip: Avatar', () => {
        element.label = 'This is a label text';
        element.avatar = MOCK_AVATAR;
        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector(
                    '[data-element-id="avatar-right"]'
                )
            ).toBeFalsy();
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="avatar-left"]'
            );
            expect(chip.slot).toBe('left');
            expect(chip.src).toBe(MOCK_AVATAR.src);
            expect(chip.size).toBe('x-small');
            expect(chip.hidden).toBe(false);
            expect(chip.variant).toBe(MOCK_AVATAR.variant);
            expect(chip.fallbackIconName).toBe(MOCK_AVATAR.fallbackIconName);
        });
    });

    // hidden
    it('Primitive Chip: Hidden', () => {
        element.label = 'This is a label text';
        element.hidden = true;

        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot
                    .querySelector('[data-element-id="chip-wrapper"]')
                    .classList.contains('slds-is-collapsed')
            ).toBeTruthy();
            expect(element.hidden).toBe(true);
        });
    });

    // iconNames
    it('Primitive Chip: PrefixIconName', () => {
        element.label = 'This is a label text';
        element.prefixIconName = 'utility:user';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="icon-left"]'
            );
            expect(icon.iconName).toBe('utility:user');
        });
    });

    it('Primitive Chip: SuffixIconName', () => {
        element.label = 'This is a label text';
        element.suffixIconName = 'utility:user';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="icon-right"]'
            );
            expect(icon.iconName).toBe('utility:user');
        });
    });

    // label
    it('Primitive Chip: Label', () => {
        element.label = 'This is a label text';
        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="chip"]'
            );
            expect(chip.label).toBe('This is a label text');
        });
    });

    // outline
    it('Primitive Chip: outline', () => {
        element.label = 'This is a label text';
        element.outline = true;
        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="chip"]'
            );
            expect(chip.outline).toBe(true);
        });
    });

    // variant
    it('Primitive Chip: Variant', () => {
        element.label = 'This is a label text';
        element.variant = 'warning';
        return Promise.resolve().then(() => {
            const chip = element.shadowRoot.querySelector(
                '[data-element-id="chip"]'
            );
            expect(chip.variant).toBe('warning');
        });
    });
});
