/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
function autoPositionMagnifier(
    magnifier,
    img,
    magnifierAttributes,
    position,
    thumbnail
) {
    const thumbnailMargin = thumbnail ? 0.25 : 0;
    switch (position) {
        case 'right':
            magnifier.style.left = `${
                -magnifier.offsetWidth - magnifierAttributes.horizontalOffset
            }px`;
            magnifier.style.top = `${magnifierAttributes.verticalOffset}px`;
            magnifier.style.marginRight = `calc(${thumbnailMargin}rem * 2)`;
            magnifier.style.marginTop = `${thumbnailMargin}rem`;
            break;
        case 'center':
            magnifier.style.left = `${
                img.width + magnifierAttributes.horizontalOffset
            }px`;
            magnifier.style.top = `${magnifierAttributes.verticalOffset}px`;
            magnifier.style.marginLeft = `calc(${thumbnailMargin}rem * 2)`;
            magnifier.style.marginTop = `${thumbnailMargin}rem`;
            break;
        default:
            magnifier.style.left = `${
                img.width + magnifierAttributes.horizontalOffset
            }px`;
            magnifier.style.top = `${magnifierAttributes.verticalOffset}px`;
            magnifier.style.marginLeft = `calc(${thumbnailMargin}rem * 2)`;
            magnifier.style.marginTop = `${thumbnailMargin}rem`;
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
export function standardMagnifier(
    data,
    magnifierAttributes,
    imgPosition,
    thumbnail
) {
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
    const thumbnailMargin = thumbnail ? 0.25 : 0;

    magnifiedLens.style.display = 'block';
    magnifiedLens.style.width = `${ratioW / zoomFactor}px`;
    magnifiedLens.style.height = `${ratioH / zoomFactor}px`;
    magnifiedLens.style.top = `${y - h / zoomFactor}px`;
    magnifiedLens.style.left = `${x - w / zoomFactor}px`;
    magnifiedLens.style.margin = thumbnail ? '0.25rem' : 0;

    switch (position) {
        case 'auto':
            autoPositionMagnifier(
                magnifier,
                img,
                magnifierAttributes,
                imgPosition,
                thumbnail
            );
            break;
        case 'left':
            magnifier.style.left = `${
                -magnifier.offsetWidth - horizontalOffset
            }px`;
            magnifier.style.top = `${verticalOffset}px`;
            magnifier.style.marginRight = `${thumbnailMargin}rem`;
            magnifier.style.marginTop = `${thumbnailMargin}rem`;
            break;
        case 'right':
            magnifier.style.left = `${img.width + horizontalOffset}px`;
            magnifier.style.top = `${verticalOffset}px`;
            magnifier.style.marginLeft = `calc(${thumbnailMargin}rem * 2)`;
            magnifier.style.marginTop = `${thumbnailMargin}rem`;
            break;
        case 'top':
            magnifier.style.left = `${horizontalOffset}px`;
            magnifier.style.top = `${
                -magnifier.offsetHeight - verticalOffset
            }px`;
            magnifier.style.marginBottom = `${thumbnailMargin}rem`;
            magnifier.style.marginLeft = `${thumbnailMargin}rem`;
            break;
        case 'bottom':
            magnifier.style.left = `${horizontalOffset}px`;
            magnifier.style.top = `${img.height + verticalOffset}px`;
            magnifier.style.marginLeft = `${thumbnailMargin}rem`;
            magnifier.style.marginTop = `calc(${thumbnailMargin}rem * 2)`;
            break;
        default:
            break;
    }
    const zoom = zoomFactor;
    magnifiedImage.style.transform = `translate(-${x * zoom - w}px, -${
        y * zoom - h
    }px)`;
}
