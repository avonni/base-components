import { Tree } from '../__examples__/tree';

export default {
    title: 'Example/Tree',
    argTypes: {
        header: {
            control: {
                type: 'text'
            },
            description: "The text that's displayed as the tree heading.",
            table: {
                type: { summary: 'string' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description: 'Array of item objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        selectedItem: {
            control: {
                type: 'text'
            },
            description:
                'Name of the tree item to select and highlight. Tree item names are case-sensitive. If the tree item is nested, selecting this item also expands the parent branches.',
            table: {
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => Tree(args);

export const Base = Template.bind({});
Base.args = {
    header: 'Sales Records',
    selectedItem: 'node1-1-1',
    items: [
        {
            label: 'Go to Record 1',
            href: '#record1',
            name: 'node1',
            metatext: 'example of metatext',
            items: [
                {
                    label: 'Go to Record 1.1',
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
                        }
                    ]
                }
            ]
        },
        {
            label: 'Go to Record 2',
            href: '#record2',
            name: 'node2'
        },
        {
            label: 'Go to Record 3',
            href: '#record3',
            name: 'node3'
        },
        {
            label: 'Go to Record 4',
            href: '#record4',
            name: 'node4'
        },
        {
            label: 'Go to Record 5',
            href: '#record5',
            name: 'node5'
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
    ]
};
