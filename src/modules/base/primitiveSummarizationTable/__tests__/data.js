export const computedSummarizeArray = [
    {
        fieldName: 'badge',
        type: 'badge',
        hasSummarizeType: false,
        formattedNumberType: false,
        dateType: false,
        values: [
            'approved',
            'declined',
            'unknown',
            'approved',
            'approved',
            'approved'
        ],
        className:
            'slds-truncate avonni-datatable-summarize-table_display-flex_start',
        formatType: 'badge'
    },
    {
        fieldName: 'date',
        type: 'date',
        hasSummarizeType: true,
        summarizeTypes: [
            {
                label: 'count',
                value: 6,
                type: 'date',
                typeAttributes: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    timeZone: 'Pacific/Honolulu'
                },
                mode: false,
                displaySumType: true,
                count: true
            },
            {
                label: 'countUnique',
                value: 5,
                type: 'date',
                typeAttributes: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    timeZone: 'Pacific/Honolulu'
                },
                mode: false,
                displaySumType: true,
                count: true
            },
            {
                label: 'average',
                value: 1637267400000,
                type: 'date',
                typeAttributes: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    timeZone: 'Pacific/Honolulu'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'median',
                value: 1636389000000,
                type: 'date',
                typeAttributes: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    timeZone: 'Pacific/Honolulu'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'max',
                value: 1643000400000,
                type: 'date',
                typeAttributes: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    timeZone: 'Pacific/Honolulu'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'min',
                value: 1632456000000,
                type: 'date',
                typeAttributes: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    timeZone: 'Pacific/Honolulu'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'mode',
                value: 1635048000000,
                type: 'date',
                typeAttributes: {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    timeZone: 'Pacific/Honolulu'
                },
                mode: false,
                displaySumType: true,
                count: false
            }
        ],
        formattedNumberType: false,
        dateType: true,
        values: [
            1632456000000,
            1635048000000,
            1635048000000,
            1637730000000,
            1640322000000,
            1643000400000
        ],
        className:
            'slds-truncate avonni-datatable-summarize-table_display-flex_start',
        formatType: 'date'
    },
    {
        fieldName: 'progress',
        type: 'progress-ring',
        hasSummarizeType: true,
        summarizeTypes: [
            {
                label: 'count',
                value: 6,
                type: 'percent',
                typeAttributes: {
                    variant: {
                        fieldName: 'progressRingVariant'
                    },
                    size: 'large'
                },
                mode: false,
                displaySumType: true,
                count: true
            },
            {
                label: 'sum',
                value: 2.8,
                type: 'percent',
                typeAttributes: {
                    variant: {
                        fieldName: 'progressRingVariant'
                    },
                    size: 'large'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'average',
                value: 0.46,
                type: 'percent',
                typeAttributes: {
                    variant: {
                        fieldName: 'progressRingVariant'
                    },
                    size: 'large'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'min',
                value: 0,
                type: 'percent',
                typeAttributes: {
                    variant: {
                        fieldName: 'progressRingVariant'
                    },
                    size: 'large'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'max',
                value: 1,
                type: 'percent',
                typeAttributes: {
                    variant: {
                        fieldName: 'progressRingVariant'
                    },
                    size: 'large'
                },
                mode: false,
                displaySumType: true,
                count: false
            }
        ],
        formattedNumberType: true,
        dateType: false,
        values: [100, 0, 75, 50, 35, 20],
        className:
            'slds-truncate avonni-datatable-summarize-table_display-flex_start',
        formatType: 'percent'
    },
    {
        fieldName: 'currency',
        type: 'currency',
        hasSummarizeType: true,
        summarizeTypes: [
            {
                label: 'count',
                value: 5,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'CAD'
                },
                mode: false,
                displaySumType: true,
                count: true
            },
            {
                label: 'countUnique',
                value: 3,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'CAD'
                },
                mode: false,
                displaySumType: true,
                count: true
            },
            {
                label: 'average',
                value: 16,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'CAD'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'median',
                value: 20,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'CAD'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'min',
                value: 5,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'CAD'
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'max',
                value: 25,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'CAD'
                },
                mode: false,
                displaySumType: true,
                count: false
            }
        ],
        formattedNumberType: true,
        dateType: false,
        values: [5, 5, 20, 25, 25],
        className:
            'slds-truncate avonni-datatable-summarize-table_display-flex_end',
        formatType: 'currency'
    },
    {
        fieldName: 'number',
        type: 'number',
        hasSummarizeType: true,
        summarizeTypes: [
            {
                label: 'sum',
                value: 100,
                type: 'decimal',
                typeAttributes: {
                    minimumFractionDigits: 1
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'min',
                value: 5,
                type: 'decimal',
                typeAttributes: {
                    minimumFractionDigits: 1
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'max',
                value: 25,
                type: 'decimal',
                typeAttributes: {
                    minimumFractionDigits: 1
                },
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'mode',
                value: 25,
                type: 'decimal',
                typeAttributes: {
                    minimumFractionDigits: 1
                },
                mode: false,
                displaySumType: true,
                count: false
            }
        ],
        formattedNumberType: true,
        dateType: false,
        values: [5, 10, 15, 20, 25, 25],
        className:
            'slds-truncate avonni-datatable-summarize-table_display-flex_end',
        formatType: 'decimal'
    },
    {
        fieldName: 'percent',
        type: 'percent',
        hasSummarizeType: true,
        summarizeTypes: [
            {
                label: 'count',
                value: 6,
                type: 'percent',
                typeAttributes: [],
                mode: false,
                displaySumType: true,
                count: true
            },
            {
                label: 'countUnique',
                value: 5,
                type: 'percent',
                typeAttributes: [],
                mode: false,
                displaySumType: true,
                count: true
            },
            {
                label: 'median',
                value: 0.175,
                type: 'percent',
                typeAttributes: [],
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'min',
                value: 0.05,
                type: 'percent',
                typeAttributes: [],
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'max',
                value: 0.25,
                type: 'percent',
                typeAttributes: [],
                mode: false,
                displaySumType: true,
                count: false
            },
            {
                label: 'mode',
                value: 0.25,
                type: 'percent',
                typeAttributes: [],
                mode: false,
                displaySumType: true,
                count: false
            }
        ],
        formattedNumberType: true,
        dateType: false,
        values: [0.05, 0.1, 0.15, 0.2, 0.25, 0.25],
        className:
            'slds-truncate avonni-datatable-summarize-table_display-flex_end',
        formatType: 'percent'
    }
];
