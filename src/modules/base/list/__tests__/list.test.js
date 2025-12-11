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
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.loadMoreOffset).toBe(20);
            expect(element.mediaActions).toMatchObject([]);
            expect(element.mediumContainerCols).toBeUndefined();
            expect(element.nextButtonAlternativeText).toBe('Next Items');
            expect(element.previousButtonAlternativeText).toBe(
                'Previous Items'
            );
            expect(element.showCheckCounter).toBeFalsy();
            expect(element.smallContainerCols).toBeUndefined();
            expect(element.sortable).toBeFalsy();
            expect(element.sortableIconName).toBeUndefined();
            expect(element.sortableIconPosition).toBe('right');
            expect(element.strikeThroughOnCheck).toBeFalsy();
            expect(element.variant).toBe('base');
            expect(element.visibleActions).toBeUndefined();
            expect(element.visibleMediaActions).toBeUndefined();
        });

        describe('Actions', () => {
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
        });

        describe('Alternative Text', () => {
            it('AlternativeText', () => {
                element.alternativeText = 'A string alternative text';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '[data-element-id="span-alternative-text"]'
                    );
                    expect(span.textContent).toBe('A string alternative text');
                });
            });

            it('Next Button Alternative Text', () => {
                element.nextButtonAlternativeText = 'Next Items';
                element.variant = 'single-line';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="next-page-button"]'
                    );
                    expect(button.alternativeText).toBe('Next Items');
                });
            });

            it('Previous Button Alternative Text', () => {
                element.previousButtonAlternativeText = 'Previous Items';
                element.variant = 'single-line';
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="previous-page-button"]'
                    );
                    expect(button.alternativeText).toBe('Previous Items');
                });
            });
        });

        describe('Cols', () => {
            it('Cols', () => {
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
        });

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

        describe('Field Attributes', () => {
            it('Field Attributes, cols', () => {
                element.fieldAttributes = { cols: 12, largeContainerCols: 4 };

                return Promise.resolve().then(() => {
                    expect(element.fieldAttributes.cols).toBe(1);
                    expect(element.fieldAttributes.largeContainerCols).toBe(3);
                    expect(element.fieldAttributes.mediumContainerCols).toBe(1);
                    expect(element.fieldAttributes.smallContainerCols).toBe(1);
                });
            });
        });

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

            it('Image alternative text', () => {
                element.items = ITEMS;

                return Promise.resolve().then(() => {
                    const images = element.shadowRoot.querySelectorAll(
                        '[data-element-id="list-img-media"]'
                    );
                    expect(images[0].alt).toBe('Item 1');
                    expect(images[1].alt).toBe('Item 2');
                    expect(images[2].alt).toBe('Item 5');
                });
            });
        });

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

            it('Infos', () => {
                element.items = [
                    {
                        name: 'item-1',
                        infos: [
                            { label: 'Info 1', href: 'https://www.google.com' },
                            { label: 'Info 2' }
                        ]
                    }
                ];

                return Promise.resolve().then(() => {
                    const infos = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-info"]'
                    );
                    expect(infos).toHaveLength(2);
                    const firstLink = infos[0].querySelector(
                        '[data-element-id="a-info"]'
                    );
                    const firstSpan = infos[0].querySelector(
                        '[data-element-id="span-info"]'
                    );
                    expect(firstLink).toBeTruthy();
                    expect(firstLink.href).toBe('https://www.google.com/');
                    expect(firstLink.textContent).toBe('Info 1');
                    expect(firstSpan).toBeFalsy();

                    const secondLink = infos[1].querySelector(
                        '[data-element-id="a-info"]'
                    );
                    const secondSpan = infos[1].querySelector(
                        '[data-element-id="span-info"]'
                    );
                    expect(secondLink).toBeFalsy();
                    expect(secondSpan).toBeTruthy();
                    expect(secondSpan.textContent).toBe('Info 2');
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
                        },
                        {
                            label: 'Some other item',
                            name: 'someOtherName',
                            fields: [
                                { label: 'Field 2', value: 'Value 2' },
                                { label: 'Field 3', value: 'Value 3' }
                            ]
                        }
                    ];

                    const handler = jest.fn();
                    element.addEventListener('privatelayoutconnected', handler);

                    return Promise.resolve().then(() => {
                        const fields = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-output-data"]'
                        );
                        const setItemsSize = jest.fn();
                        const isResizedByParent = jest.fn();

                        // First Item
                        fields[0].dispatchEvent(
                            new CustomEvent('privatelayoutconnected', {
                                detail: {
                                    name: element.items[0].name,
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
                        const firstCall = handler.mock.calls[0][0];
                        expect(firstCall.bubbles).toBeTruthy();
                        expect(firstCall.composed).toBeTruthy();
                        expect(
                            typeof firstCall.detail.callbacks
                                .setIsResizedByParent
                        ).toBe('function');
                        expect(
                            typeof firstCall.detail.callbacks
                                .setAllFieldsItemsSize
                        ).toBe('function');
                        expect(firstCall.detail.name).toBe(
                            element.items[0].name
                        );

                        // The callback in the redispatched event is different from the original
                        firstCall.detail.callbacks.setIsResizedByParent(true);
                        expect(isResizedByParent).toHaveBeenCalledTimes(1);

                        // The setAllFieldsItemsSize callback calls setItemsSize for all layouts connected
                        firstCall.detail.callbacks.setAllFieldsItemsSize();
                        expect(setItemsSize).toHaveBeenCalledTimes(1);

                        // Second Item
                        fields[1].dispatchEvent(
                            new CustomEvent('privatelayoutconnected', {
                                detail: {
                                    name: element.items[1].name,
                                    callbacks: {
                                        setIsResizedByParent: isResizedByParent,
                                        setItemsSize
                                    }
                                },
                                bubbles: true,
                                composed: true
                            })
                        );

                        expect(isResizedByParent).toHaveBeenCalledTimes(2);

                        // The event is redispatched to the parent
                        expect(handler).toHaveBeenCalled();
                        const secondCall = handler.mock.calls[1][0];
                        expect(secondCall.bubbles).toBeTruthy();
                        expect(secondCall.composed).toBeTruthy();
                        expect(
                            typeof secondCall.detail.callbacks
                                .setIsResizedByParent
                        ).toBe('function');
                        expect(
                            typeof secondCall.detail.callbacks
                                .setAllFieldsItemsSize
                        ).toBe('function');
                        expect(secondCall.detail.name).toBe(
                            element.items[1].name
                        );

                        // The callback in the redispatched event is different from the original
                        secondCall.detail.callbacks.setIsResizedByParent(true);
                        expect(isResizedByParent).toHaveBeenCalledTimes(2);

                        // The setAllFieldsItemsSize callback calls setItemsSize for all layouts connected
                        secondCall.detail.callbacks.setAllFieldsItemsSize();
                        expect(setItemsSize).toHaveBeenCalledTimes(3);
                    });
                });

                it('The privatelayoutdisconnected event is redispatched to the parents with the new setAllFieldsItemsSize callback', () => {
                    element.items = [
                        {
                            label: 'Some item',
                            name: 'someName',
                            fields: [{ label: 'Field 1', value: 'Value 1' }]
                        },
                        {
                            label: 'Some other item',
                            name: 'someOtherName',
                            fields: [{ label: 'Field 2', value: 'Value 2' }]
                        },
                        {
                            label: 'Another item',
                            name: 'anotherName',
                            fields: [{ label: 'Field 3', value: 'Value 3' }]
                        }
                    ];
                    const handler = jest.fn();
                    element.addEventListener(
                        'privatelayoutdisconnected',
                        handler
                    );

                    return Promise.resolve().then(() => {
                        const fields = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-output-data"]'
                        );
                        const setItemsSize = jest.fn();
                        const isResizedByParent = jest.fn();

                        fields.forEach((field, index) => {
                            field.dispatchEvent(
                                new CustomEvent('privatelayoutconnected', {
                                    detail: {
                                        name: element.items[index].name,
                                        callbacks: {
                                            setIsResizedByParent:
                                                isResizedByParent,
                                            setItemsSize
                                        }
                                    },
                                    bubbles: true,
                                    composed: true
                                })
                            );
                        });

                        // Second Item disconnected
                        fields[1].dispatchEvent(
                            new CustomEvent('privatelayoutdisconnected', {
                                detail: {
                                    name: element.items[1].name
                                },
                                bubbles: true,
                                composed: true
                            })
                        );

                        expect(handler).toHaveBeenCalled();
                        const firstCall = handler.mock.calls[0][0];
                        expect(firstCall.bubbles).toBeTruthy();
                        expect(firstCall.composed).toBeTruthy();
                        expect(
                            typeof firstCall.detail.callbacks
                                .setAllFieldsItemsSize
                        ).toBe('function');

                        // The setAllFieldsItemsSize callback calls setItemsSize for all layouts connected
                        firstCall.detail.callbacks.setAllFieldsItemsSize();
                        expect(setItemsSize).toHaveBeenCalledTimes(2);
                    });
                });
            });

            describe('Tooltip Text', () => {
                it('Defaults to label if not provided', () => {
                    element.items = [
                        {
                            label: 'Item without tooltipText',
                            name: 'item-without-tooltip'
                        }
                    ];

                    return Promise.resolve().then(() => {
                        const itemTooltip = element.shadowRoot.querySelector(
                            '[data-element-id="div-item-tooltip"]'
                        );
                        expect(itemTooltip.title).toBe(
                            'Item without tooltipText'
                        );
                    });
                });

                it('Uses provided tooltipText', () => {
                    element.items = [
                        {
                            label: 'Item with tooltipText',
                            name: 'item-with-tooltip',
                            tooltipText: 'Custom tooltip text'
                        }
                    ];

                    return Promise.resolve().then(() => {
                        const itemTooltip = element.shadowRoot.querySelector(
                            '[data-element-id="div-item-tooltip"]'
                        );
                        expect(itemTooltip.title).toBe('Custom tooltip text');
                    });
                });
            });

            it('Description', () => {
                element.items = [
                    {
                        name: 'item-1',
                        description: '<b>Content</b>'
                    },
                    {
                        name: 'item-2',
                        description: 'Content'
                    }
                ];

                return Promise.resolve().then(() => {
                    const itemdDescriptions =
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="lightning-formatted-rich-text-description"]'
                        );
                    expect(itemdDescriptions).toHaveLength(2);
                    expect(itemdDescriptions[0].value).toBe('<b>Content</b>');
                    expect(itemdDescriptions[0].title).toBe('Content');
                    expect(itemdDescriptions[1].value).toBe('Content');
                    expect(itemdDescriptions[1].title).toBe('Content');
                });
            });
        });

        describe('Label', () => {
            it('Label', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

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

        describe('Show Check Count', () => {
            it('ShowCheckCount', () => {
                element.items = ITEMS;
                element.label = 'List';
                element.showCheckCounter = true;
                element.variant = 'check-list';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );
                    expect(label.innerHTML).toBe('List (2/5)');
                });
            });
        });

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

            it('check-list', () => {
                element.items = ITEMS;
                element.variant = 'check-list';

                return Promise.resolve().then(() => {
                    const backButton = element.shadowRoot.querySelector(
                        '[data-element-id="previous-page-button"]'
                    );
                    const nextButton = element.shadowRoot.querySelector(
                        '[data-element-id="next-page-button"]'
                    );
                    const checkboxes = Array.from(
                        element.shadowRoot.querySelectorAll(
                            '[data-element-id="item-input-checkbox"]'
                        )
                    );
                    const checkedItems = checkboxes.slice(0, 2);
                    const uncheckedItems = checkboxes.slice(
                        2,
                        checkboxes.length
                    );

                    expect(backButton).toBeFalsy();
                    expect(nextButton).toBeFalsy();

                    expect(checkboxes).toHaveLength(5);
                    checkedItems.forEach((checkbox) => {
                        expect(checkbox.checked).toBeTruthy();
                    });
                    uncheckedItems.forEach((checkbox) => {
                        expect(checkbox.checked).toBeFalsy();
                    });
                });
            });
        });
    });

    describe('Methods', () => {
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

    describe('Events', () => {
        describe('Actionclick', () => {
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
        });

        describe('Itemcheck', () => {
            it('Fired on click', () => {
                const handler = jest.fn();
                element.addEventListener('itemcheck', handler);
                element.items = ITEMS;
                element.variant = 'check-list';

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="item-input-checkbox"]'
                    );
                    items[2].click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                        ITEMS[2]
                    );
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        ITEMS[2].name
                    );
                    expect(
                        handler.mock.calls[0][0].detail.checked
                    ).toBeTruthy();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });

            it('Fired with keyboard', () => {
                const handler = jest.fn();
                element.addEventListener('itemcheck', handler);
                element.items = ITEMS;
                element.variant = 'check-list';

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="item-input-checkbox"]'
                    );
                    const event = new CustomEvent('keydown');
                    event.key = 'Enter';
                    items[2].dispatchEvent(event);
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                        ITEMS[2]
                    );
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        ITEMS[2].name
                    );
                    expect(
                        handler.mock.calls[0][0].detail.checked
                    ).toBeTruthy();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });

            it('Itemclick not fired for click on checkbox', () => {
                const handler = jest.fn();
                element.addEventListener('itemclick', handler);
                element.items = ITEMS;
                element.variant = 'check-list';

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="item-input-checkbox"]'
                    );
                    items[2].click();
                    expect(handler).not.toHaveBeenCalled();
                });
            });
        });

        describe('Itemclick', () => {
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

            it('Itemcheck is also fired if variant is check-list', () => {
                const handler = jest.fn();
                element.addEventListener('itemcheck', handler);
                element.items = ITEMS;
                element.variant = 'check-list';

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="li-item"]'
                    );
                    items[2].dispatchEvent(new CustomEvent('click'));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.item).toMatchObject(
                        ITEMS[2]
                    );
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        ITEMS[2].name
                    );
                    expect(
                        handler.mock.calls[0][0].detail.checked
                    ).toBeTruthy();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                });
            });
        });

        describe('Itemmousedown', () => {
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
        });

        describe('Itemmouseup', () => {
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
        });

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
                            new CustomEvent('privatecardrendered', {
                                bubbles: true
                            })
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

        describe('Mediaactionclick', () => {
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
        });

        describe('Privatelistconnected', () => {
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
                element.addEventListener(
                    'privatelistconnected',
                    connectedHandler
                );

                document.body.appendChild(element);
                expect(connectedHandler).toHaveBeenCalled();
                const connectedCall = connectedHandler.mock.calls[0][0];
                expect(connectedCall.bubbles).toBeTruthy();
                expect(connectedCall.composed).toBeTruthy();
                expect(connectedCall.cancelable).toBeFalsy();
                expect(typeof connectedCall.detail.name).toBe('string');
                expect(
                    typeof connectedCall.detail.callbacks.setDisplayWidth
                ).toBe('function');
            });
        });

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
                    expect(call.detail.previousIndexes).toEqual([1]);
                    expect(call.detail.newIndexes).toEqual([2]);
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
