const ITEMS = [
    {
        label: 'Call',
        value: 'call',
        prefixIconName: 'custom:custom1',
        iconName: 'utility:voicemail_drop'
    },
    {
        label: 'Email',
        value: 'email',
        prefixIconName: 'standard:email'
    },
    {
        label: 'Meeting',
        value: 'meeting',
        prefixIconName: 'standard:service_appointment',
        disabled: true
    },
    {
        label: 'Other',
        value: 'other',
        prefixIconName: 'standard:all'
    },
    {
        label: 'Menu item 5',
        value: 'item-5'
    },
    {
        label: 'Menu item 6',
        value: 'item-6'
    },
    {
        label: 'Menu item 7',
        value: 'item-7'
    }
];

const NESTED_ITEMS = [
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
];

const COLOR_ITEMS = [
    { label: 'Pacific Cyan', value: 'pacificCyan', color: '#06AED5' },
    { label: 'Cerulean', value: 'cerulean', color: '#086788' },
    { label: 'School Bus Yellow', value: 'schoolBusYellow', color: '#F8D525' },
    { label: 'Harvest Gold', value: 'harvestGold', color: '#F5AB00' },
    { label: 'Rojo', value: 'rojo', color: '#DD1C1A' }
];

export { COLOR_ITEMS, ITEMS, NESTED_ITEMS };
