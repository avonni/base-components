import { createElement } from 'lwc';
import { ITEMS, ITEMS_WITHOUT_ICONS, ACTIONS, ACTION } from './data';
import { callObserver } from 'c/resizeObserver';
import List from 'c/list';

// Not tested:
// Mouse move and all actions related to it (dragging the item and reorganizing the list)
// Touch events (we can't artificially give a touch position to save in _initialY)

let element = Element.prototype;
element.scrollTo = jest.fn();
element.scrollBy = jest.fn();

describe('List', () => {
    beforeEach(() => {
        element = createElement('base-list', {
            is: List
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
    });

    /*
     * -------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toMatchObject([]);
            expect(element.alternativeText).toBeUndefined();
            expect(element.cols).toBe(1);
            expect(element.enableInfiniteLoading).toBeFalsy();
            expect(element.fieldAttributes).toEqual({
                cols: 12,
                largeContainerCols: 4,
                mediumContainerCols: 6,
                smallContainerCols: 12,
                variant: 'standard'
            });
            expect(element.isLoading).toBeFalsy();
            expect(element.items).toMatchObject([]);
            expect(element.imageAttributes).toEqual({
                fallbackSrc: null,
                position: 'left',
                size: 'large',
                cropPositionX: 50,
                cropPositionY: 50,
                cropFit: 'cover'
            });
            expect(element.label).toBeUndefined();
            expect(element.largeContainerCols).toBeUndefined();
            expect(element.loadMoreOffset).toBe(20);
            expect(element.mediaActions).toMatchObject([]);
            expect(element.mediumContainerCols).toBeUndefined();
            expect(element.smallContainerCols).toBeUndefined();
            expect(element.sortable).toBeFalsy();
            expect(element.sortableIconName).toBeUndefined();
            expect(element.sortableIconPosition).toBe('right');
            expect(element.variant).toBe('base');
            expect(element.visibleActions).toBeUndefined();
            expect(element.visibleMediaActions).toBeUndefined();
        });

        // actions
        it('Actions', () => {
            element.items = ITEMS;
            element.actions = ACTIONS;

            return Promise.resolve().then(() => {
                const primitiveActions = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-actions"]'
                );
                expect(primitiveActions).not.toBeNull();
            });
        });

        // alternative-text
        it('AlternativeText', () => {
            element.alternativeText = 'A string alternative text';

            return Promise.resolve().then(() => {
                const span = element.shadowRoot.querySelector(
                    '[data-element-id="span-alternative-text"]'
                );
                expect(span.textContent).toBe('A string alternative text');
            });
        });

        // cols
        it('cols', () => {
            element.items = ITEMS;
            element.cols = 3;
            element.smallContainerCols = 6;
            element.mediumContainerCols = 4;
            element.largeContainerCols = 2;

            return Promise.resolve().then(() => {
                const item = element.shadowRoot.querySelector(
                    '[data-element-id="li-item"]'
                );
                expect(item.size).toBe(4);
                expect(item.smallContainerSize).toBe(2);
                expect(item.mediumContainerSize).toBe(3);
                expect(item.largeContainerSize).toBe(6);
            });
        });

        // divider
        describe('Divider', () => {
            it('none', () => {
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const divItem = element.shadowRoot.querySelector(
                        '[data-element-id="div-item"]'
                    );
                    const listElem = element.shadowRoot.querySelector(
                        '[data-element-id="list-element"]'
                    );
                    expect(listElem.classList).toContain(
                        'avonni-list__vertical-compact'
                    );
                    expect(divItem.className).toEqual(
                        'slds-template__container avonni-list__item-divider_none'
                    );
                });
            });
            it('around', () => {
                element.items = ITEMS;
                element.divider = 'around';

                return Promise.resolve().then(() => {
                    const divItem = element.shadowRoot.querySelector(
                        '[data-element-id="div-item"]'
                    );
                    const listElem = element.shadowRoot.querySelector(
                        '[data-element-id="list-element"]'
                    );
                    expect(divItem.classList).toContain(
                        'avonni-list__item-divider_around'
                    );
                    expect(listElem.classList).not.toContain(
                        'avonni-list__vertical-compact'
                    );
                });
            });
            it('top', () => {
                element.items = ITEMS;
                element.divider = 'top';
                element.smallContainerCols = 6;

                return Promise.resolve().then(() => {
                    const divItem = element.shadowRoot.querySelector(
                        '[data-element-id="div-item"]'
                    );
                    const listElem = element.shadowRoot.querySelector(
                        '[data-element-id="list-element"]'
                    );
                    expect(listElem.classList).toContain(
                        'avonni-list__vertical-compact'
                    );
                    expect(divItem.classList).toContain(
                        'avonni-list__item-divider_top'
                    );
                });
            });
            it('bottom', () => {
                element.items = ITEMS;
                element.divider = 'bottom';

                return Promise.resolve().then(() => {
                    const divItem = element.shadowRoot.querySelector(
                        '[data-element-id="div-item"]'
                    );
                    const listElem = element.shadowRoot.querySelector(
                        '[data-element-id="list-element"]'
                    );
                    expect(listElem.classList).toContain(
                        'avonni-list__vertical-compact'
                    );
                    expect(divItem.classList).toContain(
                        'avonni-list__item-divider_bottom'
                    );
                });
            });
        });

        // field-attributes
        it('Field Attributes, cols', () => {
            element.fieldAttributes = { cols: 12, largeContainerCols: 4 };

            return Promise.resolve().then(() => {
                expect(element.fieldAttributes.cols).toBe(1);
                expect(element.fieldAttributes.largeContainerCols).toBe(3);
                expect(element.fieldAttributes.mediumContainerCols).toBe(1);
                expect(element.fieldAttributes.smallContainerCols).toBe(1);
            });
        });

        // images
        describe('Images', () => {
            it('Images are present', () => {
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const images = element.shadowRoot.querySelectorAll(
                        '[data-element-id="list-img-media"]'
                    );
                    expect(images).toHaveLength(3);
                });
            });

            it('size small', () => {
                element.items = ITEMS;
                element.imageAttributes = { size: 'small' };

                return Promise.resolve().then(() => {
                    const images = element.shadowRoot.querySelectorAll(
                        '[data-element-id="list-img"]'
                    );
                    expect(images[0].style['min-width']).toBe('48px');
                    expect(images[1].style['min-width']).toBe('48px');
                    expect(images[2].style['min-width']).toBe('48px');
                });
            });

            it('width medium', () => {
                element.items = ITEMS;
                element.imageAttributes = { size: 'medium' };

                return Promise.resolve().then(() => {
                    const images = element.shadowRoot.querySelectorAll(
                        '[data-element-id="list-img"]'
                    );
                    expect(images[0].style['min-width']).toBe('72px');
                    expect(images[1].style['min-width']).toBe('72px');
                    expect(images[2].style['min-width']).toBe('72px');
                });
            });

            it('width large', () => {
                element.items = ITEMS;
                element.imageAttributes = { size: 'large' };

                return Promise.resolve().then(() => {
                    const images = element.shadowRoot.querySelectorAll(
                        '[data-element-id="list-img"]'
                    );
                    expect(images[0].style['min-width']).toBe('128px');
                    expect(images[1].style['min-width']).toBe('128px');
                    expect(images[2].style['min-width']).toBe('128px');
                });
            });

            it('fallback src', () => {
                element.items = ITEMS;
                const fallbackSrc =
                    'https://ik.imagekit.io/demo/img/image10.jpeg?tr=w-400,h-300';
                element.imageAttributes = { fallbackSrc };

                return Promise.resolve()
                    .then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="list-img-media"]'
                        );
                        image.dispatchEvent(new CustomEvent('error'));
                    })
                    .then(() => {
                        const image = element.shadowRoot.querySelector(
                            '[data-element-id="list-img-media"]'
                        );
                        expect(image.src).toBe(fallbackSrc);
                    });
            });

            it('position = overlay, text-color', () => {
                element.items = ITEMS;
                element.imageAttributes = {
                    position: 'overlay'
                };

                return Promise.resolve().then(() => {
                    const bodyColor = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-list-item-body-text-color"]'
                    );

                    expect(bodyColor.classList).toContain(
                        'avonni-list__item-text-color_inverse'
                    );
                });
            });
        });

        // items
        describe('Items', () => {
            it('Items', () => {
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="li-item"]'
                    );
                    const itemsLabels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-item-label"]'
                    );
                    expect(items).toHaveLength(5);
                    expect(itemsLabels).toHaveLength(5);

                    items.forEach((item, index) => {
                        const originalItem = ITEMS[index];

                        expect(item.dataset.index).toBe(index.toString());
                        expect(item.ariaLabel).toBe(originalItem.label);
                    });

                    itemsLabels.forEach((item, index) => {
                        const originalItem = ITEMS[index];

                        expect(item.textContent).toBe(originalItem.label);
                    });

                    [0, 2].forEach((index) => {
                        const item = items[index];
                        const avatar = item.querySelector(
                            '[data-element-id="avonni-avatar"]'
                        );
                        expect(avatar.fallbackIconName).toBe(
                            ITEMS[index].avatar.fallbackIconName
                        );
                        expect(avatar.src).toBe(ITEMS[index].avatar.src);
                    });

                    [0, 1, 2, 4].forEach((index) => {
                        const item = items[index];
                        const avatar = item.querySelector(
                            '[data-element-id="avonni-avatar"]'
                        );
                        expect(avatar).toBeTruthy();
                    });
                    const item = items[3];
                    const avatar = item.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatar).toBeNull();
                });
            });

            describe('Fields', () => {
                it('Fields resize observer is centralized in list', () => {
                    element.items = [
                        {
                            label: 'Some item',
                            name: 'someName',
                            fields: [
                                { label: 'Field 1', value: 'Value 1' },
                                { label: 'Field 2', value: 'Value 2' }
                            ]
                        }
                    ];

                    return Promise.resolve().then(() => {
                        const fields = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-output-data"]'
                        );
                        expect(fields).toHaveLength(2);
                        const firstSetItems = jest.fn();
                        const secondSetItems = jest.fn();

                        // The callbacks are saved
                        const isResizedByParent = jest.fn();
                        fields[0].dispatchEvent(
                            new CustomEvent('privatelayoutconnected', {
                                detail: {
                                    name: '1',
                                    callbacks: {
                                        setIsResizedByParent: isResizedByParent,
                                        setItemsSize: firstSetItems
                                    }
                                },
                                bubbles: true,
                                composed: true
                            })
                        );
                        expect(isResizedByParent).toHaveBeenCalledTimes(1);
                        expect(isResizedByParent).toHaveBeenCalledWith(true);
                        expect(firstSetItems).not.toHaveBeenCalled();

                        fields[1].dispatchEvent(
                            new CustomEvent('privatelayoutconnected', {
                                detail: {
                                    name: '2',
                                    callbacks: {
                                        setIsResizedByParent: isResizedByParent,
                                        setItemsSize: secondSetItems
                                    }
                                },
                                bubbles: true,
                                composed: true
                            })
                        );
                        expect(isResizedByParent).toHaveBeenCalledTimes(2);
                        expect(secondSetItems).not.toHaveBeenCalled();

                        // The callbacks are called when the resize observer is called
                        callObserver();
                        expect(firstSetItems).toHaveBeenCalledTimes(1);
                        expect(secondSetItems).toHaveBeenCalledTimes(1);

                        // The callbacks are not called anymore after the layouts are disconnected
                        fields.forEach((field, index) => {
                            field.dispatchEvent(
                                new CustomEvent('privatelayoutdisconnected', {
                                    detail: {
                                        name: (index + 1).toString()
                                    },
                                    bubbles: true,
                                    composed: true
                                })
                            );
                        });
                        callObserver();
                        expect(firstSetItems).toHaveBeenCalledTimes(1);
                        expect(secondSetItems).toHaveBeenCalledTimes(1);
                    });
                });

                it('The layout event is redispatched to the parents to let them centralize the resizing', () => {
                    element.items = [
                        {
                            label: 'Some item',
                            name: 'someName',
                            fields: [{ label: 'Field 1', value: 'Value 1' }]
                        }
                    ];

                    const handler = jest.fn();
                    element.addEventListener('privatelayoutconnected', handler);

                    return Promise.resolve().then(() => {
                        const field = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-output-data"]'
                        );
                        const setItemsSize = jest.fn();
                        const isResizedByParent = jest.fn();
                        field.dispatchEvent(
                            new CustomEvent('privatelayoutconnected', {
                                detail: {
                                    name: 'first',
                                    callbacks: {
                                        setIsResizedByParent: isResizedByParent,
                                        setItemsSize
                                    }
                                },
                                bubbles: true,
                                composed: true
                            })
                        );
                        expect(isResizedByParent).toHaveBeenCalledTimes(1);

                        // The event is redispatched to the parent
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeTruthy();
                        expect(call.composed).toBeTruthy();
                        expect(
                            typeof call.detail.callbacks.setIsResizedByParent
                        ).toBe('function');
                        expect(typeof call.detail.callbacks.setItemsSize).toBe(
                            'function'
                        );
                        expect(call.detail.name).toBe('first');

                        // The callback in the redispatched event is different from the original
                        call.detail.callbacks.setIsResizedByParent(true);
                        expect(isResizedByParent).toHaveBeenCalledTimes(1);
                    });
                });
            });
        });

        // label
        it('Label', () => {
            element.label = 'A string label';

            return Promise.resolve().then(() => {
                const label = element.shadowRoot.querySelector(
                    '[data-element-id="label"]'
                );
                expect(label.textContent).toBe('A string label');
            });
        });

        // media-actions
        describe('Media actions', () => {
            it('Media Actions', () => {
                element.items = ITEMS;
                element.mediaActions = ACTIONS;

                return Promise.resolve().then(() => {
                    const primitiveMediaActions =
                        element.shadowRoot.querySelector(
                            '[data-element-id="primitive-media-actions"]'
                        );
                    expect(primitiveMediaActions).not.toBeNull();
                });
            });
            it('Media Actions, without images', () => {
                element.items = ITEMS_WITHOUT_ICONS;
                element.mediaActions = ACTION;

                return Promise.resolve().then(() => {
                    const primitiveMediaActions =
                        element.shadowRoot.querySelector(
                            '[data-element-id="primitive-media-actions"]'
                        );
                    expect(primitiveMediaActions).toBeNull();
                });
            });
        });

        // sortable
        describe('Sortable', () => {
            it('false', () => {
                element.sortable = false;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );

                    // Item is clicked on
                    items[1].dispatchEvent(new CustomEvent('mousedown'));
                    expect(items[1].classList).not.toContain(
                        'avonni-list__item-sortable_dragged'
                    );
                });
            });

            it('true', () => {
                element.divider = 'around';
                element.items = ITEMS;
                element.sortable = true;

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    const divider = element.shadowRoot.querySelector(
                        '[data-element-id="div-item"]'
                    );

                    // Item is clicked on
                    items[1].dispatchEvent(new CustomEvent('mousedown'));
                    expect(items[1].classList).not.toContain(
                        'avonni-list__item-sortable_dragged'
                    );

                    // The avonni-list__item-sortable_dragged is added the selected item moved, then removed when the item is released.

                    // Item is dropped
                    items[1].dispatchEvent(new CustomEvent('mouseup'));
                    expect(items[1].classList).not.toContain(
                        'avonni-list__item-sortable_dragged'
                    );

                    expect(divider.classList).toContain(
                        'avonni-list__item-divider_sortable'
                    );
                });
            });
        });

        // sortable-icon-name
        describe('Sortable icon name', () => {
            it('sortable = false', () => {
                element.sortableIconName = 'utility:apps';
                element.sortable = false;
                element.items = ITEMS_WITHOUT_ICONS;

                return Promise.resolve().then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-sort-right"]'
                    );
                    expect(icons).toHaveLength(0);
                });
            });
            it('sortable = true', () => {
                element.sortableIconName = 'utility:apps';
                element.sortable = true;
                element.items = ITEMS_WITHOUT_ICONS;

                return Promise.resolve().then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-sort-right"]'
                    );
                    icons.forEach((icon) => {
                        expect(icon.iconName).toBe('utility:apps');
                    });
                    expect(icons).toHaveLength(4);
                });
            });
        });

        // sortable-icon-position
        describe('Sortable icon position', () => {
            it('right', () => {
                element.sortableIconName = 'utility:drag_and_drop';
                element.sortable = true;
                element.sortableIconPosition = 'right';
                element.items = ITEMS_WITHOUT_ICONS;

                return Promise.resolve().then(() => {
                    const iconsRight = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-sort-right"]'
                    );
                    const iconsLeft = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-sort-left"]'
                    );
                    expect(iconsLeft).toHaveLength(0);
                    expect(iconsRight).toHaveLength(4);
                });
            });
            it('left', () => {
                element.sortableIconName = 'utility:apps';
                element.sortable = true;
                element.sortableIconPosition = 'left';
                element.items = ITEMS_WITHOUT_ICONS;

                return Promise.resolve().then(() => {
                    const iconsRight = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-sort-right"]'
                    );
                    const iconsLeft = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-sort-left"]'
                    );
                    expect(iconsRight).toHaveLength(0);
                    expect(iconsLeft).toHaveLength(4);
                });
            });
        });

        // variant
        describe('Variant', () => {
            it('base', () => {
                return Promise.resolve().then(() => {
                    const backButton = element.shadowRoot.querySelector(
                        '[data-element-id="previous-page-button"]'
                    );
                    const nextButton = element.shadowRoot.querySelector(
                        '[data-element-id="next-page-button"]'
                    );
                    expect(backButton).toBeFalsy();
                    expect(nextButton).toBeFalsy();
                });
            });

            it('single-line', () => {
                element.variant = 'single-line';

                return Promise.resolve().then(() => {
                    const backButton = element.shadowRoot.querySelector(
                        '[data-element-id="previous-page-button"]'
                    );
                    const nextButton = element.shadowRoot.querySelector(
                        '[data-element-id="next-page-button"]'
                    );
                    expect(backButton).toBeTruthy();
                    expect(nextButton).toBeTruthy();
                });
            });
        });
    });

    /*
     * -------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    describe('Methods', () => {
        // getItemPosition
        // Depends on items
        it('getItemPosition()', () => {
            element.items = ITEMS;
            const mockPosition = {
                left: 100,
                right: 20,
                bottom: 66,
                top: 39,
                x: 100,
                y: 39,
                height: 288,
                width: 503
            };

            return Promise.resolve().then(() => {
                const item = element.shadowRoot.querySelector(
                    `[data-element-id="li-item"][data-name="${ITEMS[1].name}"]`
                );
                const spy = jest
                    .spyOn(item, 'getBoundingClientRect')
                    .mockImplementation(() => {
                        return mockPosition;
                    });
                const position = element.getItemPosition(ITEMS[1].name);
                expect(spy).toHaveBeenCalled();
                expect(position).toEqual(mockPosition);
            });
        });

        // reset
        // Depends on items, sortable and the keyboard reorder
        it('reset()', () => {
            element.items = ITEMS;
            element.sortable = true;

            return Promise.resolve()
                .then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );

                    // Reorder
                    const spaceEvent = new CustomEvent('keydown');
                    spaceEvent.key = ' ';
                    const downEvent = new CustomEvent('keydown');
                    downEvent.key = 'ArrowDown';
                    items[1].dispatchEvent(spaceEvent);
                    items[1].dispatchEvent(downEvent);
                    items[1].dispatchEvent(spaceEvent);
                })
                .then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    const label = items[1].querySelector(
                        '[data-element-id="div-item-label"]'
                    );
                    expect(label.textContent).toBe(ITEMS[2].label);
                    element.reset();
                })
                .then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    const label = items[1].querySelector(
                        '[data-element-id="div-item-label"]'
                    );
                    expect(label.textContent).toBe(ITEMS[1].label);
                });
        });
    });

    /*
     * -------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    describe('Events', () => {
        // actionclick
        it('actionclick', () => {
            const handler = jest.fn();
            element.addEventListener('actionclick', handler);
            element.items = ITEMS;
            element.actions = ACTIONS;

            return Promise.resolve().then(() => {
                const primitiveActions = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-actions"]'
                );
                primitiveActions.dispatchEvent(
                    new CustomEvent('actionclick', {
                        detail: {
                            name: ACTIONS[0].name
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                    ITEMS[0]
                );
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    ACTIONS[0].name
                );
                expect(handler.mock.calls[0][0].detail.targetName).toBe(
                    ITEMS[0].name
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        it('mediaactionclick', () => {
            const handler = jest.fn();
            element.addEventListener('mediaactionclick', handler);
            element.items = ITEMS;
            element.mediaActions = ACTIONS;

            return Promise.resolve().then(() => {
                const primitiveActions = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-media-actions"]'
                );
                primitiveActions.dispatchEvent(
                    new CustomEvent('actionclick', {
                        detail: {
                            name: ACTIONS[0].name
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                    ITEMS[0]
                );
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    ACTION[0].name
                );
                expect(handler.mock.calls[0][0].detail.targetName).toBe(
                    ITEMS[0].name
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        // itemclick
        describe('itemclick', () => {
            it('Fired on click', () => {
                const handler = jest.fn();
                element.addEventListener('itemclick', handler);
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );

                    items[2].dispatchEvent(new CustomEvent('click'));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                        ITEMS[2]
                    );
                    expect(
                        handler.mock.calls[0][0].detail.bounds
                    ).not.toBeUndefined();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        ITEMS[2].name
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });

            it('Fired with keyboard', () => {
                const handler = jest.fn();
                element.addEventListener('itemclick', handler);
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );

                    const event = new CustomEvent('keydown');
                    event.key = 'Enter';
                    items[1].dispatchEvent(event);
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                        ITEMS[1]
                    );
                    expect(
                        handler.mock.calls[0][0].detail.bounds
                    ).not.toBeUndefined();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        ITEMS[1].name
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });
        });

        // itemmousedown
        it('itemmousedown', () => {
            const handler = jest.fn();
            element.addEventListener('itemmousedown', handler);
            element.items = ITEMS;

            return Promise.resolve().then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );

                const event = new CustomEvent('mousedown');
                event.button = 0;
                items[2].dispatchEvent(event);
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                    ITEMS[2]
                );
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    ITEMS[2].name
                );
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        // itemmouseup
        it('itemmouseup', () => {
            const handler = jest.fn();
            element.addEventListener('itemmouseup', handler);
            element.items = ITEMS;

            return Promise.resolve().then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-item"]'
                );

                const event = new CustomEvent('mouseup');
                event.button = 0;
                items[1].dispatchEvent(event);
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                    ITEMS[1]
                );
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    ITEMS[1].name
                );
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        // loadmore
        describe('loadmore', () => {
            it('Not fired by default', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.enableInfiniteLoading = false;

                return Promise.resolve().then(() => {
                    expect(handler).not.toHaveBeenCalled();
                });
            });

            it('Fired on first load if there are no items', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.enableInfiniteLoading = true;

                return Promise.resolve().then(() => {
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('Fired if there is room after all the cards have been rendered', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.enableInfiniteLoading = true;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="list-container"]'
                    );
                    jest.spyOn(
                        container,
                        'scrollHeight',
                        'get'
                    ).mockReturnValue(100);
                    jest.spyOn(
                        container,
                        'clientHeight',
                        'get'
                    ).mockReturnValue(100);
                    container.scrollTop = 0;

                    const cards = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-card"]'
                    );
                    cards.forEach((card) => {
                        card.dispatchEvent(
                            new CustomEvent('privatecardrendered')
                        );
                    });
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('Not fired if there is no room left after all the cards have been rendered', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.enableInfiniteLoading = true;
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="list-container"]'
                    );
                    jest.spyOn(
                        container,
                        'scrollHeight',
                        'get'
                    ).mockReturnValue(200);
                    jest.spyOn(
                        container,
                        'clientHeight',
                        'get'
                    ).mockReturnValue(100);
                    container.scrollTop = 0;

                    const cards = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-card"]'
                    );
                    cards.forEach((card) => {
                        card.dispatchEvent(
                            new CustomEvent('privatecardrendered')
                        );
                    });
                    expect(handler).not.toHaveBeenCalled();
                });
            });

            it('Fired when scrolling to the bottom of the list', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);
                element.enableInfiniteLoading = true;
                element.items = ITEMS;
                element.loadMoreOffset = 30;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="list-container"]'
                    );
                    jest.spyOn(
                        container,
                        'scrollHeight',
                        'get'
                    ).mockReturnValue(200);
                    jest.spyOn(
                        container,
                        'clientHeight',
                        'get'
                    ).mockReturnValue(100);
                    container.scrollTop = 0;

                    const cards = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-card"]'
                    );
                    cards.forEach((card) => {
                        card.dispatchEvent(
                            new CustomEvent('privatecardrendered')
                        );
                    });

                    container.scrollTop = 80;
                    container.dispatchEvent(new CustomEvent('scroll'));
                    expect(handler).toHaveBeenCalled();
                });
            });

            describe('Single line variant', () => {
                it('Fired if there is room for more items on first load', () => {
                    element.enableInfiniteLoading = true;
                    element.cols = 3;
                    element.items = ITEMS.slice(0, 2);

                    const handler = jest.fn();
                    element.addEventListener('loadmore', handler);

                    element.variant = 'single-line';
                    expect(handler).toHaveBeenCalled();
                });

                it('Not fired if there is no room for more items on first load', () => {
                    element.enableInfiniteLoading = true;
                    element.cols = 2;
                    element.items = ITEMS.slice(0, 2);

                    const handler = jest.fn();
                    element.addEventListener('loadmore', handler);

                    element.variant = 'single-line';
                    expect(handler).not.toHaveBeenCalled();
                });

                it('Fired on next page click', () => {
                    element.enableInfiniteLoading = true;
                    element.items = ITEMS.slice(0, 2);
                    element.variant = 'single-line';

                    const handler = jest.fn();
                    element.addEventListener('loadmore', handler);

                    return Promise.resolve().then(() => {
                        const nextButton = element.shadowRoot.querySelector(
                            '[data-element-id="next-page-button"]'
                        );
                        nextButton.click();
                        expect(handler).not.toHaveBeenCalled();
                        nextButton.click();
                        expect(handler).toHaveBeenCalled();
                    });
                });

                it('Fired on layout size change', () => {
                    element.enableInfiniteLoading = true;
                    element.items = ITEMS.slice(0, 2);
                    element.variant = 'single-line';
                    element.largeContainerCols = 3;

                    const handler = jest.fn();
                    element.addEventListener('loadmore', handler);

                    return Promise.resolve().then(() => {
                        const layout = element.shadowRoot.querySelector(
                            '[data-element-id="list-element"]'
                        );
                        layout.dispatchEvent(
                            new CustomEvent('sizechange', {
                                detail: {
                                    width: 'large'
                                }
                            })
                        );
                        expect(handler).toHaveBeenCalled();
                    });
                });
            });
        });

        // privatelistconnected and privatelistdisconnected
        it('privatelistconnected', () => {
            const disconnectedHandler = jest.fn();
            element.addEventListener(
                'privatelistdisconnected',
                disconnectedHandler
            );

            while (document.body.firstChild) {
                document.body.removeChild(document.body.firstChild);
            }
            element = createElement('base-list', {
                is: List
            });

            expect(disconnectedHandler).toHaveBeenCalled();
            const disconnectedCall = disconnectedHandler.mock.calls[0][0];
            expect(disconnectedCall.bubbles).toBeTruthy();
            expect(disconnectedCall.composed).toBeTruthy();
            expect(disconnectedCall.cancelable).toBeFalsy();
            expect(typeof disconnectedCall.detail.name).toBe('string');

            const connectedHandler = jest.fn();
            element.addEventListener('privatelistconnected', connectedHandler);

            document.body.appendChild(element);
            expect(connectedHandler).toHaveBeenCalled();
            const connectedCall = connectedHandler.mock.calls[0][0];
            expect(connectedCall.bubbles).toBeTruthy();
            expect(connectedCall.composed).toBeTruthy();
            expect(connectedCall.cancelable).toBeFalsy();
            expect(typeof connectedCall.detail.name).toBe('string');
            expect(typeof connectedCall.detail.callbacks.setDisplayWidth).toBe(
                'function'
            );
        });

        // reorder
        describe('reorder', () => {
            it('Fired with keyboard', () => {
                const newOrder = [
                    ITEMS[0],
                    ITEMS[2],
                    ITEMS[1],
                    ITEMS[3],
                    ITEMS[4]
                ];
                const handler = jest.fn();
                element.addEventListener('reorder', handler);
                element.items = ITEMS;
                element.sortable = true;

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );

                    // Start dragging
                    const spaceEvent = new CustomEvent('keydown');
                    spaceEvent.key = ' ';
                    items[1].dispatchEvent(spaceEvent);

                    // Move the item up and down
                    const upDownEvent = new CustomEvent('keydown');
                    upDownEvent.key = 'ArrowDown';
                    items[1].dispatchEvent(upDownEvent);
                    items[1].dispatchEvent(upDownEvent);
                    upDownEvent.key = 'ArrowUp';
                    items[1].dispatchEvent(upDownEvent);

                    expect(items[2].dataset.moved).toEqual('keyboard-moved');

                    // Stop dragging
                    items[1].dispatchEvent(spaceEvent);

                    expect(handler).toHaveBeenCalledTimes(1);
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.items).toMatchObject(newOrder);
                    expect(call.detail.previousIndex).toBe(1);
                    expect(call.detail.newIndex).toBe(2);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
            });

            it('Cancel a move with escape key', () => {
                const handler = jest.fn();
                element.addEventListener('reorder', handler);
                element.items = ITEMS;
                element.sortable = true;

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );

                    // Start dragging
                    const spaceEvent = new CustomEvent('keydown');
                    spaceEvent.key = ' ';
                    items[1].dispatchEvent(spaceEvent);

                    // Move the item
                    const upDownEvent = new CustomEvent('keydown');
                    upDownEvent.key = 'ArrowDown';
                    items[1].dispatchEvent(upDownEvent);
                    items[1].dispatchEvent(upDownEvent);

                    // Cancel
                    const escEvent = new CustomEvent('keydown');
                    escEvent.key = 'Escape';
                    items[1].dispatchEvent(escEvent);

                    expect(handler).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});
