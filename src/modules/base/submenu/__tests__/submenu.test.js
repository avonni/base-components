import { createElement } from 'lwc';
import Submenu from 'c/submenu';

let element;
describe('Submenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-submenu', {
            is: Submenu
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });
    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.draftAlternativeText).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.isDraft).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.prefixIconName).toBeUndefined();
            expect(element.tabIndex).toBe('0');
        });

        describe('accessKey', () => {
            it('Passed to the component', () => {
                element.accessKey = 'k';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );
                    expect(link.accessKey).toBe('k');
                });
            });
        });

        describe('disabled', () => {
            it('false', () => {
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );

                    expect(link.ariaDisabled).toBe('false');
                });
            });

            it('true', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );

                    expect(link.ariaDisabled).toBe('true');
                });
            });
        });

        // Depends on isDraft
        describe('draftAlternativeText', () => {
            it('Passed to the component', () => {
                element.isDraft = true;
                element.draftAlternativeText = 'A string help';

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr.title).toBe('A string help');
                });
            });
        });

        describe('iconName', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon"]'
                    );
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('isDraft', () => {
            it('false', () => {
                element.isDraft = false;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeFalsy();
                });
            });

            it('true', () => {
                element.isDraft = true;

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeTruthy();
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-label"]'
                    );
                    expect(span.textContent).toBe('A string label');
                    expect(span.title).toBe('A string label');
                });
            });
        });

        describe('prefixIconName', () => {
            it('Passed to the component', () => {
                element.prefixIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-prefix"]'
                    );
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('tabIndex', () => {
            it('Passed to the component', () => {
                element.tabIndex = '-1';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );
                    expect(link.tabIndex).toBe(-1);
                });
            });
        });
    });

    describe('Methods', () => {
        describe('close', () => {
            it('close and open', () => {
                element.open();

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelector('a');
                    expect(a.ariaExpanded).toBe('true');

                    element.close();

                    return Promise.resolve().then(() => {
                        expect(a.ariaExpanded).toBe('false');
                    });
                });
            });
        });

        it('focus method', () => {
            const handler = jest.fn();
            element.addEventListener('focus', handler);
            element.focus();

            expect(handler).toHaveBeenCalled();
        });
    });

    describe('Events', () => {
        describe('blur', () => {
            it('blur', () => {
                const handler = jest.fn();
                element.addEventListener('blur', handler);

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelector('a');
                    a.dispatchEvent(new CustomEvent('blur'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('privateblur', () => {
                const handler = jest.fn();
                element.addEventListener('privateblur', handler);

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelector('a');
                    a.dispatchEvent(new CustomEvent('blur'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });
        });

        describe('focus', () => {
            it('privatefocus', () => {
                const handler = jest.fn();
                element.addEventListener('privatefocus', handler);

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelector('a');
                    a.dispatchEvent(new CustomEvent('focus'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });
        });
    });

    describe('Keyboard Accessibility', () => {
        describe('Submenu keyboard navigation', () => {
            describe('Arrow Right', () => {
                it('Opens dropdown menu', () => {
                    let submenu = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );
                    submenu.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowRight'
                        })
                    );

                    return Promise.resolve().then(() => {
                        submenu = element.shadowRoot.querySelector(
                            '[data-element-id="a"]'
                        );
                        expect(submenu.ariaExpanded).toBe('true');
                    });
                });

                it('Submenu does not open when disabled', () => {
                    element.disabled = true;

                    return Promise.resolve().then(() => {
                        let submenu = element.shadowRoot.querySelector(
                            '[data-element-id="a"]'
                        );
                        submenu.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'ArrowRight'
                            })
                        );

                        return Promise.resolve().then(() => {
                            submenu = element.shadowRoot.querySelector(
                                '[data-element-id="a"]'
                            );
                            expect(submenu.ariaExpanded).toBe('false');
                        });
                    });
                });
            });

            it('Does not open submenu when pressing other keys', () => {
                let submenu = element.shadowRoot.querySelector(
                    '[data-element-id="a"]'
                );
                submenu.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        key: 'ArrowLeft'
                    })
                );

                return Promise.resolve().then(() => {
                    submenu = element.shadowRoot.querySelector(
                        '[data-element-id="a"]'
                    );
                    expect(submenu.ariaExpanded).toBe('false');
                });
            });
        });

        describe('Submenu dropdown keyboard navigation', () => {
            it('ArrowLeft', () => {
                const menu = element.shadowRoot.querySelector('[role="menu"]');
                element.open();

                return Promise.resolve()
                    .then(() => {
                        const submenu = element.shadowRoot.querySelector(
                            '[data-element-id="a"]'
                        );
                        expect(submenu.ariaExpanded).toBe('true');
                        menu.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'ArrowLeft'
                            })
                        );
                    })
                    .then(() => {
                        const submenu = element.shadowRoot.querySelector(
                            '[data-element-id="a"]'
                        );
                        expect(submenu.ariaExpanded).toBe('false');
                    });
            });
        });
    });
});
