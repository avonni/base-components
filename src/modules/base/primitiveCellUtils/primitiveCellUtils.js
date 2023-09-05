export function isEditable(state, index, columns) {
    const systemCols = Object.keys(state.headerIndexes).filter(
        (colKeyValue) =>
            colKeyValue.includes('-rowNumber-') ||
            colKeyValue.includes('-SELECTABLE_CHECKBOX-')
    );

    if (index) {
        let colIndex = index - systemCols.length;
        const column = columns && columns[colIndex];
        return column ? column.editable : false;
    }
    return false;
}
