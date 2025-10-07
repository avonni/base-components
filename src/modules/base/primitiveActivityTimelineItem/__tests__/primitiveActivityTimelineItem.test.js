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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toEqual([]);
            expect(element.avatar).toBeUndefined();
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
            expect(element.endDateValue).toBeUndefined();
            expect(element.fieldAttributes).toMatchObject({});
            expect(element.fields).toMatchObject([]);
            expect(element.hasCheckbox).toBeFalsy();
            expect(element.hasError).toBeFalsy();
            expect(element.hideVerticalBar).toBeFalsy();
            expect(element.href).toBeUndefined();
            expect(element.icons).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.iconSize).toBe('small');
            expect(element.isActive).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.loadingStateAlternativeText).toBe('Loading');
            expect(element.name).toBeUndefined();
            expect(element.timezone).toBeUndefined();
            expect(element.title).toBeUndefined();
        });

        describe('actions', () => {
            it('Passed to the component', () => {
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
                        expect(item.prefixIconName).toBe(
                            ACTIONS[index].iconName
                        );
                        expect(item.value).toBe(ACTIONS[index].name);
                    });
                });
            });

            it('no actions', () => {
                return Promise.resolve().then(() => {
                    const actionMenu = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-menu-actions"]'
                    );
                    expect(actionMenu).toBeFalsy();
                });
            });
        });

        describe('avatar', () => {
            it('no bullet', () => {
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

            it('avatar without icon', () => {
                element.avatar = {};

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '.slds-timeline__icon'
                    );
                    expect(avatar.classList).toContain(
                        'avonni-timeline-item__bullet'
                    );
                });
            });
        });

        describe('buttonDisabled', () => {
            it('Passed to the component', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonDisabled = true;

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('buttonIconName', () => {
            it('Passed to the component', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonIconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.iconName).toBe('utility:close');
                    expect(button.iconPosition).toBe('left');
                });
            });
        });

        describe('buttonIconPosition', () => {
            it('Passed to the component', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonIconName = 'utility:close';
                element.buttonIconPosition = 'right';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.iconPosition).toBe('right');
                });
            });
        });

        describe('buttonLabel', () => {
            it('Passed to the component', () => {
                element.buttonLabel = 'This is a button label';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.label).toBe('This is a button label');
                });
            });
        });

        describe('buttonVariant', () => {
            it('neutral', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'neutral';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('neutral');
                });
            });

            it('base', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'base';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('base');
                });
            });

            it('brand', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'brand';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('brand');
                });
            });

            it('brand-outline', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'brand-outline';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('brand-outline');
                });
            });

            it('destructive', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'destructive';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('destructive');
                });
            });

            it('destructive-text', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'destructive-text';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('destructive-text');
                });
            });

            it('inverse', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'inverse';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('inverse');
                });
            });

            it('success', () => {
                element.buttonLabel = 'This is a button label';
                element.buttonVariant = 'success';

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    expect(button.variant).toBe('success');
                });
            });
        });

        describe('checked', () => {
            it('checked = false', () => {
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

            it('checked = true', () => {
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
        });

        describe('closed', () => {
            it('Passed to the component', () => {
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
        });

        describe('dateFormat', () => {
            it('Passed to the component', () => {
                element.dateFormat = 'dd MMM yyyy';
                element.datetimeValue = 1621605600000;

                // Make sure the test is not affected by the local language
                const month = new Intl.DateTimeFormat('default', {
                    month: 'short',
                    hour12: false
                }).formatToParts(new Date(1621605600000))[0].value;

                return Promise.resolve().then(() => {
                    const dateTime = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-formatted-date-time"]'
                    );
                    expect(dateTime.textContent).toBe(`21 ${month} 2021`);
                });
            });
        });

        describe('datetimeValue', () => {
            it('Passed to the component', () => {
                element.datetimeValue = 1621605600000;
                element.dateFormat = 'x';

                return Promise.resolve().then(() => {
                    const dateTime = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-formatted-date-time"]'
                    );
                    expect(dateTime.textContent).toBe('1621605600000');
                });
            });
        });

        describe('description', () => {
            it('Passed to the component', () => {
                element.description = 'This is an description text';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description.value).toBe(
                        'This is an description text'
                    );
                });
            });
        });

        describe('fieldAttributes', () => {
            it('Passed to the component', () => {
                element.fields = FIELDS;
                element.fieldAttributes = {
                    variant: 'label-hidden'
                };

                return Promise.resolve().then(() => {
                    const fields = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-output-data"]'
                    );

                    expect(fields).toHaveLength(3);

                    fields.forEach((field) => {
                        expect(field.variant).toBe('label-hidden');
                    });
                });
            });
        });

        describe('fields', () => {
            it('fields', () => {
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
        });

        describe('hasCheckbox', () => {
            it('Passed to the component', () => {
                element.hasCheckbox = true;

                return Promise.resolve().then(() => {
                    const checkbox =
                        element.shadowRoot.querySelector('lightning-input');
                    expect(checkbox).toBeTruthy();
                    expect(checkbox.type).toBe('checkbox');
                });
            });
        });

        describe('hasError', () => {
            it('Passed to the component', () => {
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
        });

        describe('hideVerticalBar', () => {
            it('Passed to the component', () => {
                element.hideVerticalBar = true;

                return Promise.resolve().then(() => {
                    const verticalBar = element.shadowRoot.querySelector(
                        '.slds-timeline__icon'
                    );
                    expect(verticalBar).toBeFalsy();
                });
            });
        });

        describe('href', () => {
            it('Passed to the component', () => {
                element.title = 'This is an title link text';
                element.href = 'salesforce.com';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector('a');
                    expect(link.href).toContain('salesforce.com');
                    expect(link.textContent).toBe('This is an title link text');
                });
            });
        });

        describe('iconSize', () => {
            it('xx-small', () => {
                element.avatar = { fallbackIconName: 'standard:case' };
                element.iconSize = 'xx-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="item-marker"]'
                    );
                    expect(icon.size).toBe('xx-small');
                });
            });

            it('x-small', () => {
                element.avatar = { fallbackIconName: 'standard:case' };
                element.iconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="item-marker"]'
                    );
                    expect(icon.size).toBe('x-small');
                });
            });

            it('small', () => {
                element.avatar = { fallbackIconName: 'standard:case' };
                element.iconSize = 'small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="item-marker"]'
                    );
                    expect(icon.size).toBe('small');
                });
            });

            it('medium', () => {
                element.avatar = { fallbackIconName: 'standard:case' };
                element.iconSize = 'medium';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="item-marker"]'
                    );
                    expect(icon.size).toBe('medium');
                });
            });

            it('large', () => {
                element.avatar = { fallbackIconName: 'standard:case' };
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="item-marker"]'
                    );
                    expect(icon.size).toBe('large');
                });
            });
        });

        describe('icons', () => {
            it('Passed to the component', () => {
                element.icons = ['utility:close', 'utility:error'];

                return Promise.resolve().then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-timeline-item-icon"]'
                    );
                    expect(icons).toHaveLength(2);
                    icons.forEach((icon, index) => {
                        expect(icon.iconName).toBe(element.icons[index]);
                    });
                });
            });
        });
        describe('isActive', () => {
            it('blue bullet', () => {
                element.isActive = true;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="item-marker"]'
                    );

                    expect(icon.classList).toContain(
                        'avonni-timeline-item__bullet'
                    );
                    expect(icon.classList).toContain(
                        'avonni-timeline-item__active-bullet'
                    );
                });
            });

            it('not isActive', () => {
                element.isActive = false;

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="item-marker"]'
                    );

                    expect(icon.classList).toContain(
                        'avonni-timeline-item__bullet'
                    );
                    expect(icon.classList).not.toContain(
                        'avonni-timeline-item__active-bullet'
                    );
                });
            });
        });

        describe('isLoading', () => {
            it('Passed to the component', () => {
                element.isLoading = true;
                element.loadingStateAlternativeText = 'This is a loading text';

                return Promise.resolve().then(() => {
                    const spinner =
                        element.shadowRoot.querySelector('lightning-spinner');
                    expect(spinner).toBeTruthy();
                    expect(spinner.alternativeText).toBe(
                        'This is a loading text'
                    );
                });
            });
        });

        describe('timezone', () => {
            it('Passed to the component', () => {
                element.timezone = 'Pacific/Honolulu';
                element.dateFormat = 'dd/LL/yyyy T ZZZZ';
                element.datetimeValue = '2020-12-01T00:00:00.000Z';

                // Make sure the test is not affected by the local language
                const dateParts = new Intl.DateTimeFormat('default', {
                    timeZoneName: 'short',
                    hour12: false,
                    timeZone: 'Pacific/Honolulu'
                }).formatToParts(new Date('2020-12-01T00:00:00.000Z'));
                const timezone = dateParts[dateParts.length - 1].value;

                return Promise.resolve().then(() => {
                    const formattedDate = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-formatted-date-time"]'
                    );
                    expect(formattedDate.textContent).toBe(
                        `30/11/2020 14:00 ${timezone}`
                    );
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'This is an title text';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector('h3');
                    expect(title.textContent).toBe('This is an title text');
                });
            });
        });
    });

    describe('events', () => {
        describe('actionclick', () => {
            it('Passed to the component', () => {
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
        });

        describe('buttonclick', () => {
            it('Passed to the component', () => {
                element.buttonLabel = 'button';
                element.name = 'someName';

                const handler = jest.fn();
                element.addEventListener('buttonclick', handler);

                return Promise.resolve().then(() => {
                    const button =
                        element.shadowRoot.querySelector('lightning-button');
                    button.click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'someName'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('check', () => {
            it('Passed to the component', () => {
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
        });

        describe('itemclick', () => {
            it('Passed to the component', () => {
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
    });
});
