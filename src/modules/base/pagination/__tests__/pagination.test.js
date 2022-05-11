/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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

    it('Pagination: Default attributes', () => {
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

    /* ---- ATTRIBUTES ----- */

    // align
    it('Pagination: align = left', () => {
        const wrapper = element.shadowRoot.querySelector(
            '.avonni-pagination__container'
        );
        element.align = 'left';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain(
                'avonni-pagination__container_left'
            );
        });
    });

    it('Pagination: align = center', () => {
        const wrapper = element.shadowRoot.querySelector(
            '.avonni-pagination__container'
        );
        element.align = 'center';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain(
                'avonni-pagination__container_center'
            );
        });
    });

    it('Pagination: align = right', () => {
        const wrapper = element.shadowRoot.querySelector(
            '.avonni-pagination__container'
        );
        element.align = 'right';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain(
                'avonni-pagination__container_right'
            );
        });
    });

    it('Pagination: align = fill', () => {
        const wrapper = element.shadowRoot.querySelector(
            '.avonni-pagination__container'
        );
        element.align = 'fill';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain(
                'avonni-pagination__container_fill'
            );
        });
    });

    // disabled
    // Depends on totalRows and value
    it('Pagination: disabled = false, with one page', () => {
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

    it('Pagination: disabled = false, with several pages, on first page', () => {
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

    it('Pagination: disabled = false, with several pages, on middle page', () => {
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

    it('Pagination: disabled = false, with several pages, on last page', () => {
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

    it('Pagination: disabled = true', () => {
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

    // ellipsis-text
    it('Pagination: ellipsisText', () => {
        element.ellipsisText = 'A string ellipsis';
        element.totalRows = 200;
        element.value = 3;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-button-no-icon-page"]'
            );
            expect(buttons[0].value).toBe('A string ellipsis');
            expect(buttons[buttons.length - 1].value).toBe('A string ellipsis');
        });
    });

    // first-button-icon-name
    it('Pagination: firstButtonIconName, without label', () => {
        element.firstButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-first"]'
            );
            expect(firstButton.iconName).toBe('utility:apps');
        });
    });

    // first-button-label
    it('Pagination: firstButtonLabel, without icon', () => {
        element.firstButtonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-first"]'
            );
            expect(firstButton.label).toBe('A string label');
            expect(firstButton.iconName).toBeUndefined();
        });
    });

    it('Pagination: firstButtonLabel, with icon', () => {
        element.firstButtonLabel = 'A string label';
        element.firstButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-first"]'
            );
            expect(firstButton.label).toBe('A string label');
            expect(firstButton.iconName).toBe('utility:apps');
        });
    });

    // last-button-icon-name
    it('Pagination: lastButtonIconName, without label', () => {
        element.lastButtonIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-last"]'
            );
            expect(lastButton.iconName).toBe('standard:user');
        });
    });

    // last-button-label
    it('Pagination: lastButtonLabel, without icon', () => {
        element.lastButtonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-last"]'
            );
            expect(lastButton.label).toBe('A string label');
            expect(lastButton.iconName).toBeUndefined();
        });
    });

    it('Pagination: lastButtonIconName, with icon', () => {
        element.lastButtonLabel = 'A string label';
        element.lastButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-last"]'
            );
            expect(lastButton.label).toBe('A string label');
            expect(lastButton.iconName).toBe('utility:apps');
        });
    });

    // limit
    // Depends on totalRows
    it('Pagination: limit greater than 3, with enough results to see all buttons', () => {
        element.limit = 6;
        element.totalRows = 200;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-no-icon"]'
            );
            expect(buttons).toHaveLength(6);
        });
    });

    it('Pagination: limit less than 3, with enough results to see all buttons', () => {
        element.limit = 1;
        element.totalRows = 200;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-no-icon"]'
            );
            expect(buttons).toHaveLength(3);
        });
    });

    it('Pagination: limit greater than 3, without enough results to see all buttons', () => {
        element.limit = 18;
        element.totalRows = 25;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-no-icon"]'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    it('Pagination: limit less than 3, without enough results to see all buttons', () => {
        element.limit = 1;
        element.totalRows = 25;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-no-icon"]'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    // next-button-icon-name
    it('Pagination: nextButtonIconName, without label', () => {
        element.nextButtonIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-next"]'
            );
            expect(nextButton.iconName).toBe('standard:user');
        });
    });

    // next-button-label
    it('Pagination: nextButtonLabel, without icon', () => {
        element.nextButtonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-next"]'
            );
            expect(nextButton.label).toBe('A string label');
            expect(nextButton.iconName).toBeUndefined();
        });
    });

    it('Pagination: nextButtonLabel, with icon', () => {
        element.nextButtonLabel = 'A string label';
        element.nextButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-next"]'
            );
            expect(nextButton.label).toBe('A string label');
            expect(nextButton.iconName).toBe('utility:apps');
        });
    });

    // previous-button-icon-name
    it('Pagination: previousButtonIconName, without label', () => {
        element.previousButtonIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const previousButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-previous"]'
            );
            expect(previousButton.iconName).toBe('standard:user');
        });
    });

    // previous-button-label
    it('Pagination: previousButtonLabel, without icon', () => {
        element.previousButtonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const previousButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-previous"]'
            );
            expect(previousButton.label).toBe('A string label');
            expect(previousButton.iconName).toBeUndefined();
        });
    });

    it('Pagination: previousButtonIconName, with icon', () => {
        element.previousButtonLabel = 'A string label';
        element.previousButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-no-icon-previous"]'
            );
            expect(buttons.label).toBe('A string label');
            expect(buttons.iconName).toBe('utility:apps');
        });
    });

    // value
    // Depends on total-rows
    it('Pagination: value in the range', () => {
        element.value = 3;
        element.totalRows = 200;

        return Promise.resolve().then(() => {
            const activeButton = element.shadowRoot.querySelector(
                '.avonni-button-active'
            );
            expect(activeButton.value).toBe(3);
        });
    });

    it('Pagination: value greater than the available range', () => {
        element.value = 30;
        element.totalRows = 20;

        return Promise.resolve().then(() => {
            const activeButton = element.shadowRoot.querySelector(
                '.avonni-button-active'
            );
            expect(activeButton).toBeFalsy();
        });
    });

    // Number of pages and page change. Checks change event.
    it('Pagination: Number of pages and page change (test of perPage, totalRows and change event)', () => {
        // There are 5 pages
        element.perPage = 10;
        element.totalRows = 50;

        const nextButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-next"]'
        );
        const previousButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-previous"]'
        );

        // The previous button should be disabled on first page
        expect(previousButton.disabled).toBeTruthy();

        for (let i = 0; i < 3; i++) {
            nextButton.click();
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
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(5);

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
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(1);
            });
    });

    /* ---- METHODS ----- */

    // first
    // Depends on totalRows and value. Checks change event.
    it('Pagination: method first', () => {
        element.totalRows = 200;
        element.value = 3;

        return Promise.resolve()
            .then(() => {
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(3);

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
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(1);
            });
    });

    // last
    // Depends on totalRows. Checks change event.
    it('Pagination: method last', () => {
        element.totalRows = 200;

        return Promise.resolve()
            .then(() => {
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(1);

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
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );

                // Based on the fact that the default value for limit is 5, there should be 10 pages
                expect(activeButton.value).toBe(10);
            });
    });

    // next
    // Depends on totalRows. Checks change event.
    it('Pagination: method next', () => {
        element.totalRows = 200;

        return Promise.resolve()
            .then(() => {
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(1);

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
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(2);
            });
    });

    // previous
    // Depends on totalRows and value. Checks change event.
    it('Pagination: method previous', () => {
        element.totalRows = 200;
        element.value = 3;

        return Promise.resolve()
            .then(() => {
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(3);

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
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(2);
            });
    });

    // goto
    // Depends on totalRows. Checks change event.
    it('Pagination: method goto', () => {
        element.totalRows = 200;

        return Promise.resolve()
            .then(() => {
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(1);

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
                const activeButton = element.shadowRoot.querySelector(
                    '.avonni-button-active'
                );
                expect(activeButton.value).toBe(4);
            });
    });
});
