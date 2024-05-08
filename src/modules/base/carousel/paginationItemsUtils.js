/**
 * If the active pagination item is already visible and big, return its index. Otherwise, if the active pagination item needs to be moved into the visible area and grown, return undefined.
 *
 * @param {boolean} goToPrevious True if the user is moving to the previous item.
 * @returns {number} Index of the active pagination item, or undefined.
 */
function _activeItemIsVisible({
    activeItemIndex,
    goToPrevious,
    maxItems,
    nbOfPanels,
    panelIndex
}) {
    if (!maxItems || maxItems >= nbOfPanels) {
        return true;
    }
    const isLeavingFirstDot = panelIndex === 1;
    const isLeavingLastDot = panelIndex === nbOfPanels - 2;
    const isGoingToFirstDot = panelIndex === 0;
    const isGoingToLastDot = panelIndex === nbOfPanels - 1;

    const hasRightItem = activeItemIndex !== maxItems;
    const hasLeftItem = activeItemIndex !== 1;
    const goToLeftItem =
        goToPrevious && hasLeftItem && !isGoingToFirstDot && !isLeavingLastDot;
    const goToRightItem =
        !goToPrevious &&
        hasRightItem &&
        !isGoingToLastDot &&
        !isLeavingFirstDot;

    return goToLeftItem || goToRightItem;
}

function _getItemElements(carousel) {
    return carousel.template.querySelectorAll(
        '[data-element-id="a-pagination"]'
    );
}

function _getMovedActiveItemIndex({
    goToPrevious,
    maxItems,
    nbOfPanels,
    panelIndex
}) {
    const wentToFirstDot = goToPrevious && panelIndex === 0;
    const leftFirstDot = !goToPrevious && panelIndex === 1;
    const wentToLastDot = !goToPrevious && panelIndex === nbOfPanels - 1;
    const leftLastDot = goToPrevious && panelIndex === nbOfPanels - 2;

    if (wentToFirstDot) {
        return 1;
    } else if (leftFirstDot || (goToPrevious && !leftLastDot)) {
        return 2;
    } else if (wentToLastDot) {
        return maxItems;
    }
    return maxItems - 1;
}

function _getMovingActiveItemIndex({
    goToPrevious,
    maxItems,
    nbOfPanels,
    panelIndex
}) {
    const isLeavingFirstDot = !goToPrevious && panelIndex === 1;
    const isLeavingLastDot = goToPrevious && panelIndex === nbOfPanels - 2;

    if (isLeavingFirstDot) {
        return 2;
    } else if (isLeavingLastDot) {
        return maxItems - 1;
    }
    return goToPrevious ? 1 : maxItems;
}

function _animate({
    carousel,
    goToPrevious,
    items,
    maxItems,
    nbOfPanels,
    panelIndex
}) {
    let elements = _getItemElements(carousel);
    const activeIndex = _getMovingActiveItemIndex({
        goToPrevious,
        maxItems,
        nbOfPanels,
        panelIndex
    });
    elements.forEach((element, index) => {
        const item = items[index];
        if (item) {
            item.isActive = index === activeIndex;
            element.className = item.className;
            const classKey = goToPrevious
                ? 'previousAnimationClass'
                : 'nextAnimationClass';
            if (item[classKey]) {
                element.classList.add(item[classKey]);
            }
        }
    });

    carousel.paginationItemsTimeout = setTimeout(() => {
        _disableItems(items);
        const newIndex = _getMovedActiveItemIndex({
            goToPrevious,
            maxItems,
            nbOfPanels,
            panelIndex
        });
        elements = _getItemElements(carousel);
        elements.forEach((element, index) => {
            const item = items[index];
            item.isActive = index === newIndex;
            element.classList = item.className;
        });
    }, 500);
}

function _disableItems(items) {
    items.forEach((item) => {
        item.isActive = false;
    });
}

function updateActivePaginationItem({
    activeItemIndex,
    carousel,
    goToPrevious,
    jumpedPanels,
    maxItems,
    items,
    nbOfPanels,
    panelIndex
}) {
    clearTimeout(carousel.paginationItemsTimeout);
    const index = goToPrevious
        ? activeItemIndex - jumpedPanels
        : activeItemIndex + jumpedPanels;
    const activeItemIsVisible = _activeItemIsVisible({
        activeItemIndex: index,
        goToPrevious,
        maxItems,
        nbOfPanels,
        panelIndex
    });

    _disableItems(items);
    items.forEach((item) => {
        item.activePanelIndex = panelIndex;
    });
    const elements = _getItemElements(carousel);
    elements.forEach((element, i) => {
        const item = items[i];
        if (item) {
            element.className = item.className;
        }
    });

    if (activeItemIsVisible) {
        const activeItem = items[index];
        if (activeItem) {
            activeItem.isActive = true;
            if (elements[index]) {
                elements[index].className = activeItem.className;
            }
        }
        return index;
    }

    _animate({
        carousel,
        goToPrevious,
        items,
        maxItems,
        nbOfPanels,
        panelIndex
    });
    return _getMovedActiveItemIndex({
        goToPrevious,
        maxItems,
        nbOfPanels,
        panelIndex
    });
}

export { updateActivePaginationItem };
