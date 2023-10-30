import { LightningElement, api } from 'lwc';

export default class InfiniteLoading extends LightningElement {
    @api addButtonIconName;
    @api addButtonLabel;
    @api buttonSize;
    @api buttonVariant;
    @api disableReordering;
    @api disabled;
    @api downButtonIconName;
    @api downButtonLabel;
    @api draggable;
    @api fieldLevelHelp;
    @api hideBottomDivider;
    @api label;
    @api loadMoreOffset;
    @api maxVisibleOptions;
    @api max;
    @api min;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenValueMissing;
    @api name;
    @api removeButtonIconName;
    @api removeButtonLabel;
    @api required;
    @api requiredOptions;
    @api allowSearch;
    @api selectedLabel;
    @api selectedPlaceholder;
    @api size;
    @api sourceLabel;
    @api upButtonIconName;
    @api upButtonLabel;
    @api validity;
    @api value;
    @api variant;

    isLoading = false;
    options = [];

    generateNewOptions(searchTerm) {
        const newOptions = [...this.options];

        for (let i = 0; i < 5; i++) {
            const value = newOptions.length.toString();
            let label = `Auto generated option #${value}`;
            if (searchTerm) {
                label += `, with search term ${searchTerm}`;
            }

            const newOption = {
                label,
                value
            };

            newOptions.push(newOption);
        }

        return newOptions;
    }

    handleLoadMore(event) {
        const loadMore = this.options.length < 50;
        if (loadMore) {
            this.isLoading = true;

            setTimeout(() => {
                this.options = this.generateNewOptions(event.detail.searchTerm);
                this.isLoading = false;
            }, 1000);
        } else {
            this.isLoading = false;
        }
    }
}
