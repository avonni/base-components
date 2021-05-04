import { createElement } from 'lwc';
import ColorPicker from 'c/colorPicker';

// not tested
// change event because cannot select color in c-color-palette

describe('Color Picker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Color Picker Default attributes', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('standard');
        expect(element.type).toBe('base');
        expect(element.menuVariant).toBe('border');
        expect(element.menuIconName).toBeUndefined();
        expect(element.menuIconSize).toBe('x-small');
        expect(element.menuLabel).toBeUndefined();
        expect(element.menuAlignment).toBe('left');
        expect(element.menuNubbin).toBeFalsy();
        expect(element.colors).toMatchObject([
            '#e3abec',
            '#c2dbf6',
            '#9fd6ff',
            '#9de7da',
            '#9df0bf',
            '#fff099',
            '#fed49a',
            '#d073df',
            '#86b9f3',
            '#5ebbff',
            '#44d8be',
            '#3be281',
            '#ffe654',
            '#ffb758',
            '#bd35bd',
            '#5778c1',
            '#5ebbff',
            '#00aea9',
            '#3bba4c',
            '#f4bc25',
            '#f99120',
            '#580d8c',
            '#001870',
            '#0a2399',
            '#097476',
            '#096a50',
            '#b67d11',
            '#b85d0d'
        ]);
        expect(element.hideColorInput).toBeFalsy();
        expect(element.opacity).toBeFalsy();
        expect(element.messageWhenBadInput).toBe(
            'Please ensure value is correct'
        );
    });

    /* ----- ATTRIBUTES ----- */

    // access key
    it('Color Picker access key', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.accessKey).toBe('K');
        });
    });

    // disabled
    it('Color Picker disabled', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeTruthy();
        });
    });

    // field level help
    it('Color Picker field level help', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helpText = element.shadowRoot.querySelector(
                'lightning-helptext'
            );
            expect(helpText.content).toBe('This is a field level help text');
        });
    });

    // isLoading
    it('Color Picker isLoading', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });

        element.isLoading = true;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    'lightning-spinner'
                );
                expect(spinner).toBeTruthy();
            });
    });

    // label
    it('Color Picker label', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.label = 'This is a label text';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('label');
            expect(label.textContent).toBe('This is a label text');
        });
    });

    // name
    it('Color Picker name', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.name = 'This is a name text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.name).toBe('This is a name text');
        });
    });

    // readOnly
    it('Color Picker readOnly', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.readOnly = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.disabled).toBeTruthy();
        });
    });

    // required
    it('Color Picker required', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // value
    it('Color Picker value', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.value = 'rgb(65, 159, 236)';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.value).toBe('rgb(65, 159, 236)');
        })
        .then(() => {
            const swatch = element.shadowRoot.querySelector('span')
            expect(swatch.style.background).toBe('rgb(65, 159, 236)');
        });
    });

    // variant
    it('Color Picker variant standard', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeFalsy();
        });
    });

    it('Color Picker variant label-stacked', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeTruthy();
            expect(labelHidden).toBeFalsy();
        });
    });

    it('Color Picker variant label-hidden', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'label-hidden';
        element.label = 'label-hidden';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeTruthy();
            expect(labelHidden.textContent).toBe('label-hidden');
        });
    });

    it('Color Picker variant label-inline', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeTruthy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeFalsy();
        });
    });

    // type
    it('Color Picker type base', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });

        element.type = 'base';
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const palette = element.shadowRoot.querySelector(
                    '.slds-tabs_default'
                );
                expect(palette).toBeTruthy();
            });
    });

    it('Color Picker type custom', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });

        element.type = 'custom';
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const gradient = element.shadowRoot.querySelector(
                    'c-color-gradient'
                );
                expect(gradient).toBeTruthy();
            });
    });

    it('Color Picker type predefined', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });

        element.type = 'predefined';
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const gradient = element.shadowRoot.querySelector(
                    'c-color-palette'
                );
                expect(gradient).toBeTruthy();
            });
    });

    // Menu variant without menu icon name
    it('Color Picker menu variant bare', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe('slds-button slds-button_icon slds-button_icon-more slds-button_icon-bare');
        });
    });

    it('Color Picker menu variant container', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuVariant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-container-more'
            );
        });
    });

    it('Color Picker menu variant border', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuVariant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-more'
            );
        });
    });

    it('Color Picker menu variant border-filled', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-more slds-button_icon-border-filled'
            );
        });
    });

    it('Color Picker menu variant bare-inverse', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-container-more slds-button_icon-inverse'
            );
        });
    });

    it('Color Picker menu variant border-inverse', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-container-more slds-button_icon-border-inverse'
            );
        });
    });

    // Menu variant with menu icon name
    it('Color Picker menu variant bare without menu icon down', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconName = 'utility:down';
        element.menuVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon-bare'
            );
        });
    });

    it('Color Picker menu variant container without menu icon down', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconName = 'utility:down';
        element.menuVariant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('Color Picker menu variant border without menu icon down', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconName = 'utility:down';
        element.menuVariant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon-border'
            );
        });
    });

    it('Color Picker menu variant border-filled without menu icon down', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconName = 'utility:down';
        element.menuVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon-border-filled'
            );
        });
    });

    it('Color Picker menu variant bare-inverse without menu icon down', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconName = 'utility:down';
        element.menuVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon-bare slds-button_icon-inverse'
            );
        });
    });

    it('Color Picker menu variant border-inverse without menu icon down', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconName = 'utility:down';
        element.menuVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.className).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
        });
    });

    // Menu icon size without menu icon name
    it('Color Picker menu icon size xx-small', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size x-small', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'x-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size medium', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'medium';
        
        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size large', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('xx-small');
        });
    });

    // Menu icon size with menu icon name
    it('Color Picker menu icon size xx-small with menu icon name', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'xx-small';
        element.menuIconName = 'utility:down'

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size x-small with menu icon name', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'x-small';
        element.menuIconName = 'utility:down'

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('x-small');
        });
    });

    it('Color Picker menu icon size medium with menu icon name', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'medium';
        element.menuIconName = 'utility:down'

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('medium');
        });
    });

    it('Color Picker menu icon size large with menu icon name', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuIconSize = 'large';
        element.menuIconName = 'utility:down'

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('large');
        });
    });

    // Menu label
    it('Color Picker menu label border', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuLabel = 'This is a menu label text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.textContent).toBe('This is a menu label text');
            expect(button.className).toContain('slds-button');
        });
    });

    it('Color Picker menu label border-inverse', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuLabel = 'This is a menu label text';
        element.menuVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.textContent).toBe('This is a menu label text');
            expect(button.className).toContain('slds-button_inverse');
        });
    });

    // Menu alignement & menu nubbin
    it('Color Picker menu alignement left', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
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

    it('Color Picker menu alignement left and menu nubbin', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuNubbin = true;

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

    it('Color Picker menu alignement right', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
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

    it('Color Picker menu alignement right and menu nubbin', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuAlignment = 'right';
        element.menuNubbin = true;

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

    it('Color Picker menu alignement center', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
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

    it('Color Picker menu alignement center and menu nubbin', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuAlignment = 'center';
        element.menuNubbin = true;

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

    it('Color Picker menu alignement bottom-center', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
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

    it('Color Picker menu alignement bottom-center and menu nubbin', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-center';
        element.menuNubbin = true;

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

    it('Color Picker menu alignement bottom-left', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
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

    it('Color Picker menu alignement bottom-left and menu nubbin', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-left';
        element.menuNubbin = true;

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

    it('Color Picker menu alignement bottom-right', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
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

    it('Color Picker menu alignement bottom-right and menu nubbin', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.menuAlignment = 'bottom-right';
        element.menuNubbin = true;

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

    // colors
    it('Color Picker colors', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector('button');
                button.click();
            })
            .then(() => {
                const palette = element.shadowRoot.querySelector(
                    'c-color-palette'
                );
                expect(palette.colors).toMatchObject([
                    '#e3abec',
                    '#c2dbf6',
                    '#9fd6ff',
                    '#9de7da',
                    '#9df0bf',
                    '#fff099',
                    '#fed49a',
                    '#d073df',
                    '#86b9f3',
                    '#5ebbff',
                    '#44d8be',
                    '#3be281',
                    '#ffe654',
                    '#ffb758',
                    '#bd35bd',
                    '#5778c1',
                    '#5ebbff',
                    '#00aea9',
                    '#3bba4c',
                    '#f4bc25',
                    '#f99120',
                    '#580d8c',
                    '#001870',
                    '#0a2399',
                    '#097476',
                    '#096a50',
                    '#b67d11',
                    '#b85d0d'
                ]);
            });
    });

    // Hide color input
    it('Color Picker hide color input', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.hideColorInput = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input).toBeFalsy();
        });
    });

    // Opacity
    it('Color Picker Opacity', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.type = 'custom';
        element.opacity = true;

        return Promise.resolve()
        .then(() => {
            const button = element.shadowRoot.querySelector('button');
            button.click();
        })
        .then(() => {
            const palette = element.shadowRoot.querySelector(
                'c-color-gradient'
            );
            expect(palette.opacity).toBeTruthy();
        });
    });

    /* ----- JS ----- */

    // done button
    it('Color Picker done button ', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            button.click();
        })
        .then(() => {
            const doneButton = element.shadowRoot.querySelector("lightning-button[title='Done']")
            expect(doneButton).toBeTruthy()
            doneButton.click()
        })
    });

    // cancel button
    it('Color Picker cancel button ', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            button.click();
        })
        .then(() => {
            const cancelButton = element.shadowRoot.querySelector("lightning-button[title='Cancel']")
            expect(cancelButton).toBeTruthy()
            cancelButton.click()
        })
    });

    // focus and blur on tab
    it('Color Picker focus', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            button.click();
        })
        .then(() => {

            const tab = element.shadowRoot.querySelector('li > a')
            const popover = element.shadowRoot.querySelector('.slds-popover__body')

            element.addEventListener('handleprivatefocus', (event) => {
                expect(event.bubbles).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
                expect(event.composed).toBeFalsy();
            });

            element.addEventListener('handleprivateblur', (event) => {
                expect(event.bubbles).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
                expect(event.composed).toBeFalsy();
            });
            
            tab.focus()
            tab.blur()
            popover.focus();
            popover.blur()
        })
    });

    /* ----- EVENTS ----- */

    it('Color Picker focus event and method', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.addEventListener('focus', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        element.focus();
    });

    it('Color Picker blur event', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.addEventListener('blur', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        element.focus();
        element.blur();
    });
});
