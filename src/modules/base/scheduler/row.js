export default class Row {
    constructor(props) {
        this.key = props.key;
        this.columns = [];
    }

    generateColumns(array) {
        const columns = [];
        array.forEach((_element, index) => {
            columns.push(index);
        });
        this.columns = columns;
    }
}
