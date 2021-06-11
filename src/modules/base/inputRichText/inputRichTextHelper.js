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

import { isChrome, isIE11 } from 'c/utilsPrivate';

const EMPTY_STRING = '​';
const REG_EXP_STRING = new RegExp(EMPTY_STRING, 'g');
const REG_EXP_TAG = new RegExp(`<p>${EMPTY_STRING}</p>`, 'g');

export class InputRichTextHelper {
    constructor(inputRichText) {
        this.inputRichText = undefined;
        this.isEmptyCharInserted = false;
        this.inputRichText = inputRichText;
    }

    initializeEmptyCharHack() {
        const inputQuill = this.inputRichText.quill;
        const root = inputQuill.root;

        let status = false;

        if (isChrome) {
            const compositionstart = (event) => {
                // if (event.keyCode && event.keyCode < 48) {
                //     return;
                // }

                const elements = root.querySelectorAll('p, li');

                for (let index = 0; index < elements.length; index += 1) {
                    const element = elements[index];

                    if (
                        element.textContent.length === 0 &&
                        element.getElementsByTagName('img').length === 0
                    ) {
                        element.textContent = EMPTY_STRING;
                    }
                }

                this.isEmptyCharInserted = true;
            };

            ['keydown'].forEach((action) => {
                root.addEventListener(action, compositionstart);
            });

            status = true;
        } else if (isIE11) {
            const listener = () => {
                if (inputQuill.editor.isBlank()) {
                    root.querySelector('p').textContent = EMPTY_STRING;
                    this.isEmptyCharInserted = true;
                }
            };

            ['focus', 'keydown'].forEach((action) => {
                root.addEventListener(action, listener);
            });

            status = true;
        }

        if (status) {
            inputQuill.on('selection-change', () => {
                if (this.isEmptyCharInserted) {
                    this.clearEmptyCharIfTrulyEmpty(inputQuill);
                }
            });
        }
    }

    clearEmptyCharIfTrulyEmpty() {
        const inputQuill = this.inputRichText.quill;
        const text = inputQuill.getText().replace(/\n/, '');

        if (!(inputQuill.hasFocus() || text !== EMPTY_STRING)) {
            inputQuill.setText('');
            this.isEmptyCharInserted = false;
        }
    }

    clearEmptyChars(t) {
        return this.isEmptyCharInserted
            ? (REG_EXP_TAG.test(t) &&
                  (t = t.replace(REG_EXP_TAG, '<p><br/></p>')),
              t.replace(REG_EXP_STRING, ''))
            : t;
    }
}
