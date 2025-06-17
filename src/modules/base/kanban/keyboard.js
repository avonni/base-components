import { keyValues } from 'c/utilsPrivate';

function preventDefaultAndStopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
}

export function handleKeyDownOnGroup(event, keyboardInterface) {
    const currentIndex = Number(event.target.dataset.groupIndex);
    switch (event.key) {
        case keyValues.right:
            preventDefaultAndStopPropagation(event);
            keyboardInterface.moveColumns(currentIndex, currentIndex + 1);
            break;
        case keyValues.left:
            preventDefaultAndStopPropagation(event);
            keyboardInterface.moveColumns(currentIndex, currentIndex - 1);
            break;
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
