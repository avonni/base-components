import { LightningElement, track, api } from 'lwc';
import {
    normalizeBoolean,
    deepCopy,
    getRealDOMId,
    isRTL
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { InputRichTextHelper } from './inputRichTextHelper';
import {
    Quill,
    inputRichTextLibrary,
    applyEmitterShadowDOMFix
} from 'c/quillLib';

const CATEGORIES = {
    FORMAT_TEXT: 'FORMAT_TEXT',
    FORMAT_BACKGROUND: 'FORMAT_BACKGROUND',
    FORMAT_BODY: 'FORMAT_BODY',
    FORMAT_FONT: 'FORMAT_FONT',
    ALIGN_TEXT: 'ALIGN_TEXT',
    INSERT_CONTENT: 'INSERT_CONTENT',
    REMOVE_FORMATTING: 'REMOVE_FORMATTING'
};

const IMAGE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
const WIDTH = 320;
const DEFAULT_FONT = 'default';
const DEFAULT_SIZE = '12px';
const DEFAULT_COLOR = '#000000';
const CATEGORY_FORMAT_TEXT = 'FORMAT_TEXT';
const FORMATS = ['table', 'image', 'link', 'header'];
const BUTTON_CLASS = 'slds-button slds-button_icon-border-filled';
const BUTTON_SELECTOR =
    '.slds-rich-text-editor__toolbar > ul li .slds-button, .overflow-menu > ul > li .slds-button';

const i18n = {
    alignText: 'Align text',
    bold: 'Bold',
    bullet: 'Bulleted list',
    centerAlign: 'Center align text',
    composeText: 'Compose text',
    font: 'Font',
    fontSize: 'Font Size',
    formatBackground: 'Format background and text color',
    formatBody: 'Format body',
    formatFont: 'Format font family and size',
    formatText: 'Format text',
    indent: 'Indent',
    insertContent: 'Insert content',
    italic: 'Italic',
    leftAlign: 'Left align text',
    link: 'Link',
    image: 'Image',
    linkCancel: 'Cancel',
    linkInput: 'Link URL',
    linkSave: 'Save',
    number: 'Numbered list',
    outdent: 'Outdent',
    removeFormatting: 'Remove formatting',
    rightAlign: 'Right align text',
    strike: 'Strikethrough',
    underline: 'Underline',
    emoji: 'Emoji',
    adduser: 'Add user'
};

const SIZE_LIST = [];

const FONT_LIST = inputRichTextLibrary.FONT_LIST;

inputRichTextLibrary.ALLOWED_SIZES.forEach((t) => {
    SIZE_LIST.push({ label: `${t}`, value: `${t}px` });
});

const KEY_CODES = {
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

const BINDINGS = {
    tab: {
        key: 9,
        shiftKey: false,
        handler: () => true
    },
    lightningOutdent: {
        key: 219,
        shortKey: true,
        handler() {
            this.quill.format('indent', '-1');
        }
    },
    lightningIndent: {
        key: 221,
        shortKey: true,
        handler() {
            this.quill.format('indent', '+1');
        }
    }
};

const SIZES = {
    1: '9px',
    2: '11px',
    3: '14px',
    4: '16px',
    5: '22px',
    6: '28px',
    7: '48px'
};

function PARSE_INT_STYLE(element, value) {
    return parseInt(element.style[value], 10);
}

export default class InputRichText extends LightningElement {
    @api label;
    @api labelVisible = false;
    @api placeholder;
    @api disabledCategories = '';
    @api formats = '';
    @api variant;
    @api messageWhenBadInput;
    @api customButtons;
    @api shareWithEntityId;
    @api isPublisher = false;

    @track _valid = true;
    @track _disabled = false;
    @track linkPanelOpen = false;
    @track queueLinkPanelOpen = false;
    @track selectedFontValue = DEFAULT_FONT;
    @track selectedSizeValue = DEFAULT_SIZE;
    @track quillNotReady = true;
    @track selectedTextColorValue = DEFAULT_COLOR;

    _pendingFormats = [];
    quill;
    initialRender = true;
    internalValue;
    linkValue = '';
    fontMenus = {
        fontList: FONT_LIST,
        sizeList: SIZE_LIST
    };

    @api
    get value() {
        return this.internalValue;
    }

    set value(value) {
        if (typeof value == 'string' && this.internalValue !== value) {
            this.internalValue = inputRichTextLibrary.cleanInput(value);

            if (!this.internalValue) {
                console.warn(
                    'No html sanitizer found for rich text, make sure to sanitize rich text before using ' +
                        'lightning-input-rich-text. Using raw html value'
                );
                this.internalValue = value;
            }

            if (this.quill) {
                this.quill.clipboard.dangerouslyPasteHTML(this.internalValue);
            }
        }
    }

    @api
    get valid() {
        return this._valid;
    }

    set valid(value) {
        this._valid = normalizeBoolean(value);

        if (this.quill) {
            const editor = this.template.querySelector(
                '.slds-rich-text-editor'
            );
            const root = this.quill.root;

            if (this.valid) {
                editor.classList.remove('slds-has-error');
                root.removeAttribute('aria-describedby');
            } else {
                editor.classList.add('slds-has-error');
                root.setAttribute('aria-describedby', this.errorMessageId);
            }
        }
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    focus() {
        if (!this.quill) {
            this.activateEditor();
        }

        this.quill.root.focus();
    }

    @api
    blur() {
        if (this.quill) {
            this.quill.root.blur();
        }
    }

    @api
    setFormat(value) {
        if (value && this.quill) {
            inputRichTextLibrary.applyFormats(this.quill, deepCopy(value));

            if (this.quill.getSelection().length === 0) {
                this.syncFontMenus();
            }
        } else if (value) {
            this._pendingFormats.push(value);
        }
    }

    @api
    getFormat() {
        if (!this.quill) {
            this.activateEditor();
        }
        return inputRichTextLibrary.filterFormats(this.quill.getFormat());
    }

    syncFontMenus() {
        const format = this.quill.getFormat();
        this.updateFontMenu(format);
        this.updateSizeMenu(format);
    }

    get showLinkValue() {
        return this.linkValue;
    }

    get isBottomToolbar() {
        return this.variant === 'bottom-toolbar';
    }

    get isColorpickerVisible() {
        return this.formats.indexOf('color') > -1;
    }

    get isFontMenusVisible() {
        return (
            this.disabledCategories.indexOf(CATEGORIES.FORMAT_FONT) === -1 &&
            !(this.formats.length > 0 && -1 === this.formats.indexOf('font'))
        );
    }

    get menuDropdownAlignment() {
        return this.isBottomToolbar ? 'bottom-left' : null;
    }

    get errorMessage() {
        return this.messageWhenBadInput;
    }

    get i18n() {
        return i18n;
    }

    get labelId() {
        return this.uniqueLabelId;
    }

    get errorMessageId() {
        const element = this.template.querySelector('[data-error-message]');
        return getRealDOMId(element);
    }

    get toolbarAriaLabel() {
        return this.disabled ? 'disabled' : '';
    }

    get renderLabel() {
        return this.labelVisible || this.label;
    }

    get computedLabel() {
        return this.label ? this.label : this.i18n.composeText;
    }

    get computedLabelClass() {
        return classSet('slds-form-element__label')
            .add({
                'slds-assistive-text': !this.labelVisible
            })
            .toString();
    }

    get computedCategories() {
        const formatsExist = !!this.formats.length;
        const formats = this.formats;

        let categories = (function (isPublisher) {
            const leftAlign = {
                label: i18n.leftAlign,
                iconName: 'utility:left_align_text',
                format: 'align',
                value: isRTL() ? 'left' : ''
            };
            const rightAlign = {
                label: i18n.rightAlign,
                iconName: 'utility:right_align_text',
                format: 'align',
                value: 'right'
            };
            const centerAlign = {
                label: i18n.centerAlign,
                iconName: 'utility:center_align_text',
                format: 'align',
                value: 'center'
            };
            const buttons = isRTL()
                ? [rightAlign, centerAlign, leftAlign]
                : [leftAlign, centerAlign, rightAlign];

            let inserContent = {
                category: CATEGORIES.INSERT_CONTENT,
                label: i18n.insertContent,
                buttons: [
                    {
                        label: i18n.link,
                        iconName: 'utility:link',
                        format: 'link'
                    },
                    {
                        label: i18n.image,
                        iconName: 'utility:image',
                        format: 'image'
                    }
                ]
            };

            if (isPublisher) {
                inserContent.buttons.push({
                    label: i18n.emoji,
                    iconName: 'utility:emoji',
                    format: 'emoji'
                });
                inserContent.buttons.push({
                    label: i18n.adduser,
                    iconName: 'utility:adduser',
                    format: 'adduser'
                });
            }

            return [
                {
                    category: CATEGORIES.FORMAT_TEXT,
                    label: i18n.formatText,
                    buttons: [
                        {
                            label: i18n.bold,
                            iconName: 'utility:bold',
                            format: 'bold'
                        },
                        {
                            label: i18n.italic,
                            iconName: 'utility:italic',
                            format: 'italic'
                        },
                        {
                            label: i18n.underline,
                            iconName: 'utility:underline',
                            format: 'underline'
                        },
                        {
                            label: i18n.strike,
                            iconName: 'utility:strikethrough',
                            format: 'strike'
                        }
                    ]
                },
                {
                    category: CATEGORIES.FORMAT_BACKGROUND,
                    label: i18n.formatBackground,
                    buttons: []
                },
                {
                    category: CATEGORIES.FORMAT_BODY,
                    label: i18n.formatBody,
                    buttons: [
                        {
                            label: i18n.bullet,
                            iconName: 'utility:richtextbulletedlist',
                            format: 'list',
                            value: 'bullet'
                        },
                        {
                            label: i18n.number,
                            iconName: 'utility:richtextnumberedlist',
                            format: 'list',
                            value: 'ordered'
                        },
                        {
                            label: i18n.indent,
                            iconName: 'utility:richtextindent',
                            format: 'indent',
                            value: '+1'
                        },
                        {
                            label: i18n.outdent,
                            iconName: 'utility:richtextoutdent',
                            format: 'indent',
                            value: '-1'
                        }
                    ]
                },
                {
                    category: CATEGORIES.ALIGN_TEXT,
                    label: i18n.alignText,
                    buttons: buttons
                },
                inserContent,
                {
                    category: CATEGORIES.REMOVE_FORMATTING,
                    label: i18n.removeFormatting,
                    buttons: [
                        {
                            label: i18n.removeFormatting,
                            iconName: 'utility:remove_formatting',
                            format: 'clean'
                        }
                    ]
                }
            ];
        })(this.isPublisher);

        if (formatsExist) {
            categories.forEach((category) => {
                category.buttons = category.buttons.filter((button) => {
                    return formats.includes(button.format);
                });
            });
        }

        categories = this.mergeCustomToolbarButtons(categories);

        categories = categories.filter((category) => {
            return (
                category.buttons &&
                category.buttons.length > 0 &&
                !this.disabledCategories.includes(category.category)
            );
        });

        categories.forEach((category) => {
            category.buttons.forEach((button) => {
                if (button.format) {
                    button.computedClass = `${BUTTON_CLASS} ql-${button.format}`;
                } else {
                    button.computedClass = BUTTON_CLASS;
                }
                button.key = button.label + button.value;
            });
        });

        return categories;
    }

    mergeCustomToolbarButtons(categories) {
        if (this.customButtons) {
            let status = false;
            this.customButtons.forEach((customButton) => {
                status = false;
                categories.forEach((category) => {
                    if (
                        !(
                            status &&
                            category.category !== customButton.category &&
                            (customButton.category ||
                                category.category !== CATEGORY_FORMAT_TEXT)
                        )
                    ) {
                        status = true;
                        category.buttons = category.buttons.concat(
                            deepCopy(customButton.buttons)
                        );
                    }
                });

                if (!status) {
                    categories = categories.concat(deepCopy(customButton));
                }
            });
        }

        return categories;
    }

    setupToolbar() {
        if (this.isBottomToolbar) {
            this.template
                .querySelector('.slds-rich-text-editor__toolbar')
                .classList.add('slds-rich-text-editor__toolbar_bottom');
        }
    }

    setupButtons() {
        const buttons = this.template.querySelectorAll(BUTTON_SELECTOR);

        if (buttons.length > 0) {
            this.setButtonTabindex(buttons, 0);
        }
    }

    setButtonTabindex(buttons, index) {
        buttons.forEach((button) => {
            button.setAttribute('tabindex', -1);
        });

        buttons[index].setAttribute('tabindex', 0);
    }

    attachCustomButtonHandlers() {
        if (this.customButtons) {
            const buttons = this.template.querySelectorAll(BUTTON_SELECTOR);
            this.customButtons.forEach((customButton) => {
                customButton.buttons.forEach((button) => {
                    buttons.forEach((element) => {
                        if (element.classList.contains('ql-' + button.format)) {
                            element.addEventListener('click', button.handler);
                        }
                    });
                });
            });
        }
    }

    addInitialClassesAndAttributesToEditor(element) {
        element.classList.add('slds-rich-text-area__content');
        element.classList.add('slds-grow');
        element.classList.add('slds-text-color_weak');
        this.setAriaAttributesOnEditor(element);
    }

    setAriaAttributesOnEditor(element) {
        if (this.labelVisible || this.label) {
            element.setAttribute('aria-labelledby', this.uniqueLabelId);
        } else {
            element.setAttribute('aria-label', this.i18n.composeText);
        }
    }

    computeFormats() {
        let formats = [];

        if (this.formats.length > 0) {
            return this.formats;
        } else {
            this.computedCategories.forEach((category) => {
                category.buttons.forEach((button) => {
                    if (
                        button.format &&
                        formats.indexOf(button.format) === -1
                    ) {
                        formats.push(button.format);
                    }
                });
            });

            if (this.isFontMenusVisible) {
                formats.push('font');
                formats.push('size');
            }

            formats = formats.concat(FORMATS);
        }

        return formats;
    }

    getNormalizedFontSize(value) {
        const e = value || 3;
        const i = /^[+-]\d/.test(e) ? Number(e) + 3 : Number(e);
        let l = i > 7 ? 7 : i;
        return (l = i < 1 ? 1 : l);
    }

    addTagMatchers() {
        this.quill.clipboard.addMatcher('font', (element, text) => {
            let size = element.getAttribute('size');

            if (size) {
                size = SIZES[this.getNormalizedFontSize(size)];
            }

            const value = {
                font: element.getAttribute('face'),
                size: size,
                color: element.getAttribute('color')
            };

            return text.compose(new Quill.Delta().retain(text.length(), value));
        });

        this.quill.clipboard.addMatcher('s', (element, text) => {
            text.compose(
                new Quill.Delta().retain(text.length(), {
                    strike: true
                })
            );
        });

        this.quill.clipboard.addMatcher('tt', (element, text) => {
            text.compose(
                new Quill.Delta().retain(text.length(), {
                    code: true
                })
            );
        });

        this.quill.clipboard.addMatcher('acronym', (element, text) => {
            const title = element.getAttribute('title');

            return text.compose(
                new Quill.Delta().retain(text.length(), {
                    abbr: title || true
                })
            );
        });

        this.quill.clipboard.addMatcher(
            'span[style*=text-decoration]',
            (element, text) => {
                const elementStyle = getComputedStyle(element) || element.style;
                const underline = elementStyle.textDecoration.match(
                    /underline/
                );
                const strike = elementStyle.textDecoration.match(
                    /line-through/
                );

                return text.compose(
                    new Quill.Delta().retain(text.length(), {
                        underline: !!underline,
                        strike: !!strike
                    })
                );
            }
        );

        this.quill.clipboard.addMatcher('table', (element) => {
            if (this.formats.indexOf('table') === -1) {
                return this.quill.clipboard.convert(element.innerHTML);
            }

            const table = Quill.import('formats/table');

            return new Quill.Delta().insert({
                table: table.value(element)
            });
        });
    }

    initializeQuill() {
        const editor = this.template.querySelector('.editor');
        const toolbar = this.template.querySelector(
            '.slds-rich-text-editor__toolbar'
        );
        const formats = this.computeFormats();
        const placeholder = this.placeholder;

        this._hasBeenFocused = false;

        const config = {
            modules: {
                toolbar: toolbar,
                keyboard: {
                    bindings: BINDINGS
                }
            },
            formats: formats,
            placeholder: placeholder
        };

        const strike = Quill.import('formats/strike');
        strike.tagName = 'STRIKE';

        Quill.register(strike, true);

        this.quill = new Quill(editor, config);

        this.removeQuillEmitterEventListeners = applyEmitterShadowDOMFix(
            this.quill
        );

        const root = this.quill.root;
        this.addInitialClassesAndAttributesToEditor(this.quill.root);

        const inputRichTextHelper = new InputRichTextHelper(this);

        inputRichTextHelper.initializeEmptyCharHack();

        this.quill.on('text-change', () => {
            let internalValue = '';

            if (!this.quill.editor.isBlank()) {
                const innerHTML = this.quill.scroll.domNode.innerHTML;
                internalValue = inputRichTextLibrary.cleanOutput(innerHTML);
            }

            internalValue = inputRichTextHelper.clearEmptyChars(internalValue);
            this.internalValue = internalValue;
            this.dispatchChangeEvent();
        });

        this.quill.on('selection-change', (range) => {
            if (!this._hasBeenFocused) {
                const link = this.template.querySelector('.ql-link');

                if (link) {
                    link.removeAttribute('disabled');
                }

                this._hasBeenFocused = true;
            }

            let format = null;

            if (range) {
                format = this.quill.getFormat(range);
                this.updateFontMenu(format);
                this.updateSizeMenu(format);
                this.updateTextColorButton(format);
                this.applyTextAlignment(format);
            }

            this.updateButtonPressedState(range);
        });

        this.quill.on('scroll-optimize', () => {
            requestAnimationFrame(() => {
                const range = this.quill.selection.getRange()[0];
                this.updateButtonPressedState(range);
            });
        });

        this.quill.scroll.domNode.addEventListener('dblclick', (event) => {
            const enclosingLinkNode = this.getEnclosingLinkNode(event.target);

            if (enclosingLinkNode) {
                this.expandSelectionToNode(enclosingLinkNode);
                this.openLinkPanel(enclosingLinkNode.getAttribute('href'));
            }
        });

        const moduleToolbar = this.quill.getModule('toolbar');

        moduleToolbar.addHandler('link', () => {
            this.linkButtonClickHandler();
        });

        moduleToolbar.addHandler('image', () => {
            this.imageButtonClickHandler();
        });

        let emojiButton = this.template.querySelector('.ql-emoji');

        if (emojiButton) {
            emojiButton.addEventListener('click', () =>
                this.emojiButtonClickHandler()
            );
        }

        let adduserButton = this.template.querySelector('.ql-adduser');

        if (adduserButton) {
            adduserButton.addEventListener('click', () =>
                this.addUserButtonClickHandler()
            );
        }

        const handleClean = moduleToolbar.handlers.clean;

        moduleToolbar.addHandler('clean', () => {
            handleClean.call(this);
            const selection = this.quill.getSelection();
            if (selection) {
                const format = this.quill.getFormat(selection);
                this.updateFontMenu(format);
                this.updateSizeMenu(format);
                this.updateTextColorButton(format);
            }
            this.updateButtonPressedState(selection);
        });

        this.addTagMatchers();

        if (this.internalValue) {
            this.quill.clipboard.dangerouslyPasteHTML(this.internalValue);
        }

        root.addEventListener('focus', () => {
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.add('slds-has-focus');
            this.dispatchEvent(new CustomEvent('focus'));
        });

        root.addEventListener('blur', () => {
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.remove('slds-has-focus');
            this.dispatchEvent(new CustomEvent('blur'));
        });

        root.addEventListener('paste', (event) => {
            const clipboardData = event.clipboardData;
            if (
                clipboardData &&
                clipboardData.files &&
                clipboardData.files.length &&
                -1 === clipboardData.types.indexOf('text/html')
            ) {
                const file = clipboardData.files[0];

                if (IMAGE_FORMATS.indexOf(file.type) > -1) {
                    event.preventDefault();
                    event.stopPropagation();
                    inputRichTextLibrary.uploadAndInsertSelectedFile(
                        this.quill,
                        file,
                        this.shareWithEntityId
                    );
                }
            }
        });

        if (this._pendingFormats) {
            for (; this._pendingFormats.length > 0; ) {
                const format = this._pendingFormats.shift();
                this.setFormat(format);
                this.syncFontMenus();
            }
        }
    }

    setEditorAndButtonState() {
        const buttons = this.template.querySelectorAll(BUTTON_SELECTOR);

        if (this.disabled) {
            buttons.forEach((button) => {
                button.setAttribute('disabled', true);
            });

            if (this.quill) {
                this.quill.disable();
            }
        } else {
            buttons.forEach((button) => {
                if (!this._hasBeenFocused) {
                    if (button.classList.contains('ql-link')) {
                        button.setAttribute('disabled', true);
                    } else {
                        button.removeAttribute('disabled');
                    }
                }
            });

            if (this.quill) {
                this.quill.enable();
            }
        }
    }

    setEditorValidityState() {
        if (!this.valid) {
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.add('slds-has-error');
            this.quill.root.setAttribute(
                'aria-describedby',
                this.errorMessageId
            );
        }
    }

    connectedCallback() {
        this.classList.add('slds-form-element__control');
    }

    get uniqueLabelId() {
        const label = this.template.querySelector('[data-label]');
        return getRealDOMId(label);
    }

    activateEditor(event) {
        if (this.initialRender) {
            this.setupToolbar();
            this.setupButtons();
            this.attachCustomButtonHandlers();
            this.initializeQuill();
            this.setEditorValidityState();
            this.initialRender = false;
            this.setEditorAndButtonState();
            this.quillNotReady = false;
        }

        if (event) {
            if (
                event.target.classList.contains('standin') ||
                event.target.localName === 'lightning-formatted-rich-text'
            ) {
                this.quill.setSelection(this.quill.getLength());
            }
        }
    }

    disconnectedCallback() {
        if (
            this.removeQuillEmitterEventListeners &&
            typeof this.removeQuillEmitterEventListeners == 'function'
        ) {
            this.removeQuillEmitterEventListeners();
        }
    }

    renderedCallback() {
        this.setEditorAndButtonState();

        if (this.queueLinkPanelOpen) {
            this.queueLinkPanelOpen = false;

            const popoverBody = this.template.querySelector(
                '.slds-popover__body'
            );
            const buttons = this.template.querySelectorAll(BUTTON_SELECTOR);

            this.calculateLinkPanelPositioning(popoverBody, buttons);
            this.template.querySelector('.link-input').focus();
        }
    }

    moveToNextButton(buttons, oldIndex) {
        let index = oldIndex + 1;

        if (index === buttons.length) {
            index = 0;
        }

        this.setButtonTabindex(buttons, index);
        buttons[index].focus();
    }

    moveToPreviousButton(buttons, oldIndex) {
        let index = oldIndex - 1;

        if (index === -1) {
            index = buttons.length - 1;
        }

        this.setButtonTabindex(buttons, index);
        buttons[index].focus();
    }

    navigateToolbar(value) {
        this.activateEditor();

        const event = value || window.event;
        const target = event.target;
        const buttons = Array.from(
            this.template.querySelectorAll(BUTTON_SELECTOR)
        ).filter((button) => {
            return !button.disabled;
        });

        if (target && target.classList.contains('slds-button')) {
            const button = buttons.indexOf(target);

            if (button === -1) {
                return;
            }

            if (event.keyCode === KEY_CODES.right) {
                this.moveToNextButton(buttons, button);
            }

            if (event.keyCode === KEY_CODES.left) {
                this.moveToPreviousButton(buttons, button);
            }
        }
    }

    imageButtonClickHandler() {
        this.loadNativeFileSelector((fileSelector) => {
            inputRichTextLibrary.uploadAndInsertSelectedFile(
                this.quill,
                fileSelector[0],
                this.shareWithEntityId
            );
        });
    }

    emojiButtonClickHandler() {
        this.template
            .querySelector('c-emoji-picker')
            .classList.remove('slds-hide');
    }

    addUserButtonClickHandler() {
        this.insertTextAtCursor(`@ `);
    }

    loadNativeFileSelector(container) {
        const documentFragment = document.createDocumentFragment();
        const input = document.createElement('input');

        input.type = 'file';
        input.multiple = false;
        input.accept = IMAGE_FORMATS;
        input.onchange = function () {
            container(this.files);
        };
        documentFragment.appendChild(input);
        input.click();
    }

    linkButtonClickHandler() {
        const quill = this.quill;
        const selection = quill.getSelection();
        const format = quill.getFormat();

        quill.focus();

        if (format.link) {
            if (selection.length === 0) {
                const node = quill.getLeaf(selection.index)[0].domNode;
                const link = this.getEnclosingLinkNode(node);

                this.expandSelectionToNode(link);
                this.openLinkPanel(link.getAttribute('href'));
            } else {
                quill.format('link', false);
            }
        } else {
            this.openLinkPanel();
        }
    }

    handleLinkValueChange(event) {
        event.stopPropagation();

        if (event.detail) {
            this.linkValue = event.detail.value;
        }
    }

    openLinkPanel(linkValue) {
        this.linkValue = linkValue || 'https://';
        this.queueLinkPanelOpen = true;
        this.linkPanelOpen = true;
    }

    closeLinkPanel() {
        this.linkPanelOpen = false;
    }

    saveLink() {
        const quill = this.quill;
        const selection = quill.getSelection(true);

        if (selection.length === 0) {
            quill.insertText(selection.index, this.linkValue, {
                link: this.linkValue
            });
        } else {
            quill.format('link', this.linkValue);
        }

        this.closeLinkPanel();
    }

    cancelLink() {
        this.closeLinkPanel();
    }

    calculateLinkPanelPositioning(panel) {
        const link = this.template.querySelector('.ql-link');
        const toolbar = this.template.querySelector('.ql-toolbar');

        panel.style.position = 'absolute';
        panel.style.width = WIDTH + 'px';
        panel.style.left =
            link.offsetLeft + link.offsetWidth / 2 - WIDTH / 2 + 'px';

        const leftStyle = PARSE_INT_STYLE(panel, 'left');
        const widthStyle = PARSE_INT_STYLE(panel, 'width');

        if (leftStyle + widthStyle > toolbar.offsetWidth) {
            const value = leftStyle + widthStyle - toolbar.offsetWidth;
            panel.style.left = leftStyle - value + 'px';
        }

        if (PARSE_INT_STYLE(panel, 'left') < toolbar.offsetLeft) {
            panel.style.left = toolbar.offsetLeft + 'px';
        }

        if (this.variant === 'bottom-toolbar') {
            panel.style.top = toolbar.offsetTop - panel.offsetHeight + 'px';
        } else {
            panel.style.top = toolbar.offsetTop + toolbar.offsetHeight + 'px';
        }
    }

    getEnclosingLinkNode(element) {
        const node = this.quill.scroll.domNode;
        let link = element;
        for (; link && link !== node; ) {
            if (link.tagName === 'A') {
                return link;
            }
            link = link.parentNode;
        }
        return null;
    }

    expandSelectionToNode(item) {
        const quill = this.quill;
        const value = quill.constructor.find(item);

        if (value) {
            quill.focus();
            quill.setSelection(quill.getIndex(value), value.length());
        }
    }

    linkKeyboardPress(event) {
        this.activateEditor();
        let status = false;

        if (event.keyCode === KEY_CODES.enter) {
            this.saveLink();
            status = true;
        } else if (event.keyCode === KEY_CODES.escape) {
            this.closeLinkPanel();
            status = true;
        }

        if (status) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    handleLinkPanelFocusOut() {
        this.linkPanelHasFocus = false;

        requestAnimationFrame(() => {
            this.linkPanelHasFocus || this.closeLinkPanel();
        });
    }

    handleLinkPanelFocusIn() {
        this.linkPanelHasFocus = true;
    }

    selectFont(event) {
        event.stopPropagation();
        const value = event.detail.value;

        let font = value;

        if (font === DEFAULT_FONT) {
            font = '';
        }

        const quill = this.quill;

        quill.blur();
        quill.format('font', font);

        this.selectedFontValue = value;
    }

    selectSize(event) {
        event.stopPropagation();

        const value = event.detail.value;
        const quill = this.quill;

        quill.focus();
        quill.format('size', value);

        this.selectedSizeValue = value;
    }

    updateFontMenu(item) {
        const font = item && item.font ? item.font : DEFAULT_FONT;
        this.selectedFontValue = font;
    }

    updateSizeMenu(item) {
        const size = item && item.size ? item.size : DEFAULT_SIZE;
        this.selectedSizeValue = size;
    }

    updateTextColorButton(item) {
        const color = item && item.color ? item.color : DEFAULT_COLOR;
        this.selectedTextColorValue = color;
    }

    applyTextAlignment(t) {
        if (!(!isRTL() && t.align && '' !== t.align)) {
            this.quill.format('align', 'left', 'silent');
        }
    }

    handleColorUpdate(event) {
        const quill = this.quill;
        this.selectedTextColorValue = event.detail.color;
        quill.format('color', this.selectedTextColorValue);
    }

    updateButtonPressedState(item) {
        const buttons = this.template.querySelectorAll(BUTTON_SELECTOR);
        const format = item ? this.quill.getFormat(item) : {};

        let emojiContainer = this.template.querySelector('c-emoji-picker');

        if (emojiContainer && !emojiContainer.classList.contains('slds-hide')) {
            emojiContainer.classList.add('slds-hide');
        }

        buttons.forEach((button) => {
            if (button) {
                const { format: key } = button.dataset;
                const value = button.getAttribute('value');
                let status = false;

                if (value === null) {
                    status = !!format[key];
                } else if (key !== 'align' || value !== '' || isRTL()) {
                    status = format[key] === value;
                } else {
                    status = !format[key] || format[key] === 'left';
                }

                button.classList.toggle('slds-is-selected', status);
                button.setAttribute('aria-pressed', status);
            }
        });
    }

    get isDesktop() {
        return true;
    }

    dispatchChangeEvent() {
        this.dispatchEvent(
            new CustomEvent('change', {
                composed: true,
                bubbles: true,
                detail: {
                    value: this.internalValue
                }
            })
        );
    }

    get shouldShowPlaceholder() {
        return !this.value && this.placeholder;
    }

    handleStandInClick(event) {
        event.preventDefault();
    }

    @api
    insertTextAtCursor(t) {
        if (!this.quill) {
            this.activateEditor();
        }

        const selection = this.quill.getSelection(true);
        const index = selection ? selection.index : this.quill.getLength() - 1;

        if (selection && selection.length !== 0) {
            this.quill.deleteText(selection.index, selection.length);
        }

        this.quill.insertText(index, t);
    }

    handleEmoji(event) {
        this.insertTextAtCursor(`${event.detail.value} `);
        this.template
            .querySelector('c-emoji-picker')
            .classList.add('slds-hide');
    }
}
