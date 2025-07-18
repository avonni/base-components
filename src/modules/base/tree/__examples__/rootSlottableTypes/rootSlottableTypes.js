import { LightningElement } from 'lwc';

export default class TreeRootSlottableTypes extends LightningElement {
    items = [
        {
            label: 'Go to Record 1',
            href: '#record1',
            name: 'node1',
            metatext: 'example of metatext',
            items: [
                {
                    label: 'Go to Record 1.1',
                    iconName: 'utility:record_alt',
                    href: '#record1',
                    name: 'node1-1',
                    unselectable: true,
                    type: 'child'
                },
                {
                    label: 'Go to Record 1.2',
                    href: '#record1',
                    name: 'node1-2',
                    type: 'child'
                },
                {
                    label: 'Go to Record 1.3',
                    href: '#record1',
                    name: 'node1-3',
                    type: 'standard',
                    slottableTypes: ['standard', 'child']
                }
            ]
        },
        {
            label: 'Loading Record',
            href: '#record2',
            isLoading: true,
            enableInfiniteLoading: true,
            name: 'node2',
            items: [
                {
                    label: 'Already loaded record',
                    name: 'loaded-record'
                }
            ],
            type: 'standard',
            slottableTypes: ['child']
        },
        {
            label: 'Go to Record 3',
            href: '#record3',
            name: 'node3',
            type: 'standard',
            slottableTypes: ['standard']
        },
        {
            label: 'Go to Record 4',
            href: '#record4',
            name: 'node4',
            type: 'standard',
            slottableTypes: []
        },
        {
            label: 'Go to Record 5',
            href: '#record5',
            name: 'node5',
            type: 'standard'
        }
    ];

    rootSlottableTypes = ['standard'];

    handleSelect(event) {
        // Prevent the links from navigating
        event.preventDefault();
    }
}
