export function getRowIndexByKey(state, key) {
    if (!state.indexes[key]) {
        return undefined;
    }

    return state.indexes[key].rowIndex;
}

export function getRowByKey(state, key) {
    const rows = state.rows;
    return rows[getRowIndexByKey(state, key)];
}

export function getCellValue(state, rowKeyValue, colKeyValue) {
    const row = getRowByKey(state, rowKeyValue);
    const colIndex = state.headerIndexes[colKeyValue];

    return row.cells[colIndex].value;
}

export function getSelectedRowsKeys(state) {
    return Object.keys(state.selectedRowsKeys).filter(
        (key) => state.selectedRowsKeys[key]
    );
}

export function getCurrentSelectionLength(state) {
    return getSelectedRowsKeys(state).length;
}

export function isSelectedRow(state, rowKeyValue) {
    return !!state.selectedRowsKeys[rowKeyValue];
}

export function getColumns(state) {
    return state.columns;
}

/**
 *
 * @param {Object} changes - The internal representation of changes in a row.
 * @returns {Object} - the list of customer changes in a row
 */
export function getColumnsChangesForCustomer(changes, state) {
    return Object.keys(changes).reduce((result, colKey) => {
        const columns = state.columns;
        const columnIndex = state.headerIndexes[colKey];

        result[columns[columnIndex].fieldName] = changes[colKey];

        return result;
    }, {});
}

/**
 *
 * @param {Object} changes - The internal representation of changes in a row
 * @returns {Object} - The formatted data for draft values.
 */
export function getChangesForCustomer(changes, state) {
    const keyField = state.keyField;
    return Object.keys(changes).reduce((result, rowKey) => {
        const rowChanges = getColumnsChangesForCustomer(changes[rowKey], state);

        if (Object.keys(rowChanges).length > 0) {
            rowChanges[keyField] = rowKey;
            result.push(rowChanges);
        }
        return result;
    }, []);
}

/* -------------- MassCheckboxChange ------------- */

function markDeselectedCell(state, rowKeyValue, colKeyValue) {
    const row = getRowByKey(state, rowKeyValue);
    const colIndex = state.headerIndexes[colKeyValue];

    if (row && colIndex) {
        row.cells[colIndex].ariaSelected = false;
    }
}

export function markSelectedCell(state, rowKeyValue, colKeyValue) {
    const row = getRowByKey(state, rowKeyValue);
    const colIndex = state.headerIndexes[colKeyValue];

    if (row && colIndex) {
        row.cells[colIndex].ariaSelected = 'true';
    }
}

export function markAllSelectedRowsAsSelectedCell(state) {
    const { colKeyValue } = state.inlineEdit;
    const selectedRowKeys = getSelectedRowsKeys(state);

    selectedRowKeys.forEach((rowKeyValue) => {
        markSelectedCell(state, rowKeyValue, colKeyValue);
    });
}

export function markAllSelectedRowsAsDeselectedCell(state) {
    const { colKeyValue } = state.inlineEdit;
    const selectedRowKeys = getSelectedRowsKeys(state);

    selectedRowKeys.forEach((rowKeyValue) => {
        markDeselectedCell(state, rowKeyValue, colKeyValue);
    });
}

/* -------------- processInlineEditFinish ------------- */
export function isValidCell(state, rowKeyValue, colKeyValue) {
    const row = getRowByKey(state, rowKeyValue);
    const colIndex = state.headerIndexes[colKeyValue];

    return row && row.cells[colIndex];
}

export function updateDirtyValues(state, rowColKeyValues) {
    const dirtyValues = state.inlineEdit.dirtyValues;

    Object.keys(rowColKeyValues).forEach((rowKey) => {
        if (!Object.prototype.hasOwnProperty.call(dirtyValues, rowKey)) {
            dirtyValues[rowKey] = {};
        }

        Object.assign(dirtyValues[rowKey], rowColKeyValues[rowKey]);
    });
}

function dispatchCellChangeEvent(dtInstance, cellChange) {
    dtInstance.dispatchEvent(
        new CustomEvent('cellchange', {
            detail: {
                draftValues: getChangesForCustomer(dtInstance.state, cellChange)
            }
        })
    );
}

export function processInlineEditFinishCustom(
    dt,
    reason,
    rowKeyValue,
    colKeyValue
) {
    const state = dt.state;
    const inlineEditState = state.inlineEdit;
    console.log(inlineEditState);

    const shouldSaveData =
        reason !== 'edit-canceled' &&
        !(inlineEditState.massEditEnabled && reason === 'loosed-focus') &&
        isValidCell(dt.state, rowKeyValue, colKeyValue);

    if (shouldSaveData) {
        const panel = dt.template.querySelector('[data-iedit-panel="true"]');
        const editValue = panel.value;
        const isValidEditValue = panel.validity.valid;
        const updateAllSelectedRows = panel.isMassEditChecked;
        const currentValue = getCellValue(state, rowKeyValue, colKeyValue);

        if (
            isValidEditValue &&
            (editValue !== currentValue || updateAllSelectedRows)
        ) {
            const cellChange = {};
            cellChange[rowKeyValue] = {};
            cellChange[rowKeyValue][colKeyValue] = editValue;

            if (updateAllSelectedRows) {
                const selectedRowKeys = getSelectedRowsKeys(state);
                selectedRowKeys.forEach((rowKey) => {
                    cellChange[rowKey] = {};
                    cellChange[rowKey][colKeyValue] = editValue;
                });
            }

            updateDirtyValues(state, cellChange);

            dispatchCellChangeEvent(dt, cellChange);

            // @todo: do we need to update all rows in the dt or just the one that was modified?
            // updateRowsAndCellIndexes.call(dt);
        }
    }
}
