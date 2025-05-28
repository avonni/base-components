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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.avatar).toMatchObject({});
            expect(element.backgroundColor).toBeUndefined();
            expect(element.hidden).toBeFalsy();
            expect(element.hideText).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.outline).toBeFalsy();
            expect(element.prefixIconName).toBeUndefined();
            expect(element.suffixIconName).toBeUndefined();
            expect(element.textColor).toBeUndefined();
            expect(element.variant).toEqual('base');
        });

        describe('Avatar', () => {
            it('Passed to the component', () => {
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
                    expect(chip.fallbackIconName).toBe(
                        MOCK_AVATAR.fallbackIconName
                    );
                });
            });
        });

        describe('BackgroundColor', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';
                element.backgroundColor = 'red';

                return Promise.resolve().then(() => {
                    const chip = element.shadowRoot.querySelector(
                        '[data-element-id="chip"]'
                    );
                    expect(chip.backgroundColor).toBe('red');
                });
            });
        });

        describe('Hidden', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';
                element.hidden = true;

                return Promise.resolve().then(() => {
                    expect(
                        element.shadowRoot
                            .querySelector('[data-element-id="chip-wrapper"]')
                            .classList.contains('slds-is-collapsed')
                    ).toBeTruthy();
                    expect(element.hidden).toBeTruthy();
                });
            });
        });

        describe('HideText', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';
                element.hideText = true;

                return Promise.resolve().then(() => {
                    const chip = element.shadowRoot.querySelector(
                        '[data-element-id="chip"]'
                    );
                    expect(chip.hideText).toBeTruthy();
                });
            });
        });

        describe('Icons', () => {
            it('PrefixIconName', () => {
                element.label = 'This is a label text';
                element.prefixIconName = 'utility:user';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="icon-left"]'
                    );
                    expect(icon.iconName).toBe('utility:user');
                });
            });

            it('SuffixIconName', () => {
                element.label = 'This is a label text';
                element.suffixIconName = 'utility:user';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="icon-right"]'
                    );
                    expect(icon.iconName).toBe('utility:user');
                });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';
                return Promise.resolve().then(() => {
                    const chip = element.shadowRoot.querySelector(
                        '[data-element-id="chip"]'
                    );
                    expect(chip.label).toBe('This is a label text');
                });
            });
        });

        describe('Outline', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';
                element.outline = true;
                return Promise.resolve().then(() => {
                    const chip = element.shadowRoot.querySelector(
                        '[data-element-id="chip"]'
                    );
                    expect(chip.outline).toBeTruthy();
                });
            });
        });

        describe('Variant', () => {
            it('Passed to the component', () => {
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
    });
});
