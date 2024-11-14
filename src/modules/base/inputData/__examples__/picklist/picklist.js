import { LightningElement } from 'lwc';

export default class InputDataPicklist extends LightningElement {
    options = [
        { label: 'Test 1', value: 'test1' },
        { label: 'Test 2', value: 'test2' },
        { label: 'Test 3', value: 'test3' },
        { label: 'Test 4', value: 'test4' },
        { label: 'Test 5', value: 'test5' },
        { label: 'Test 6', value: 'test6' }
    ];
}
