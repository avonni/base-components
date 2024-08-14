import { LightningElement } from 'lwc';

export default class InputChoiceSetToggleStretch extends LightningElement {
    options = [
        { label: 'Pacific Cyan', value: 'pacificCyan', color: '#06AED5' },
        { label: 'Cerulean', value: 'cerulean', color: '#086788' },
        {
            label: 'School Bus Yellow',
            value: 'schoolBusYellow',
            color: '#F8D525'
        },
        { label: 'Harvest Gold', value: 'harvestGold', color: '#F5AB00' },
        { label: 'Rojo', value: 'rojo', color: '#DD1C1A' }
    ];
    typeAttributes = {
        stretch: true
    };
}
