import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';

const DEFAULT_ALIGN_CONTENT = 'center';
const DEFAULT_ICON_POSITION = 'left';
const DEFAULT_ICON_SIZE = 'medium';
const DEFAULT_ICON_VARIANT = 'square';
const DEFAULT_ORIENTATION = 'horizontal';

export default class Separator extends LightningElement {
    @api alignContent = DEFAULT_ALIGN_CONTENT;
    @api iconName;
    @api iconSize = DEFAULT_ICON_SIZE;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api iconSrc;
    @api iconVariant = DEFAULT_ICON_VARIANT;
    @api label;
    @api orientation = DEFAULT_ORIENTATION;

    get computedPropContainerClass() {
        return classSet('avonni-prop-container')
            .add({
                'prop-vertical': this.orientation === 'vertical'
            })
            .toString();
    }
}
