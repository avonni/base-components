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
