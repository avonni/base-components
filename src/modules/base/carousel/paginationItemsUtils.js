function _getItemElements(carousel) {
    return carousel.template.querySelectorAll(
        '[data-element-id="a-pagination"]'
    );
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
    const activeIndex = goToPrevious ? 1 : maxItems;
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

    setTimeout(() => {
        if (!carousel.maxIndicatorItems) {
            // The property value may change before the timeout is executed
            return;
        }
        _disableItems(items);
        let newIndex;
        if (goToPrevious && panelIndex === 0) {
            newIndex = 1;
        } else if (goToPrevious) {
            newIndex = 2;
        } else if (panelIndex === nbOfPanels - 1) {
            newIndex = maxItems;
        } else {
            newIndex = maxItems - 1;
        }
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

/**
 * If the active pagination item is already visible and big, return its index. Otherwise, if the active pagination item needs to be moved into the visible area and grown, return undefined.
 *
 * @param {boolean} goToPrevious True if the user is moving to the previous item.
 * @returns {number} Index of the active pagination item, or undefined.
 */
function _getVisibleActiveItemIndex({
    activeItemIndex,
    goToPrevious,
    maxItems,
    nbOfPanels,
    panelIndex
}) {
    const hasRightItem =
        activeItemIndex < maxItems - 1 && panelIndex < nbOfPanels - 1;
    const hasLeftItem = activeItemIndex > 1;
    const goToLeftItem = goToPrevious && hasLeftItem;
    const goToRightItem = !goToPrevious && hasRightItem;

    if (goToLeftItem) {
        return activeItemIndex - 1;
    } else if (goToRightItem) {
        return activeItemIndex + 1;
    }
    return undefined;
}

function updateActivePaginationItem({
    activeItemIndex,
    carousel,
    goToPrevious,
    maxItems,
    items,
    nbOfPanels,
    panelIndex
}) {
    const index = maxItems
        ? _getVisibleActiveItemIndex({
              activeItemIndex,
              goToPrevious,
              maxItems,
              nbOfPanels,
              panelIndex
          })
        : panelIndex;

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

    if (!isNaN(index)) {
        const activeItem = items[index];
        if (activeItem) {
            activeItem.isActive = true;
            elements[index].className = activeItem.className;
        }
        return index;
    }

    _animate({
        activeItemIndex,
        carousel,
        goToPrevious,
        items,
        maxItems,
        nbOfPanels,
        panelIndex
    });
    return goToPrevious ? 2 : maxItems - 2;
}

export { updateActivePaginationItem };
