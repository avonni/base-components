import { LightningElement } from 'lwc';

export default class VisualPickerTemplates extends LightningElement {
    items = [
        {
            title: 'Customer Insights Analytics',
            description:
                'The Customer Insights Analytics template brings together analysis of Sales Cloud and Service Cloud in a unified, easy-to-customize app. v1.0 #130',
            avatar: {
                imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/badge_customer_insights.png',
                size: 'small'
            },
            value: 'customer-insights-analytics',
            imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/preview_customer_insights1.png',
            tags: [
                {
                    label: 'Sales'
                },
                {
                    label: 'Service'
                },
                {
                    label: 'Customer 360'
                }
            ]
        },
        {
            title: 'Design Style Guide',
            description:
                'The Design Style Guide Template gives you a starting point for your own Analytics app design and development through best design practices. v2.0 #070',
            avatar: {
                imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/designtemplate.png',
                size: 'small'
            },
            value: 'design-style-guide',
            imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/preview_Design_Styles.png',
            tags: [
                {
                    label: 'Sales'
                },
                {
                    label: 'Service'
                },
                {
                    label: 'Learning'
                },
                {
                    label: 'Design'
                }
            ]
        },
        {
            title: 'Einstein Discovery for Sales Analytics',
            description:
                'Accelerate sales results by adding Einstein Discovery predictions to the Sales Analytics app. v1.0 #020',
            avatar: {
                imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/sales.png',
                size: 'small'
            },
            value: 'einstein-discovery-style',
            imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/preview_EDTimeToClose.png',
            tags: [
                {
                    label: 'Sales'
                },
                {
                    label: 'Einstein Discovery'
                },
                {
                    label: 'Featured'
                }
            ]
        },
        {
            title: 'Revenue Operations Analytics',
            description:
                'Revenue Operations help Sales teams gain insight into sales performance to build strong pipeline, improve forecast accuracy, and generate more revenue. v2.0 #110',
            avatar: {
                imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/sales.png',
                size: 'small'
            },
            value: 'revenue-operation-analytics',
            imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/preview_approval.jpg',
            tags: [
                {
                    label: 'Sales'
                },
                {
                    label: 'Einstein Discovery'
                },
                {
                    label: 'Featured'
                }
            ]
        },
        {
            title: 'Sales Analytics',
            description:
                'The latest version of the app, which helps your entire sales team unlock the full power of Sales Cloud data. With clear visibility into pipeline and historical trends, it’s never been easier to build a winning sales team. v5.0 #050',
            avatar: {
                imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/sales.png',
                size: 'small'
            },
            value: 'sales-analytics',
            imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/preview_sales.jpg',
            tags: [
                {
                    label: 'Sales'
                },
                {
                    label: 'Einstein Discovery'
                },
                {
                    label: 'Featured'
                }
            ]
        },
        {
            title: 'Service Analytics',
            description:
                'The latest version of the app, which helps your entire team unlock the full power of Service Cloud data. With all-new dashboards built with the dashboard designer, it’s never been easier to build a winning service team. v5.0 #070',
            avatar: {
                imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/service.png',
                size: 'small'
            },
            value: 'service-analytics',
            imgSrc: 'https://d5y000001msequac-dev-ed.lightning.force.com/analytics/wave/web/proto/images/template/icons/preview_service1.png',
            tags: [
                {
                    label: 'Sales'
                },
                {
                    label: 'Einstein Discovery'
                },
                {
                    label: 'Featured'
                }
            ]
        }
    ];
}
