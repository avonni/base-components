const MAX_LOADED_OPTIONS = 30;
const LOADED_OPTIONS_SLICE = MAX_LOADED_OPTIONS / 3;

function computeScroll({
    list,
    loadMoreOffset,
    nbOptions,
    previousStartIndex,
    previousEndIndex
}) {
    const height = list.scrollHeight;
    const scrolledDistance = list.scrollTop;
    const bottomLimit = height - list.clientHeight - loadMoreOffset;
    const loadDown = scrolledDistance >= bottomLimit;
    const loadUp = scrolledDistance <= loadMoreOffset;

    let startIndex, endIndex;
    if (loadDown) {
        startIndex = previousStartIndex + LOADED_OPTIONS_SLICE;
        endIndex = previousEndIndex + LOADED_OPTIONS_SLICE;
    } else if (loadUp) {
        const previousStart = previousStartIndex - LOADED_OPTIONS_SLICE;
        startIndex = Math.max(previousStart, 0);
        endIndex = startIndex + MAX_LOADED_OPTIONS;
    }

    const maxStart = nbOptions - MAX_LOADED_OPTIONS - LOADED_OPTIONS_SLICE;
    const loadMore = startIndex > maxStart;
    if (loadMore) {
        startIndex = maxStart;
    }

    const loadAll = nbOptions && endIndex + LOADED_OPTIONS_SLICE >= nbOptions;
    if (loadAll) {
        // Not many options left, load them all
        endIndex = Math.max(nbOptions, MAX_LOADED_OPTIONS);
    }

    return { startIndex, endIndex, loadDown, loadMore };
}

function getTopOption({ list, groupElements, topActionsHeight }) {
    const listTop = list.getBoundingClientRect().top;
    const top = listTop + topActionsHeight;
    const options = Array.from(groupElements)
        .map((g) => g.optionElements)
        .flat();

    for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        const position = opt.getBoundingClientRect();
        if (top + 1 >= position.top && top - 1 <= position.bottom) {
            return {
                value: opt.dataset.value,
                offset: top - position.top
            };
        }
    }
    if (options[0]) {
        return {
            value: options[0].dataset.value,
            offset: 0
        };
    }
    return null;
}

function isOutsideOfView(option, list) {
    const listBounds = list.getBoundingClientRect();
    const { top, bottom } = option.getBoundingClientRect();
    return top < listBounds.top || bottom > listBounds.bottom;
}

export { computeScroll, getTopOption, isOutsideOfView, MAX_LOADED_OPTIONS };
