import { LightningElement, api, track } from 'lwc';
import { normalizeArray } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

/**
 * @class
 * @description The Tab Bar component allows the user to separate information into logical sections based on functionality or use case.
 * @descriptor avonni-tab-bar
 * @storyId example-tab-bar--base
 * @public
 */
export default class TabBar extends LightningElement {
    _items = [];
    _labels = [];
    _tabsHidden = 0;
    _defaultTab;

    @track visibleTabs;
    showHiddenTabsDropdown = false;
    _connected = false;
    _dropdownHasFocus = false;

    connectedCallback() {
        this.initializeVisibleTabs();
        this._connected = true;
    }

    /**
     * List of tab items.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = normalizeArray(value);

        if (this._connected) {
            this.initializeVisibleTabs();
        }
    }

    /**
     * Deprecated. List of tab labels used to separate information. Use 'items' instead.
     *
     * @type {string[]}
     * @public
     * @deprecated
     */
    @api
    get labels() {
        return this._labels;
    }

    set labels(value) {
        this._labels = normalizeArray(value);

        if (this._connected) {
            this.initializeVisibleTabs();
        }
    }

    /**
     * Number of hidden tabs.
     *
     * @type {number}
     * @public
     */
    @api
    get tabsHidden() {
        return this._tabsHidden;
    }

    set tabsHidden(value) {
        this._tabsHidden = value;

        if (this._connected) {
            this.initializeVisibleTabs();
        }
    }

    /**
     * The value of the active tab by default.
     *
     * @type {string}
     * @public
     */
    @api
    get defaultTab() {
        return this._defaultTab;
    }

    set defaultTab(value) {
        this._defaultTab = value;

        if (this._connected) {
            this.initializeVisibleTabs();
        }
    }

    /**
     * Whether the tab bar contains tabs.
     * @type {boolean}
     */
    get hasTabs() {
        return this.items.length > 0;
    }

    /**
     * Whether the tabs should be visible.
     * When the number of tabs hidden matches the number of tabs, this will block the selected tab from appearing in the tab bar.
     * @type {boolean}
     */
    get showTabs() {
        return this.tabsHidden < this.items.length;
    }

    /**
     * Whether the overflow arrow should be visible.
     * @type {boolean}
     */
    get showOverflowArrow() {
        return this.tabsHidden > 0;
    }

    /**
     * A list of the labels of the hidden tabs.
     * @type {string[]}
     */
    get hiddenTabs() {
        const visibleTabsName = this.visibleTabs.map((tab) => tab.name);
        return this.items.filter(({ name }) => !visibleTabsName.includes(name));
    }

    /**
     * Set the focus on the selected tab.
     *
     * @public
     */
    @api
    focus() {
        const defaultTab = this.template.querySelector(
            '.slds-is-active [data-element-id="a-tab-link"]'
        );
        if (defaultTab) {
            defaultTab.focus();
        }
    }

    /**
     * Returns the computed CSS classes of a given tab during initialization.
     * @param {string} tabName - The name of the tab.
     * @return {string}
     */
    computedTabClass(tabName) {
        return classSet('slds-tabs_default__item')
            .add({
                'slds-is-active': tabName === this.defaultTab
            })
            .toString();
    }

    /**
     * Initializes the visible tabs and computes their CSS classes.
     */
    initializeVisibleTabs() {
        // Support for deprecated 'labels' attribute.
        if (!this.items.length && this.labels.length) {
            this._items = this.labels.map((label) => {
                return { label, name: label };
            });
        }

        this.visibleTabs = [];
        const nVisibleTabs = Math.max(0, this.items.length - this.tabsHidden);
        if (nVisibleTabs === 0) return;

        const activeTabIndex = this.items.findIndex(
            ({ name }) => name === this.defaultTab
        );
        if (activeTabIndex < nVisibleTabs) {
            for (let i = 0; i < nVisibleTabs; i++) {
                const tab = this.items[i];
                const isActiveTab = this.defaultTab === tab.name;
                this.visibleTabs.push({
                    name: tab.name,
                    title: tab.label,
                    classes: this.computedTabClass(tab.name),
                    tabIndex: isActiveTab ? 0 : -1,
                    ariaSelected: isActiveTab
                });
            }
        } else {
            // The default tab is in the hidden tabs and will be swapped a visible tab.
            for (let i = 0; i < nVisibleTabs - 1; i++) {
                const tab = this.items[i];
                this.visibleTabs.push({
                    name: tab.name,
                    title: tab.label,
                    classes: this.computedTabClass(tab.name),
                    tabIndex: -1,
                    ariaSelected: false
                });
            }
            this.visibleTabs.push({
                name: this.items[activeTabIndex].name,
                title: this.items[activeTabIndex].label,
                classes: this.computedTabClass(this.defaultTab),
                tabIndex: 0,
                ariaSelected: true
            });
        }
    }

    /**
     * Prevent event default handler.
     *
     * @param {Event} event
     */
    handlePreventDefault(event) {
        event.preventDefault();
    }

    /**
     * Handles a click on a visible tab.
     * @param {Event} event
     */
    handleTabClick(event) {
        event.preventDefault();

        const tabName = event.currentTarget.dataset.name;

        for (let i = 0; i < this.visibleTabs.length; i++) {
            this.visibleTabs[i].classes = classSet('slds-tabs_default__item')
                .add({
                    'slds-is-active': this.visibleTabs[i].name === tabName
                })
                .toString();
            this.visibleTabs[i].tabIndex =
                this.visibleTabs[i].name === tabName ? 0 : -1;
            this.visibleTabs[i].ariaSelected =
                this.visibleTabs[i].name === tabName;
        }

        this.dispatchTabChange(tabName);
    }

    /**
     * Handles a click on the hidden tabs menu button.
     * @param {Event} event
     */
    handleShowHiddenTabsClick() {
        this.showHiddenTabsDropdown = !this.showHiddenTabsDropdown;

        if (this.showHiddenTabsDropdown) {
            requestAnimationFrame(() => {
                const hiddenMenu = this.template.querySelector(
                    '[data-element-id="a-hidden-tab"]'
                );
                if (hiddenMenu) {
                    hiddenMenu.focus();
                }
            });
        }
    }

    /**
     * Handles a click on a hidden tab.
     * @param {Event} event
     */
    changeLastCategory(event) {
        const newTabName = event.currentTarget.dataset.name;

        for (let i = 0; i < this.visibleTabs.length - 1; i++) {
            this.visibleTabs[i].classes = classSet(
                'slds-tabs_default__item'
            ).toString();
            this.visibleTabs[i].tabIndex = -1;
            this.visibleTabs[i].ariaSelected = false;
        }

        this.visibleTabs.splice(this.visibleTabs.length - 1, 1);

        const activeTab = this.items.find(({ name }) => name === newTabName);
        this.visibleTabs.push({
            name: newTabName,
            title: activeTab.label,
            classes: classSet(
                'slds-tabs_default__item slds-is-active'
            ).toString(),
            tabIndex: 0,
            ariaSelected: true
        });

        this.dispatchTabChange(newTabName);

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            const links = [...this.template.querySelectorAll('a')];
            if (links && links[this.items.length - this.tabsHidden - 1]) {
                links[this.items.length - this.tabsHidden - 1].focus();
            }
        }, 0);
    }

    /**
     * Dispatches a 'select' event for a tab change.
     * @param {string} tab - The name of the selected tab.
     */
    dispatchTabChange(tab) {
        /**
         * The event fired when a tab is selected.
         *
         * @event
         * @name select
         * @param {string} tab Name of the selected tab.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    value: tab
                }
            })
        );
    }

    /**
     * Handles a blur of any element of the Tab Bar component.
     * If no Tab Bar element is focused, a 'blur' event is dispatched.
     */
    triggerBlur() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            if (!this.template.activeElement) {
                this.dispatchEvent(new CustomEvent('blur'));
            }
        }, 0);
    }

    /**
     * Handles a focus on the hidden tabs menu button.
     * This mimics the mouseover effect on the button in case of keyboard navigation.
     * @param {Event} event
     */
    handleDropDownButtonFocus(event) {
        event.currentTarget.parentElement.parentElement.classList.add(
            'slds-is-active'
        );
    }

    /**
     * Handles a blur of the hidden tabs menu button.
     * The mouseover effect on the button is removed.
     * @param {Event} event
     */
    handleDropDownButtonBlur(event) {
        event.currentTarget.parentElement.parentElement.classList.remove(
            'slds-is-active'
        );
        this.triggerBlur();
    }

    handleDropDownFocusIn() {
        this._dropdownHasFocus = true;
    }

    handleDropDownFocusOut() {
        this._dropdownHasFocus = false;

        requestAnimationFrame(() => {
            if (!this._dropdownHasFocus && this.showHiddenTabsDropdown) {
                this.showHiddenTabsDropdown = false;

                const button = this.template.querySelector(
                    '[data-element-id="button-hidden-tabs"]'
                );
                if (button) {
                    button.focus();
                }
            }
        });
    }

    /**
     * Handles a keydown event when the hidden tabs menu is opened.
     * The dropdown options can be navigated using the up and down arrows.
     * The Enter key adds the selected option to the visible tabs and places focus on it.
     * The Escape key closes the dropdown and places the focus on the menu button.
     * The Tab key closes the dropdown and places the focus on the next element.
     * @param {Event} event
     */
    handleDropDownItemKeyDown(event) {
        if (event.keyCode === 40) {
            // Down arrow
            if (event.currentTarget.nextSibling) {
                event.currentTarget.nextSibling.firstChild.focus();
            } else {
                event.currentTarget.parentElement.firstChild.firstChild.focus();
            }
        } else if (event.keyCode === 38) {
            // Up arrow
            if (event.currentTarget.previousSibling) {
                event.currentTarget.previousSibling.firstChild.focus();
            } else {
                event.currentTarget.parentElement.lastChild.firstChild.focus();
            }
        } else if (event.keyCode === 13) {
            // Enter key
            this.changeLastCategory(event);
            this.handleDropDownFocusOut();
        } else if (event.keyCode === 27 || event.keyCode === 9) {
            // Escape key and Tab key
            this.handleDropDownFocusOut();
            this.template.querySelector('button').focus();
        }
    }

    /**
     * Handles a keydown event when the hidden tabs menu is opened.
     * Tabs can be navigated using the side arrows.
     * @param {Event} event
     */
    handleVisibleTabKeyDown(event) {
        if (event.keyCode === 39) {
            // Right arrow
            for (let i = 0; i < this.visibleTabs.length; i++) {
                this.visibleTabs[i].tabIndex = 0;
            }
            if (
                event.currentTarget.nextSibling &&
                event.currentTarget.nextSibling.title !== 'More icons'
            ) {
                event.currentTarget.nextSibling.firstChild.focus();
            } else {
                event.currentTarget.parentElement.firstChild.firstChild.focus();
            }
        } else if (event.keyCode === 37) {
            // Left arrow
            for (let i = 0; i < this.visibleTabs.length; i++) {
                this.visibleTabs[i].tabIndex = 0;
            }
            if (event.currentTarget.previousSibling) {
                event.currentTarget.previousSibling.firstChild.focus();
            } else if (
                event.currentTarget.parentElement.lastChild.title ===
                'More icons'
            ) {
                event.currentTarget.parentElement.lastChild.previousSibling.firstChild.focus();
            } else {
                event.currentTarget.parentElement.lastChild.firstChild.focus();
            }
        } else if (event.keyCode === 9) {
            // Tab key
            for (let i = 0; i < this.visibleTabs.length; i++) {
                if (!this.visibleTabs[i].ariaSelected) {
                    this.visibleTabs[i].tabIndex = -1;
                }
            }
        }
    }
}
