import { LightningElement, api } from 'lwc';
import { classSet, normalizeArray } from 'c/utils';

export default class PrimitiveRelationshipGraphLevel extends LightningElement {
    @api actionsMenuAlternativeText;
    @api activeGroups;
    @api expandIconName;
    @api groupActions;
    @api groupActionsPosition;
    @api hasRootHeader = false;
    @api hideItemsCount = false;
    @api isFirstLevel = false;
    @api itemActions;
    @api loadingStateAlternativeText;
    @api noResultsMessage;
    @api shrinkIconName;
    @api variant;

    _groups = [];
    _selectedGroups;
    _selectedItemName;
    _selectedItem;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.updateSelection();
    }

    renderedCallback() {
        this.updateLine();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get currentLevelHeight() {
        const currentLevel = this.currentLevel;
        if (!currentLevel) return 0;

        const lastGroup = currentLevel.querySelector(
            '[data-element-id="avonni-primitive-relationship-graph-group"]:last-child'
        );
        if (!lastGroup) return 0;

        const currentLevelHeight = currentLevel.offsetHeight;
        const lastGroupHeight = lastGroup.height;

        return currentLevelHeight - lastGroupHeight;
    }

    @api
    get currentLevelWidth() {
        if (!this.currentLevel) return 0;
        return this.currentLevel.getBoundingClientRect().width;
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get childLevel() {
        return this.template.querySelector(
            '[data-element-id="avonni-primitive-relationship-graph-level"]'
        );
    }

    get computedCurrentLevelClass() {
        return classSet('current-level').add({
            'slds-grid': this.variant === 'vertical',
            'slds-m-left_x-large':
                this.variant === 'horizontal' &&
                (!this.isFirstLevel ||
                    (this.hasRootHeader && this.isFirstLevel))
        });
    }

    get computedCurrentLevelWrapperClass() {
        return this.variant === 'vertical'
            ? 'slds-show_inline-block'
            : undefined;
    }

    get computedLineClass() {
        return classSet('line').add({
            line_active: this.containsActiveItem,
            line_horizontal: this.variant === 'vertical',
            'slds-m-left_x-large line_vertical': this.variant === 'horizontal'
        });
    }

    get computedWrapperClass() {
        return classSet('').add({
            'slds-grid': this.variant === 'horizontal',
            'slds-show_inline-block': this.variant === 'vertical'
        });
    }

    get containsActiveItem() {
        return Array.from(this.groups).some((group) => {
            if (!group.items) return false;

            return group.items.some((item) => item.activeSelection);
        });
    }

    get currentLevel() {
        return this.template.querySelector('.current-level');
    }

    get hasSelectedGroups() {
        return (
            Array.isArray(this.selectedGroups) && this.selectedGroups.length > 0
        );
    }

    get selectedGroupComponent() {
        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-primitive-relationship-graph-group"]'
        );

        let selectedGroup;
        groups.forEach((group) => {
            const selection = group.selected;
            if (selection) selectedGroup = group;
        });
        return selectedGroup;
    }

    get selectedItemComponent() {
        const groups = this.template.querySelectorAll(
            '[data-element-id="avonni-primitive-relationship-graph-group"]'
        );

        let selectedItem;
        groups.forEach((group) => {
            const selection = group.selectedItemComponent;
            if (selection) selectedItem = selection;
        });
        return selectedItem;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    cleanSelection() {
        this._selectedGroups = undefined;
        if (this.childLevel) this.childLevel.selectedGroups = undefined;
    }

    updateLine() {
        // Get the DOM elements
        const selectedItem = this.selectedItemComponent;
        const selectedGroup = this.selectedGroupComponent;
        const child = this.childLevel;
        const currentLevel = this.currentLevel;
        const line = this.template.querySelector('.line');

        if (!selectedItem || !child) return;

        // Vertical variant: calculate width
        if (this.variant === 'vertical') {
            const scroll = window.pageXOffset;
            const childPosition = child.getBoundingClientRect();
            const groupPosition = selectedGroup.getBoundingClientRect();

            // Distance between the center of the selected group and the center of the first child group
            const groupWidth =
                groupPosition.right -
                childPosition.left -
                groupPosition.width -
                scroll * 2;
            // Distance between the center of the two boundary child groups
            const childWidth = child.currentLevelWidth - groupPosition.width;

            const width = childWidth > groupWidth ? childWidth : groupWidth;
            line.setAttribute('style', `width: ${width}px;`);

            // Horizontal variant: calculate height
        } else {
            const scroll = window.pageYOffset;
            const currentLevelTop =
                currentLevel.getBoundingClientRect().top + scroll;
            const itemPosition = selectedItem.getBoundingClientRect();

            // Distance between the center of the selected item and the top of the first child group
            // 24 is removed to compensate for the line not starting at the complete top of the level
            const itemHeight =
                itemPosition.top +
                itemPosition.height / 2 +
                scroll -
                currentLevelTop -
                24;
            // Distance between the top of the two boundary child groups

            const childHeight = child.currentLevelHeight;

            const height =
                itemHeight > childHeight
                    ? `${itemHeight}px`
                    : `${childHeight}px`;
            line.setAttribute('style', `height: ${height};`);
        }
    }

    updateSelection() {
        if (!this.groups) return;

        const groups = JSON.parse(JSON.stringify(this.groups));
        const selectedGroup = groups.find((group) => group.selected);
        if (selectedGroup && selectedGroup.items) {
            const selectedItem = selectedGroup.items.find(
                (item) => item.selected
            );
            if (selectedItem && selectedItem.groups)
                this._selectedGroups = selectedItem.groups;
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleCloseActiveGroup() {
        this.cleanSelection();
    }

    handleGroupHeightChange() {
        this.updateLine();
        this.dispatchEvent(new CustomEvent('heightchange'));
    }

    handleSelect(event) {
        this.cleanSelection();
        this.dispatchSelectEvent(event);
    }

    handleToggle(event) {
        this.dispatchToggleEvent(event);
        if (event.detail.closed && event.detail.isActiveGroup) {
            this.cleanSelection();
        }
    }

    dispatchActionClickEvent(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: event.detail
            })
        );
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

    dispatchToggleEvent(event) {
        this.dispatchEvent(
            new CustomEvent('toggle', {
                detail: {
                    name: event.detail.name,
                    closed: event.detail.closed
                }
            })
        );
    }
}
