import { createElement } from 'lwc';
import PrimitiveTreeItem from '../primitiveTreeItem';

const ACTIONS = [
    {
        label: 'Some action',
        name: 'Standard.Tree.Edit',
        iconName: 'utility:apps',
        visible: true
    },
    {
        label: 'Some other action',
        name: 'someOtherAction',
        iconName: 'utility:all'
    },
    {
        label: 'Some third action',
        name: 'Standard.Tree.Delete'
    },
    {
        label: 'Some fourth action',
        name: 'someFourthAction',
        visible: true,
        iconName: 'standard:user'
    }
];

const FIELDS = [
    {
        label: 'Some field',
        value: 'Some value'
    },
    {
        label: 'Some number',
        value: 45,
        type: 'number',
        typeAttributes: {
            minimumIntegerDigits: 2
        }
    }
];

const ITEMS = [
    {
        actions: ACTIONS,
        children: [
            {
                label: 'Child 1.1',
                href: '#child1-1',
                name: 'child1-1'
            }
        ],
        disabled: true,
        href: '#child1',
        isLeaf: false,
        key: '2.1',
        label: 'First child',
        level: 2,
        name: 'child1'
    },
    {
        actions: [...ACTIONS, { name: 'customAction' }],
        avatar: {
            fallbackIconName: 'utility:user'
        },
        children: [],
        expanded: true,
        fields: FIELDS,
        isLeaf: false,
        isLoading: true,
        key: '2.2',
        label: 'Second child',
        level: 2,
        name: 'child2'
    },
    {
        actions: ACTIONS,
        children: [],
        href: '#child3',
        isLeaf: true,
        key: '2.3',
        label: 'Third child',
        level: 2,
        metatext: 'Some metatext',
        name: 'child3',
        selected: true
    }
];

let element;
describe('Primitive Tree Item', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.actions).toEqual([]);
        expect(element.actionsWhenDisabled).toEqual([]);
        expect(element.allowInlineEdit).toBeFalsy();
        expect(element.avatar).toBeUndefined();
        expect(element.childItems).toEqual([]);
        expect(element.collapseDisabled).toBeFalsy();
        expect(element.color).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.editableFields).toEqual([
            'label',
            'metatext',
            'name',
            'href',
            'expanded',
            'disabled',
            'isLoading'
        ]);
        expect(element.expanded).toBeFalsy();
        expect(element.fields).toEqual([]);
        expect(element.hiddenActions).toEqual([]);
        expect(element.href).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.independentMultiSelect).toBeFalsy();
        expect(element.indeterminate).toBeFalsy();
        expect(element.isLeaf).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.level).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBeUndefined();
        expect(element.metatext).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.nodeKey).toBeUndefined();
        expect(element.noSlots).toBeFalsy();
        expect(element.selected).toBeFalsy();
        expect(element.showCheckbox).toBeFalsy();
        expect(element.sortable).toBeFalsy();
        expect(element.unselectable).toBeFalsy();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // actions
    // Depends on disabled
    it('actions', () => {
        element.actions = ACTIONS;

        return Promise.resolve()
            .then(() => {
                const icons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                expect(icons).toHaveLength(2);
                expect(icons[0].alternativeText).toBe(ACTIONS[0].label);
                expect(icons[0].iconName).toBe(ACTIONS[0].iconName);
                expect(icons[0].name).toBe(ACTIONS[0].name);
                expect(icons[1].alternativeText).toBe(ACTIONS[3].label);
                expect(icons[1].iconName).toBe(ACTIONS[3].iconName);
                expect(icons[1].name).toBe(ACTIONS[3].name);

                const menuItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item-action"]'
                );
                expect(menuItems).toHaveLength(2);
                expect(menuItems[0].label).toBe(ACTIONS[1].label);
                expect(menuItems[0].value).toBe(ACTIONS[1].name);
                expect(menuItems[0].iconName).toBe(ACTIONS[1].iconName);
                expect(menuItems[1].label).toBe(ACTIONS[2].label);
                expect(menuItems[1].value).toBe(ACTIONS[2].name);
                expect(menuItems[1].iconName).toBe(ACTIONS[2].iconName);

                element.disabled = true;
            })
            .then(() => {
                const icons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                const menuItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item-action"]'
                );

                expect(icons).toHaveLength(0);
                expect(menuItems).toHaveLength(0);
            });
    });

    it('Hide and show action buttons and menu', () => {
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="div-header"]'
            );
            const buttons = header.querySelector(
                '[data-element-id="div-actions"]'
            );
            expect(buttons.classList).toContain(
                'avonni-primitive-tree-item__actions'
            );

            // Show buttons on header hover
            header.dispatchEvent(new CustomEvent('mouseenter'));
            expect(buttons.style.opacity).toBe('1');

            // Open menu
            const menu = header.querySelector(
                '[data-element-id="avonni-button-menu"]'
            );
            menu.dispatchEvent(new CustomEvent('open'));
            const spy = jest.spyOn(menu, 'close');

            // Hide buttons and close menu on header leave
            header.dispatchEvent(new CustomEvent('mouseleave'));
            expect(buttons.style.opacity).toBe('0');
            expect(spy).toHaveBeenCalled();

            // Show buttons on header focus
            header.dispatchEvent(new CustomEvent('focusin'));
            expect(buttons.style.opacity).toBe('1');

            // Hide buttons on action menu blur
            menu.dispatchEvent(new CustomEvent('blur'));
            expect(buttons.style.opacity).toBe('0');
        });
    });

    it('Action buttons do not display actions that are in hiddenActions', () => {
        element.hiddenActions = ['Standard.Tree.Edit', 'Standard.Tree.Delete'];
        element.actions = ACTIONS;
        element.actionsWhenDisabled = ACTIONS;

        return Promise.resolve()
            .then(() => {
                const icons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                expect(icons).toHaveLength(1);
                expect(icons[0].alternativeText).toBe(ACTIONS[3].label);
                expect(icons[0].iconName).toBe(ACTIONS[3].iconName);
                expect(icons[0].name).toBe(ACTIONS[3].name);

                const menuItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item-action"]'
                );
                expect(menuItems).toHaveLength(1);
                expect(menuItems[0].label).toBe(ACTIONS[1].label);
                expect(menuItems[0].value).toBe(ACTIONS[1].name);
                expect(menuItems[0].iconName).toBe(ACTIONS[1].iconName);

                element.disabled = true;
            })
            .then(() => {
                const icons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                expect(icons).toHaveLength(1);
                expect(icons[0].alternativeText).toBe(ACTIONS[3].label);
                expect(icons[0].iconName).toBe(ACTIONS[3].iconName);
                expect(icons[0].name).toBe(ACTIONS[3].name);

                const menuItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item-action"]'
                );
                expect(menuItems).toHaveLength(1);
                expect(menuItems[0].label).toBe(ACTIONS[1].label);
                expect(menuItems[0].value).toBe(ACTIONS[1].name);
                expect(menuItems[0].iconName).toBe(ACTIONS[1].iconName);
            });
    });

    // actions-when-disabled
    // Depends on disabled
    it('actionsWhenDisabled', () => {
        element.actionsWhenDisabled = ACTIONS;
        element.disabled = true;

        return Promise.resolve()
            .then(() => {
                const icons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                expect(icons).toHaveLength(2);
                expect(icons[0].alternativeText).toBe(ACTIONS[0].label);
                expect(icons[0].iconName).toBe(ACTIONS[0].iconName);
                expect(icons[0].name).toBe(ACTIONS[0].name);
                expect(icons[1].alternativeText).toBe(ACTIONS[3].label);
                expect(icons[1].iconName).toBe(ACTIONS[3].iconName);
                expect(icons[1].name).toBe(ACTIONS[3].name);

                const menuItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item-action"]'
                );
                expect(menuItems).toHaveLength(2);
                expect(menuItems[0].label).toBe(ACTIONS[1].label);
                expect(menuItems[0].value).toBe(ACTIONS[1].name);
                expect(menuItems[0].iconName).toBe(ACTIONS[1].iconName);
                expect(menuItems[1].label).toBe(ACTIONS[2].label);
                expect(menuItems[1].value).toBe(ACTIONS[2].name);
                expect(menuItems[1].iconName).toBe(ACTIONS[2].iconName);

                element.disabled = false;
            })
            .then(() => {
                const icons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                const menuItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item-action"]'
                );

                expect(icons).toHaveLength(0);
                expect(menuItems).toHaveLength(0);
            });
    });

    // allow-inline-edit
    // Depends on label and href
    it('allowInlineEdit', () => {
        element.allowInlineEdit = true;
        element.label = 'Some label';
        element.href = 'https://www.salesforce.com';

        return Promise.resolve()
            .then(() => {
                const link = element.shadowRoot.querySelector(
                    '[data-element-id="a-label-link"]'
                );
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-inline-label"]'
                );
                expect(link).toBeFalsy();
                expect(input).toBeFalsy();

                const label = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                label.dispatchEvent(new CustomEvent('dblclick'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-inline-label"]'
                );
                expect(input).toBeTruthy();
            });
    });

    it('allowInlineEdit triggered by keyboard', () => {
        element.allowInlineEdit = true;
        const event = new CustomEvent('keydown');
        event.keyCode = 13;
        element.dispatchEvent(event);

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-inline-label"]'
            );
            expect(input).toBeTruthy();
        });
    });

    // avatar
    it('avatar', () => {
        const avatar = {
            alternativeText: 'some alt text',
            fallbackIconName: 'utility:apps',
            initials: 'AB',
            presence: 'online',
            presencePosition: 'top-right',
            size: 'large',
            src: 'https://www.salesforce.com/resource/1234.png',
            variant: 'circle'
        };
        element.avatar = avatar;

        return Promise.resolve().then(() => {
            const avatarElement = element.shadowRoot.querySelector(
                '[data-element-id="avonni-avatar"]'
            );
            expect(avatarElement).toBeTruthy();
            expect(avatarElement.alternativeText).toBe(avatar.alternativeText);
            expect(avatarElement.fallbackIconName).toBe(
                avatar.fallbackIconName
            );
            expect(avatarElement.initials).toBe(avatar.initials);
            expect(avatarElement.presence).toBe(avatar.presence);
            expect(avatarElement.presencePosition).toBe(
                avatar.presencePosition
            );
            expect(avatarElement.size).toBe(avatar.size);
            expect(avatarElement.src).toBe(avatar.src);
            expect(avatarElement.variant).toBe(avatar.variant);
        });
    });

    // child-items
    // Depends on actions, actionsWhenDisabled, epxanded, loadingStateAlternativeText, showCheckbox and sortable
    it('childItems', () => {
        const actionsWhenDisabled = [ACTIONS[0], ACTIONS[3]];
        element.actionsWhenDisabled = actionsWhenDisabled;
        element.allowInlineEdit = true;
        element.childItems = ITEMS;
        element.expanded = true;
        element.loadingStateAlternativeText = 'some alt text';
        element.showCheckbox = true;
        element.sortable = true;

        return Promise.resolve().then(() => {
            const children = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            expect(children).toHaveLength(ITEMS.length);

            children.forEach((child, index) => {
                const item = ITEMS[index];
                expect(child.actions).toEqual(item.actions);
                expect(child.actionsWhenDisabled).toEqual(actionsWhenDisabled);
                expect(child.allowInlineEdit).toBeTruthy();
                expect(child.ariaDisabled).toBe(
                    item.disabled ? item.disabled.toString() : null
                );
                expect(child.ariaExpanded).toBe(
                    item.expanded ? item.expanded.toString() : null
                );
                expect(child.ariaLabel).toBe(item.label);
                expect(child.ariaLevel).toBe(item.level.toString());
                expect(child.avatar).toEqual(item.avatar);
                expect(child.childItems).toEqual(item.children);
                expect(child.disabled).toBe(item.disabled);
                expect(child.expanded).toBe(item.expanded);
                expect(child.fields).toEqual(item.fields);
                expect(child.href).toBe(item.href);
                expect(child.isLeaf).toBe(item.isLeaf);
                expect(child.isLoading).toBe(item.isLoading);
                expect(child.label).toBe(item.label);
                expect(child.level).toBe(item.level);
                expect(child.loadingStateAlternativeText).toBe('some alt text');
                expect(child.metatext).toBe(item.metatext);
                expect(child.name).toBe(item.name);
                expect(child.nodeKey).toBe(item.key);
                expect(child.selected).toBe(item.selected);
                expect(child.showCheckbox).toBeTruthy();
                expect(child.sortable).toBeTruthy();
            });
        });
    });

    it('collapseDisabled', () => {
        element.collapseDisabled = true;

        return Promise.resolve().then(() => {
            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-expand"]'
            );
            expect(expandButton).toBeFalsy();
        });
    });

    // color
    it('color', () => {
        element.color = 'tomato';
        element.showCheckbox = true;

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="span-checkbox"]'
            );
            expect(checkbox.style.cssText).toBe(
                '--slds-c-checkbox-color-border: tomato; --slds-c-checkbox-color-border-checked: tomato;'
            );
        });
    });

    // disabled
    // Depends on allowInlineEdit, childItems, href, fields and expanded
    it('disabled', () => {
        element.allowInlineEdit = true;
        element.childItems = ITEMS;
        element.expanded = true;
        element.disabled = true;
        element.fields = FIELDS;
        element.href = 'https://www.salesforce.com';

        const handler = jest.fn();
        element.addEventListener('privateitemclick', handler);

        return Promise.resolve()
            .then(() => {
                const expandButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-expand"]'
                );
                expect(expandButton.classList).toContain('slds-hidden');

                const children = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-tree-item"]'
                );
                expect(children).toHaveLength(0);

                const fields = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-output-data-field"]'
                );
                expect(fields).toHaveLength(0);

                const links = element.shadowRoot.querySelectorAll(
                    '[data-group-name="link"]'
                );
                expect(links).toHaveLength(0);

                const label = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                label.click();
                expect(handler).toHaveBeenCalledTimes(0);
                label.dispatchEvent(new CustomEvent('dblclick'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-inline-label"]'
                );
                expect(input).toBeFalsy();
            });
    });

    // edit-fields
    // Depends on actions
    it('editableFields', () => {
        element.editableFields = ['disabled', 'label'];
        element.actions = [
            {
                label: 'Edit',
                name: 'Standard.Tree.Edit',
                visible: true,
                iconName: 'utility:edit'
            }
        ];

        return Promise.resolve()
            .then(() => {
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                action.click();
            })
            .then(() => {
                const fields = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-input-edit-field"]'
                );
                expect(fields).toHaveLength(2);
                expect(fields[0].label).toBe('Disabled');
                expect(fields[0].name).toBe('disabled');
                expect(fields[0].required).toBeFalsy();
                expect(fields[0].type).toBe('toggle');
                expect(fields[1].label).toBe('Label');
                expect(fields[1].name).toBe('label');
                expect(fields[1].required).toBeTruthy();
                expect(fields[1].type).toBe('text');
            });
    });

    // expanded
    // Depends on fields and childItems
    it('expanded = false', () => {
        element.fields = FIELDS;
        element.expanded = false;
        element.childItems = ITEMS;

        return Promise.resolve().then(() => {
            const fields = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-output-data-field"]'
            );
            expect(fields).toHaveLength(0);

            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-expand"]'
            );
            expect(expandButton.classList).not.toContain(
                'avonni-primitive-tree-item__chevron_expanded'
            );
            expect(expandButton.ariaExpanded).toBe('false');
            expect(expandButton.alternativeText).toBe('Expand Branch');
            expect(expandButton.title).toBe('Expand Branch');

            const children = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            expect(children).toHaveLength(0);
        });
    });

    it('expanded = true', () => {
        element.fields = FIELDS;
        element.expanded = true;
        element.childItems = ITEMS;

        return Promise.resolve().then(() => {
            const fields = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-output-data-field"]'
            );
            expect(fields).toHaveLength(FIELDS.length);

            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-expand"]'
            );
            expect(expandButton.classList).toContain(
                'avonni-primitive-tree-item__chevron_expanded'
            );
            expect(expandButton.ariaExpanded).toBe('true');
            expect(expandButton.alternativeText).toBe('Collapse Branch');
            expect(expandButton.title).toBe('Collapse Branch');

            const children = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            expect(children).toHaveLength(ITEMS.length);
        });
    });

    // fields
    // Depends on expanded
    it('fields', () => {
        element.fields = FIELDS;
        element.expanded = true;

        return Promise.resolve().then(() => {
            const fields = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-output-data-field"]'
            );
            expect(fields).toHaveLength(FIELDS.length);
            fields.forEach((field, index) => {
                expect(field.label).toBe(FIELDS[index].label);
                expect(field.type).toBe(FIELDS[index].type);
                expect(field.typeAttributes).toEqual(
                    FIELDS[index].typeAttributes
                );
                expect(field.value).toBe(FIELDS[index].value);
            });
        });
    });

    // href, label and metatext
    // Depends on metatext
    it('href, label and metatext', () => {
        element.label = 'Some label';
        element.href = 'https://www.salesforce.com/';
        element.metatext = 'some meta';

        return Promise.resolve().then(() => {
            const links = element.shadowRoot.querySelectorAll(
                '[data-group-name="link"]'
            );
            expect(links).toHaveLength(2);
            links.forEach((link) =>
                expect(link.href).toBe('https://www.salesforce.com/')
            );
            expect(links[0].textContent).toBe('Some label');
            expect(links[1].textContent).toBe('some meta');

            const noLinkLabel = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(noLinkLabel).toBeFalsy();

            const noLinkMeta = element.shadowRoot.querySelector(
                '[data-element-id="span-metatext"]'
            );
            expect(noLinkMeta).toBeFalsy();
        });
    });

    it('label and metatext with no href', () => {
        element.label = 'Some label';
        element.metatext = 'some meta';

        return Promise.resolve().then(() => {
            const links = element.shadowRoot.querySelectorAll(
                '[data-group-name="link"]'
            );
            expect(links).toHaveLength(0);

            const noLinkLabel = element.shadowRoot.querySelector(
                '[data-element-id="span-label"]'
            );
            expect(noLinkLabel).toBeTruthy();
            expect(noLinkLabel.textContent).toBe('Some label');

            const noLinkMeta = element.shadowRoot.querySelector(
                '[data-element-id="span-metatext"]'
            );
            expect(noLinkMeta).toBeTruthy();
            expect(noLinkMeta.textContent).toBe('some meta');
        });
    });

    // icon-name
    it('iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-label"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // indeterminate
    it('indeterminate', () => {
        element.indeterminate = true;
        element.showCheckbox = true;

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeTruthy();
        });
    });

    // is-leaf
    it('isLeaf = true', () => {
        element.isLeaf = true;

        return Promise.resolve().then(() => {
            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-expand"]'
            );
            expect(expandButton.classList).toContain('slds-hidden');
        });
    });

    it('isLeaf = false', () => {
        element.isLeaf = false;

        return Promise.resolve().then(() => {
            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-expand"]'
            );
            expect(expandButton.classList).not.toContain('slds-hidden');
        });
    });

    // is-loading
    // Depends on expanded
    it('isLoading = true', () => {
        element.isLoading = true;
        element.expanded = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner-loading"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    it('isLoading = false', () => {
        element.isLoading = false;
        element.expanded = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner-loading"]'
            );
            expect(spinner).toBeFalsy();
        });
    });

    // level
    it('level', () => {
        element.level = 3;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.style.cssText).toContain(
                '--avonni-tree-item-spacing-inline-left: 3rem;'
            );
        });
    });

    // loading-state-alternative-text
    // Depends on isLoading and expanded
    it('loadingStateAlternativeText', () => {
        element.isLoading = true;
        element.expanded = true;
        element.loadingStateAlternativeText = 'Some alt text';

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner-loading"]'
            );
            expect(spinner.alternativeText).toBe('Some alt text');
        });
    });

    // selected, independent-multi-select, show-checkbox and unselectable
    // Depends on childItems
    it('selected = false, with showCheckbox and some selected childItems', () => {
        element.independentMultiSelect = false;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'not selected',
                name: 'notSelected'
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeFalsy();
            expect(element.ariaSelected).toBe('false');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeTruthy();
            expect(checkbox.checked).toBeFalsy();
        });
    });

    it('selected = false, with showCheckbox, some selected childItems and independentMultiSelect', () => {
        element.independentMultiSelect = true;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'not selected',
                name: 'notSelected'
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeFalsy();
            expect(element.ariaSelected).toBe('false');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeFalsy();
            expect(checkbox.checked).toBeFalsy();
        });
    });

    it('selected = false, with showCheckbox and all selected childItems', () => {
        element.independentMultiSelect = false;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'selected too',
                name: 'selectedToo',
                selected: true
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeTruthy();
            expect(element.ariaSelected).toBe('true');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeFalsy();
            expect(checkbox.checked).toBeTruthy();
        });
    });

    it('selected = false, with showCheckbox, all selected childItems and independentMultiSelect', () => {
        element.independentMultiSelect = true;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'selected too',
                name: 'selectedToo',
                selected: true
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeFalsy();
            expect(element.ariaSelected).toBe('false');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeFalsy();
            expect(checkbox.checked).toBeFalsy();
        });
    });

    it('selected = false, with showCheckbox, some selected childItems and unselectable', () => {
        element.unselectable = true;
        element.independentMultiSelect = false;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'not selected',
                name: 'notSelected'
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeFalsy();
            expect(element.ariaSelected).toBe('false');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeFalsy();
            expect(checkbox.checked).toBeFalsy();
        });
    });

    it('selected = false, with showCheckbox, all selected childItems and unselectable', () => {
        element.unselectable = true;
        element.independentMultiSelect = false;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'selected too',
                name: 'selectedToo',
                selected: true
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeFalsy();
            expect(element.ariaSelected).toBe('false');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeFalsy();
            expect(checkbox.checked).toBeFalsy();
        });
    });

    it('selected = true, with showCheckbox, all selected childItems and unselectable direct child', () => {
        element.independentMultiSelect = false;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'selected too',
                name: 'selectedToo',
                unselectable: true,
                children: [
                    {
                        label: 'Child 1.1',
                        href: '#child1-1',
                        name: 'child1-1',
                        selected: true
                    }
                ]
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeTruthy();
            expect(element.ariaSelected).toBe('true');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeFalsy();
            expect(checkbox.checked).toBeTruthy();
        });
    });

    it('selected = true, with showCheckbox, some selected childItems and unselectable direct child', () => {
        element.independentMultiSelect = false;
        element.selected = false;
        element.showCheckbox = true;
        element.childItems = [
            {
                label: 'selected too',
                name: 'selectedToo',
                unselectable: true,
                children: [
                    {
                        label: 'Child 1.1',
                        href: '#child1-1',
                        name: 'child1-1',
                        unselectable: true,
                        children: [
                            {
                                label: 'Child 1.1.1',
                                href: '#child1-1-1',
                                name: 'child1-1-1',
                                selected: false
                            }
                        ],
                        selected: true
                    }
                ]
            },
            {
                label: 'selected',
                name: 'selected',
                selected: true
            }
        ];

        return Promise.resolve().then(() => {
            expect(element.selected).toBeFalsy();
            expect(element.ariaSelected).toBe('false');
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.indeterminate).toBeTruthy();
            expect(checkbox.checked).toBeFalsy();
        });
    });

    // sortable and privatemousedown
    // Depends on nodeKey and name
    it('sortable = false should not allow privatemousedown event', () => {
        element.sortable = false;
        const handler = jest.fn();
        element.addEventListener('privatemousedown', handler);

        element.dispatchEvent(new CustomEvent('mousedown'));
        expect(handler).not.toHaveBeenCalled();
    });

    it('sortable = true should allow privatemousedown event', () => {
        element.sortable = true;
        element.name = 'someName';
        element.nodeKey = 'uniqueKey';
        const handler = jest.fn();
        element.addEventListener('privatemousedown', handler);

        element.dispatchEvent(new CustomEvent('mousedown'));
        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.key).toBe('uniqueKey');
        expect(handler.mock.calls[0][0].detail.name).toBe('someName');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
    });

    it('sortable = true should prevent links from being dragged', () => {
        element.sortable = true;
        element.href = 'some-url';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a-label-link"]'
            );
            const event = new CustomEvent('mousedown');
            const spy = jest.spyOn(event, 'preventDefault');
            link.dispatchEvent(event);
            expect(spy).toHaveBeenCalled();
        });
    });

    // unselectable
    it('unselectable checkbox', () => {
        element.unselectable = true;
        element.showCheckbox = true;

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            expect(checkbox.disabled).toBeTruthy();
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    it('focusContent() method, expand button', () => {
        return Promise.resolve().then(() => {
            const expandButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-expand"]'
            );
            const spy = jest.spyOn(expandButton, 'focus');
            element.focusContent();
            expect(spy).toHaveBeenCalled();
        });
    });

    it('focusContent() method, checkbox', () => {
        element.disabled = true;
        element.showCheckbox = true;

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="input-checkbox"]'
            );
            const spy = jest.spyOn(checkbox, 'focus');
            element.focusContent();
            expect(spy).toHaveBeenCalled();
        });
    });

    it('focusContent() method, href', () => {
        element.isLeaf = true;
        element.href = 'some link';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-group-name="link"]'
            );
            const spy = jest.spyOn(link, 'focus');
            element.focusContent();
            expect(spy).toHaveBeenCalled();
        });
    });

    it('focusContent() method, button actions', () => {
        element.isLeaf = true;
        element.actions = [
            {
                label: 'some label',
                name: 'someName',
                iconName: 'utility:add',
                visible: true
            }
        ];

        return Promise.resolve().then(() => {
            const action = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-action"]'
            );
            const spy = jest.spyOn(action, 'focus');
            element.focusContent();
            expect(spy).toHaveBeenCalled();
        });
    });

    it('focusContent() method, actions menu', () => {
        element.isLeaf = true;
        element.actions = [
            {
                label: 'some label',
                name: 'someName',
                iconName: 'utility:add'
            }
        ];

        return Promise.resolve().then(() => {
            const menu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-button-menu"]'
            );
            const spy = jest.spyOn(menu, 'focus');
            element.focusContent();
            expect(spy).toHaveBeenCalled();
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // change
    // Depends on allowInlineEdit, nodeKey, isLeaf, label and actions
    it('change event', () => {
        element.actions = ACTIONS;
        element.isLeaf = true;
        element.nodeKey = 'someKey';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                action.click();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeTruthy();

                const inputs = popover.querySelectorAll(
                    '[data-element-id="lightning-input-edit-field"]'
                );
                expect(inputs).toHaveLength(7);

                const label = popover.querySelector('[data-name="label"]');
                const metatext = popover.querySelector(
                    '[data-name="metatext"]'
                );
                const name = popover.querySelector('[data-name="name"]');
                const href = popover.querySelector('[data-name="href"]');
                const expanded = popover.querySelector(
                    '[data-name="expanded"]'
                );
                const disabled = popover.querySelector(
                    '[data-name="disabled"]'
                );
                const isLoading = popover.querySelector(
                    '[data-name="isLoading"]'
                );
                label.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { value: 'new label' }
                    })
                );
                metatext.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { value: 'new meta' }
                    })
                );
                name.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { value: 'new name' }
                    })
                );
                href.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { value: '#link' }
                    })
                );
                expanded.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { checked: true }
                    })
                );
                disabled.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { checked: true }
                    })
                );
                isLoading.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { checked: true }
                    })
                );

                const done = popover.querySelector(
                    '[data-element-id="lightning-button-done"]'
                );
                done.click();
                expect(element.isLeaf).toBeFalsy();
                expect(handler).toHaveBeenCalledTimes(1);
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.values.disabled).toBeTruthy();
                expect(detail.values.expanded).toBeTruthy();
                expect(detail.values.isLoading).toBeTruthy();
                expect(detail.values.href).toBe('#link');
                expect(detail.values.label).toBe('new label');
                expect(detail.values.metatext).toBe('new meta');
                expect(detail.values.name).toBe('new name');
                expect(typeof detail.bounds).toBe('object');
                expect(detail.key).toBe('someKey');
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].composed).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeFalsy();

                // The visible actions have been updated
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                expect(action).toBeFalsy();
            });
    });

    it('change event, invalid input disables done button', () => {
        element.actions = ACTIONS;

        return Promise.resolve()
            .then(() => {
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                action.click();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                const name = popover.querySelector('[data-name="name"]');
                name.value = '';
                name.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                const done = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-done"]'
                );
                expect(done.disabled).toBeTruthy();
            });
    });

    it('change event for inline editing', () => {
        element.allowInlineEdit = true;
        element.label = 'Some label';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const label = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                label.dispatchEvent(new CustomEvent('dblclick'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-inline-label"]'
                );
                input.value = 'New label';
                const keyup = new CustomEvent('keyup');
                keyup.key = 'Enter';
                input.dispatchEvent(keyup);

                expect(element.label).toBe('New label');
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.values.label).toBe(
                    'New label'
                );
            });
    });

    it('change event, invalid input prevent inline editing from saving', () => {
        element.allowInlineEdit = true;
        element.label = 'Some label';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const label = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                label.dispatchEvent(new CustomEvent('dblclick'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-inline-label"]'
                );
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-inline-save"]'
                );
                input.value = '';
                saveButton.click();
                expect(handler).not.toHaveBeenCalled();
            });
    });

    it('Cancel change event for inline editing if "Escape" is pressed', () => {
        element.allowInlineEdit = true;
        element.label = 'Some label';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const label = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                label.dispatchEvent(new CustomEvent('dblclick'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-inline-label"]'
                );
                input.value = 'New label';
                const keydown = new CustomEvent('keydown');
                keydown.key = 'Escape';
                input.dispatchEvent(keydown);

                expect(element.label).toBe('Some label');
                expect(handler).not.toHaveBeenCalled();
            });
    });

    // focus event
    // Depends on nodeKey
    it('focus event', () => {
        element.nodeKey = 'uniqueKey';
        const handler = jest.fn();
        element.addEventListener('focus', handler);

        const expandButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-expand"]'
        );
        expandButton.dispatchEvent(new CustomEvent('focus'));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler.mock.calls[0][0].detail.key).toBe('uniqueKey');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
    });

    it('Trap focus inside the edit popover', () => {
        element.actions = ACTIONS;

        return Promise.resolve()
            .then(() => {
                const action = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                action.click();
            })
            .then(() => {
                const closeButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-close"]'
                );
                const doneButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-done"]'
                );
                const spyDone = jest.spyOn(doneButton, 'focus');
                const spyClose = jest.spyOn(closeButton, 'focus');

                const event = new CustomEvent('keydown');
                event.keyCode = 9;
                event.shiftKey = true;
                closeButton.dispatchEvent(event);
                expect(spyDone).toHaveBeenCalled();

                event.shiftKey = false;
                doneButton.dispatchEvent(event);
                expect(spyClose).toHaveBeenCalled();
            });
    });

    // privateactionclick
    // Depends on actions and nodeKey
    it('privateactionclick event', () => {
        element.actions = ACTIONS;
        element.nodeKey = 'someKey';
        const handler = jest.fn();
        element.addEventListener('privateactionclick', handler);

        return Promise.resolve()
            .then(() => {
                const buttonAction = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-action"]'
                );
                buttonAction.click();

                expect(handler).toHaveBeenCalledTimes(1);
                expect(typeof handler.mock.calls[0][0].detail.bounds).toBe(
                    'object'
                );
                expect(handler.mock.calls[0][0].detail.key).toBe('someKey');
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    'Standard.Tree.Edit'
                );
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                expect(handler.mock.calls[0][0].composed).toBeTruthy();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeTruthy();

                const menuAction = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item-action"]'
                );
                menuAction.dispatchEvent(
                    new CustomEvent('select', {
                        detail: { value: ACTIONS[1].name },
                        bubbles: true
                    })
                );
                expect(handler).toHaveBeenCalledTimes(2);
                expect(handler.mock.calls[1][0].detail.name).toBe(
                    ACTIONS[1].name
                );
            });
    });

    // privateitemclick
    // Depends on nodeKey, name, showCheckbox, selected, childItems and href
    it('privateitemclick event on expand button', () => {
        element.nodeKey = 'someKey';
        element.name = 'someName';
        const handler = jest.fn();
        element.addEventListener('privateitemclick', handler);

        const expandButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-expand"]'
        );
        expandButton.click();

        expect(handler).toHaveBeenCalled();
        const detail = handler.mock.calls[0][0].detail;
        expect(typeof detail.bounds).toBe('object');
        expect(detail.key).toBe('someKey');
        expect(detail.name).toBe('someName');
        expect(detail.target).toBe('chevron');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
    });

    it('privateitemclick event on label', () => {
        element.showCheckbox = true;
        element.childItems = ITEMS;
        element.label = 'boubou';
        const handler = jest.fn();
        element.addEventListener('privateitemclick', handler);

        return Promise.resolve()
            .then(() => {
                const checkbox = element.shadowRoot.querySelector(
                    '[data-element-id="input-checkbox"]'
                );
                expect(checkbox.indeterminate).toBeTruthy();

                const label = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                label.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.target).toBe('anchor');
                expect(element.selected).toBeTruthy();
            })
            .then(() => {
                const checkbox = element.shadowRoot.querySelector(
                    '[data-element-id="input-checkbox"]'
                );
                expect(checkbox.indeterminate).toBeFalsy();
                expect(checkbox.checked).toBeTruthy();
            });
    });

    it('privateitemclick event on label, unselectable', () => {
        element.unselectable = true;
        element.showCheckbox = true;
        element.childItems = ITEMS;
        element.label = 'boubou';
        const handler = jest.fn();
        element.addEventListener('privateitemclick', handler);

        return Promise.resolve()
            .then(() => {
                const checkbox = element.shadowRoot.querySelector(
                    '[data-element-id="input-checkbox"]'
                );
                expect(checkbox.indeterminate).toBeFalsy();

                const label = element.shadowRoot.querySelector(
                    '[data-element-id="span-label"]'
                );
                label.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.target).toBe('anchor');
                expect(element.selected).toBeFalsy();
            })
            .then(() => {
                const checkbox = element.shadowRoot.querySelector(
                    '[data-element-id="input-checkbox"]'
                );
                expect(checkbox.indeterminate).toBeFalsy();
                expect(checkbox.checked).toBeFalsy();
            });
    });

    it('privateitemclick event dispatched by keyboard', () => {
        element.href = '#link';
        const handler = jest.fn();
        element.addEventListener('privateitemclick', handler);

        return Promise.resolve().then(() => {
            const event = new CustomEvent('keydown');
            event.keyCode = 13;
            element.dispatchEvent(event);

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.target).toBe('anchor');
        });
    });

    // privateitemloadmore
    it('privateitemloadmore event', () => {
        element.enableInfiniteLoading = true;
        element.expanded = true;
        element.nodeKey = 'someKey';

        const handler = jest.fn();
        element.addEventListener('privateitemloadmore', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-load-more"]'
            );
            button.click();
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.key).toBe('someKey');
            expect(call.bubbles).toBeTruthy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeTruthy();
        });
    });

    // privateitemkeydown
    // Depends on nodeKey
    it('privateitemkeydown event', () => {
        element.nodeKey = 'someKey';
        const handler = jest.fn();
        element.addEventListener('privateitemkeydown', handler);

        const event = new CustomEvent('keydown');
        event.keyCode = 38;
        element.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.key).toBe('someKey');
        expect(handler.mock.calls[0][0].detail.keyCode).toBe(38);
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
    });

    // privateregisteritem
    // Depends on nodeKey, expanded and childItems
    it('privateregisteritem event', () => {
        const otherElement = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        otherElement.nodeKey = 'someKey';
        otherElement.expanded = true;
        otherElement.childItems = ITEMS;
        const handler = jest.fn();
        otherElement.addEventListener('privateregisteritem', handler);
        document.body.appendChild(otherElement);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.key).toBe('someKey');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();

        const callbacks = handler.mock.calls[0][0].detail;
        expect(callbacks.bounds).toBeTruthy();
        expect(callbacks.focus).toBeTruthy();
        expect(callbacks.removeBorder).toBeTruthy();
        expect(callbacks.setBorder).toBeTruthy();
        expect(callbacks.setSelected).toBeTruthy();
    });

    it('privateregisteritem event, bounds callback', () => {
        const otherElement = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        const handler = jest.fn();
        otherElement.addEventListener('privateregisteritem', handler);
        document.body.appendChild(otherElement);

        const callbacks = handler.mock.calls[0][0].detail;
        expect(callbacks.bounds()).toEqual({
            x: 0,
            y: 0,
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0
        });
    });

    it('privateregisteritem event, focus callbacks', () => {
        const otherElement = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        otherElement.expanded = true;
        otherElement.childItems = ITEMS;
        const handler = jest.fn();
        otherElement.addEventListener('privateregisteritem', handler);
        document.body.appendChild(otherElement);

        const callbacks = handler.mock.calls[0][0].detail;

        const child = otherElement.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-tree-item"][data-key="2.1"]'
        );
        expect(child.tabIndex).toBe(-1);
        const spy = jest.spyOn(child, 'focus');

        callbacks.focus('2.1', true, true);
        expect(spy).toHaveBeenCalled();
        expect(child.ariaSelected).toBeTruthy();
        expect(child.tabIndex).toBe(0);
    });

    it('privateregisteritem event, unfocus callbacks', () => {
        const otherElement = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        otherElement.selected = true;
        otherElement.childItems = ITEMS;
        const handler = jest.fn();
        otherElement.addEventListener('privateregisteritem', handler);
        document.body.appendChild(otherElement);

        const callbacks = handler.mock.calls[0][0].detail;
        callbacks.unfocus();
        expect(otherElement.ariaSelected).toBe('false');
    });

    it('privateregisteritem event, setBorder and removeBorder callbacks', () => {
        const otherElement = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        const handler = jest.fn();
        otherElement.addEventListener('privateregisteritem', handler);
        document.body.appendChild(otherElement);

        const item = otherElement.shadowRoot.querySelector(
            '[data-element-id="div-item"]'
        );
        const callbacks = handler.mock.calls[0][0].detail;

        // Valid sorting
        callbacks.setBorder('top', undefined, true);
        expect(item.classList).toContain(
            'avonni-primitive-tree-item__item_border-top'
        );
        callbacks.setBorder('bottom', 3, true);
        expect(item.classList).toContain(
            'avonni-primitive-tree-item__item_border-bottom'
        );
        expect(item.style.cssText).toBe(
            '--avonni-tree-item-spacing-inline-start-border: 3rem;'
        );
        callbacks.setBorder('', undefined, true);
        expect(item.classList).toContain(
            'avonni-primitive-tree-item__item_border'
        );
        callbacks.removeBorder();
        expect(item.classList).not.toContain(
            'avonni-primitive-tree-item__item_border'
        );

        // Invalid sorting
        callbacks.setBorder('top', undefined, false);
        expect(item.classList).toContain(
            'avonni-primitive-tree-item__item_border-top_invalid'
        );
        callbacks.setBorder('bottom', 3, false);
        expect(item.classList).toContain(
            'avonni-primitive-tree-item__item_border-bottom_invalid'
        );
        expect(item.style.cssText).toBe(
            '--avonni-tree-item-spacing-inline-start-border: 3rem;'
        );
        callbacks.setBorder();
        expect(item.classList).toContain(
            'avonni-primitive-tree-item__item_border_invalid'
        );
        otherElement.noSlots = true;
        callbacks.setBorder('', undefined, true);
        expect(item.classList).toContain(
            'avonni-primitive-tree-item__item_border_invalid'
        );
    });

    it('privateregisteritem event, setSelected callback', () => {
        const otherElement = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        const handler = jest.fn();
        otherElement.addEventListener('privateregisteritem', handler);
        document.body.appendChild(otherElement);

        const callbacks = handler.mock.calls[0][0].detail;
        callbacks.setSelected(true);
        expect(otherElement.selected).toBeTruthy();
    });

    it('privateregisteritem event, setSelected callback, unselectable', () => {
        const otherElement = createElement('base-primitive-tree-item', {
            is: PrimitiveTreeItem
        });
        otherElement.unselectable = true;
        const handler = jest.fn();
        otherElement.addEventListener('privateregisteritem', handler);
        document.body.appendChild(otherElement);

        const callbacks = handler.mock.calls[0][0].detail;
        callbacks.setSelected(true);
        expect(otherElement.selected).toBeFalsy();
    });
});
