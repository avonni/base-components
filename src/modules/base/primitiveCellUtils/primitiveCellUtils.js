import {
    startPositioning,
    stopPositioning,
    Direction
} from 'c/positionLibrary';
const IEDIT_PANEL_SELECTOR = '[data-iedit-panel-custom="true"]';

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

function getCellChangesByColumn(state, changes) {
    return Object.keys(changes).reduce((result, colKey) => {
        const columns = state.columns;
        const columnIndex = state.headerIndexes[colKey];
        const columnDef = columns[columnIndex];

        result[columnDef.columnKey || columnDef.fieldName] = changes[colKey];

        return result;
    }, {});
}

export function getResolvedCellChanges(state, dirtyValues) {
    const keyField = state.keyField;
    return Object.keys(dirtyValues).reduce((result, rowKey) => {
        // Get the changes made by column
        const cellChanges = getCellChangesByColumn(state, dirtyValues[rowKey]);
        if (Object.keys(cellChanges).length > 0) {
            // Add identifier for which row has change
            cellChanges[keyField] = rowKey;
            result.push(cellChanges);
        }
        return result;
    }, []);
}

function escapeDoubleQuotes(value) {
    if (typeof value == 'string') {
        return value.replace(/"/g, '\\"');
    }
    return value;
}

function getDataRow(rowKeyValue) {
    return `[data-row-key-value="${escapeDoubleQuotes(rowKeyValue)}"]`;
}

function getCellElementByKeys(dt, rowKeyValue, colKeyValue) {
    const selector = `${getDataRow(
        rowKeyValue
    )} [data-col-key-value="${escapeDoubleQuotes(colKeyValue)}"]`;
    return dt.template.querySelector(selector);
}

function stopPanelPositioning(dt) {
    if (dt.privatePositionRelationship) {
        stopPositioning(dt.privatePositionRelationship);
        dt.privatePositionRelationship = null;
    }
}

export function startPanelPositioning(dt, template, rowKeyValue, colKeyValue) {
    const target = getCellElementByKeys(dt, rowKeyValue, colKeyValue);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    requestAnimationFrame(() => {
        // we need to discard previous binding otherwise the panel
        // will retain previous alignment
        stopPanelPositioning(dt);

        dt.privatePositionRelationship = startPositioning(dt, {
            target,
            element: () =>
                template
                    .querySelector(IEDIT_PANEL_SELECTOR)
                    .getPositionedElement(),
            align: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            autoFlip: true
        });
    });
}
