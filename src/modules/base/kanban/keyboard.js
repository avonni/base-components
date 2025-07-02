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
                keyboardInterface.moveGroup(index, nextIndex);
            } else {
                keyboardInterface.setFocusOnGroup(nextIndex);
            }
            break;
        }
        case keyValues.left: {
            preventDefaultAndStopPropagation(event);
            const prevIndex = index - 1;
            if (isDragging) {
                keyboardInterface.moveGroup(index, prevIndex);
            } else {
                keyboardInterface.setFocusOnGroup(prevIndex);
            }
            break;
        }
        case keyValues.enter:
        case keyValues.space:
        case keyValues.spacebar:
            preventDefaultAndStopPropagation(event);
            keyboardInterface.selectGroup(event.target, index);
            break;
        default:
            keyboardInterface.endDrag();
    }
}

export function handleKeyDownOnTile(event, keyboardInterface) {
    const groupIndex = Number(event.target.dataset.groupIndex);
    const tileIndex = Number(event.target.dataset.index);
    if (isNaN(groupIndex) || isNaN(tileIndex)) {
        return;
    }
    const isDragging = keyboardInterface.isDragging();
    const subgroupIndex = Number(event.target.dataset.subgroupIndex);

    switch (event.key) {
        case keyValues.up: {
            preventDefaultAndStopPropagation(event);
            const prevIndex = tileIndex - 1;
            if (isDragging) {
                keyboardInterface.moveTile(
                    subgroupIndex,
                    groupIndex,
                    tileIndex,
                    prevIndex
                );
            } else {
                keyboardInterface.setFocusOnTile(
                    subgroupIndex,
                    groupIndex,
                    prevIndex
                );
            }
            break;
        }
        case keyValues.down: {
            preventDefaultAndStopPropagation(event);
            const nextIndex = tileIndex + 1;
            if (isDragging) {
                keyboardInterface.moveTile(
                    subgroupIndex,
                    groupIndex,
                    tileIndex,
                    nextIndex
                );
            } else {
                keyboardInterface.setFocusOnTile(
                    subgroupIndex,
                    groupIndex,
                    nextIndex
                );
            }
            break;
        }
        case keyValues.right: {
            preventDefaultAndStopPropagation(event);
            if (isDragging) {
                keyboardInterface.moveTileToGroup(
                    subgroupIndex,
                    tileIndex,
                    groupIndex,
                    groupIndex + 1
                );
            } else {
                keyboardInterface.setFocusOnTile(
                    subgroupIndex,
                    groupIndex + 1,
                    0
                );
            }
            break;
        }
        case keyValues.left: {
            preventDefaultAndStopPropagation(event);
            if (isDragging) {
                keyboardInterface.moveTileToGroup(
                    subgroupIndex,
                    tileIndex,
                    groupIndex,
                    groupIndex - 1
                );
            } else {
                keyboardInterface.setFocusOnTile(
                    subgroupIndex,
                    groupIndex - 1,
                    0
                );
            }
            break;
        }
        case keyValues.enter:
        case keyValues.space:
        case keyValues.spacebar:
            preventDefaultAndStopPropagation(event);
            keyboardInterface.selectTile(event.target, groupIndex, tileIndex);
            break;
        default:
            keyboardInterface.endDrag();
    }
}
