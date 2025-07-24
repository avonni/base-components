import { createElement } from 'lwc';
import ColorPalette from 'c/colorPalette';

// Not tested because not used:
// value

const COLORS = [
    {
        label: 'fake token one',
        color: 'rgb(10, 35, 153)',
        value: '--fake-token-one',
        groups: ['firstGroup', 'secondGroup']
    },
    {
        label: 'fake token two',
        color: 'rgb(9, 106, 80)',
        value: '--fake-token-two',
        groups: ['firstGroup']
    },
    {
        color: 'rgb(56, 10, 80)'
    },
    'rgb(0, 0, 0)'
];

let element;
describe('Color Palette', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.colors).toMatchObject([
                '#e3abec',
                '#c2dbf7',
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
                '#1b96ff',
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
            expect(element.columns).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.groups).toMatchObject([]);
            expect(element.hideOutline).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.readOnly).toBeFalsy();
            expect(element.showCheckmark).toBeFalsy();
            expect(element.tileHeight).toBe(20);
            expect(element.tileWidth).toBe(20);
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('grid');
        });

        describe('Colors', () => {
            it('Passed to the component', () => {
                element.colors = COLORS;

                return Promise.resolve().then(() => {
                    const colorElements = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-swatch"]'
                    );
                    expect(colorElements).toHaveLength(COLORS.length);
                    colorElements.forEach((color, index) => {
                        const bgColor =
                            COLORS[index] instanceof Object
                                ? COLORS[index].color
                                : COLORS[index];
                        expect(color.style.backgroundColor).toBe(bgColor);
                    });
                });
            });
        });

        describe('Columns', () => {
            it('Passed to the component', () => {
                element.columns = 4;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="div-palette-container"]'
                    );
                    expect(container.style.width).toBe('112px');
                });
            });
        });

        describe('Disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="a-"]'
                    );
                    a.forEach((color) => {
                        expect(color.getAttribute('aria-disabled')).toBe(
                            'true'
                        );
                    });
                    const colors = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="span-"]'
                    );
                    colors.forEach((color) => {
                        expect(color.style.backgroundColor).toBe(
                            'rgb(221, 219, 218)'
                        );
                    });
                });
            });
        });

        describe('Groups', () => {
            it('Passed to the component', () => {
                const groupsName = [
                    {
                        name: 'firstGroup',
                        label: 'First Group'
                    },
                    {
                        name: 'secondGroup',
                        label: 'Second Group'
                    }
                ];
                element.groups = groupsName;
                element.colors = COLORS;

                return Promise.resolve().then(() => {
                    const groups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-group"]'
                    );
                    expect(groups).toHaveLength(3);

                    // Undefined group
                    const firstGroupLabel = groups[0].querySelector(
                        '[data-element-id="div-group-label"]'
                    );
                    expect(firstGroupLabel).toBeFalsy();
                    const firstGroupSwatches = groups[0].querySelectorAll(
                        '[data-element-id="span-swatch"]'
                    );
                    expect(firstGroupSwatches).toHaveLength(2);

                    // First group
                    const secondGroupLabel = groups[1].querySelector(
                        '[data-element-id="div-group-label"]'
                    );
                    expect(secondGroupLabel.textContent).toBe(
                        groupsName[0].label
                    );
                    const secondGroupSwatches = groups[1].querySelectorAll(
                        '[data-element-id="span-swatch"]'
                    );
                    expect(secondGroupSwatches).toHaveLength(2);

                    // Second group
                    const thirdGroupLabel = groups[2].querySelector(
                        '[data-element-id="div-group-label"]'
                    );
                    expect(thirdGroupLabel.textContent).toBe(
                        groupsName[1].label
                    );
                    const ThirdGroupSwatches = groups[2].querySelectorAll(
                        '[data-element-id="span-swatch"]'
                    );
                    expect(ThirdGroupSwatches).toHaveLength(1);
                });
            });
        });

        describe('Hide outline', () => {
            it('Passed to the component', () => {
                element.hideOutline = true;

                return Promise.resolve()
                    .then(() => {
                        const selectable =
                            element.shadowRoot.querySelector(
                                '[data-selectable]'
                            );
                        selectable.click();
                    })
                    .then(() => {
                        const selectable =
                            element.shadowRoot.querySelector(
                                '[data-selectable]'
                            );
                        expect(selectable.classList).not.toContain(
                            'avonni-color-picker__show-selected-outline'
                        );
                        expect(selectable.classList).toContain(
                            'slds-is-selected'
                        );
                    });
            });
        });

        describe('Is loading', () => {
            it('Passed to the component', () => {
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner).toBeTruthy();
                });
            });
        });

        describe('Loading state alternative text', () => {
            it('Passed to the component', () => {
                element.loadingStateAlternativeText = 'Loading...';
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner).toBeTruthy();
                });
            });
        });

        describe('Read only', () => {
            it('Passed to the component', () => {
                element.readOnly = true;

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="a-"]'
                    );
                    a.forEach((color) => {
                        expect(color.getAttribute('aria-readonly')).toBe(
                            'true'
                        );
                    });
                });
            });
        });

        describe('Show checkmark', () => {
            it('Passed to the component', () => {
                element.showCheckmark = true;

                return Promise.resolve()
                    .then(() => {
                        const selectable =
                            element.shadowRoot.querySelector(
                                '[data-selectable]'
                            );
                        selectable.click();
                    })
                    .then(() => {
                        const selectable =
                            element.shadowRoot.querySelector(
                                '[data-selectable]'
                            );
                        expect(selectable.classList).toContain(
                            'avonni-color-picker__show-selected-checkmark'
                        );
                        expect(selectable.classList).toContain(
                            'slds-is-selected'
                        );
                    });
            });
        });

        describe('Tile height', () => {
            it('Passed to the component', () => {
                element.tileHeight = 10;

                return Promise.resolve().then(() => {
                    const colors = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="span"]'
                    );
                    colors.forEach((color) => {
                        expect(color.style.height).toBe('10px');
                    });
                });
            });
        });

        describe('Tile width', () => {
            it('Passed to the component', () => {
                element.tileWidth = 4;

                return Promise.resolve().then(() => {
                    const colors = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="span"]'
                    );
                    colors.forEach((color) => {
                        expect(color.style.width).toBe('4px');
                    });
                });
            });
        });

        describe('Variant', () => {
            it('Grid', () => {
                element.variant = 'grid';
                element.colors = COLORS;

                return Promise.resolve().then(() => {
                    const links = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-grid"]'
                    );
                    expect(links).toHaveLength(COLORS.length);
                    links.forEach((link, index) => {
                        expect(link.title).toBe(COLORS[index].label || '');
                        const isObject = COLORS[index] instanceof Object;
                        const ariaLabel = isObject
                            ? COLORS[index].label || COLORS[index].color
                            : COLORS[index];
                        expect(link.getAttribute('aria-label')).toBe(
                            ariaLabel || null
                        );
                    });
                });
            });

            it('list', () => {
                element.variant = 'list';
                element.colors = COLORS;

                return Promise.resolve().then(() => {
                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-label"]'
                    );
                    expect(labels).toHaveLength(COLORS.length);
                    labels.forEach((label, index) => {
                        expect(label.textContent).toBe(
                            COLORS[index].label || ''
                        );
                    });
                });
            });
        });
    });

    describe('Methods', () => {
        describe('click when disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const color = element.shadowRoot.querySelector(
                        '[data-element-id^="a-"]'
                    );
                    color.click();

                    return Promise.resolve().then(() => {
                        expect(element.value).toBeFalsy();
                    });
                });
            });
        });

        describe('reset method', () => {
            it('Passed to the component', () => {
                element.value = '#ffffff';
                element.reset();

                return Promise.resolve().then(() => {
                    expect(element.value).toBe('');
                });
            });
        });
    });

    describe('Events', () => {
        describe('blur event', () => {
            it('In grid', () => {
                const handler = jest.fn();
                element.addEventListener('blur', handler);
                element.colors = COLORS;

                return Promise.resolve()
                    .then(() => {
                        const color = element.shadowRoot.querySelector(
                            '[data-element-id="a-grid"]'
                        );
                        color.dispatchEvent(new CustomEvent('blur'));
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    });
            });

            it('In list', () => {
                const handler = jest.fn();
                element.addEventListener('blur', handler);
                element.colors = COLORS;
                element.variant = 'list';

                return Promise.resolve()
                    .then(() => {
                        const color = element.shadowRoot.querySelector(
                            '[data-element-id="a-list"]'
                        );
                        color.dispatchEvent(new CustomEvent('blur'));
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                        expect(handler.mock.calls[0][0].composed).toBeFalsy();
                        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    });
            });
        });

        describe('change event', () => {
            it('In grid', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-swatch"]'
                    );
                    a[0].click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.hex).toBe('#e3abec');
                    expect(handler.mock.calls[0][0].detail.hexa).toBe(
                        '#e3abecff'
                    );
                    expect(handler.mock.calls[0][0].detail.rgb).toBe(
                        'rgb(227,171,236)'
                    );
                    expect(handler.mock.calls[0][0].detail.rgba).toBe(
                        'rgba(227,171,236,1)'
                    );
                    expect(handler.mock.calls[0][0].detail.alpha).toBe('1');
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });

            it('In list', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.colors = COLORS;

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-swatch"]'
                    );
                    a[0].click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.hex).toBe('#0a2399');
                    expect(handler.mock.calls[0][0].detail.hexa).toBe(
                        '#0a2399ff'
                    );
                    expect(handler.mock.calls[0][0].detail.rgb).toBe(
                        'rgb(10, 35, 153)'
                    );
                    expect(handler.mock.calls[0][0].detail.rgba).toBe(
                        'rgba(10, 35, 153,1)'
                    );
                    expect(handler.mock.calls[0][0].detail.alpha).toBe('1');
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });
        });

        describe('double click event', () => {
            it('In grid', () => {
                const handler = jest.fn();
                element.addEventListener('colordblclick', handler);
                element.colors = COLORS;

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelector(
                        '[data-element-id="a-grid"]'
                    );
                    a.dispatchEvent(new CustomEvent('dblclick'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('In list', () => {
                const handler = jest.fn();
                element.addEventListener('colordblclick', handler);
                element.colors = COLORS;
                element.variant = 'list';

                return Promise.resolve().then(() => {
                    const a = element.shadowRoot.querySelector(
                        '[data-element-id="a-list"]'
                    );
                    a.dispatchEvent(new CustomEvent('dblclick'));

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('focus event', () => {
            it('In grid', () => {
                const handler = jest.fn();
                element.addEventListener('privatefocus', handler);
                element.colors = COLORS;

                return Promise.resolve().then(() => {
                    const color = element.shadowRoot.querySelector(
                        '[data-element-id="a-grid"]'
                    );
                    color.dispatchEvent(new CustomEvent('focus'));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });

            it('In list', () => {
                const handler = jest.fn();
                element.addEventListener('privatefocus', handler);
                element.colors = COLORS;
                element.variant = 'list';

                return Promise.resolve().then(() => {
                    const color = element.shadowRoot.querySelector(
                        '[data-element-id="a-list"]'
                    );
                    color.dispatchEvent(new CustomEvent('focus'));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });
        });
    });
});
