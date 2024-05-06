function _getMovedPaginationIndex({ goToPrevious, nbOfPanels, panelIndex }) {
    const isMovingToBeginning = panelIndex === 2;
    const isEnd = panelIndex >= nbOfPanels - 3;
    return (goToPrevious && !isMovingToBeginning) || (!goToPrevious && isEnd)
        ? 2
        : 3;
}

function _getPaginationElements(carousel) {
    return carousel.template.querySelectorAll(
        '[data-element-id="a-pagination"]'
    );
}

function _animatePaginationItem({
    carousel,
    goToPrevious,
    items,
    nbOfPanels,
    panelIndex
}) {
    let elements = _getPaginationElements(carousel);
    elements.forEach((element, index) => {
        const item = items[index];
        if (item) {
            item.isActive =
                index ===
                _getMovingActivePaginationIndex({
                    goToPrevious,
                    nbOfPanels,
                    panelIndex
                });
            element.className = item.className;
            const classKey = goToPrevious
                ? 'previousAnimationClass'
                : 'nextAnimationClass';
            if (item[classKey]) {
                element.classList.add(item[classKey]);
            }
        }
    });

    setTimeout(() => {
        _disableItems(items);
        const newIndex = _getMovedPaginationIndex({
            goToPrevious,
            nbOfPanels,
            panelIndex
        });
        elements = _getPaginationElements(carousel);
        elements.forEach((element, index) => {
            items[index].isActive = index === newIndex;
            element.classList = items[index].className;
        });
    }, 500);
}

function _disableItems(items) {
    items.forEach((item) => {
        item.isActive = false;
    });
}

/**
 * Return the index of the pagination item that should be displayed as active, when the pagination animation is running.
 *
 * @param {boolean} True if the user is moving to the previous item.
 * @returns {number} Index of the active pagination item.
 */
function _getMovingActivePaginationIndex({
    goToPrevious,
    nbOfPanels,
    panelIndex
}) {
    if (goToPrevious && panelIndex < 3) {
        return 2;
    } else if (goToPrevious) {
        return 1;
    } else if (!goToPrevious && panelIndex >= nbOfPanels - 3) {
        return 3;
    }
    return 4;
}

/**
 * If the active pagination item is already visible and big, return its index. Otherwise, if the active pagination item needs to be moved into the visible area and grown, return undefined.
 *
 * @param {boolean} goToPrevious True if the user is moving to the previous item.
 * @returns {number} Index of the active pagination item, or undefined.
 */
function _getVisibleActivePaginationIndex({
    goToPrevious,
    items,
    nbOfPanels,
    panelIndex
}) {
    const previousActiveItemIndex = items.findIndex((i) => i.isActive);
    const isBeginning = panelIndex < 3;
    const isEnd = panelIndex >= nbOfPanels - 3;
    const isMovingToLeftItem = goToPrevious && previousActiveItemIndex === 3;

    if (isMovingToLeftItem) {
        return 2;
    } else if (isBeginning) {
        return panelIndex + 1;
    } else if (isEnd) {
        return 5 - (nbOfPanels - panelIndex);
    }
    return undefined;
}

function updateActivePaginationItem({
    carousel,
    goToPrevious,
    items,
    nbOfPanels,
    panelIndex
}) {
    const index = _getVisibleActivePaginationIndex({
        goToPrevious,
        items,
        nbOfPanels,
        panelIndex
    });
    _disableItems(items);
    items.forEach((item) => {
        item.activeIndexPanel = panelIndex;
    });
    const elements = _getPaginationElements(carousel);
    elements.forEach((element, i) => {
        if (items[i]) {
            element.className = items[i].className;
        }
    });

    if (!isNaN(index)) {
        const activeItem = items[index];
        if (activeItem) {
            activeItem.isActive = true;
            elements[index].className = activeItem.className;
        }

        const isMovingToBeginning = panelIndex === 2;
        const isMovingToEnd = panelIndex === nbOfPanels - 3;
        const noAnimation =
            (goToPrevious && !isMovingToBeginning) ||
            (!goToPrevious && !isMovingToEnd);
        if (noAnimation) {
            return;
        }
    }

    _animatePaginationItem({
        carousel,
        goToPrevious,
        items,
        nbOfPanels,
        panelIndex
    });
}

export { updateActivePaginationItem };
