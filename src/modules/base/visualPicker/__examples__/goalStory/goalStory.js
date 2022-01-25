import { LightningElement } from 'lwc';

export default class VisualPickerGoalStory extends LightningElement {
    items = [
        {
            value: 'dataset',
            figure: {
                title: 'Create from Dataset',
                titlePosition: 'top',
                description:
                    'Choose the dataset and columns to build your custom analysis.',
                avatar: {
                    iconName: 'utility:add'
                }
            }
        },
        {
            value: 'customer-revenue',
            figure: {
                title: 'Maximize Customer Revenue',
                titlePosition: 'top',
                description:
                    'Analyze which types of accounts are leading to higher sales. Use a regression model to predict which accounts might bring additional revenue.',
                avatar: {
                    iconName: 'standard:account'
                },
                tags: [
                    {
                        label: 'Sales'
                    },
                    {
                        label: 'Einstein Discovery'
                    }
                ]
            }
        },
        {
            value: 'win-rate',
            figure: {
                title: 'Maximize Win Rate',
                titlePosition: 'top',
                description:
                    'Explore the key drivers for winning deals wihtout the hassle of prepping your data.',
                avatar: {
                    iconName: 'standard:opportunity'
                },
                tags: [
                    {
                        label: 'Sales'
                    },
                    {
                        label: 'Einstein Discovery'
                    }
                ]
            }
        },
        {
            value: 'time-to-close',
            figure: {
                title: 'Minimize Time To Close',
                titlePosition: 'top',
                description:
                    'understand the key factors that drive shorter deal cycles without having to worry about where to begin',
                avatar: {
                    iconName: 'standard:account'
                },
                tags: [
                    {
                        label: 'Sales'
                    },
                    {
                        label: 'Einstein Discovery'
                    }
                ]
            }
        }
    ];
}
