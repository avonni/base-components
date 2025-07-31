import { keyValues } from 'c/utilsPrivate';

function preventDefaultAndStopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
}

function setFocusOnNextOption(option, moveUp, intf) {
    const index = parseInt(option.dataset.index, 10);
    const i = index + (moveUp ? -1 : 1);
    const options = intf.getElementsOfList(option.dataset.type);
    const next = options[i];
    if (next) {
        next.focus();
    }
}

function selectNextOption(option, moveUp, intf) {
    const selected = option.dataset.selected === 'true';
    const index = parseInt(option.dataset.index, 10);
    const i = index + (selected ? (moveUp ? -1 : 1) : 0);
    const options = intf.getElementsOfList(option.dataset.type);
    const next = options[i];
    if (next) {
        intf.updateSelectedOptions(next, true, false);
    }
}

function selectNextOptionFromShift(option, moveUp, isMultiple, intf) {
    const curr = parseInt(option.dataset.index, 10);
    if (intf.getShiftIndex() < 0) {
        intf.setShiftIndex(curr);
        intf.setLastShift(moveUp);
    }
    const next = curr + (intf.getLastShift() !== moveUp ? 0 : moveUp ? -1 : 1);
    const pos = next < intf.getShiftIndex();
    const shiftAdd = pos === moveUp || intf.getShiftIndex() === next;
    const options = intf.getElementsOfList(option.dataset.type);
    const nextOption = options[next];
    if (nextOption) {
        intf.updateSelectedOptions(nextOption, shiftAdd, isMultiple);
        intf.setLastShift(moveUp);
    }
}

export function handleKeyDownOnOption(event, keyboardInterface) {
    const selected = event.target.dataset.selected === 'true';
    if (event.metaKey || event.ctrlKey) {
        keyboardInterface.setShiftIndex(-1);
        const keyCodesA = 'A'.charCodeAt(0);
        switch (event.key) {
            case keyValues.up:
                preventDefaultAndStopPropagation(event);
                setFocusOnNextOption(event.target, true, keyboardInterface);
                break;
            case keyValues.down:
                preventDefaultAndStopPropagation(event);
                setFocusOnNextOption(event.target, false, keyboardInterface);
                break;
            case keyValues.right:
                preventDefaultAndStopPropagation(event);
                keyboardInterface.moveOptionsBetweenLists(true);
                break;
            case keyValues.left:
                preventDefaultAndStopPropagation(event);
                keyboardInterface.moveOptionsBetweenLists(false);
                break;
            case keyValues.enter:
            case keyValues.space:
            case keyValues.spacebar:
                preventDefaultAndStopPropagation(event);
                keyboardInterface.updateSelectedOptions(
                    event.target,
                    !selected,
                    true
                );
                break;
            case keyCodesA:
                preventDefaultAndStopPropagation(event);
                keyboardInterface.selectAllOptions(event.target);
                break;
            default:
            // do nothing
        }
    } else if (event.shiftKey) {
        switch (event.key) {
            case keyValues.up:
                preventDefaultAndStopPropagation(event);
                selectNextOptionFromShift(
                    event.target,
                    true,
                    true,
                    keyboardInterface
                );
                break;
            case keyValues.down:
                preventDefaultAndStopPropagation(event);
                selectNextOptionFromShift(
                    event.target,
                    false,
                    true,
                    keyboardInterface
                );
                break;
            default:
            // do nothing
        }
    } else {
        keyboardInterface.setShiftIndex(-1);
        switch (event.key) {
            case keyValues.up:
                preventDefaultAndStopPropagation(event);
                selectNextOption(event.target, true, keyboardInterface);
                break;
            case keyValues.down:
                preventDefaultAndStopPropagation(event);
                selectNextOption(event.target, false, keyboardInterface);
                break;
            case keyValues.enter:
            case keyValues.space:
            case keyValues.spacebar:
                preventDefaultAndStopPropagation(event);
                keyboardInterface.updateSelectedOptions(
                    event.target,
                    !selected,
                    false
                );
                keyboardInterface.dispatchOptionClick(event);
                break;
            default:
            // do nothing
        }
    }
}
