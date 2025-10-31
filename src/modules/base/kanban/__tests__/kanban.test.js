import { createElement } from 'lwc';
import Kanban from '../kanban';
import {
    ACTIONS,
    CARD_ATTRIBUTES,
    GROUP_VALUES,
    RECORDS,
    SUMMARIZE_ATTRIBUTES
} from './data';

let element;
describe('Kanban', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-kanban', {
            is: Kanban
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toMatchObject([]);
            expect(element.cardAttributes).toMatchObject({});
            expect(element.disableColumnDragAndDrop).toBeFalsy();
            expect(element.disableItemDragAndDrop).toBeFalsy();
            expect(element.groupFieldName).toBeUndefined();
            expect(element.groupValues).toMatchObject([]);
            expect(element.hideHeader).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.keyField).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.records).toMatchObject([]);
            expect(element.subGroupFieldName).toBeUndefined();
            expect(element.summarizeAttributes).toMatchObject({});
            expect(element.variant).toBe('base');
        });

        describe('disableItemDragAndDrop', () => {
            it('Passed to the component', () => {
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = RECORDS;
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;
                element.disableItemDragAndDrop = true;

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    const tile = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban-tile"]'
                    );
                    tile.dispatchEvent(new MouseEvent('mousedown'));
                    expect(tile.classList).not.toContain(
                        'avonni-kanban__dragged'
                    );
                });
            });
        });

        describe('drag and drop', () => {
            it('group', () => {
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = RECORDS;
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;
                element.variant = 'base';

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    const group = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__group_header"]'
                    );

                    group.dispatchEvent(new MouseEvent('mousedown'));

                    // mousemove is handled on the kanban, not the group
                    group.parentElement.parentElement.dispatchEvent(
                        new MouseEvent('mousemove')
                    );

                    expect(group.parentElement.classList).toContain(
                        'avonni-kanban__dragged_group'
                    );
                    group.dispatchEvent(new MouseEvent('mouseup'));
                    expect(group.parentElement.classList).not.toContain(
                        'avonni-kanban__dragged_group'
                    );
                });
            });

            it('tile', () => {
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = RECORDS;
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    const tile = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban-tile"]'
                    );
                    // To avoid division by 0
                    Object.defineProperty(tile.parentElement, 'offsetWidth', {
                        value: 1
                    });
                    // To avoid division by 0
                    Object.defineProperty(tile, 'offsetHeight', {
                        value: 1
                    });
                    tile.dispatchEvent(new MouseEvent('mousedown'));

                    // mousemove is handled on the kanban, not the tile
                    tile.parentElement.parentElement.dispatchEvent(
                        new MouseEvent('mousemove')
                    );
                    expect(tile.classList).toContain('avonni-kanban__dragged');
                    tile.dispatchEvent(new MouseEvent('mouseup'));
                    expect(tile.classList).not.toContain(
                        'avonni-kanban__dragged'
                    );
                });
            });
        });

        describe('fields', () => {
            it('Passed to the component', () => {
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = [
                    {
                        id: '001',
                        status: 'open',
                        opportunityName: 'Opportunity 1',
                        amount: 25000,
                        warningIcon: 'utility:warning',
                        phone: '+375292567896',
                        createdDate: '1594133308000',
                        startDate: '2020/07/07',
                        dueDate: '1600354108000',
                        percent: 0.28,
                        available: true,
                        coverImage:
                            'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    }
                ];
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    const tile = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban-tile"]'
                    );
                    expect(tile.fields).toHaveLength(
                        CARD_ATTRIBUTES.customFields.length
                    );
                });
            });
        });

        describe('groupValues', () => {
            it('Passed to the component', () => {
                element.keyField = 'id';
                element.groupValues = JSON.parse(JSON.stringify(GROUP_VALUES));
                element.variant = 'path';

                return Promise.resolve().then(() => {
                    const groups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="path-group"]'
                    );

                    expect(groups[0].textContent).toEqual(
                        expect.stringContaining('Open')
                    );
                    expect(groups[1].textContent).toEqual(
                        expect.stringContaining('In Progress')
                    );
                    expect(groups[2].textContent).toEqual(
                        expect.stringContaining('Closed')
                    );
                });
            });
        });

        describe('hideHeader', () => {
            it('Passed to the component', () => {
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = RECORDS;
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.hideHeader = true;
                element.actions = ACTIONS;

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    const summarize = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__summarize_wrapper"]'
                    );
                    expect(summarize).toBeNull();
                });
            });
        });

        describe('isLoading', () => {
            it('Passed to the component', () => {
                element.isLoading = true;
                element.loadingStateAlternativeText = 'Loading';

                return Promise.resolve().then(() => {
                    const loading = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban-loading"]'
                    );
                    expect(loading).toBeTruthy();
                    expect(loading.alternativeText).toBe('Loading');
                });
            });
        });

        describe('records', () => {
            it('Passed to the component', () => {
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = RECORDS;
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    const records = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__group"]'
                    );
                    expect(records.children.length).toBe(3);
                });
            });
        });

        describe('subgroups', () => {
            it('Passed to the component', () => {
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = RECORDS;
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.subGroupFieldName = 'assignee';
                element.actions = ACTIONS;

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    const records = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__group"]'
                    );
                    expect(records.children.length).toBe(1);
                });
            });
        });

        describe('summarize', () => {
            it('Passed to the component', () => {
                jest.useFakeTimers();
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = RECORDS;
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;

                const cardAttributes = {
                    customFields: CARD_ATTRIBUTES.customFields
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    jest.runAllTimers();
                    const summarize = element.shadowRoot.querySelector(
                        '[data-element-id="summarize"]'
                    );
                    // using Math.floor to prevent floating point errors
                    expect(Math.floor(summarize.value)).toBe(46770);
                });
            });
        });

        describe('tile', () => {
            it('cover image', () => {
                jest.useFakeTimers();
                const coverImage =
                    'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg';
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = [
                    {
                        id: '001',
                        status: 'open',
                        opportunityName: 'Opportunity 1',
                        coverImage,
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    }
                ];
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;

                const cardAttributes = {
                    coverImage: {
                        fieldName: 'coverImage',
                        label: 'Cover Image',
                        type: 'text'
                    }
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    jest.runAllTimers();
                    const tiles = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-kanban-tile"]'
                    );
                    expect(tiles).toHaveLength(1);
                    expect(tiles[0].coverImage).toBe(coverImage);
                });
            });

            it('start and due dates', () => {
                jest.useFakeTimers();
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = [
                    {
                        id: '001',
                        status: 'open',
                        opportunityName: 'Opportunity 1',
                        createdDate: '1594133308000',
                        startDate: '2020/07/07',
                        dueDate: '1600354108000'
                    }
                ];
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;

                const cardAttributes = {
                    startDate: {
                        fieldName: 'startDate',
                        label: 'Start Date',
                        type: 'date'
                    },
                    dueDate: {
                        fieldName: 'dueDate',
                        label: 'Due Date',
                        type: 'date'
                    }
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    jest.runAllTimers();
                    const tile = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban-tile"]'
                    );
                    expect(tile.startDate.getTime()).toBe(
                        new Date('2020/07/07').getTime()
                    );
                    expect(tile.dueDate.getTime()).toBe(
                        new Date(1600354108000).getTime()
                    );
                });
            });

            it('title and description', () => {
                jest.useFakeTimers();
                element.keyField = 'id';
                element.groupValues = GROUP_VALUES;
                element.records = [
                    {
                        id: '001',
                        status: 'open',
                        opportunityName: 'Opportunity 1',
                        description: 'some text'
                    }
                ];
                element.groupFieldName = 'status';
                element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
                element.actions = ACTIONS;

                const cardAttributes = {
                    title: {
                        fieldName: 'opportunityName',
                        label: 'Opportunity Name',
                        type: 'text'
                    },
                    description: {
                        fieldName: 'description',
                        label: 'Description',
                        type: 'text'
                    }
                };
                element.cardAttributes = cardAttributes;

                return Promise.resolve().then(() => {
                    jest.runAllTimers();
                    const tile = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban-tile"]'
                    );
                    expect(tile.title).toBe('Opportunity 1');
                    expect(tile.description).toBe('some text');
                });
            });
        });
    });

    describe('Events', () => {
        it('actionclick event', () => {
            element.keyField = 'id';
            element.groupValues = GROUP_VALUES;
            element.records = RECORDS;
            element.groupFieldName = 'status';
            element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
            element.actions = ACTIONS;

            const cardAttributes = {
                customFields: CARD_ATTRIBUTES.customFields
            };
            element.cardAttributes = cardAttributes;

            const handler = jest.fn();
            element.addEventListener('actionclick', handler);

            return Promise.resolve().then(() => {
                const headerAction = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-kanban__header_action_menu"]'
                );

                headerAction.dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: 'Action 1'
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe('Action 1');
                expect(
                    handler.mock.calls[0][0].detail.targetKeyField
                ).toBeUndefined();
                expect(handler.mock.calls[0][0].detail.groupValue).toBe('open');
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        it('change event', () => {
            element.keyField = 'id';
            element.groupValues = GROUP_VALUES;
            element.records = RECORDS;
            element.groupFieldName = 'status';
            element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
            element.actions = ACTIONS;

            const cardAttributes = {
                customFields: CARD_ATTRIBUTES.customFields
            };
            element.cardAttributes = cardAttributes;

            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const tile = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-kanban-tile"]'
                );
                // To avoid division by 0
                Object.defineProperty(tile.parentElement, 'offsetWidth', {
                    value: 1
                });
                // To avoid division by 0
                Object.defineProperty(tile, 'offsetHeight', {
                    value: 1
                });
                tile.dispatchEvent(new MouseEvent('mousedown'));

                // mousemove is handled on the kanban, not the tile
                tile.parentElement.parentElement.dispatchEvent(
                    new MouseEvent('mousemove')
                );
                tile.dispatchEvent(new MouseEvent('mouseup'));

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.groupValue).toBe('open');
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        it('columnchange event', () => {
            element.keyField = 'id';
            element.groupValues = GROUP_VALUES;
            element.records = RECORDS;
            element.groupFieldName = 'status';
            element.summarizeAttributes = SUMMARIZE_ATTRIBUTES;
            element.actions = ACTIONS;

            const cardAttributes = {
                customFields: CARD_ATTRIBUTES.customFields
            };
            element.cardAttributes = cardAttributes;

            const handler = jest.fn();
            element.addEventListener('columnchange', handler);

            return Promise.resolve().then(() => {
                const groupHeader = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-kanban__group_header"]'
                );
                groupHeader.dispatchEvent(new MouseEvent('mousedown'));

                // mousemove is handled on the kanban, not the group header
                groupHeader.parentElement.dispatchEvent(
                    new MouseEvent('mousemove')
                );
                groupHeader.dispatchEvent(new MouseEvent('mouseup'));

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe('open');
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });
    });
});
