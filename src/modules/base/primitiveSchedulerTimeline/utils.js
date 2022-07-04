/**
 * Find the cell element at a given schedule position.
 *
 * @param {HTMLElement} resource The resource element the cell is in.
 * @param {number} position The position of the cell.
 * @returns {(HTMLElement|undefined)} The cell element or undefined.
 */
export function getCellFromPosition(resource, position, isVertical) {
    const cellElements = Array.from(
        resource.querySelectorAll('[data-element-id="div-cell"]')
    );

    return cellElements.find((cellElement, index) => {
        const cellPosition = cellElement.getBoundingClientRect();
        const start = isVertical ? cellPosition.top : cellPosition.left;
        const end = isVertical ? cellPosition.bottom : cellPosition.right;

        const isFirstCell = index === 0;
        const isLastCell = index === cellElements.length - 1;
        const isBeforeFirstCell = isFirstCell && start >= position;
        const isAfterLastCell = isLastCell && position > end;
        const isInCell = position >= start && position < end;
        return isBeforeFirstCell || isAfterLastCell || isInCell;
    });
};
