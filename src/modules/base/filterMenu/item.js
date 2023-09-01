

import { classSet } from 'c/utils';

export default class FilterMenuItem {
    constructor(props) {
        Object.assign(this, props);
    }

    get wrapperClass() {
        return classSet('slds-dropdown__item slds-truncate')
            .add({
                'slds-is-selected': this.checked
            })
            .toString();
    }
}
