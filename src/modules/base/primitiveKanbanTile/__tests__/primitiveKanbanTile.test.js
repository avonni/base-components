import { createElement } from 'lwc';
import PrimitiveKanbanTile from '../primitiveKanbanTile';

const ACTIONS = [
    {
        label: 'Action 1',
        name: 'action1'
    },
    {
        label: 'Action 2',
        name: 'action2',
        iconName: 'utility:add'
    },
    {
        label: 'Action 3',
        name: 'action3',
        disabled: true
    }
];
const AVATAR = {
    fallbackIconName: 'standard:user',
    variant: 'circle',
    src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
};

const startDate = new Date('7/20/2021');
const endDate = new Date('7/21/2021');

let element;
describe('Primitive Kanban Tile', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-kanban-tile', {
            is: PrimitiveKanbanTile
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actions).toEqual([]);
            expect(element.avatar).toEqual({});
            expect(element.coverImage).toBeUndefined();
            expect(element.description).toBeUndefined();
            expect(element.dueDate).toBeUndefined();
            expect(element.fields).toEqual([]);
            expect(element.fieldAttributes).toEqual({
                variant: 'label-hidden'
            });
            expect(element.icons).toEqual([]);
            expect(element.imageAttributes).toEqual({
                fallbackSrc: null,
                position: 'top',
                height: 250,
                cropPositionX: 50,
                cropPositionY: 50,
                cropFit: 'cover'
            });
            expect(element.infos).toEqual([]);
            expect(element.isDraggable).toBeFalsy();
            expect(element.name).toBeUndefined();
            expect(element.startDate).toBeUndefined();
            expect(element.title).toBeUndefined();
            expect(element.titleUrl).toBeUndefined();
            expect(element.warningIcon).toBeUndefined();
        });

        describe('Actions', () => {
            it('Actions', () => {
                element.actions = ACTIONS;
                return Promise.resolve().then(() => {
                    const actions = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-kanban__action"]'
                    );
                    expect(actions).toHaveLength(3);
                    actions.forEach((action, index) => {
                        expect(action.label).toBe(ACTIONS[index].label);
                        expect(action.value).toBe(ACTIONS[index].name);
                        expect(action.prefixIconName).toBe(
                            ACTIONS[index].iconName
                        );
                        expect(action.disabled).toBe(ACTIONS[index].disabled);
                    });
                });
            });

            it('No actions', () => {
                element.actions = [];
                return Promise.resolve().then(() => {
                    const actions = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-kanban__action"]'
                    );
                    expect(actions).toHaveLength(0);
                });
            });
        });

        describe('Avatar', () => {
            describe('With Header', () => {
                it('Avatar', () => {
                    element.title = 'some text';
                    element.avatar = AVATAR;

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-kanban__tile_avatar_left"]'
                        );
                        expect(avatar).toBeTruthy();
                        expect(avatar.fallbackIconName).toBe('standard:user');
                        expect(avatar.variant).toBe('circle');
                        expect(avatar.src).toBe(AVATAR.src);
                    });
                });

                describe('Avatar Position', () => {
                    it('Position left', () => {
                        element.title = 'some text';
                        element.avatar = AVATAR;
                        element.avatarPosition = 'left-of-title';

                        return Promise.resolve().then(() => {
                            const avatarLeft = element.shadowRoot.querySelector(
                                '[data-element-id="avonni-kanban__tile_avatar_left"]'
                            );
                            expect(avatarLeft).toBeTruthy();
                        });
                    });

                    it('Position right', () => {
                        element.title = 'some text';
                        element.avatar = AVATAR;
                        element.avatarPosition = 'right-of-title';

                        return Promise.resolve().then(() => {
                            const avatarRight =
                                element.shadowRoot.querySelector(
                                    '[data-element-id="avonni-kanban__tile_avatar_right"]'
                                );
                            expect(avatarRight).toBeTruthy();
                        });
                    });
                });
            });

            describe('Without Header', () => {
                it('Avatar', () => {
                    element.avatar = AVATAR;

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-kanban__tile_avatar_left"]'
                        );
                        expect(avatar).toBeFalsy();
                    });
                });
            });
        });

        describe('Cover Image', () => {
            it('Passed to the component', () => {
                const src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.coverImage = src;

                return Promise.resolve().then(() => {
                    const coverImage = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_image_top"]'
                    );
                    expect(coverImage).toBeTruthy();
                    expect(coverImage.src).toBe(src);
                });
            });
        });

        describe('Description', () => {
            it('Passed to the component', () => {
                element.description = 'some text';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description.value).toBe('some text');
                    expect(description.title).toBe('some text');
                });
            });

            it('Rich text', () => {
                element.description = '<b>Content</b>';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description.value).toBe('<b>Content</b>');
                    expect(description.title).toBe('Content');
                });
            });
        });

        describe('Due Date', () => {
            it('Start date is defined', () => {
                element.startDate = startDate;
                element.dueDate = endDate;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_dates"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile-due-date"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-kanban__tile_dates_due-date'
                    );
                    expect(date.value.getTime()).toBe(endDate.getTime());
                });
            });

            it('No start date defined', () => {
                element.dueDate = endDate;

                return Promise.resolve().then(() => {
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile-due-date"]'
                    );
                    expect(date).toBeFalsy();
                });
            });

            it('Overdue', () => {
                element.startDate = startDate;
                element.dueDate = endDate;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_dates"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-kanban__tile_dates_overdue'
                    );
                });
            });
        });

        describe('Fields', () => {
            it('Passed to the component', () => {
                const fields = [
                    {
                        label: 'Name',
                        type: 'text',
                        value: 'Item 1',
                        computedType: 'text'
                    },
                    {
                        label: 'Available',
                        type: 'boolean',
                        value: true,
                        computedType: 'boolean'
                    },
                    {
                        label: 'Amount',
                        type: 'int',
                        value: 2500,
                        computedType: 'number'
                    }
                ];
                element.fields = fields;

                return Promise.resolve().then(() => {
                    const fieldOutputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="field-output-data"]'
                    );
                    expect(fieldOutputs).toHaveLength(3);
                    fieldOutputs.forEach((fieldOutput, index) => {
                        expect(fieldOutput.label).toBe(fields[index].label);
                        expect(fieldOutput.type).toBe(
                            fields[index].computedType
                        );
                        expect(fieldOutput.value).toBe(fields[index].value);
                    });
                });
            });
        });

        describe('Field Attributes', () => {
            it('Passed to the component', () => {
                const fieldAttributes = { variant: 'label-inline' };
                element.fields = [
                    {
                        label: 'Name',
                        type: 'text',
                        value: 'Item 1'
                    }
                ];
                element.fieldAttributes = fieldAttributes;

                return Promise.resolve().then(() => {
                    const fieldOutputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="field-output-data"]'
                    );
                    expect(fieldOutputs).toHaveLength(1);
                    expect(fieldOutputs[0].variant).toBe('label-inline');
                });
            });
        });

        describe('Icons', () => {
            it('Passed to the component', () => {
                element.icons = [
                    {
                        key: 'icon1',
                        name: 'standard:account'
                    }
                ];
                return Promise.resolve().then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-kanban__tile_icon"]'
                    );
                    expect(icons).toHaveLength(1);
                    expect(icons[0].iconName).toBe('standard:account');
                });
            });
        });

        describe('Image Attributes', () => {
            it('Style', () => {
                const imageAttributes = {
                    position: 'top',
                    height: 500,
                    cropPositionX: 25,
                    cropPositionY: 25,
                    cropFit: 'cover'
                };
                const src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.coverImage = src;
                element.imageAttributes = imageAttributes;

                return Promise.resolve().then(() => {
                    const coverImage = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_image_top"]'
                    );
                    expect(coverImage).toBeTruthy();
                    expect(coverImage.style.height).toBe('500px');
                    expect(coverImage.style.objectPosition).toBe('25%25%');
                    expect(coverImage.style.objectFit).toBe('cover');
                });
            });

            it('Cover Image - Position top', () => {
                const src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.coverImage = src;
                element.imageAttributes = { position: 'top' };

                return Promise.resolve().then(() => {
                    const coverImage = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_image_top"]'
                    );
                    expect(coverImage).toBeTruthy();
                    expect(coverImage.src).toBe(src);
                });
            });

            it('Cover Image - Position bottom', () => {
                const src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.coverImage = src;
                element.imageAttributes = { position: 'bottom' };

                return Promise.resolve().then(() => {
                    const coverImage = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_image_bottom"]'
                    );
                    expect(coverImage).toBeTruthy();
                    expect(coverImage.src).toBe(src);
                });
            });
        });

        describe('Infos', () => {
            it('Passed to the component', () => {
                element.infos = [
                    {
                        key: 'info1',
                        label: 'some text'
                    },
                    {
                        key: 'info2',
                        label: 'some url',
                        href: 'https://www.salesforce.com'
                    }
                ];
                return Promise.resolve().then(() => {
                    const formattedUrl = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-kanban__tile_info_url"]'
                    );
                    const infos = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-kanban__tile_info"]'
                    );
                    expect(formattedUrl).toHaveLength(1);
                    expect(formattedUrl[0].label).toBe('some url');
                    expect(formattedUrl[0].value).toBe(
                        'https://www.salesforce.com'
                    );
                    expect(infos).toHaveLength(1);
                    expect(infos[0].textContent).toBe('some text');
                });
            });
        });

        describe('Is Draggable', () => {
            it('True', () => {
                element.isDraggable = true;

                return Promise.resolve().then(() => {
                    const tile = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-tile"]'
                    );
                    expect(tile.classList).not.toContain(
                        'avonni-kanban__tile_disabled_drag'
                    );
                });
            });

            it('False', () => {
                element.isDraggable = false;

                return Promise.resolve().then(() => {
                    const tile = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-tile"]'
                    );
                    expect(tile.classList).toContain(
                        'avonni-kanban__tile_disabled_drag'
                    );
                });
            });
        });

        describe('Start Date', () => {
            it('Passed to the component', () => {
                element.startDate = startDate;

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_dates"]'
                    );
                    const date = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile-start-date"]'
                    );
                    expect(container).toBeTruthy();
                    expect(date.value.getTime()).toBe(startDate.getTime());
                });
            });
        });

        describe('Title', () => {
            it('Passed to the component', () => {
                element.title = 'some text';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-kanban__tile_title"]'
                    );
                    expect(title.textContent).toBe('some text');
                });
            });

            it('Title Url', () => {
                const url = 'https://www.salesforce.com';
                element.titleUrl = url;
                element.title = 'some text';

                return Promise.resolve().then(() => {
                    const titleUrl = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-url-title"]'
                    );
                    expect(titleUrl.title).toBe('some text');
                    expect(titleUrl.value).toBe(url);
                });
            });
        });

        describe('Warning Icon', () => {
            it('Passed to the component', () => {
                element.warningIcon = 'utility:warning';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-warning"]'
                    );
                    expect(icon.iconName).toBe('utility:warning');
                });
            });
        });
    });

    describe('Events', () => {
        it('actionclick', () => {
            element.name = 'tile1';
            element.actions = ACTIONS;

            const handler = jest.fn();
            element.addEventListener('actionclick', handler);

            return Promise.resolve().then(() => {
                const actionMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-kanban__action-menu"]'
                );
                actionMenu.dispatchEvent(
                    new CustomEvent('select', {
                        detail: { value: 'action2' }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe('action2');
                expect(call.detail.targetName).toBe('tile1');
                expect(call.bubbles).toBeTruthy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            });
        });
    });
});
