import { keyValues } from 'c/utilsPrivate';

function preventDefaultAndStopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
}

export function handleKeyDownOnGroup(event, keyboardInterface) {
    const index = Number(event.target.dataset.groupIndex);
    if (isNaN(index)) {
        return;
    }
    const isDragging = keyboardInterface.isDragging();
    switch (event.key) {
        case keyValues.right: {
            preventDefaultAndStopPropagation(event);
            const nextIndex = index + 1;
            if (isDragging) {
                keyboardInterface.moveColumn(index, nextIndex);
            } else {
                keyboardInterface.setFocusOnNextColumn(nextIndex);
            }
            break;
        }
        case keyValues.left: {
            preventDefaultAndStopPropagation(event);
            const prevIndex = index - 1;
            if (isDragging) {
                keyboardInterface.moveColumn(index, prevIndex);
            } else {
                keyboardInterface.setFocusOnNextColumn(prevIndex);
            }
            break;
        }
        case keyValues.enter:
        case keyValues.space:
        case keyValues.spacebar:
            preventDefaultAndStopPropagation(event);
            keyboardInterface.selectColumn(event.target, index);
            break;
        default:
            keyboardInterface.endDrag();
        // do nothing
    }
}

export function handleKeyDownOnItem(event, keyboardInterface) {
    const groupIndex = Number(event.target.dataset.groupIndex);
    const itemIndex = Number(event.target.dataset.index);
    if (isNaN(groupIndex) || isNaN(itemIndex)) {
        return;
    }
    const isDragging = keyboardInterface.isDragging();
    switch (event.key) {
        case keyValues.up: {
            preventDefaultAndStopPropagation(event);
            const prevIndex = itemIndex - 1;
            if (isDragging) {
                keyboardInterface.moveItemInsideGroup(
                    groupIndex,
                    itemIndex,
                    prevIndex
                );
            } else {
                keyboardInterface.setFocusOnNextItem(groupIndex, prevIndex);
            }
            break;
        }
        case keyValues.down: {
            preventDefaultAndStopPropagation(event);
            const nextIndex = itemIndex + 1;
            if (isDragging) {
                keyboardInterface.moveItemInsideGroup(
                    groupIndex,
                    itemIndex,
                    nextIndex
                );
            } else {
                keyboardInterface.setFocusOnNextItem(groupIndex, nextIndex);
            }
            break;
        }
        case keyValues.right: {
            preventDefaultAndStopPropagation(event);
            if (isDragging) {
                keyboardInterface.moveItemToGroup(
                    itemIndex,
                    groupIndex,
                    groupIndex + 1
                );
            }
            break;
        }
        case keyValues.left: {
            preventDefaultAndStopPropagation(event);
            if (isDragging) {
                keyboardInterface.moveItemToGroup(
                    itemIndex,
                    groupIndex,
                    groupIndex - 1
                );
            }
            break;
        }
        case keyValues.enter:
        case keyValues.space:
        case keyValues.spacebar:
            preventDefaultAndStopPropagation(event);
            keyboardInterface.selectItem(event.target, groupIndex, itemIndex);
            break;
        default:
            keyboardInterface.endDrag();
        // do nothing
    }
}
