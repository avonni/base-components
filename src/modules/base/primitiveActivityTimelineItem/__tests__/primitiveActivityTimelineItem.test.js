import { createElement } from 'lwc';
import ActivityTimelineItem from '../primitiveActivityTimelineItem';

const ACTIONS = [
    {
        label: 'Action 1',
        name: 'firstAction',
        iconName: 'utility:apps'
    },
    {
        label: 'Action 2',
        name: 'secondAction',
        disabled: true,
        iconName: 'standard:user'
    },
    {
        label: 'Action 3',
        name: 'thirdAction'
    }
];

const FIELDS = [
    {
        label: 'Name',
        value: 'Charlie Gomez',
        type: 'url',
        typeAttributes: {
            label: 'Charlie Gomez'
        }
    },
    {
        label: 'Related To',
        value: 'Tesla Cloudhub + Anypoint Connectors',
        type: 'url',
        typeAttributes: {
            label: 'Tesla Cloudhub + Anypoint Connectors'
        }
    },
    {
        label: 'Description',
        value: 'Need to finalize proposals and brand details before the meeting',
        type: 'text'
    }
];

let element;
describe('Primitive Activity Timeline Item', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-activity-timeline-item', {
            is: ActivityTimelineItem
        });
        document.body.appendChild(element);
    });

    it('Activity Timeline Item: Default attributes', () => {
        expect(element.actions).toEqual([]);
        expect(element.buttonDisabled).toBeFalsy();
        expect(element.buttonIconName).toBeUndefined();
        expect(element.buttonIconPosition).toBe('left');
        expect(element.buttonLabel).toBeUndefined();
        expect(element.buttonVariant).toBe('neutral');
        expect(element.checked).toBeFalsy();
        expect(element.closed).toBeFalsy();
        expect(element.dateFormat).toBeUndefined();
        expect(element.datetimeValue).toBeUndefined();
        expect(element.description).toBeUndefined();
        expect(element.hasCheckbox).toBeFalsy();
        expect(element.hasError).toBeFalsy();
        expect(element.fields).toMatchObject([]);
        expect(element.href).toBeUndefined();
        expect(element.avatar).toBeUndefined();
        expect(element.iconSize).toBe('small');
        expect(element.isActive).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.timezone).toBeUndefined();
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Activity timeline item: actions', () => {
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const actionMenu = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu-actions"]'
            );
            expect(actionMenu).toBeTruthy();

            const actionItems = actionMenu.querySelectorAll(
                '[data-element-id="lightning-menu-item-action"]'
            );
            expect(actionItems).toHaveLength(ACTIONS.length);
            actionItems.forEach((item, index) => {
                expect(item.disabled).toBe(ACTIONS[index].disabled);
                expect(item.label).toBe(ACTIONS[index].label);
                expect(item.prefixIconName).toBe(ACTIONS[index].iconName);
                expect(item.value).toBe(ACTIONS[index].name);
            });
        });
    });

    it('Activity timeline item: no actions', () => {
        return Promise.resolve().then(() => {
            const actionMenu = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu-actions"]'
            );
            expect(actionMenu).toBeFalsy();
        });
    });

    // timezone
    it('Activity timeline item: timezone', () => {
        element.timezone = 'Pacific/Honolulu';
        element.dateFormat = 'dd/LL/yyyy T Z';
        element.datetimeValue = '2020-12-01T00:00:00.000Z';

        return Promise.resolve().then(() => {
            const formattedDate = element.shadowRoot.querySelector(
                '[data-element-id="avonni-formatted-date-time"]'
            );
            expect(formattedDate.textContent).toBe('30/11/2020 14:00 -10');
        });
    });

    // title
    it('Activity timeline item: title', () => {
        element.title = 'This is an title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h3');
            expect(title.textContent).toBe('This is an title text');
        });
    });

    // description
    it('Activity timeline item: description', () => {
        element.description = 'This is an description text';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector(
                '[data-element-id="lightning-formatted-rich-text-description"]'
            );
            expect(description.value).toBe('This is an description text');
        });
    });

    // datetime value
    it('Activity timeline item: datetimeValue', () => {
        element.datetimeValue = 1621605600000;
        element.dateFormat = 'x';

        return Promise.resolve().then(() => {
            const dateTime = element.shadowRoot.querySelector(
                '[data-element-id="avonni-formatted-date-time"]'
            );
            expect(dateTime.textContent).toBe('1621605600000');
        });
    });

    // dateFormat
    it('Activity timeline item: dateFormat', () => {
        element.dateFormat = 'dd MMM yyyy';
        element.datetimeValue = 1621605600000;

        return Promise.resolve().then(() => {
            const dateTime = element.shadowRoot.querySelector(
                '[data-element-id="avonni-formatted-date-time"]'
            );
            expect(dateTime.textContent).toBe('21 May 2021');
        });
    });

    // href
    it('Activity timeline item: href', () => {
        element.title = 'This is an title link text';
        element.href = 'salesforce.com';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a');
            expect(link.href).toContain('salesforce.com');
            expect(link.textContent).toBe('This is an title link text');
        });
    });

    // avatar
    it('Activity timeline item: avatar no bullet', () => {
        element.avatar = {
            initials: 'AB',
            fallbackIconName: 'standard:case',
            src: 'image.png',
            presence: 'online'
        };

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                '.slds-timeline__icon'
            );
            expect(avatar.fallbackIconName).toBe('standard:case');
            expect(avatar.initials).toBe('AB');
            expect(avatar.src).toBe('image.png');
            expect(avatar.presence).toBe('online');
            expect(avatar.classList).not.toContain(
                'avonni-timeline-item__bullet'
            );
        });
    });

    it('Activity timeline item: avatar without icon', () => {
        element.avatar = {};

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                '.slds-timeline__icon'
            );
            expect(avatar.classList).toContain('avonni-timeline-item__bullet');
        });
    });

    // icon size
    it('Activity Timeline item: icon size (xx-small)', () => {
        element.avatar = { fallbackIconName: 'standard:case' };
        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="item-marker"]'
            );
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Activity Timeline item: icon size (x-small)', () => {
        element.avatar = { fallbackIconName: 'standard:case' };
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="item-marker"]'
            );
            expect(icon.size).toBe('x-small');
        });
    });

    it('Activity Timeline item: icon size (small)', () => {
        element.avatar = { fallbackIconName: 'standard:case' };
        element.iconSize = 'small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="item-marker"]'
            );
            expect(icon.size).toBe('small');
        });
    });

    it('Activity Timeline item: icon size (medium)', () => {
        element.avatar = { fallbackIconName: 'standard:case' };
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="item-marker"]'
            );
            expect(icon.size).toBe('medium');
        });
    });

    it('Activity Timeline item: icon size (large)', () => {
        element.avatar = { fallbackIconName: 'standard:case' };
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="item-marker"]'
            );
            expect(icon.size).toBe('large');
        });
    });

    // fields
    it('Activity timeline item: fields', () => {
        element.fields = FIELDS;

        return Promise.resolve().then(() => {
            const fields = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-output-data"]'
            );

            expect(fields).toHaveLength(3);

            fields.forEach((field, index) => {
                const correspondingField = FIELDS[index];
                expect(correspondingField).toBeTruthy();
                expect(field.label).toBe(correspondingField.label);
                expect(field.value).toBe(correspondingField.value);
                expect(field.type).toBe(correspondingField.type);
                if (correspondingField.typeAttributes) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(field.typeAttributes).toMatchObject(
                        correspondingField.typeAttributes
                    );
                }
            });
        });
    });

    // variant
    it('Activity timeline item: isActive blue bullet', () => {
        element.isActive = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="item-marker"]'
            );

            expect(icon.classList).toContain('avonni-timeline-item__bullet');
            expect(icon.classList).toContain(
                'avonni-timeline-item__active-bullet'
            );
        });
    });

    it('Activity timeline item: not isActive gray bullet', () => {
        element.isActive = false;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="item-marker"]'
            );

            expect(icon.classList).toContain('avonni-timeline-item__bullet');
            expect(icon.classList).not.toContain(
                'avonni-timeline-item__active-bullet'
            );
        });
    });

    // has checkbox
    it('Activity timeline item: has checkbox', () => {
        element.hasCheckbox = true;

        return Promise.resolve().then(() => {
            const checkbox =
                element.shadowRoot.querySelector('lightning-input');
            expect(checkbox).toBeTruthy();
            expect(checkbox.type).toBe('checkbox');
        });
    });

    // has error
    it('Activity timeline item: has error', () => {
        element.hasError = true;

        return Promise.resolve().then(() => {
            const error = element.shadowRoot.querySelector(
                '.slds-grid.slds-text-color_error'
            );
            const errorIcon = element.shadowRoot.querySelector(
                '.slds-grid.slds-text-color_error > lightning-icon'
            );
            expect(error).toBeTruthy();
            expect(error.textContent).toBe(
                'There was an error loading the details'
            );
            expect(errorIcon).toBeTruthy();
            expect(errorIcon.iconName).toBe('utility:error');
        });
    });

    // is loading and loading text
    it('Activity timeline item: is loading', () => {
        element.isLoading = true;
        element.loadingStateAlternativeText = 'This is a loading text';

        return Promise.resolve().then(() => {
            const spinner =
                element.shadowRoot.querySelector('lightning-spinner');
            expect(spinner).toBeTruthy();
            expect(spinner.alternativeText).toBe('This is a loading text');
        });
    });

    // checked
    it('Activity timeline item: checked = false', () => {
        element.fields = FIELDS;
        element.hasCheckbox = true;
        element.checked = false;

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-checkbox"]'
            );
            expect(checkbox.checked).toBeFalsy();
        });
    });

    it('Activity timeline item: checked = true', () => {
        element.fields = FIELDS;
        element.hasCheckbox = true;
        element.checked = true;

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-checkbox"]'
            );
            expect(checkbox.checked).toBeTruthy();
        });
    });

    // closed
    it('Activity timeline item: closed', () => {
        element.fields = FIELDS;
        element.closed = true;

        return Promise.resolve().then(() => {
            const buttonIcon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(buttonIcon.iconName).toBe('utility:chevronright');
            expect(buttonIcon.ariaExpanded).toBe('false');
        });
    });

    // button label
    it('Activity timeline item: button label', () => {
        element.buttonLabel = 'This is a button label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('This is a button label');
        });
    });

    // button icon name
    // needs a label
    it('Activity timeline item: button icon name', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonIconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconName).toBe('utility:close');
            expect(button.iconPosition).toBe('left');
        });
    });

    // button icon position
    // needs a label
    it('Activity timeline item: button icon position', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonIconName = 'utility:close';
        element.buttonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconPosition).toBe('right');
        });
    });

    // button variant
    // needs a label
    it('Activity timeline item: button variant neutral', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'neutral';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('neutral');
        });
    });

    it('Activity timeline item: button variant base', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'base';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('base');
        });
    });

    it('Activity timeline item: button variant brand', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'brand';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('brand');
        });
    });

    it('Activity timeline item: button variant brand-outline', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'brand-outline';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Activity timeline item: button variant destructive', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'destructive';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('destructive');
        });
    });

    it('Activity timeline item: button variant destructive-text', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'destructive-text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Activity timeline item: button variant inverse', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('inverse');
        });
    });

    it('Activity timeline item: button variant success', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonVariant = 'success';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('success');
        });
    });

    // button disabled
    it('Activity timeline item: button disabled', () => {
        element.buttonLabel = 'This is a button label';
        element.buttonDisabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.disabled).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // actionclick
    it('Activity timeline item: actionclick event', () => {
        element.fields = FIELDS;
        element.name = 'someName';
        element.actions = [
            {
                label: 'First action',
                name: 'action1'
            }
        ];

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const actionsMenu = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-menu-actions"]'
            );
            actionsMenu.dispatchEvent(
                new CustomEvent('select', {
                    detail: {
                        value: 'action1'
                    }
                })
            );
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.name).toBe('action1');
            expect(call.detail.targetName).toBe('someName');
            expect(call.detail.fieldData).toEqual(FIELDS);
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    // check
    it('Activity timeline item: check event', () => {
        element.hasCheckbox = true;
        element.name = 'someName';

        const handler = jest.fn();
        element.addEventListener('check', handler);

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-checkbox"]'
            );
            checkbox.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        checked: true
                    }
                })
            );
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.checked).toBeTruthy();
            expect(call.detail.name).toBe('someName');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    // button clicked
    it('Activity timeline item: button clicked event', () => {
        element.buttonLabel = 'button';
        element.name = 'someName';

        const handler = jest.fn();
        element.addEventListener('buttonclick', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            button.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('someName');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // item clicked
    it('Activity timeline item: item clicked event', () => {
        element.name = 'aName';
        const handler = jest.fn();
        element.addEventListener('itemclick', handler);

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="div-title"]'
            );
            title.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('aName');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
