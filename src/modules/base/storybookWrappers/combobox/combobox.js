import { LightningElement, api } from 'lwc';

export default class ComboboxInfiniteLoading extends LightningElement {
    @api actions;
    @api allowSearch;
    @api backAction;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api enableInfiniteLoading;
    @api fieldLevelHelp;
    @api groups;
    @api hideClearIcon;
    @api hideOptionsUntilSearch;
    @api hideSelectedOptions;
    @api isMultiSelect;
    @api label;
    @api loadMoreOffset;
    @api loadingStateAlternativeText;
    @api max;
    @api messageWhenBadInput;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenValueMissing;
    @api min;
    @api multiLevelGroups;
    @api name;
    @api noResultsMessage;
    @api placeholder;
    @api readOnly;
    @api removeSelectedOptions;
    @api required;
    @api requiredAlternativeText;
    @api scopes;
    @api scopesGroups;
    @api search;
    @api selectedOptionsAriaLabel;
    @api selectedOptionsDirection;
    @api sortableSelectedOptions;
    @api sortableSelectedOptionsIconName;
    @api value;
    @api variant;

    isLoading = false;
    options = [];

    connectedCallback() {
        this.options = this.generateNewOptions([], '1');
    }

    generateNewOptions(options, level, searchTerm) {
        const newOptions = [...options];

        for (let i = 0; i < 5; i++) {
            const value = `${level}.${newOptions.length}`;
            let label = `Auto generated option #${value}`;
            if (searchTerm) {
                label += `, with search term ${searchTerm}`;
            }

            const newOption = {
                label,
                value,
                isLoading: i === 3
            };

            newOptions.push(newOption);
        }

        return newOptions;
    }

    getOption(value, options = this.options) {
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.value === value) {
                return option;
            }

            const children = Array.isArray(option.options)
                ? option.options
                : [];
            if (children.length) {
                const childOption = this.getOption(value, children);
                if (childOption) return childOption;
            }
        }
        return null;
    }

    loadNestedOption(optionValue, searchTerm) {
        const newOptions = JSON.parse(JSON.stringify(this.options));
        const option = this.getOption(optionValue.value, newOptions);
        if (!option.options) {
            option.options = [];
        }
        const loadMore = option.options.length < 50;
        if (loadMore) {
            this.isLoading = true;

            setTimeout(() => {
                option.options = this.generateNewOptions(
                    option.options,
                    option.value,
                    searchTerm
                );
                this.isLoading = false;
                this.options = newOptions;
            }, 1000);
        } else {
            this.isLoading = false;
            this.options = newOptions;
        }
    }

    loadRoot(searchTerm) {
        const loadMore = this.options.length < 50;
        if (loadMore) {
            this.isLoading = true;

            setTimeout(() => {
                this.options = this.generateNewOptions(
                    this.options,
                    '1',
                    searchTerm
                );
                this.isLoading = false;
            }, 1000);
        } else {
            this.isLoading = false;
        }
    }

    handleLevelChange(event) {
        const option = event.detail.option;
        if (option.isLoading) {
            this.loadNestedOption(option);
        }
    }

    handleLoadMore(event) {
        const { option, searchTerm } = event.detail;
        if (option) {
            this.loadNestedOption(option, searchTerm);
        } else {
            this.loadRoot(searchTerm);
        }
    }

    handleSearch(event) {
        const { option, value } = event.detail;

        if (!value) {
            this.options = this.generateNewOptions([], '1');
        } else if (option) {
            this.loadNestedOption(option, value);
        } else {
            this.loadRoot(value);
        }
    }
}
