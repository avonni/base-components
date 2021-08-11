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

import { LightningElement, api } from 'lwc';

export default class Image extends LightningElement {
    @api src = [];
    @api srcset;
    @api alt;
    @api width;
    @api height;
    @api blankColor;
    @api rounded;
    @api block;
    @api fluid;
    @api fluidGrow;
    @api thumbnail;
    @api left;
    @api right;
    @api center;
    @api blank;
    @api staticImages;
    @api lazyLoading;
    @api cropSize;
    @api cropFit;
    @api cropPositionX;
    @api cropPositionY;

    get itemList() {
        let result = [];
        for (let i = 0; i < this.src.length; i++) {
            let item = {
                key: i,
                src: this.src[i],
                srcset: this.srcset,
                alt: this.alt,
                width: this.width,
                height: this.height,
                blankColor: this.blankColor,
                rounded: this.rounded,
                block: this.block,
                fluid: this.fluid,
                fluidGrow: this.fluidGrow,
                thumbnail: this.thumbnail,
                left: this.left,
                right: this.right,
                center: this.center,
                blank: this.blank,
                staticImages: this.staticImages,
                lazyLoading: this.lazyLoading,
                cropSize: this.cropSize,
                cropFit: this.cropFit,
                cropPositionX: this.cropPositionX,
                cropPositionY: this.cropPositionY
            };
            result.push(item);
        }

        return result;
    }
}
