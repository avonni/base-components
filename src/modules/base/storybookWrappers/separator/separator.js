

import { LightningElement, api } from 'lwc';
import { classSet } from '../../utils/classSet';

const DEFAULT_ALIGN_CONTENT = 'center';

const DEFAULT_ICON_SIZE = 'medium';

const DEFAULT_ORIENTATION = 'horizontal';

const DEFAULT_ICON_POSITION = 'left';

export default class Separator extends LightningElement {
    @api label;
    @api iconName;
    @api alignContent = DEFAULT_ALIGN_CONTENT;
    @api iconSize = DEFAULT_ICON_SIZE;
    @api orientation = DEFAULT_ORIENTATION;
    @api iconPosition = DEFAULT_ICON_POSITION;

    get computedPropContainerClass() {
        return classSet('avonni-prop-container')
            .add({
                'prop-vertical': this.orientation === 'vertical'
            })
            .toString();
    }
}
