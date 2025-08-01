import { Kanban } from '../__examples__/kanban';
import {
    ACTIONS,
    CARD_ATTRIBUTES,
    GROUP_VALUES,
    IMAGE_ATTRIBUTES,
    RECORDS,
    SUMMARIZE_ATTRIBUTES
} from './data';

export default {
    title: 'Example/Kanban',
    argTypes: {
        keyField: {
            name: 'key-field',
            control: {
                type: 'text'
            },
            description: 'Name of a key of the records objects. ',
            table: {
                type: { summary: 'String' }
            }
        },
        actions: {
            control: {
                type: 'object'
            },
            description:
                'Array of action objects. The actions are displayed on each card and refer to tasks you can perform, such as updating or deleting the card.',
            table: {
                type: { summary: 'object[]' },
                category: 'Group'
            }
        },
        cardAttributes: {
            name: 'card-attributes',
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the card.',
            table: {
                type: { summary: 'object' },
                category: 'Item'
            }
        },
        groupValues: {
            name: 'group-values',
            control: {
                type: 'object'
            },
            description:
                'Array of group objects. Each group represents one step of the path.',
            table: {
                type: { summary: 'object[]' },
                category: 'Group'
            }
        },
        groupFieldName: {
            name: 'group-field-name',
            control: {
                type: 'text'
            },
            description:
                'Name of the data field containing the group label the data belongs to. ',
            table: {
                type: { summary: 'String' },
                category: 'Group'
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the Kanban is in a loading state and shows a spinner.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the kanban is in the loading state.',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'Loading...' }
            }
        },
        disableColumnDragAndDrop: {
            name: 'disable-column-drag-and-drop',
            control: {
                type: 'boolean'
            },
            description: 'If present, the columns cannot be dragged by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Group'
            }
        },
        disableItemDragAndDrop: {
            name: 'disable-item-drag-and-drop',
            control: {
                type: 'boolean'
            },
            description: 'If present, the tiles cannot be dragged by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Item'
            }
        },
        hideHeader: {
            name: 'hide-header',
            control: {
                type: 'boolean'
            },
            description: 'If present, the group headers are hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Group'
            }
        },
        records: {
            control: {
                type: 'object'
            },
            description:
                'Array of data objects. Each object will be displayed as a data card in one of the steps. The objects should have a key <code>id</code>, used as their unique identifier. The other keys should correspond to the available fields, and/or the summarize and group field names.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        summarizeAttributes: {
            name: 'summarize-attributes',
            control: {
                type: 'object'
            },
            description:
                'The field containing the number to add to the group summarization, at the top of each column.',
            table: {
                type: { summary: 'object' },
                category: 'Group'
            }
        },
        subGroupFieldName: {
            name: 'sub-group-field-name',
            control: {
                type: 'text'
            },
            description:
                'Name of the data field containing the sub-group label the data belongs to. ',
            table: {
                type: { summary: 'String' },
                category: 'Group'
            }
        },
        variant: {
            name: 'variant',
            control: {
                type: 'select'
            },
            options: ['base', 'path'],
            description:
                'The variant change the apparence of the kanban. Valid values include base and path. Default to base.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'String' }
            }
        },
        imageAttributes: {
            name: 'image-attributes',
            control: {
                type: 'object'
            },
            description: 'Object of attributes for the item images.',
            table: {
                type: { summary: 'object' },
                category: 'Item'
            }
        }
    },
    args: {
        actions: ACTIONS,
        cardAttributes: CARD_ATTRIBUTES,
        disableColumnDragAndDrop: false,
        disableItemDragAndDrop: false,
        groupFieldName: 'status',
        groupValues: GROUP_VALUES,
        hideHeader: false,
        imageAttributes: IMAGE_ATTRIBUTES,
        isLoading: false,
        keyField: 'id',
        loadingStateAlternativeText: 'Loading...',
        records: RECORDS,
        summarizeAttributes: SUMMARIZE_ATTRIBUTES,
        variant: 'base'
    }
};

const Template = (args) => Kanban(args);

export const Base = Template.bind({});

export const avatar = Template.bind({});
avatar.args = {
    groupValues: [
        {
            label: 'John Doe',
            value: 'johnDoe',
            avatar: {
                fallbackIconName: 'utility:down',
                initials: 'AS',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                variant: 'circle'
            },
            footerActions: [
                {
                    disabled: false,
                    label: 'Email',
                    name: 'Email',
                    iconName: 'utility:email'
                }
            ]
        },
        {
            label: 'Jane Doe',
            value: 'janeDoe',
            avatar: {
                fallbackIconName: 'utility:down',
                initials: 'AS',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                variant: 'circle'
            },
            footerActions: [
                {
                    disabled: false,
                    label: 'Email',
                    name: 'Email',
                    iconName: 'utility:email'
                }
            ]
        },
        {
            label: 'John Smith',
            value: 'johnSmith',
            avatar: {
                fallbackIconName: 'utility:down',
                initials: 'AS',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                variant: 'circle'
            },
            footerActions: [
                {
                    disabled: false,
                    label: 'Email',
                    name: 'Email',
                    iconName: 'utility:email'
                }
            ]
        }
    ],
    records: [
        {
            id: '001',
            responsible: 'johnDoe',
            opportunityName: 'Opportunity 1',
            amount: 25000,
            warningIcon: 'utility:warning',
            phone: '+375292567896',
            createdDate: '1594133308000',
            startDate: '2020/07/07',
            dueDate: '1600354108000',
            percent: 0.28,
            available: true,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '002',
            responsible: 'johnDoe',
            opportunityName: 'Opportunity 2',
            amount: 13200,
            phone: '+375292567896',
            createdDate: '1347250828000',
            percent: 0.77,
            available: true,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '003',
            responsible: 'janeDoe',
            opportunityName: 'Opportunity 3',
            amount: 5100,
            phone: '+37529888888',
            createdDate: '1547250828000',
            startDate: '1547250828000',
            percent: 0.83,
            available: false,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '004',
            responsible: 'johnDoe',
            opportunityName: 'Opportunity 4',
            amount: 21570,
            phone: '+375292567896',
            createdDate: '1647250828000',
            percent: 0.2,
            available: false,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '005',
            responsible: 'johnSmith',
            opportunityName: 'Opportunity 5',
            amount: 200,
            phone: '+375299999999',
            createdDate: '2541422908000',
            startDate: '2541422908000',
            dueDate: '2541941308000',
            percent: 0.18,
            available: true,
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            id: '006',
            responsible: 'janeDoe',
            opportunityName: 'Opportunity 6',
            amount: 17500,
            phone: '+375292567896',
            createdDate: '1547250828000',
            percent: 0.92,
            available: true
        }
    ],
    groupFieldName: 'responsible'
};

export const hideHeader = Template.bind({});
hideHeader.args = {
    hideHeader: true
};

export const path = Template.bind({});
path.args = {
    variant: 'path',
    summarizeAttributes: {
        label: 'Percent',
        fieldName: 'percent',
        type: 'percent'
    }
};

export const subGroups = Template.bind({});
subGroups.args = {
    subGroupFieldName: 'assignee'
};

export const disabledItemDrag = Template.bind({});
disabledItemDrag.args = {
    disableItemDragAndDrop: true,
    summarizeAttributes: {
        label: 'Percent',
        fieldName: 'percent',
        type: 'percent'
    }
};

export const disabledColumnDrag = Template.bind({});
disabledColumnDrag.args = {
    disableColumnDragAndDrop: true
};

export const fieldLabelInline = Template.bind({});
fieldLabelInline.args = {
    cardAttributes: {
        ...CARD_ATTRIBUTES,
        customFieldAttributes: {
            variant: 'label-inline'
        }
    }
};
