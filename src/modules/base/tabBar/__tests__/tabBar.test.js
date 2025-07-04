import { createElement } from 'lwc';
import TabBar from 'c/tabBar';

const items = [
    { label: 'Tab 1', name: 'tab1' },
    { label: 'Tab 2', name: 'tab2' },
    { label: 'Tab 3', name: 'tab3' },
    { label: 'Tab 4', name: 'tab4' },
    { label: 'Tab 5', name: 'tab5' }
];

let element;
describe('Tab Bar', () => {
    afterEach(() => {
        jest.useRealTimers();
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });

        element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });
        document.body.appendChild(element);
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.defaultTab).toBeUndefined();
            expect(element.items).toEqual([]);
            expect(element.labels).toEqual([]);
            expect(element.tabsHidden).toBe(0);
        });

        describe('DefaultTab', () => {
            it('Passed to the component', () => {
                element.items = items;
                element.defaultTab = 'tab2';

                return Promise.resolve().then(() => {
                    const defaultTab =
                        element.shadowRoot.querySelector('.slds-is-active');
                    expect(defaultTab.firstChild.title).toBe('Tab 2');
                    expect(defaultTab.firstChild.dataset.name).toBe('tab2');
                });
            });
        });

        describe('Labels', () => {
            it('Passed to the component', () => {
                element.items = items;

                return Promise.resolve().then(() => {
                    const tabs = element.shadowRoot.querySelectorAll('a');
                    expect(tabs.length).toBe(5);
                    expect(tabs[0].title).toBe('Tab 1');
                    expect(tabs[1].title).toBe('Tab 2');
                    expect(tabs[2].title).toBe('Tab 3');
                    expect(tabs[3].title).toBe('Tab 4');
                    expect(tabs[4].title).toBe('Tab 5');
                });
            });
        });

        describe('TabsHidden', () => {
            it('Passed to the component', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                    })
                    .then(() => {
                        const hiddenTabs = element.shadowRoot.querySelectorAll(
                            '.slds-dropdown__item'
                        );
                        expect(hiddenTabs.length).toBe(2);
                        expect(hiddenTabs[0].firstChild.firstChild.title).toBe(
                            'Tab 4'
                        );
                        expect(hiddenTabs[1].firstChild.firstChild.title).toBe(
                            'Tab 5'
                        );
                    });
            });
        });
    });

    describe('Methods', () => {
        describe('focus', () => {
            it('focus method', () => {
                element.items = items;
                element.defaultTab = 'tab2';

                return Promise.resolve().then(() => {
                    const tabs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="a-tab-link"]'
                    );
                    const spy = jest.spyOn(tabs[1], 'focus');

                    element.focus();
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
        describe('Tabs change', () => {
            it('Click on visible tab', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[2].click();
                    })
                    .then(() => {
                        const selectedTab =
                            element.shadowRoot.querySelector('.slds-is-active');
                        expect(selectedTab.firstChild.title).toBe('Tab 3');
                    });
            });

            it('Click on hidden tab', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[3].dispatchEvent(
                            new CustomEvent('mousedown', {
                                target: { title: 'Tab 4' }
                            })
                        );
                    })
                    .then(() => {
                        jest.runAllTimers();
                        const selectedTab =
                            element.shadowRoot.querySelector('.slds-is-active');
                        expect(selectedTab.firstChild.title).toBe('Tab 4');
                    });
            });
        });
    });

    describe('Events', () => {
        describe('Select', () => {
            it('Select event', () => {
                element.items = items;
                element.tabsHidden = 2;

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[2].click();
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalled();
                        expect(handler.mock.calls[0][0].detail.value).toBe(
                            'tab3'
                        );
                    });
            });
        });

        describe('Blur', () => {
            it('Blur event', () => {
                element.items = items;
                element.tabsHidden = 2;

                const handler = jest.fn();
                element.addEventListener('blur', handler);

                return Promise.resolve().then(() => {
                    const tab = element.shadowRoot.querySelector(
                        '[data-element-id="a-tab-link"]'
                    );
                    tab.dispatchEvent(new CustomEvent('blur'));
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                });
            });
        });

        describe('Dropdown button focus and blur', () => {
            it('Dropdown button focus and blur', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.focus();
                    })
                    .then(() => {
                        const buttonTab =
                            element.shadowRoot.querySelector('button')
                                .parentElement.parentElement;
                        expect(buttonTab.classList).toContain('slds-is-active');
                    })
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.blur();
                    })
                    .then(() => {
                        const buttonTab =
                            element.shadowRoot.querySelector('button')
                                .parentElement.parentElement;
                        expect(buttonTab.classList).not.toContain(
                            'slds-is-active'
                        );
                    });
            });
        });

        describe('Change dropdown', () => {
            it('option with down arrow', () => {
                element.items = items;
                element.tabsHidden = 2;

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[3].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 40 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[4].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 40 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[3].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 13 })
                        );
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalled();
                    });
            });

            it('option with up arrow', () => {
                element.items = items;
                element.tabsHidden = 2;

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[3].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 38 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[4].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 38 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[3].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 13 })
                        );
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalled();
                    });
            });
        });

        describe('Close dropdown', () => {
            it('with Escape key', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-hidden-tab"]'
                        );
                        expect(tabs).toHaveLength(2);
                        const event = new CustomEvent('keydown', {
                            bubbles: true
                        });
                        event.keyCode = 27;
                        tabs[0].dispatchEvent(event);
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-hidden-tab"]'
                        );
                        expect(tabs).toHaveLength(0);
                    });
            });

            it('with Tab key', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-hidden-tab"]'
                        );
                        expect(tabs).toHaveLength(2);
                        const event = new CustomEvent('keydown', {
                            bubbles: true
                        });
                        event.keyCode = 9;
                        tabs[1].dispatchEvent(event);
                        jest.runAllTimers();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll(
                            '[data-element-id="a-hidden-tab"]'
                        );
                        expect(tabs).toHaveLength(0);
                    });
            });

            it('with button click', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                    })
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        expect(tabs.length).toBe(3);
                    });
            });

            it('Invalid keypress in dropdown', () => {
                element.items = items;
                element.tabsHidden = 2;

                return Promise.resolve()
                    .then(() => {
                        const hiddenTabsMenuButton =
                            element.shadowRoot.querySelector('button');
                        hiddenTabsMenuButton.click();
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[3].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 1 })
                        );
                    })
                    .then(() => {
                        element.shadowRoot.dispatchEvent(
                            new KeyboardEvent('keyup', { keyCode: 1 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        expect(tabs.length).toBe(5);
                    });
            });
        });

        describe('Change selected tab', () => {
            it('with right arrow with hidden tabs', () => {
                element.items = items;
                element.tabsHidden = 2;
                element.defaultTab = 'Tab 2';

                return Promise.resolve()
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[1].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 39 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[2].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 39 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        expect(tabs[0].getAttribute('tabindex')).toBe('0');
                    });
            });

            it('with right arrow without hidden tabs', () => {
                element.items = items;
                element.defaultTab = 'Tab 4';

                return Promise.resolve()
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[3].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 39 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[4].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 39 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        expect(tabs[0].getAttribute('tabindex')).toBe('0');
                    });
            });

            it('with left arrow with hidden tabs', () => {
                element.items = items;
                element.tabsHidden = 2;
                element.defaultTab = 'Tab 2';

                return Promise.resolve()
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[1].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 37 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[0].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 37 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        expect(tabs[2].getAttribute('tabindex')).toBe('0');
                    });
            });

            it('with left arrow without hidden tabs', () => {
                element.items = items;
                element.defaultTab = 'Tab 2';

                return Promise.resolve()
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[1].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 37 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[0].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 37 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        expect(tabs[2].getAttribute('tabindex')).toBe('0');
                    });
            });

            it('Invalid keypress when focus is on tabs', () => {
                element.items = items;
                element.tabsHidden = 2;
                element.defaultTab = 'Tab 2';

                return Promise.resolve()
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[1].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 37 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        tabs[2].parentElement.dispatchEvent(
                            new KeyboardEvent('keydown', { keyCode: 1 })
                        );
                    })
                    .then(() => {
                        const tabs = element.shadowRoot.querySelectorAll('a');
                        expect(tabs[0].getAttribute('tabindex')).toBe('0');
                        expect(tabs[2].getAttribute('tabindex')).toBe('0');
                    });
            });
        });
    });
});
