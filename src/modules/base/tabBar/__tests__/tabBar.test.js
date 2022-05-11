import { createElement } from 'lwc';
import TabBar from 'c/tabBar';

const labels = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

describe('Tab Bar', () => {
    afterEach(() => {
        jest.useRealTimers();
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /* ----- ATTRIBUTES ----- */

    it('Tab bar: Default attributes', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });
        document.body.appendChild(element);

        expect(element.labels).toEqual([]);
        expect(element.tabsHidden).toBe(0);
        expect(element.defaultTab).toBeUndefined();
    });

    it('Tab bar: Labels attribute', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;

        document.body.appendChild(element);

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

    it('Tab bar: TabsHidden attribute', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

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
                expect(hiddenTabs[0].firstChild.firstChild.title).toBe('Tab 4');
                expect(hiddenTabs[1].firstChild.firstChild.title).toBe('Tab 5');
            });
    });

    it('Tab bar: DefaultTab attribute', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.defaultTab = 'Tab 2';

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const defaultTab =
                element.shadowRoot.querySelector('.slds-is-active');
            expect(defaultTab.firstChild.title).toBe('Tab 2');
        });
    });

    /* ----- TABS CHANGE ----- */

    it('Tab bar: Click on visible tab', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

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

    it('Tab bar: Click on hidden tab', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);
        jest.useFakeTimers();

        return Promise.resolve()
            .then(() => {
                const hiddenTabsMenuButton =
                    element.shadowRoot.querySelector('button');
                hiddenTabsMenuButton.click();
            })
            .then(() => {
                const tabs = element.shadowRoot.querySelectorAll('a');
                tabs[3].dispatchEvent(
                    new CustomEvent('mousedown', { target: { title: 'Tab 4' } })
                );
            })
            .then(() => {
                jest.runAllTimers();
                const selectedTab =
                    element.shadowRoot.querySelector('.slds-is-active');
                expect(selectedTab.firstChild.title).toBe('Tab 4');
            });
    });

    /* ----- EVENTS ----- */

    it('Tab bar: Select event', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve()
            .then(() => {
                const tabs = element.shadowRoot.querySelectorAll('a');
                tabs[2].click();
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe('Tab 3');
            });
    });

    it('Tab bar: Blur event', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);
        jest.useFakeTimers();

        const handler = jest.fn();
        element.addEventListener('blur', handler);

        return Promise.resolve()
            .then(() => {
                const hiddenTabsMenuButton =
                    element.shadowRoot.querySelector('button');
                hiddenTabsMenuButton.click();
            })
            .then(() => {
                jest.runAllTimers();
                const tabs = element.shadowRoot.querySelectorAll('a');
                tabs[3].dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                jest.runAllTimers();
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
            });
    });

    it('Tab bar: Dropdown button focus and blur', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const hiddenTabsMenuButton =
                    element.shadowRoot.querySelector('button');
                hiddenTabsMenuButton.focus();
            })
            .then(() => {
                const buttonTab =
                    element.shadowRoot.querySelector('button').parentElement
                        .parentElement;
                expect(buttonTab.classList).toContain('slds-is-active');
            })
            .then(() => {
                const hiddenTabsMenuButton =
                    element.shadowRoot.querySelector('button');
                hiddenTabsMenuButton.blur();
            })
            .then(() => {
                const buttonTab =
                    element.shadowRoot.querySelector('button').parentElement
                        .parentElement;
                expect(buttonTab.classList).not.toContain('slds-is-active');
            });
    });

    it('Tab bar: Change dropdown option with down arrow', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

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

    it('Tab bar: Change dropdown option with up arrow', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

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

    it('Tab bar: Close dropdown with Escape key', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const hiddenTabsMenuButton =
                    element.shadowRoot.querySelector('button');
                hiddenTabsMenuButton.click();
            })
            .then(() => {
                const tabs = element.shadowRoot.querySelectorAll('a');
                tabs[3].parentElement.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 27 })
                );
            })
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 27 })
                );
            })
            .then(() => {
                const tabs = element.shadowRoot.querySelectorAll('a');
                expect(tabs.length).toBe(3);
            });
    });

    it('Tab bar: Close dropdown with Tab key', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const hiddenTabsMenuButton =
                    element.shadowRoot.querySelector('button');
                hiddenTabsMenuButton.click();
            })
            .then(() => {
                const tabs = element.shadowRoot.querySelectorAll('a');
                tabs[3].parentElement.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 9 })
                );
            })
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 9 })
                );
            })
            .then(() => {
                const tabs = element.shadowRoot.querySelectorAll('a');
                expect(tabs.length).toBe(3);
            });
    });

    it('Tab bar: Close dropdown with button click', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

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

    it('Tab bar: Invalid keypress in dropdown', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;

        document.body.appendChild(element);

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

    it('Tab bar: Change selected tab with right arrow with hidden tabs', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;
        element.defaultTab = 'Tab 2';

        document.body.appendChild(element);

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

    it('Tab bar: Change selected tab with right arrow without hidden tabs', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.defaultTab = 'Tab 4';

        document.body.appendChild(element);

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

    it('Tab bar: Change selected tab with left arrow with hidden tabs', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;
        element.defaultTab = 'Tab 2';

        document.body.appendChild(element);

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

    it('Tab bar: Change selected tab with left arrow without hidden tabs', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.defaultTab = 'Tab 2';

        document.body.appendChild(element);

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

    it('Tab bar: Invalid keypress when focus is on tabs', () => {
        const element = createElement('avonni-builder-tab-bar', {
            is: TabBar
        });

        element.labels = labels;
        element.tabsHidden = 2;
        element.defaultTab = 'Tab 2';

        document.body.appendChild(element);

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
