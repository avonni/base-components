/**
 * Apply the boundaries to the magnifier.
 */
function applyBoundaries(position, dimensions, zoomFactor) {
    const boundedPos = { x: position.x, y: position.y };
    const rightBoundary = dimensions.img.width - dimensions.w / zoomFactor;
    const leftBoundary = dimensions.w / zoomFactor;
    const bottomBoundary = dimensions.img.height - dimensions.h / zoomFactor;
    const topBoundary = dimensions.h / zoomFactor;

    if (position.x > rightBoundary) {
        boundedPos.x = rightBoundary;
    }
    if (position.x < leftBoundary) {
        boundedPos.x = leftBoundary;
    }
    if (position.y > bottomBoundary) {
        boundedPos.y = bottomBoundary;
    }
    if (position.y < topBoundary) {
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
 * Get the magnifier data.
 *
 * @returns {object} x, y, w, h, magnifier, magnifiedLens, magnifiedImage, img
 */
export function getMagnifierData(
    position,
    magnifierAttributes,
    magnifier,
    magnifiedLens,
    magnifiedImage,
    target
) {
    const w = magnifier.offsetWidth / 2;
    const h = magnifier.offsetHeight / 2;
    const dimensions = {
        img: target,
        w,
        h
    };
    const boundedPosition = applyBoundaries(
        position,
        dimensions,
        magnifierAttributes.zoomFactor
    );
    const x = boundedPosition.x;
    const y = boundedPosition.y;

    return {
        x,
        y,
        w,
        h,
        magnifier,
        magnifiedLens,
        magnifiedImage,
        img: target
    };
}

/**
 * Get the position of the cursor relative to the image.
 *
 * @returns {object} posX, posY
 */
export function getRelativePosition(target, x, y) {
    const rect = target.getBoundingClientRect();
    if (!rect) {
        return { x, y };
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
 * Scale the magnified image according to the zoom factor.
 */
export function scaleMagnifiedImage(target, imgHeight, imgWidth, zoomFactor) {
    target.style.height = `${imgHeight * zoomFactor}px`;
    target.style.width = `${imgWidth * zoomFactor}px`;
}

/**
 * Show magnifier box.
 */
export function showMagnifierBox(
    type,
    zoomRatioWidth,
    zoomRatioHeight,
    imgWidth,
    imgHeight,
    target
) {
    if (type === 'inner') {
        target.style.width = `${imgWidth}px`;
        target.style.height = `${imgHeight}px`;
    } else {
        target.style.width = zoomRatioWidth;
        target.style.height = zoomRatioHeight;
    }
    target.style.display = 'block';
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
