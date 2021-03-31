import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeArray } from 'c/utilsPrivate';

export default class PrimitiveRelationshipGraphLevel extends LightningElement {
    @api variant;
    @api groupActions;
    @api groupActionsPosition;
    @api groupTheme;
    @api itemActions;
    @api itemTheme;
    @api shrinkIconName;
    @api expandIconName;
    @api activeGroups;

    _groups;
    _selectedGroups;
    _selectedItemName;
    _selectedItem;

    connectedCallback() {
        this.updateSelection();
    }

    renderedCallback() {
        this.updateVerticalLine();
    }

    @api
    get groups() {
        return this._groups;
    }
    set groups(proxy) {
        this._groups = normalizeArray(proxy);
        this.updateSelection();
    }

    @api
    get selectedGroups() {
        return this._selectedGroups;
    }
    set selectedGroups(value) {
        this._selectedGroups = value;
    }

    @api
    get currentLevelHeight() {
        const currentCol = this.template.querySelector(
            '.avonni-relationship-graph__current-level'
        );
        const lastGroup = currentCol.querySelector(
            'c-primitive-relationship-graph-group:last-child'
        );
        if (!currentCol || !lastGroup) return 0;

        const currentColHeight = currentCol.offsetHeight;
        const lastGroupHeight = lastGroup.height;

        return currentColHeight - lastGroupHeight;
    }

    get wrapperClass() {
        return this.variant === 'horizontal' && 'slds-grid';
    }

    get currentLevelClass() {
        return classSet(
            'avonni-relationship-graph__current-level slds-m-left_x-large'
        ).add({
            'slds-grid': this.variant === 'vertical'
        });
    }

    get lineClass() {
        return classSet(
            'avonni-relationship-graph__line slds-m-left_x-large'
        ).add({
            'avonni-relationship-graph__line_active': this.containsActiveItem
        });
    }

    get containsActiveItem() {
        return Array.from(this.groups).some((group) => {
            if (!group.items) return false;

            return group.items.some((item) => item.activeSelection);
        });
    }

    get selectedItemComponent() {
        const groups = this.template.querySelectorAll(
            'c-primitive-relationship-graph-group'
        );

        let selectedItem;
        groups.forEach((group) => {
            const selection = group.selectedItemComponent;
            if (selection) selectedItem = selection;
        });
        return selectedItem;
    }

    updateVerticalLine() {
        // Get the DOM elements
        const dom = this.template;
        const selectedItem = this.selectedItemComponent;
        const child = dom.querySelector('c-primitive-relationship-graph-level');
        const currentCol = dom.querySelector(
            '.avonni-relationship-graph__current-level'
        );
        const line = dom.querySelector('.avonni-relationship-graph__line');

        if (!selectedItem || !child) return;

        // Calculate the heights
        const currentColTop =
            currentCol.getBoundingClientRect().top + window.scrollY;
        const scroll = window.pageYOffset;
        const itemPosition = selectedItem.getBoundingClientRect();
        const itemHeight =
            itemPosition.top + itemPosition.height / 2 + scroll - currentColTop;
        const childHeight = child.currentLevelHeight;

        // Set the line height to the biggest height option
        const height =
            itemHeight > childHeight
                ? `calc(${itemHeight}px - 1.5rem)`
                : `${childHeight}px`;
        line.setAttribute('style', `height: ${height};`);
    }

    updateSelection() {
        if (!this.groups) return;

        const groups = JSON.parse(JSON.stringify(this.groups));
        const selectedGroup = groups.find((group) => group.selected);
        if (selectedGroup && selectedGroup.items) {
            const selectedItem = selectedGroup.items.find(
                (item) => item.selected
            );
            if (selectedItem.groups) this._selectedGroups = selectedItem.groups;
        }
    }

    cleanSelection() {
        this._selectedGroups = undefined;
        const child = this.template.querySelector(
            'c-primitive-relationship-graph-level'
        );
        if (child) child.selectedGroups = undefined;
    }

    dispatchSelectEvent(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: event.detail.name
                }
            })
        );
    }

    dispatchActionClickEvent(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: event.detail
            })
        );
    }

    handleSelect(event) {
        this.cleanSelection();
        this.dispatchSelectEvent(event);
    }

    handleCloseActiveGroup() {
        this.cleanSelection();
    }
}
