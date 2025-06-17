import { keyValues } from 'c/utilsPrivate';

function preventDefaultAndStopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
}

export function handleKeyDownOnGroup(event, keyboardInterface) {
    const currentIndex = Number(event.target.dataset.groupIndex);
    if (isNaN(currentIndex)) {
        return;
    }
    const isDragging = event.target.dataset.isDragging === 'true';
    switch (event.key) {
        case keyValues.right: {
            preventDefaultAndStopPropagation(event);
            const nextIndex = currentIndex + 1;
            if (isDragging) {
                keyboardInterface.moveColumn(currentIndex, nextIndex);
            } else {
                keyboardInterface.setFocusOnNextColumn(nextIndex);
            }
            break;
        }
        case keyValues.left: {
            preventDefaultAndStopPropagation(event);
            const prevIndex = currentIndex - 1;
            if (isDragging) {
                keyboardInterface.moveColumn(currentIndex, prevIndex);
            } else {
                keyboardInterface.setFocusOnNextColumn(prevIndex);
            }
            break;
        }
        case keyValues.enter:
        case keyValues.space:
        case keyValues.spacebar:
            preventDefaultAndStopPropagation(event);
            keyboardInterface.selectColumn(event.target, currentIndex);
            break;
        default:
            keyboardInterface.endDrag();
        // do nothing
    }
}
