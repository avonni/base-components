import { LightningElement } from 'lwc';

export default class SchedulerBigDataSet extends LightningElement {
    columns = [
        {
            label: 'Employee',
            fieldName: 'name',
            initialWidth: 120
        }
    ];

    start = new Date(2021, 11, 13, 8);

    timeSpan = {
        unit: 'year',
        span: 3
    };

    connectedCallback() {
        this.rows = this.generateRows();
        this.events = this.generateEvents();
    }

    generateEvents() {
        const computedEvents = [];
        const keyFields = [];
        for (let i = 1; i <= 20; i++) {
            keyFields.push(i.toString());
        }

        let startTime = this.start.getTime();
        let endTime = startTime + 7200000;

        for (let i = 1; i <= 1000; i++) {
            // The event will be on one to three rows
            const keyFieldsNumber = Math.floor(Math.random() * 3) + 1;
            const eventKeyFields = [];
            const computedKeyFields = [...keyFields];
            for (let j = 0; j < keyFieldsNumber; j++) {
                const keyFieldIndex = Math.floor(
                    Math.random() * computedKeyFields.length
                );
                eventKeyFields.push(computedKeyFields[keyFieldIndex]);
                computedKeyFields.splice(keyFieldIndex, 1);
            }

            computedEvents.push({
                keyFields: eventKeyFields,
                name: `event-${i}`,
                title: `Event ${i}`,
                from: startTime,
                to: endTime
            });

            startTime += 3600000;
            endTime = startTime + 7200000;
        }

        return computedEvents;
    }

    generateRows() {
        const computedRows = [];
        for (let i = 1; i <= 20; i++) {
            computedRows.push({
                id: i.toString(),
                name: `Employee #${i}`
            });
        }
        return computedRows;
    }
}
