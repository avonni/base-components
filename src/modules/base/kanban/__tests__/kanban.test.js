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

    it('Kanban : Default attributes', () => {
        expect(element.groupValues).toMatchObject([]);
        expect(element.records).toMatchObject([]);
        expect(element.summarizeAttributes).toMatchObject({});
        expect(element.actions).toMatchObject([]);
        expect(element.disableItemDragAndDrop).toBeFalsy();
        expect(element.disableColumnDragAndDrop).toBeFalsy();
        expect(element.groupFieldName).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.variant).toBe('base');
        expect(element.hideHeader).toBeFalsy();
        expect(element.subGroupFieldName).toBeUndefined();
        expect(element.keyField).toBeUndefined();
        expect(element.cardAttributes).toMatchObject({});
    });

    /* ----- ATTRIBUTES ----- */

    // groupValues
    it('Kanban : groupValues', () => {
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

    // records
    it('Kanban : records', () => {
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

    // subgroups
    it('Kanban : subgroups', () => {
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

    // hideHeader
    it('Kanban : hideHeader', () => {
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

    // fields
    it('Kanban : fields', () => {
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
            const fields = element.shadowRoot.querySelector(
                '[data-element-id="fields"]'
            );
            expect(fields.children.length).toBe(
                CARD_ATTRIBUTES.customFields.length + 1
            );
        });
    });

    // summarize
    it('Kanban : summarize', () => {
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

    // item drag and drop disabled
    it('Kanban : disableItemDragAndDrop true', () => {
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
                '[data-element-id="avonni-kanban__tile"]'
            );
            tile.dispatchEvent(new MouseEvent('mousedown'));
            expect(tile.classList).not.toContain('avonni-kanban__dragged');
        });
    });

    it('Kanban : tile drag and drop', () => {
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
                '[data-element-id="avonni-kanban__tile"]'
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
            expect(tile.classList).not.toContain('avonni-kanban__dragged');
        });
    });

    it('Kanban : group drag and drop', () => {
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

    // cover image
    it('Kanban : tile cover image', () => {
        jest.useFakeTimers();
        element.keyField = 'id';
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
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
            const coverImage = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__tile_image"]'
            );
            expect(coverImage).not.toBeNull();
        });
    });

    // title and description
    it('Kanban : tile title and description', () => {
        jest.useFakeTimers();
        element.keyField = 'id';
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
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
            const tileHeader = element.shadowRoot.querySelector(
                '[data-element-id="avonni-kanban__tile_header"]'
            );
            expect(tileHeader.children.length).toBe(2);
        });
    });

    // start and due dates
    it('Kanban : tile start and due dates', () => {
        jest.useFakeTimers();
        element.keyField = 'id';
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
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
            const dates = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-kanban__tile_dates"]'
            );
            expect(dates[1].classList).not.toContain(
                'avonni-kanban__tile_dates_overdue'
            );
        });
    });

    it('Kanban : tile start and due dates overdue', () => {
        jest.useFakeTimers();
        element.keyField = 'id';
        element.groupValues = GROUP_VALUES;
        element.records = RECORDS;
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
            const dates = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-kanban__tile_dates"]'
            );
            expect(dates[0].classList).toContain(
                'avonni-kanban__tile_dates_overdue'
            );
        });
    });

    // events
    it('Kanban : change event', () => {
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
                '[data-element-id="avonni-kanban__tile"]'
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

    it('Kanban : columnchange event', () => {
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

    it('Kanban : actionclick event', () => {
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
});
