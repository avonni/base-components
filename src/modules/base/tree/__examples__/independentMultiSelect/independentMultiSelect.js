import { LightningElement } from 'lwc';

export default class TreeIndependentMultiSelect extends LightningElement {
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
                    items: [
                        {
                            label: 'Go to Record 1.1.1',
                            href: '#record1',
                            name: 'node1-1-1',
                            items: [
                                {
                                    label: 'Go to Record 1.1.1.1',
                                    href: '#record1',
                                    name: 'node1-1-1-1'
                                },
                                {
                                    label: 'Go to Record 1.1.1.2',
                                    href: '#record1',
                                    name: 'node1-1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Go to Record 1.2',
                    href: '#record1',
                    name: 'node1-2',
                    items: [
                        {
                            label: 'Go to Record 1.2.1',
                            href: '#record1',
                            name: 'node1-2-1',
                            items: [
                                {
                                    label: 'Go to Record 1.2.1.1',
                                    href: '#record1',
                                    name: 'node1-2-1-1'
                                }
                            ],
                            expanded: true
                        },
                        {
                            label: 'Go to Record 1.2.2',
                            href: '#record1',
                            name: 'node1-2-2'
                        }
                    ]
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
            ]
        },
        {
            label: 'Go to Record 3',
            href: '#record3',
            name: 'node3'
        },
        {
            label: 'Disabled Record',
            href: '#record4',
            name: 'node4',
            disabled: true,
            isLoading: true
        },
        {
            label: 'Go to Record 5',
            href: '#record5',
            name: 'node5',
            actions: [{ name: 'record5Action', label: 'Record 5 action' }]
        },
        {
            label: 'Go to Record 6',
            href: '#record6',
            name: 'node6'
        },
        {
            label: 'Go to Record 7',
            href: '#record7',
            name: 'node7'
        }
    ];

    selectedItems = ['node1-2-1', 'node1-1', 'node2', 'node1-1-1-2', 'node6'];
}
