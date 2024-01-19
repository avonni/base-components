import { createElement } from 'lwc';
import Pagination from 'c/pagination';

let element;
describe('Pagination', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-paginaion', {
            is: Pagination
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.align).toBe('left');
            expect(element.disabled).toBeFalsy();
            expect(element.ellipsisText).toBe('...');
            expect(element.firstButtonIconName).toBeUndefined();
            expect(element.firstButtonLabel).toBeUndefined();
            expect(element.lastButtonIconName).toBeUndefined();
            expect(element.lastButtonLabel).toBeUndefined();
            expect(element.limit).toBe(5);
            expect(element.nextButtonIconName).toBe('utility:chevronright');
            expect(element.nextButtonLabel).toBeUndefined();
            expect(element.perPage).toBe(20);
            expect(element.previousButtonIconName).toBe('utility:chevronleft');
            expect(element.previousButtonLabel).toBeUndefined();
            expect(element.totalRows).toBe(0);
            expect(element.value).toBe(1);
        });

        describe('Align', () => {
            it('Left', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-group"]'
                );
                element.align = 'left';

                return Promise.resolve().then(() => {
                    expect(wrapper.className).toBe('');
                });
            });

            it('Center', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-group"]'
                );
                element.align = 'center';

                return Promise.resolve().then(() => {
                    expect(wrapper.className).toBe(
                        'slds-grid slds-grid_align-center'
                    );
                });
            });

            it('Right', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-group"]'
                );
                element.align = 'right';

                return Promise.resolve().then(() => {
                    expect(wrapper.className).toBe(
                        'slds-grid slds-grid_align-end'
                    );
                });
            });

            it('Fill', () => {
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-group"]'
                );
                element.align = 'fill';

                return Promise.resolve().then(() => {
                    expect(wrapper.className).toBe(
                        'avonni-pagination__container_fill'
                    );
                });
            });
        });

        describe('Disabled', () => {
            // Depends on totalRows and value
            it('False, with one page', () => {
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const buttonIcons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-no-icon"]'
                    );

                    buttons.forEach((button) => {
                        expect(button.disabled).toBeFalsy();
                    });
                    buttonIcons.forEach((button) => {
                        expect(button.disabled).toBeTruthy();
                    });
                });
            });

            it('False, with several pages, on first page', () => {
                element.disabled = false;
                element.totalRows = 200;

                return Promise.resolve().then(() => {
                    const buttonIcons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-no-icon"]'
                    );

                    buttons.forEach((button) => {
                        expect(button.disabled).toBeFalsy();
                    });
                    buttonIcons.forEach((button, index) => {
                        if (index === 0) {
                            expect(button.disabled).toBeTruthy();
                        } else {
                            expect(button.disabled).toBeFalsy();
                        }
                    });
                });
            });

            it('False, with several pages, on middle page', () => {
                element.disabled = false;
                element.totalRows = 200;
                element.value = 4;

                return Promise.resolve().then(() => {
                    const buttonIcons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-no-icon"]'
                    );

                    buttons.forEach((button) => {
                        expect(button.disabled).toBeFalsy();
                    });
                    buttonIcons.forEach((button) => {
                        expect(button.disabled).toBeFalsy();
                    });
                });
            });

            it('False, with several pages, on last page', () => {
                element.disabled = false;
                element.totalRows = 200;
                element.value = 10;

                return Promise.resolve().then(() => {
                    const buttonIcons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-no-icon"]'
                    );

                    buttons.forEach((button) => {
                        expect(button.disabled).toBeFalsy();
                    });
                    buttonIcons.forEach((button, index) => {
                        if (index === buttonIcons.length - 1) {
                            expect(button.disabled).toBeTruthy();
                        } else {
                            expect(button.disabled).toBeFalsy();
                        }
                    });
                });
            });

            it('True', () => {
                element.disabled = true;
                element.totalRows = 200;
                element.value = 3;

                return Promise.resolve().then(() => {
                    const buttonIcons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-no-icon"]'
                    );

                    buttons.forEach((button) => {
                        expect(button.disabled).toBeTruthy();
                    });
                    buttonIcons.forEach((button) => {
                        expect(button.disabled).toBeTruthy();
                    });
                });
            });
        });

        // ellipsis-text
        describe('Ellipsis Text', () => {
            it('EllipsisText', () => {
                element.ellipsisText = 'A string ellipsis';
                element.totalRows = 200;
                element.value = 4;

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button-ellipsis"]'
                    );
                    expect(buttons).toHaveLength(2);
                    buttons.forEach((button) => {
                        expect(button.textContent).toBe('A string ellipsis');
                    });
                });
            });
        });

        describe('First Button', () => {
            // first-button-icon-name
            it('FirstButtonIconName, without label', () => {
                element.firstButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const firstButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-first"]'
                    );
                    expect(firstButtonIcon.iconName).toBe('utility:apps');
                });
            });

            // first-button-label
            it('FirstButtonLabel, without icon', () => {
                element.firstButtonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const firstButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-first"]'
                    );
                    expect(firstButton.textContent).toBe('A string label');
                    expect(firstButton.iconName).toBeUndefined();
                });
            });

            it('FirstButtonLabel, with icon', () => {
                element.firstButtonLabel = 'A string label';
                element.firstButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const firstButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-first"]'
                    );
                    const firstButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-first"]'
                    );
                    expect(firstButton.textContent).toBe('A string label');
                    expect(firstButtonIcon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('Last Button', () => {
            // last-button-icon-name
            it('LastButtonIconName, without label', () => {
                element.lastButtonIconName = 'standard:user';

                return Promise.resolve().then(() => {
                    const lastButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-last"]'
                    );
                    expect(lastButtonIcon.iconName).toBe('standard:user');
                });
            });

            // last-button-label
            it('LastButtonLabel, without icon', () => {
                element.lastButtonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const lastButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-last"]'
                    );
                    const lastButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-last"]'
                    );
                    expect(lastButton.textContent).toBe('A string label');
                    expect(lastButtonIcon).toBeNull();
                });
            });

            it('LastButtonIconName, with icon', () => {
                element.lastButtonLabel = 'A string label';
                element.lastButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const lastButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-last"]'
                    );
                    const lastButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-last"]'
                    );
                    expect(lastButton.textContent).toBe('A string label');
                    expect(lastButtonIcon.iconName).toBe('utility:apps');
                });
            });
        });

        // limit
        // Depends on totalRows
        describe('Limit', () => {
            it('Limit greater than 3, with enough results to see all buttons', () => {
                element.limit = 6;
                element.totalRows = 200;

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button"]'
                    );
                    expect(buttons).toHaveLength(6);
                });
            });

            it('Limit less than 3, with enough results to see all buttons', () => {
                element.limit = 1;
                element.totalRows = 200;

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button"]'
                    );
                    expect(buttons).toHaveLength(3);
                });
            });

            it('Limit greater than 3, without enough results to see all buttons', () => {
                element.limit = 18;
                element.totalRows = 25;

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button"]'
                    );
                    expect(buttons).toHaveLength(2);
                });
            });

            it('Limit less than 3, without enough results to see all buttons', () => {
                element.limit = 1;
                element.totalRows = 25;

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button"]'
                    );
                    expect(buttons).toHaveLength(2);
                });
            });
        });

        describe('Next Button', () => {
            it('NextButtonIconName, without label', () => {
                element.nextButtonIconName = 'standard:user';

                return Promise.resolve().then(() => {
                    const nextButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-next"]'
                    );
                    expect(nextButtonIcon.iconName).toBe('standard:user');
                });
            });

            // next-button-label
            it('NextButtonLabel, without icon', () => {
                element.nextButtonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const nextButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-next"]'
                    );
                    const nextButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-next"]'
                    );
                    expect(nextButton.textContent).toBe('A string label');
                    expect(nextButtonIcon).toBeNull();
                });
            });

            it('NextButtonLabel, with icon', () => {
                element.nextButtonLabel = 'A string label';
                element.nextButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const nextButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-next"]'
                    );
                    const nextButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-next"]'
                    );
                    expect(nextButton.textContent).toBe('A string label');
                    expect(nextButtonIcon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('Previous Button', () => {
            it('PreviousButtonIconName, without label', () => {
                element.previousButtonIconName = 'standard:user';

                return Promise.resolve().then(() => {
                    const previousButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-previous"]'
                    );
                    expect(previousButtonIcon.iconName).toBe('standard:user');
                });
            });

            // previous-button-label
            it('PreviousButtonLabel, without icon', () => {
                element.previousButtonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const previousButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-previous"]'
                    );
                    const previousButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-previous"]'
                    );
                    expect(previousButton.textContent).toBe('A string label');
                    expect(previousButtonIcon).toBeNull();
                });
            });

            it('PreviousButtonIconName, with icon', () => {
                element.previousButtonLabel = 'A string label';
                element.previousButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const previousButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-previous"]'
                    );
                    const previousButtonIcon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-previous"]'
                    );
                    expect(previousButton.textContent).toBe('A string label');
                    expect(previousButtonIcon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('Value', () => {
            // Depends on total-rows
            it('Value in the range', () => {
                element.value = 3;
                element.totalRows = 200;

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button"]'
                    );
                    expect(buttons[2].classList).toContain(
                        'avonni-pagination__button_active'
                    );
                    [0, 1, 3, 4].forEach((i) => {
                        expect(buttons[i].classList).not.toContain(
                            'avonni-pagination__button_active'
                        );
                    });
                });
            });

            it('Value greater than the available range', () => {
                element.value = 30;
                element.totalRows = 20;

                return Promise.resolve().then(() => {
                    const activeButton = element.shadowRoot.querySelector(
                        '.avonni-button-active'
                    );
                    expect(activeButton).toBeFalsy();
                });
            });
        });

        describe('Number of Pages & Change event', () => {
            it('Number of pages and page change (test of perPage, totalRows and change event)', () => {
                // There are 5 pages
                element.perPage = 10;
                element.totalRows = 50;

                const nextButtonIcon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-next"]'
                );
                const nextButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-next"]'
                );
                const previousButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-previous"]'
                );

                // The previous button should be disabled on first page
                expect(previousButton.disabled).toBeTruthy();

                for (let i = 0; i < 3; i++) {
                    nextButtonIcon.click();
                }

                return Promise.resolve()
                    .then(() => {
                        // After clicking 3 times on the next button, we should be on the penultimate page
                        // Next and previous buttons should not be disabled
                        expect(nextButton.disabled).toBeFalsy();
                        expect(previousButton.disabled).toBeFalsy();

                        // Check if event is fired on click on next button
                        const handleChange = (event) => {
                            expect(event.detail.value).toBe(5);
                            expect(event.bubbles).toBeFalsy();
                            expect(event.cancelable).toBeFalsy();
                            expect(event.composed).toBeFalsy();
                        };
                        element.addEventListener('change', handleChange);

                        nextButton.click();

                        element.removeEventListener('change', handleChange);
                    })
                    .then(() => {
                        // After clicking once more, we should be on the last page
                        // Next button should be disabled, but not previous button
                        expect(nextButton.disabled).toBeTruthy();
                        expect(previousButton.disabled).toBeFalsy();

                        // The current page value should be 5
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[4].classList).toContain(
                            'avonni-pagination__button_active'
                        );
                        [0, 1, 2, 3].forEach((i) => {
                            expect(buttons[i].classList).not.toContain(
                                'avonni-pagination__button_active'
                            );
                        });

                        // Check if event is fired on click on previous button
                        let pageCounter = 4;
                        const handleChange = (event) => {
                            expect(event.detail.value).toBe(pageCounter);
                            expect(event.bubbles).toBeFalsy();
                            expect(event.cancelable).toBeFalsy();
                            expect(event.composed).toBeFalsy();

                            pageCounter -= 1;
                        };
                        element.addEventListener('change', handleChange);

                        for (let i = 0; i < 4; i++) {
                            previousButton.click();
                        }

                        element.removeEventListener('change', handleChange);
                    })
                    .then(() => {
                        // After clicking 4 times on the previous button, we should be on the first page
                        // Previous button should be disabled, but not next button
                        expect(previousButton.disabled).toBeTruthy();
                        expect(nextButton.disabled).toBeFalsy();

                        // The current page value should be 1
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[0].classList).toContain(
                            'avonni-pagination__button_active'
                        );
                        [1, 2, 3, 4].forEach((i) => {
                            expect(buttons[i].classList).not.toContain(
                                'avonni-pagination__button_active'
                            );
                        });
                    });
            });
        });
    });

    describe('Methods', () => {
        describe('First', () => {
            // Depends on totalRows and value. Checks change event.
            it('First', () => {
                element.totalRows = 200;
                element.value = 3;

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[2].classList).toContain(
                            'avonni-pagination__button_active'
                        );

                        // Check if event is fired
                        const handleChange = (event) => {
                            expect(event.detail.value).toBe(1);
                            expect(event.bubbles).toBeFalsy();
                            expect(event.cancelable).toBeFalsy();
                            expect(event.composed).toBeFalsy();
                        };
                        element.addEventListener('change', handleChange);

                        element.first();

                        element.removeEventListener('change', handleChange);
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[0].classList).toContain(
                            'avonni-pagination__button_active'
                        );
                    });
            });
        });

        describe('Last', () => {
            // Depends on totalRows. Checks change event.
            it('Last', () => {
                element.totalRows = 200;

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[0].classList).toContain(
                            'avonni-pagination__button_active'
                        );

                        // Check if event is fired
                        const handleChange = (event) => {
                            expect(event.detail.value).toBe(10);
                            expect(event.bubbles).toBeFalsy();
                            expect(event.cancelable).toBeFalsy();
                            expect(event.composed).toBeFalsy();
                        };
                        element.addEventListener('change', handleChange);

                        element.last();

                        element.removeEventListener('change', handleChange);
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[4].classList).toContain(
                            'avonni-pagination__button_active'
                        );
                        // Based on the fact that the default value for limit is 5, there should be 10 pages
                        expect(buttons[4].textContent).toBe('10');
                    });
            });
        });

        describe('Next', () => {
            // Depends on totalRows. Checks change event.
            it('Next', () => {
                element.totalRows = 200;

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[0].classList).toContain(
                            'avonni-pagination__button_active'
                        );

                        // Check if event is fired
                        const handleChange = (event) => {
                            expect(event.detail.value).toBe(2);
                            expect(event.bubbles).toBeFalsy();
                            expect(event.cancelable).toBeFalsy();
                            expect(event.composed).toBeFalsy();
                        };
                        element.addEventListener('change', handleChange);

                        element.next();

                        element.removeEventListener('change', handleChange);
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[1].classList).toContain(
                            'avonni-pagination__button_active'
                        );
                    });
            });
        });

        describe('Previous', () => {
            // Depends on totalRows and value. Checks change event.
            it('Previous', () => {
                element.totalRows = 200;
                element.value = 3;

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[2].classList).toContain(
                            'avonni-pagination__button_active'
                        );

                        // Check if event is fired
                        const handleChange = (event) => {
                            expect(event.detail.value).toBe(2);
                            expect(event.bubbles).toBeFalsy();
                            expect(event.cancelable).toBeFalsy();
                            expect(event.composed).toBeFalsy();
                        };
                        element.addEventListener('change', handleChange);

                        element.previous();

                        element.removeEventListener('change', handleChange);
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[1].classList).toContain(
                            'avonni-pagination__button_active'
                        );
                    });
            });
        });

        describe('Go to', () => {
            // Depends on totalRows. Checks change event.
            it('Goto', () => {
                element.totalRows = 200;

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[0].classList).toContain(
                            'avonni-pagination__button_active'
                        );

                        // Check if event is fired
                        const handleChange = (event) => {
                            expect(event.detail.value).toBe(4);
                            expect(event.bubbles).toBeFalsy();
                            expect(event.cancelable).toBeFalsy();
                            expect(event.composed).toBeFalsy();
                        };
                        element.addEventListener('change', handleChange);

                        element.goto(4);

                        element.removeEventListener('change', handleChange);
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button"]'
                        );
                        expect(buttons[2].classList).toContain(
                            'avonni-pagination__button_active'
                        );
                        expect(buttons[2].textContent).toBe('4');
                    });
            });

            it('Goto method is called on click on ellipsis', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.totalRows = 200;

                return Promise.resolve()
                    .then(() => {
                        // Click on the next ellipsis
                        const ellipsis = element.shadowRoot.querySelector(
                            '[data-element-id="button-ellipsis"]'
                        );
                        ellipsis.click();

                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.value).toBe(6);
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                        expect(element.value).toBe(6);
                    })
                    .then(() => {
                        // Click on the previous ellipsis
                        const ellipsis = element.shadowRoot.querySelector(
                            '[data-element-id="button-ellipsis"]'
                        );
                        ellipsis.click();

                        expect(handler).toHaveBeenCalledTimes(2);
                        const call = handler.mock.calls[1][0];
                        expect(call.detail.value).toBe(3);
                        expect(element.value).toBe(3);
                    });
            });
        });
    });
});
