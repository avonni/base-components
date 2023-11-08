import { LightningElement } from 'lwc';

export default class DualListboxInfiniteLoading extends LightningElement {
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
