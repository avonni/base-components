import {
    getItemByName,
    getTreeItemByLevelPath,
    toggleTreeItemValue
} from '../nestedItemsUtils';

const ITEMS = [
    {
        name: 'item1',
        items: [
            {
                name: 'item1-1',
                items: [{ name: 'item1-1-1' }, { name: 'item1-1-2' }]
            },
            { name: 'item1-2', items: [] }
        ]
    },
    {
        name: 'item2',
        items: [{ name: 'item2-1' }, { name: 'item2-2', value: 'value2-2' }]
    }
];

describe('Filter Menu: Nested Items Utils', () => {
    describe('getItemByName()', () => {
        it('No matching item', () => {
            const invalid = getItemByName('nonexistent', ITEMS);
            expect(invalid).toBeNull();

            const noItems = getItemByName('item1', []);
            expect(noItems).toBeNull();
        });

        it('Matching root item', () => {
            const result = getItemByName('item2', ITEMS);
            expect(result).toEqual({
                name: 'item2',
                items: [
                    { name: 'item2-1' },
                    { name: 'item2-2', value: 'value2-2' }
                ]
            });
        });

        it('Matching nested item', () => {
            const result = getItemByName('item1-1-2', ITEMS);
            expect(result).toEqual({ name: 'item1-1-2' });
        });

        it('Matching item using value instead of name', () => {
            const result = getItemByName('value2-2', ITEMS);
            expect(result).toEqual({ name: 'item2-2', value: 'value2-2' });
        });
    });

    describe('getTreeItemByLevelPath()', () => {
        it('Empty result', () => {
            const result = getTreeItemByLevelPath([], ITEMS);
            expect(result).toBeFalsy();
        });

        it('Valid item', () => {
            const result = getTreeItemByLevelPath([0, 0, 1], ITEMS);
            expect(result).toEqual({ name: 'item1-1-2' });
        });

        it('Invalid levelPath', () => {
            const nonExistent = getTreeItemByLevelPath([0, 2], ITEMS);
            expect(nonExistent).toBeFalsy();

            const invalid = getTreeItemByLevelPath([1, 0, 2], ITEMS);
            expect(invalid).toBeFalsy();
        });
    });

    describe('toggleTreeItemValue()', () => {
        let item;
        beforeEach(() => {
            item = {
                name: 'parent',
                checked: false,
                items: [
                    {
                        name: 'child1',
                        checked: false,
                        items: [
                            { name: 'child1-1', checked: false },
                            { name: 'child1-2', checked: false }
                        ]
                    },
                    { name: 'child2', checked: false }
                ]
            };
        });

        it('Select the item', () => {
            const value = [];
            const result = toggleTreeItemValue({ item, value });

            expect(result).toEqual(['parent']);
            expect(item.checked).toBe(true);
        });

        it('Unselect the item', () => {
            const value = ['parent'];
            const result = toggleTreeItemValue({ item, value });

            expect(result).toEqual([]);
            expect(item.checked).toBe(false);
        });

        it('Select all the descendants', () => {
            const value = ['someOtherValue'];
            const result = toggleTreeItemValue({
                action: 'select-all',
                item,
                value
            });
            expect(result).toEqual([
                'someOtherValue',
                'parent',
                'child1',
                'child1-1',
                'child1-2',
                'child2'
            ]);
            expect(item.checked).toBe(true);
        });

        it('Select the immediate descendants', () => {
            const value = ['someOtherValue'];
            const result = toggleTreeItemValue({
                action: 'select-immediate',
                item,
                value
            });
            expect(result).toEqual([
                'someOtherValue',
                'parent',
                'child1',
                'child2'
            ]);
            expect(item.checked).toBe(true);
        });

        it('Unselect all descendants', () => {
            item.checked = true;
            const value = [
                'someOtherValue',
                'parent',
                'child1',
                'child2',
                'child1-1'
            ];
            const result = toggleTreeItemValue({
                action: 'unselect-all',
                item,
                value
            });

            expect(result).toEqual(['someOtherValue']);
            expect(item.checked).toBe(false);
        });

        it('Ignore cascade if item has no children', () => {
            const singleItem = { name: 'single', checked: false };
            const value = [];
            const result = toggleTreeItemValue({
                cascade: true,
                item: singleItem,
                value
            });

            expect(result).toContain('single');
            expect(singleItem.checked).toBe(true);
        });
    });
});
