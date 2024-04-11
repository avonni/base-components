import { createElement } from 'lwc';
import ButtonMenu from '../buttonMenu';
import { Tooltip } from 'c/tooltipLibrary';

jest.mock('c/tooltipLibrary');

// not tested
// selected event
// Keyboard navigation (focus)

let element;
describe('Button Menu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);
        Tooltip.mockClear();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.alternativeText).toBe('Show Menu');
            expect(element.disabled).toBeFalsy();
            expect(element.draftAlternativeText).toBeUndefined();
            expect(element.groupOrder).toBeUndefined();
            expect(element.hideDownArrow).toBeFalsy();
            expect(element.iconName).toBe('utility:down');
            expect(element.iconSize).toBe('small');
            expect(element.isDraft).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading');
            expect(element.menuAlignment).toBe('left');
            expect(element.nubbin).toBeFalsy();
            expect(element.stretch).toBeFalsy();
            expect(element.title).toBeUndefined();
            expect(element.tooltip).toBeUndefined();
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('border');
        });

        describe('Access Key', () => {
            it('Passed to the component', () => {
                element.accessKey = 'K';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.accessKey).toBe('K');
                });
            });
        });

        describe('Alternative Text', () => {
            it('Passed to the component', () => {
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
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('draft', () => {
            it('Passed to the component', () => {
                element.isDraft = true;
                element.draftAlternativeText =
                    'This is a draft alternative text';

                return Promise.resolve().then(() => {
                    const draft = element.shadowRoot.querySelector(
                        '.slds-indicator_unsaved'
                    );
                    expect(draft.title).toBe(
                        'This is a draft alternative text'
                    );
                    expect(draft.textContent).toBe('*');
                    expect(element.classList).toContain('slds-is-unsaved');
                });
            });
        });

        describe('Group Order', () => {
            it('Passed to the component', () => {
                element.groupOrder = 'first';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain('slds-button_first');
                });
            });
        });

        describe('Hide Down Arrow', () => {
            it('True', () => {
                element.iconName = 'utility:threedots';
                element.hideDownArrow = true;

                return Promise.resolve().then(() => {
                    const downArrow = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-down"]'
                    );
                    expect(downArrow).toBeFalsy();
                });
            });

            it('False', () => {
                element.iconName = 'utility:threedots';

                return Promise.resolve().then(() => {
                    const downArrow = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-down"]'
                    );
                    expect(downArrow).toBeTruthy();
                });
            });
        });

        describe('Icon', () => {
            describe('Name', () => {
                it('Passed to the component', () => {
                    element.iconName = 'utility:close';
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-main"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(icon.iconName).toBe('utility:close');
                    });
                });
            });

            describe('Size', () => {
                it('Xx-small', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    element.iconSize = 'xx-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="image"]'
                        );
                        expect(image.className).toContain(
                            'avonni-button-menu__image_xx-small'
                        );
                        expect(button.className).toContain(
                            'avonni-button-menu__icon_xx-small'
                        );
                    });
                });

                it('X-small', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    element.iconSize = 'x-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="image"]'
                        );
                        expect(image.className).toContain(
                            'avonni-button-menu__image_x-small'
                        );
                        expect(button.className).toContain(
                            'avonni-button-menu__icon_x-small'
                        );
                    });
                });

                it('X-small with label', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    element.iconSize = 'x-small';
                    element.label = 'Label';

                    return Promise.resolve().then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="image"]'
                        );
                        expect(image.className).toContain(
                            'avonni-button-menu__image avonni-button-menu__image_x-small slds-m-right_xx-small'
                        );
                    });
                });

                it('X-small iconName', () => {
                    element.iconName = 'utility:close';
                    element.iconSize = 'x-small';
                    element.label = 'Label';

                    return Promise.resolve().then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-icon-main"]'
                        );

                        return Promise.resolve().then(() => {
                            expect(icon.size).toBe('');
                        });
                    });
                });

                it('Small', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    element.iconSize = 'small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="image"]'
                        );
                        expect(image.className).toContain(
                            'avonni-button-menu__image_small'
                        );
                        expect(button.className).toContain(
                            'avonni-button-menu__icon_small'
                        );
                    });
                });

                it('Small with label', () => {
                    element.iconSize = 'small';
                    element.label = 'Label';

                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-main"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(icon.size).toBe('');
                    });
                });

                it('Medium', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    element.iconSize = 'medium';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="image"]'
                        );
                        expect(image.className).toContain(
                            'avonni-button-menu__image_medium'
                        );
                        expect(button.className).not.toContain(
                            'avonni-button-menu__icon_small'
                        );
                    });
                });

                it('Medium with added variant', () => {
                    element.iconSize = 'medium';
                    element.variant = 'success';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.className).toContain(
                            'avonni-button-menu__icon_medium'
                        );
                    });
                });

                it('Medium with label', () => {
                    element.iconSize = 'medium';
                    element.label = 'Label';
                    element.iconName = 'utility:call';

                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-main"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(icon.size).toBe('x-small');
                        expect(icon.className).toContain(
                            'avonni-button-menu__main-icon-with-label_medium'
                        );
                    });
                });

                it('Large', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    element.iconSize = 'large';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="image"]'
                        );
                        expect(image.className).toContain(
                            'avonni-button-menu__image_large'
                        );
                        expect(button.className).toContain(
                            'avonni-button-menu__icon_large'
                        );
                    });
                });

                it('Large only icon', () => {
                    element.iconName = 'standard:call';
                    element.iconSize = 'large';

                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-main"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(icon.size).toBe('small');
                        expect(icon.className).toContain(
                            'avonni-button-menu__main-icon-adjust-scale'
                        );
                    });
                });

                it('Large with label', () => {
                    element.iconSize = 'large';
                    element.label = 'Label';
                    element.iconName = 'standard:call';

                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-main"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(icon.size).toBe('small');
                        expect(icon.className).toContain(
                            'avonni-button-menu__main-icon-with-label-adjust-scale_large'
                        );
                    });
                });
            });

            describe('Icon Src', () => {
                it('Passed to the component', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="image"]'
                        );
                        expect(image.src).toBe(
                            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
                        );
                    });
                });
            });
        });

        describe('Is Loading and Loading Alternative Text', () => {
            it('Passed to the component', () => {
                element.isLoading = true;
                element.loadingStateAlternativeText =
                    'This is a loading state alternative text';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve()
                    .then(() => {
                        button.click();
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner"]'
                        );
                        expect(spinner).toBeTruthy();
                        expect(spinner.alternativeText).toBe(
                            'This is a loading state alternative text'
                        );
                    });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.textContent).toContain('This is a label');
                    expect(button.className).toContain(
                        'avonni-button-menu__button_label'
                    );
                });
            });
        });

        describe('Menu Alignment & Nubbin', () => {
            it('Left', () => {
                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_left'
                        );
                    });
            });

            it('Left & nubbin', () => {
                element.nubbin = true;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_left'
                        );
                        expect(dropdown.className).toContain(
                            'slds-nubbin_top-left'
                        );
                    });
            });

            it('Right', () => {
                element.menuAlignment = 'right';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_right'
                        );
                    });
            });

            it('Right & nubbin', () => {
                element.menuAlignment = 'right';
                element.nubbin = true;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_right'
                        );
                        expect(dropdown.className).toContain(
                            'slds-nubbin_top-right'
                        );
                    });
            });

            it('Center', () => {
                element.menuAlignment = 'center';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_center'
                        );
                    });
            });

            it('Center & nubbin', () => {
                element.menuAlignment = 'center';
                element.nubbin = true;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_center'
                        );
                        expect(dropdown.className).toContain('slds-nubbin_top');
                    });
            });

            it('Bottom-center', () => {
                element.menuAlignment = 'bottom-center';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom'
                        );
                    });
            });

            it('Bottom-center & nubbin', () => {
                element.menuAlignment = 'bottom-center';
                element.nubbin = true;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(dropdown.className).toContain(
                            'slds-nubbin_bottom'
                        );
                    });
            });

            it('Bottom-left', () => {
                element.menuAlignment = 'bottom-left';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                        );
                    });
            });

            it('Bottom-left & nubbin', () => {
                element.menuAlignment = 'bottom-left';
                element.nubbin = true;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                        );
                        expect(dropdown.className).toContain(
                            'slds-nubbin_bottom-left'
                        );
                    });
            });

            it('Bottom-right', () => {
                element.menuAlignment = 'bottom-right';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                        );
                    });
            });

            it('Bottom-right & nubbin', () => {
                element.menuAlignment = 'bottom-right';
                element.nubbin = true;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const dropdown =
                            element.shadowRoot.querySelector('.slds-dropdown');
                        expect(dropdown.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                        );
                        expect(dropdown.className).toContain(
                            'slds-nubbin_bottom-right'
                        );
                    });
            });
        });

        describe('Stretch', () => {
            it('Passed to the component', () => {
                element.stretch = true;

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.className).toContain('slds-button_stretch');
                });
            });
        });

        describe('Title', () => {
            it('Passed to the component', () => {
                element.title = 'This is a title';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.title).toBe('This is a title');
                });
            });
        });

        describe('Tooltip', () => {
            it('Passed to the component', () => {
                element.tooltip = 'some tooltip';
                expect(Tooltip).toHaveBeenCalled();
                expect(Tooltip.mock.calls[0][0]).toBe('some tooltip');

                const instance = Tooltip.mock.instances[0];
                expect(instance.initialize).toHaveBeenCalled();
            });
        });

        describe('Value', () => {
            it('Passed to the component', () => {
                element.value = 'This is a value';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.value).toBe('This is a value');
                });
            });
        });

        describe('Variant', () => {
            it('Bare without label', () => {
                element.variant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain('slds-button_icon-bare');
                    expect(button.className).toContain(
                        'avonni-button-menu_bare'
                    );
                });
            });

            it('Bare with label', () => {
                element.variant = 'bare';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).not.toContain(
                        'slds-button_icon-bare'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_bare'
                    );
                });
            });

            it('Bare-inverse without label', () => {
                element.variant = 'bare-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_icon-inverse'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_bare-inverse'
                    );
                });
            });

            it('Bare-inverse with label', () => {
                element.variant = 'bare-inverse';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).not.toContain(
                        'slds-button_icon-inverse'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_bare-inverse'
                    );
                });
            });

            it('Border without label', () => {
                element.variant = 'border';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_icon-border'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_border'
                    );
                });
            });

            it('Border with label', () => {
                element.variant = 'border';
                element.label = 'label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_border avonni-button-menu__button_label'
                    );
                });
            });

            it('Border-filled without label', () => {
                element.variant = 'border-filled';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_icon-border-filled'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_border-filled'
                    );
                });
            });

            it('Border-filled with label', () => {
                element.variant = 'border-filled';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).not.toContain(
                        'slds-button_icon-border-filled'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_border-filled'
                    );
                });
            });

            it('Border-inverse without label', () => {
                element.variant = 'border-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_border-inverse'
                    );
                });
            });

            it('Border-inverse with label', () => {
                element.variant = 'border-inverse';
                element.label = 'label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_border-inverse'
                    );
                });
            });

            it('Brand without label', () => {
                element.variant = 'brand';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_brand'
                    );
                });
            });

            it('Brand with label', () => {
                element.variant = 'brand';
                element.label = 'label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain('slds-button_brand');
                    expect(button.className).toContain(
                        'avonni-button-menu_brand'
                    );
                    expect(button.textContent).toContain('label');
                });
            });

            it('Brand-outline without label', () => {
                element.variant = 'brand-outline';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button.className).toContain(
                        'avonni-button-menu_brand-outline'
                    );
                });
            });

            it('Brand-outline with label', () => {
                element.variant = 'brand-outline';
                element.label = 'label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_outline-brand'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_brand-outline'
                    );
                    expect(button.textContent).toContain('label');
                });
            });

            it('Container without label', () => {
                element.variant = 'container';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_icon-container'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_container'
                    );
                });
            });

            it('Container with label', () => {
                element.variant = 'container';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_container'
                    );
                });
            });

            it('Destructive without label', () => {
                element.variant = 'destructive';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button.className).toContain(
                        'avonni-button-menu_destructive'
                    );
                });
            });

            it('Destructive with label', () => {
                element.variant = 'destructive';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_destructive'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_destructive'
                    );
                });
            });

            it('Destructive-text without label', () => {
                element.variant = 'destructive-text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_destructive-text'
                    );
                });
            });

            it('Destructive-text with label', () => {
                element.variant = 'destructive-text';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'slds-button_text-destructive'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu_destructive-text'
                    );
                });
            });

            it('Inverse without label', () => {
                element.variant = 'inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button.className).toContain(
                        'avonni-button-menu_inverse'
                    );
                });
            });

            it('Inverse with label', () => {
                element.variant = 'inverse';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain('slds-button_inverse');
                    expect(button.className).toContain(
                        'avonni-button-menu_inverse'
                    );
                });
            });

            it('Neutral without label', () => {
                element.variant = 'neutral';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button.className).toContain(
                        'avonni-button-menu_neutral'
                    );
                });
            });

            it('Neutral with label', () => {
                element.variant = 'neutral';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain('slds-button_neutral');
                    expect(button.className).toContain(
                        'avonni-button-menu_neutral'
                    );
                });
            });

            it('Success without label', () => {
                element.variant = 'success';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button.className).toContain(
                        'avonni-button-menu_success'
                    );
                });
            });

            it('Success with label', () => {
                element.variant = 'success';
                element.label = 'Button menu';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain('slds-button_success');
                    expect(button.className).toContain(
                        'avonni-button-menu_success'
                    );
                });
            });

            it('Border-inverse with icon name', () => {
                element.variant = 'border-inverse';
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain(
                        'avonni-button-menu__button-icon-container-more'
                    );
                });
            });

            it('Bare with icon name', () => {
                element.variant = 'bare';
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.className).toContain('slds-button_icon-bare');
                    expect(button.className).toContain(
                        'avonni-button-menu__button-icon-more'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        it('blur', () => {
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

        it('click', () => {
            let clickEvent = false;
            element.addEventListener('click', () => {
                clickEvent = true;
            });

            element.click();
            return Promise.resolve().then(() => {
                expect(clickEvent).toBeTruthy();
                expect(element.classList).toContain('slds-is-open');
            });
        });

        it('focus', () => {
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

    describe('Events', () => {
        it('close', () => {
            const handler = jest.fn();
            element.addEventListener('close', handler);
            element.click();
            element.blur();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });

        it('open', () => {
            const handler = jest.fn();
            element.addEventListener('open', handler);
            element.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });

        it('open triggered by keyboard', () => {
            const handler = jest.fn();
            element.addEventListener('open', handler);

            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            const event = new CustomEvent('keydown');
            event.key = 'Enter';
            button.dispatchEvent(event);

            expect(handler).toHaveBeenCalled();
        });

        it('select', () => {
            element.iconName = 'utility:down';

            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            const handler = jest.fn();
            element.addEventListener('select', handler);

            return Promise.resolve()
                .then(() => {
                    button.click();
                })
                .then(() => {
                    const dropdown = element.shadowRoot.querySelector(
                        '[data-element-id="dropdown"]'
                    );
                    expect(dropdown).toBeTruthy();
                    const list = element.shadowRoot.querySelector(
                        '[data-element-id="dropdown-list"]'
                    );
                    list.dispatchEvent(
                        new CustomEvent('privateselect', {
                            detail: {
                                value: 'acme'
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe('acme');
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
        });
    });
});
