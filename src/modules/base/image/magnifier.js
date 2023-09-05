/**
 * Apply the boundaries to the magnifier.
 */
export function applyBoundaries(realPos, dimensions, magnifierAttributes) {
    const boundedPos = { x: realPos.x, y: realPos.y };
    const rightBoundary =
        dimensions.img.width - dimensions.w / magnifierAttributes.zoomFactor;
    const leftBoundary = dimensions.w / magnifierAttributes.zoomFactor;
    const bottomBoundary =
        dimensions.img.height - dimensions.h / magnifierAttributes.zoomFactor;
    const topBoundary = dimensions.h / magnifierAttributes.zoomFactor;

    if (realPos.x > rightBoundary) {
        boundedPos.x = rightBoundary;
    }
    if (realPos.x < leftBoundary) {
        boundedPos.x = leftBoundary;
    }
    if (realPos.y > bottomBoundary) {
        boundedPos.y = bottomBoundary;
    }
    if (realPos.y < topBoundary) {
        boundedPos.y = topBoundary;
    }
    return boundedPos;
}

/**
 * Automatically position the magnifier depending on the image alignment.
 */
function autoPositionMagnifier(magnifier, img, magnifierAttributes, position) {
    switch (position) {
        case 'right':
            magnifier.style.left = `${
                -magnifier.offsetWidth - magnifierAttributes.horizontalOffset
            }px`;
            magnifier.style.top = `${magnifierAttributes.verticalOffset}px`;
            break;
        case 'center':
            magnifier.style.left = `${
                img.width + magnifierAttributes.horizontalOffset
            }px`;
            magnifier.style.top = `${magnifierAttributes.verticalOffset}px`;
            break;
        default:
            magnifier.style.left = `${
                img.width + magnifierAttributes.horizontalOffset
            }px`;
            magnifier.style.top = `${magnifierAttributes.verticalOffset}px`;
            break;
    }
}

/**
 * Apply the follow magnifying effect to the image.
 */
export function followMagnifier(
    { x, y, w, h, magnifier, magnifiedImage },
    zoomFactor
) {
    magnifier.style.left = `${x - w}px`;
    magnifier.style.top = `${y - h}px`;
    magnifiedImage.style.transform = `translate(-${x * zoomFactor - w}px, -${
        y * zoomFactor - h
    }px)`;
}

/**
 * Get the position of the cursor relative to the image.
 *
 * @returns {object} posX, posY
 */
export function getCursorPosition(event) {
    const rect = event.target.getBoundingClientRect();
    let x, y;
    if (event.type === 'touchstart' || event.type === 'touchmove') {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    const posX = x - rect.left;
    const posY = y - rect.top;
    return { x: posX, y: posY };
}

/**
 * Apply the inner magnifying effect to the image.
 */
export function innerMagnifier(
    { x, y, w, h, magnifier, magnifiedImage },
    zoomFactor
) {
    magnifier.style.left = 0;
    magnifier.style.top = 0;

    magnifiedImage.style.transform = `translate(-${x * zoomFactor - w}px, -${
        y * zoomFactor - h
    }px)`;
}

/**
 * Apply the standard magnifying effect to the image.
 */
export function standardMagnifier(data, magnifierAttributes, imgPosition) {
    const { x, y, w, h, magnifier, magnifiedLens, magnifiedImage, img } = data;
    const {
        position,
        horizontalOffset,
        verticalOffset,
        zoomFactor,
        zoomRatioWidth,
        zoomRatioHeight
    } = magnifierAttributes;
    const ratioW = parseFloat(zoomRatioWidth);
    const ratioH = parseFloat(zoomRatioHeight);

    magnifiedLens.style.display = 'block';
    magnifiedLens.style.width = `${ratioW / zoomFactor}px`;
    magnifiedLens.style.height = `${ratioH / zoomFactor}px`;
    magnifiedLens.style.top = `${y - h / zoomFactor}px`;
    magnifiedLens.style.left = `${x - w / zoomFactor}px`;

    switch (position) {
        case 'auto':
            autoPositionMagnifier(
                magnifier,
                img,
                magnifierAttributes,
                imgPosition
            );
            break;
        case 'left':
            magnifier.style.left = `${
                -magnifier.offsetWidth - horizontalOffset
            }px`;
            magnifier.style.top = `${verticalOffset}px`;
            break;
        case 'right':
            magnifier.style.left = `${img.width + horizontalOffset}px`;
            magnifier.style.top = `${verticalOffset}px`;
            break;
        case 'top':
            magnifier.style.left = `${horizontalOffset}px`;
            magnifier.style.top = `${
                -magnifier.offsetHeight - verticalOffset
            }px`;
            break;
        case 'bottom':
            magnifier.style.left = `${horizontalOffset}px`;
            magnifier.style.top = `${img.height + verticalOffset}px`;
            break;
        default:
            break;
    }
    const zoom = zoomFactor;
    magnifiedImage.style.transform = `translate(-${x * zoom - w}px, -${
        y * zoom - h
    }px)`;
}
