import { LightningElement } from 'lwc';

export default class FilterMenuVerticalWithNestedItems extends LightningElement {
    typeAttributes = {
        allowSearch: true,
        isMultiSelect: true,
        hasNestedItems: true,
        items: [
            {
                label: 'Africa',
                value: 'africa',
                prefixIconName: 'custom:custom1',
                iconName: 'utility:anywhere_chat',
                items: [
                    {
                        label: 'Algeria',
                        value: 'algeria'
                    },
                    {
                        label: 'Angola',
                        value: 'angola'
                    },
                    {
                        label: 'Botswana',
                        value: 'botswana',
                        disabled: true
                    },
                    {
                        label: 'Burkina Faso',
                        value: 'burkina-faso',
                        prefixIconName: 'utility:approval'
                    },
                    {
                        label: 'Burundi',
                        value: 'burundi',
                        iconName: 'custom:custom11',
                        color: '#F5AB00'
                    },
                    {
                        label: 'Cameroon',
                        value: 'cameroon'
                    }
                ]
            },
            { label: 'Antartica', value: 'antartica' },
            {
                label: 'Asia',
                value: 'asia',
                items: [
                    { label: 'Afghanistan', value: 'afghanistan' },
                    { label: 'Bahrain', value: 'bahrain' },
                    { label: 'Bangladesh', value: 'bangladesh' },
                    { label: 'Cambodia', value: 'cambodia' },
                    { label: 'China', value: 'china' }
                ]
            },
            {
                label: 'Europe',
                value: 'europe',
                color: '#F5AB00',
                items: [
                    { label: 'Austria', value: 'austria' },
                    { label: 'Belgium', value: 'belgium' },
                    { label: 'Bulgaria', value: 'bulgaria' },
                    { label: 'Croatia', value: 'croatia' },
                    { label: 'Cyprus', value: 'cyprus' },
                    { label: 'Czech Republic', value: 'czech-republic' },
                    { label: 'Denmark', value: 'denmark' },
                    { label: 'Estonia', value: 'estonia' },
                    { label: 'Finland', value: 'finland' },
                    { label: 'France', value: 'france' }
                ]
            },
            {
                label: 'North America',
                value: 'north-america',
                prefixIconName: 'standard:email',
                items: [
                    { label: 'Canada', value: 'canada' },
                    { label: 'Mexico', value: 'mexico' },
                    { label: 'United States', value: 'united-states' }
                ]
            },
            {
                label: 'Oceania',
                value: 'oceania'
            },
            {
                label: 'South America',
                value: 'south-america',
                prefixIconName: 'standard:service_appointment',
                disabled: true,
                items: [
                    { label: 'Argentina', value: 'argentina' },
                    { label: 'Brazil', value: 'brazil' },
                    { label: 'Chile', value: 'chile' },
                    { label: 'Colombia', value: 'colombia' },
                    { label: 'Peru', value: 'peru' }
                ]
            }
        ]
    };
    value = ['oceania', 'burundi', 'burkina-faso'];
}
