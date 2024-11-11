import { arraysEqual, equal, objectsEqual } from '../utility';

describe('Utils Private: Utility', () => {
    describe('arraysEqual()', () => {
        it('True for two empty arrays', () => {
            expect(arraysEqual([], [])).toBe(true);
        });

        it('False if one of the arrays is null or undefined', () => {
            expect(arraysEqual(null, [])).toBe(false);
            expect(arraysEqual([], undefined)).toBe(false);
            expect(arraysEqual(undefined, undefined)).toBe(false);
            expect(arraysEqual(null, null)).toBe(false);
        });

        it('False for arrays of different lengths', () => {
            expect(arraysEqual([1, 2], [1, 2, 3])).toBe(false);
        });

        it('True for arrays with the same primitive elements', () => {
            expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        });

        it('False for arrays with different primitive elements', () => {
            expect(arraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
        });

        it('True for nested arrays with the same elements', () => {
            expect(
                arraysEqual(
                    [
                        [1, 2],
                        [3, 4]
                    ],
                    [
                        [1, 2],
                        [3, 4]
                    ]
                )
            ).toBe(true);
        });

        it('False for nested arrays with different elements', () => {
            expect(
                arraysEqual(
                    [
                        [1, 2],
                        [3, 4]
                    ],
                    [
                        [1, 2],
                        [4, 3]
                    ]
                )
            ).toBe(false);
        });

        it('True for arrays with equal objects', () => {
            expect(
                arraysEqual(
                    [{ a: 1, b: 17 }, { b: 2 }],
                    [{ a: 1, b: 17 }, { b: 2 }]
                )
            ).toBe(true);
        });

        it('False for arrays with different objects', () => {
            expect(
                arraysEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 3 }])
            ).toBe(false);
        });
    });

    describe('objectsEqual()', () => {
        class CustomClass {
            constructor(value) {
                this.value = value;
            }
        }

        it('True for identical objects', () => {
            const obj1 = { a: 1, b: 2, c: 3 };
            const obj2 = { a: 1, c: 3, b: 2 };
            expect(objectsEqual(obj1, obj2)).toBe(true);
        });

        it('False for objects with different keys', () => {
            const obj1 = { a: 1, b: 2, c: 3 };
            const obj2 = { a: 1, b: 2, d: 3 };
            expect(objectsEqual(obj1, obj2)).toBe(false);
        });

        it('False for objects with different values', () => {
            const obj1 = { a: 1, b: 2, c: 3 };
            const obj2 = { a: 1, b: 2, c: 4 };
            expect(objectsEqual(obj1, obj2)).toBe(false);
        });

        it('True for empty objects', () => {
            expect(objectsEqual({}, {})).toBe(true);
        });

        it('False for objects with different number of keys', () => {
            const obj1 = { a: 1, b: 2 };
            const obj2 = { a: 1, b: 2, c: 3 };
            expect(objectsEqual(obj1, obj2)).toBe(false);
        });

        it('True for objects with identical custom class instances', () => {
            const obj1 = { a: new CustomClass(1), b: new CustomClass(2) };
            const obj2 = { a: new CustomClass(1), b: new CustomClass(2) };
            expect(objectsEqual(obj1, obj2)).toBe(true);
        });

        it('False for objects with different custom class instances', () => {
            const obj1 = { a: new CustomClass(1), b: new CustomClass(2) };
            const obj2 = { a: new CustomClass(1), b: new CustomClass(3) };
            expect(objectsEqual(obj1, obj2)).toBe(false);
        });
    });

    describe('equal', () => {
        it('True for identical primitive values', () => {
            expect(equal(1, 1)).toBe(true);
            expect(equal('test', 'test')).toBe(true);
            expect(equal(true, true)).toBe(true);
        });

        it('False for different primitive values', () => {
            expect(equal(1, 2)).toBe(false);
            expect(equal('test', 'Test')).toBe(false);
            expect(equal(true, false)).toBe(false);
        });

        it('True for identical arrays', () => {
            expect(equal([1, 2, 3], [1, 2, 3])).toBe(true);
        });

        it('False for different arrays', () => {
            expect(equal([1, 2, 3], [1, 2, 4])).toBe(false);
        });

        it('True for identical objects', () => {
            expect(equal({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
        });

        it('False for different objects', () => {
            expect(equal({ a: 1, b: 2 }, { a: 1 })).toBe(false);
        });

        it('True for identical dates', () => {
            const date1 = new Date(2020, 1, 1);
            const date2 = new Date(2020, 1, 1);
            expect(equal(date1, date2)).toBe(true);
        });

        it('False for different dates', () => {
            const date1 = new Date(2020, 1, 1);
            const date2 = new Date(2021, 1, 1);
            expect(equal(date1, date2)).toBe(false);
        });

        it('True for identical regexps', () => {
            expect(equal(/abc/, /abc/)).toBe(true);
        });

        it('False for different regexps', () => {
            expect(equal(/abc/, /def/)).toBe(false);
        });

        it('True for identical maps', () => {
            const map1 = new Map([
                ['keyOne', 'valueOne'],
                ['keyTwo', { a: 'valueA' }]
            ]);
            const map2 = new Map([
                ['keyOne', 'valueOne'],
                ['keyTwo', { a: 'valueA' }]
            ]);
            expect(equal(map1, map2)).toBe(true);
        });

        it('False for different maps', () => {
            const map1 = new Map([
                ['keyOne', 'newValue'],
                ['keyTwo', 'valueTwo']
            ]);
            const map2 = new Map([
                ['keyOne', 'valueOne'],
                ['keyTwo', 'valueTwo']
            ]);
            expect(equal(map1, map2)).toBe(false);
        });

        it('True for identical sets', () => {
            const set1 = new Set(['value 1', 'value 2', 4]);
            const set2 = new Set(['value 1', 'value 2', 4]);
            expect(equal(set1, set2)).toBe(true);
        });

        it('False for identical sets', () => {
            const set1 = new Set(['value 1', 'value 3', 4]);
            const set2 = new Set(['value 1', 'value 2', 4]);
            expect(equal(set1, set2)).toBe(false);
        });

        it('False for different types', () => {
            expect(equal(1, '1')).toBe(false);
            expect(equal(true, 1)).toBe(false);
        });
    });
});
