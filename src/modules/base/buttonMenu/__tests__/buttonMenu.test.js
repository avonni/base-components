import { createElement } from 'lwc';
import ButtonMenu from 'c/buttonMenu';

// not tested
// tooltip

describe('Button Menu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBe('Show Menu');
        expect(element.disabled).toBeFalsy();
        expect(element.draftAlternativeText).toBeUndefined();
        expect(element.iconName).toBe('utility:down');
        expect(element.iconSize).toBe('medium');
        expect(element.isDraft).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.menuAlignment).toBe('left');
        expect(element.nubbin).toBeFalsy();
        expect(element.title).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
        expect(element.value).toBe('');
        expect(element.variant).toBe('border');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Menu access-key', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative text
    it('Button Menu alternative text', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        const assistiveText = element.shadowRoot.querySelector(
            '.slds-assistive-text'
        );

        return Promise.resolve().then(() => {
            expect(assistiveText.textContent).toBe(
                'This is an alternative text'
            );
        });
    });

    // disabled
    it('Button Menu disabled', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.disabled = true;
        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // draft & draft alternative text
    it('Button Menu draft alternative text', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.isDraft = true;
        element.draftAlternativeText = 'This is a draft alternative text';

        return Promise.resolve().then(() => {
            const draft = element.shadowRoot.querySelector(
                '.slds-indicator_unsaved'
            );
            expect(draft.title).toBe('This is a draft alternative text');
            expect(draft.textContent).toBe('*');
        });
    });

    // icon name
    it('Button Menu icon name', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.iconName = 'utility:close';
        const icon = element.shadowRoot.querySelector('c-primitive-icon');

        return Promise.resolve().then(() => {
            expect(icon.iconName).toBe('utility:close');
        });
    });

    // icon size
    it('Button Menu icon size xx-small', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.iconSize = 'xx-small';
        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.className).toContain('slds-button_icon-xx-small');
        });
    });

    it('Button Menu icon size x-small', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.iconSize = 'x-small';
        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.className).toContain('slds-button_icon-x-small');
        });
    });

    it('Button Menu icon size small', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.iconSize = 'small';
        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.className).toContain('slds-button_icon-small');
        });
    });

    it('Button Menu icon size medium', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.iconSize = 'medium';
        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.className).not.toContain('slds-button_icon-xx-small');
            expect(button.className).not.toContain('slds-button_icon-x-small');
            expect(button.className).not.toContain('slds-button_icon-small');
        });
    });

    // is loading & loading state alternative text
    it('Button Menu is loading & loading state alternative text', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.isLoading = true;
        element.loadingStateAlternativeText =
            'This is a loading state alternative text';
        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve()
            .then(() => {
                button.click();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    'lightning-spinner'
                );
                expect(spinner).toBeTruthy();
                expect(spinner.alternativeText).toBe(
                    'This is a loading state alternative text'
                );
            });
    });

    // label
    it('Button Menu label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.label = 'This is a label';

        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.textContent).toContain('This is a label');
        });
    });

    // Menu alignement & menu nubbin
    it('Button menu menu alignement left', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_left');
            });
    });

    it('Button menu menu alignement left and menu nubbin', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_left');
                expect(dropdown.className).toContain('slds-nubbin_top-left');
            });
    });

    it('Button menu menu alignement right', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_right');
            });
    });

    it('Button menu menu alignement right and menu nubbin', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'right';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_right');
                expect(dropdown.className).toContain('slds-nubbin_top-right');
            });
    });

    it('Button menu menu alignement center', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_center');
            });
    });

    it('Button menu menu alignement center and menu nubbin', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'center';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_center');
                expect(dropdown.className).toContain('slds-nubbin_top');
            });
    });

    it('Button menu menu alignement bottom-center', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_bottom');
            });
    });

    it('Button menu menu alignement bottom-center and menu nubbin', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-center';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_bottom');
                expect(dropdown.className).toContain('slds-nubbin_bottom');
            });
    });

    it('Button menu menu alignement bottom-left', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                );
            });
    });

    it('Button menu menu alignement bottom-left and menu nubbin', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-left';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                );
                expect(dropdown.className).toContain('slds-nubbin_bottom-left');
            });
    });

    it('Button menu menu alignement bottom-right', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
            });
    });

    it('Button menu menu alignement bottom-right and menu nubbin', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-right';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
                expect(dropdown.className).toContain(
                    'slds-nubbin_bottom-right'
                );
            });
    });

    // title
    it('Button Menu title', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.title = 'This is a title';

        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.title).toBe('This is a title');
        });
    });

    // value
    it('Button Menu value', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.value = 'This is a value';

        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve().then(() => {
            expect(button.value).toBe('This is a value');
        });
    });

    // variant
    it('Button menu variant bare without label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain('slds-button_icon-bare');
        });
    });

    it('Button menu variant container without label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain('slds-button_icon-container');
        });
    });

    it('Button menu variant border-filled without label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain(
                'slds-button_icon-border-filled'
            );
        });
    });

    it('Button menu variant bare-inverse without label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain('slds-button_icon-inverse');
        });
    });

    it('Button menu variant border-inverse without label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain(
                'slds-button_icon-border-inverse'
            );
        });
    });

    it('Button menu variant border-inverse with label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'border-inverse';
        element.label = 'label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain('slds-button_inverse');
        });
    });

    it('Button menu variant border with label', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'border';
        element.label = 'label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain('slds-button_neutral');
        });
    });

    it('Button menu variant with icon name', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'border-inverse';
        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain(
                'slds-button_icon-container-more'
            );
        });
    });

    it('Button menu variant bare with icon name', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        element.variant = 'bare';
        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toContain('slds-button_icon-bare');
            expect(button.className).toContain('slds-button_icon-more');
        });
    });

    /* ---- JS ----- */
    it('Button menu method: blur', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        let blurEvent = false;
        element.addEventListener('blur', () => {
            blurEvent = true;
        });

        element.focus();
        element.blur();
        return Promise.resolve().then(() => {
            expect(blurEvent).toBeTruthy();
        });
    });

    it('Button menu clicked', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        const button = element.shadowRoot.querySelector('button');

        return Promise.resolve()
            .then(() => {
                button.click();
            })
            .then(() => {
                expect(element.classList).toContain('slds-is-open');
            });
    });

    /* ---- METHODS ----- */
    it('Button menu method: click', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
        });
    });

    it('Button menu method: focus', () => {
        const element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);

        let focusEvent = false;
        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });
});
