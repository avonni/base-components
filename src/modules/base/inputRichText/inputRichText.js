import { LightningElement, api } from 'lwc';
import { getRealDOMId, isRTL } from 'c/utilsPrivate';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { InputRichTextHelper } from './inputRichTextHelper';
import {
    Quill,
    inputRichTextLibrary,
    applyEmitterShadowDOMFix
} from 'c/quillLib';

const BINDINGS = {
    lightningIndent: {
        key: 221,
        shortKey: true,
        handler() {
            this.quill.format('indent', '+1');
        }
    },
    lightningOutdent: {
        key: 219,
        shortKey: true,
        handler() {
            this.quill.format('indent', '-1');
        }
    },
    tab: {
        key: 9,
        shiftKey: false,
        handler: () => true
    }
};

const BUTTON_CLASS = 'slds-button slds-button_icon-border-filled';

const BUTTON_SELECTOR =
    '.slds-rich-text-editor__toolbar > ul li .slds-button, .overflow-menu > ul > li .slds-button';

const CATEGORIES = {
    ALIGN_TEXT: 'ALIGN_TEXT',
    FORMAT_BACKGROUND: 'FORMAT_BACKGROUND',
    FORMAT_BODY: 'FORMAT_BODY',
    FORMAT_FONT: 'FORMAT_FONT',
    FORMAT_TEXT: 'FORMAT_TEXT',
    INSERT_CONTENT: 'INSERT_CONTENT',
    REMOVE_FORMATTING: 'REMOVE_FORMATTING'
};

const CATEGORY_FORMAT_TEXT = 'FORMAT_TEXT';

const DEFAULT_CANCEL_BUTTON_LABEL = 'Cancel';
const DEFAULT_COLOR = '#000000';
const DEFAULT_DONE_BUTTON_LABEL = 'Done';
const DEFAULT_FONT = 'default';
const DEFAULT_SIZE = '12px';

const FONT_LIST = inputRichTextLibrary.FONT_LIST;

const FORMATS = ['table', 'image', 'link', 'header'];

const i18n = {
    adduser: 'Add user',
    alignText: 'Align text',
    bold: 'Bold',
    bullet: 'Bulleted list',
    centerAlign: 'Center align text',
    composeText: 'Compose text',
    emoji: 'Emoji',
    font: 'Font',
    fontSize: 'Font Size',
    formatBackground: 'Format background and text color',
    formatBody: 'Format body',
    formatFont: 'Format font family and size',
    formatText: 'Format text',
    image: 'Image',
    indent: 'Indent',
    insertContent: 'Insert content',
    italic: 'Italic',
    leftAlign: 'Left align text',
    link: 'Link',
    linkCancel: 'Cancel',
    linkInput: 'Link URL',
    linkSave: 'Save',
    number: 'Numbered list',
    outdent: 'Outdent',
    removeFormatting: 'Remove formatting',
    rightAlign: 'Right align text',
    strike: 'Strikethrough',
    underline: 'Underline'
};

const IMAGE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const KEY_CODES = {
    down: 40,
    end: 35,
    enter: 13,
    escape: 27,
    home: 36,
    left: 37,
    right: 39,
    space: 32,
    tab: 9,
    up: 38
};

function PARSE_INT_STYLE(element, value) {
    return parseInt(element.style[value], 10);
}

const SIZES = {
    1: '9px',
    2: '11px',
    3: '14px',
    4: '16px',
    5: '22px',
    6: '28px',
    7: '48px'
};

const SIZE_LIST = [];

inputRichTextLibrary.ALLOWED_SIZES.forEach((t) => {
    SIZE_LIST.push({ label: `${t}`, value: `${t}px` });
});

const VARIANTS = {
    default: 'top-toolbar',
    valid: ['top-toolbar', 'bottom-toolbar']
};

const WIDTH = 320;

/**
 * @class
 * @descriptor avonni-input-rich-text
 */
export default class InputRichText extends LightningElement {
    /**
     * The label for the cancel button.
     *
     * @type {string}
     * @public
     * @default Cancel
     */
    @api cancelButtonLabel = DEFAULT_CANCEL_BUTTON_LABEL;
    /**
     * Custom buttons to add to the toolbar.
     *
     * @type {object}
     * @public
     */
    @api customButtons;
    /**
     * A comma-separated list of button categories to remove from the toolbar.
     *
     * @type {object}
     * @public
     */
    @api disabledCategories = '';
    /**
     * The label for the done button.
     *
     * @type {string}
     * @public
     * @default Done
     */
    @api doneButtonLabel = DEFAULT_DONE_BUTTON_LABEL;
    /**
     * Check if editor is in Publisher category.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api isPublisher = false;
    /**
     * The label of the rich text editor.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * If present, the label on the rich text editor is visible.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api labelVisible = false;
    /**
     * Error message to be displayed when invalid input is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenBadInput;
    /**
     * Text that is displayed when the field is empty, to prompt the user for a valid entry.
     *
     * @type {string}
     * @public
     */
    @api placeholder;
    /**
     * Entity ID to share the image with.
     *
     * @type {string}
     * @public
     */
    @api shareWithEntityId;

    _disabled = false;
    _formats = [];
    _readOnly = false;
    _valid = true;
    _variant = VARIANTS.default;

    linkPanelOpen = false;
    queueLinkPanelOpen = false;
    quillNotReady = true;
    selectedFontValue = DEFAULT_FONT;
    selectedSizeValue = DEFAULT_SIZE;
    selectedTextColorValue = DEFAULT_COLOR;

    _pendingFormats = [];
    fontMenus = {
        fontList: FONT_LIST,
        sizeList: SIZE_LIST
    };
    initialRender = true;
    internalValue;
    linkValue = '';
    quill;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.classList.add('slds-form-element__control');
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

    disconnectedCallback() {
        if (
            this.removeQuillEmitterEventListeners &&
            typeof this.removeQuillEmitterEventListeners == 'function'
        ) {
            this.removeQuillEmitterEventListeners();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the editor is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * A list of allowed formats. By default, the list is computed based on enabled categories.
     * The 'table' format is always enabled to support copying and pasting of tables if formats are not provided.
     *
     * @type {object[]}
     * @public
     */
    @api
    get formats() {
        return this._formats;
    }
    set formats(value) {
        this._formats = normalizeArray(value);
    }

    /**
     * If present, the editor is read-only and cannot be edited by users.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * Specifies whether the editor content is valid.
     *
     * @type {boolean}
     * @default true
     * @public
     */
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

            if (this._valid) {
                editor.classList.remove('slds-has-error');
                root.removeAttribute('aria-describedby');
            } else {
                editor.classList.add('slds-has-error');
                root.setAttribute('aria-describedby', this.errorMessageId);
            }
        }
    }

    /**
     * The HTML content in the rich text editor.
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this.internalValue;
    }
    set value(value) {
        if (value && typeof value == 'string' && this.internalValue !== value) {
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

    /**
     * The variant changes the appearance of the toolbar. Accepted variant is bottom-toolbar which causes the toolbar to be displayed below the text box.
     *
     * @type {string}
     * @public
     * @default top-toolbar
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });

        if (this.quill) this.resetQuill();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed categories formats for rich text editor.
     *
     * @type {object}
     */
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

    /**
     * Computed Label based on input or i18n.
     *
     * @type {string}
     */
    get computedLabel() {
        return this.label ? this.label : this.i18n.composeText;
    }

    /**
     * Computed Label class styling.
     *
     * @type {string}
     */
    get computedLabelClass() {
        return classSet('slds-form-element__label')
            .add({
                'slds-assistive-text': !this.labelVisible
            })
            .toString();
    }

    /**
     * Retrieve error message text.
     *
     * @type {string}
     */
    get errorMessage() {
        return this.messageWhenBadInput;
    }

    /**
     * Retrieve error message Id.
     *
     * @type {string}
     */
    get errorMessageId() {
        const element = this.template.querySelector('[data-error-message]');
        return getRealDOMId(element);
    }

    /**
     * Localization.
     *
     * @type {i18n}
     */
    get i18n() {
        return i18n;
    }

    /**
     * Check if the Bottom Toolbar is visible.
     *
     * @type {boolean}
     */
    get isBottomToolbar() {
        return this.variant === 'bottom-toolbar';
    }

    /**
     * Check if the Color Picker is visible.
     *
     * @type {boolean}
     */
    get isColorpickerVisible() {
        return this.formats.indexOf('color') > -1;
    }

    /**
     * Check if device is Desktop.
     */
    get isDesktop() {
        return true;
    }

    /**
     * Check if the Font Menu is visible.
     *
     * @type {boolean}
     */
    get isFontMenusVisible() {
        return (
            this.disabledCategories.indexOf(CATEGORIES.FORMAT_FONT) === -1 &&
            !(this.formats.length > 0 && -1 === this.formats.indexOf('font'))
        );
    }

    /**
     * Retrieve Unique Label Id.
     *
     * @type {string}
     */
    get labelId() {
        return this.uniqueLabelId;
    }

    /**
     * Check if dropdown menu alignment has bottom toolbar
     *
     * @type {boolean}
     */
    get menuDropdownAlignment() {
        return this.isBottomToolbar ? 'bottom-left' : null;
    }

    /**
     * Check if Label needs to be rendered.
     *
     * @type {boolean}
     */
    get renderLabel() {
        return this.labelVisible || this.label;
    }

    /**
     * Check if placeholder needed.
     */
    get shouldShowPlaceholder() {
        return !this.value && this.placeholder;
    }

    /**
     * Check if the fake editor should be shown.
     *
     * @type {boolean}
     */
    get showFakeEditor() {
        return this.quillNotReady || this.readOnly;
    }

    /**
     * Check if Link Value is shown.
     *
     * @type {string}
     */
    get showLinkValue() {
        return this.linkValue;
    }

    /**
     * Get toolbar Aria label.
     *
     * @type {string}
     */
    get toolbarAriaLabel() {
        return this.disabled ? 'disabled' : '';
    }

    /**
     * Get unique label Id.
     *
     * @type {string}
     */
    get uniqueLabelId() {
        const label = this.template.querySelector('[data-label]');
        return getRealDOMId(label);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes focus from the rich text editor.
     *
     * @public
     */
    @api
    blur() {
        if (this.quill) {
            this.quill.root.blur();
        }
    }

    /**
     * Sets focus on the rich text editor.
     *
     * @public
     */
    @api
    focus() {
        if (!this.quill) {
            this.activateEditor();
        }

        this.quill.root.focus();
    }

    /**
     * Returns an object representing the formats applied to the current selection.
     * Formats supported are align, background, bold, code, code-block, color, font,
     * header, italic, link, size, strike, underline.
     *
     * @returns {object} A key-value pair with format names and values.
     * @public
     */
    @api
    getFormat() {
        if (!this.quill) {
            this.activateEditor();
        }
        return inputRichTextLibrary.filterFormats(this.quill.getFormat());
    }

    /**
     * Retrieve the user's selection range.
     *
     * @param {boolean} focus If true, the editor will be focused first.
     * @returns {object|null} Object with two keys: index and length. Return null if there is no selection.
     * @public
     */
    @api
    getSelection(focus) {
        if (this.quill) {
            return this.quill.getSelection(focus);
        }
        return null;
    }

    /**
     * Reserved for internal use. Insert text in the rich text editor at cursor position.
     *
     * @param {string} text Text to insert.
     * @public
     */
    @api
    insertTextAtCursor(text) {
        if (!this.quill) {
            this.activateEditor();
        }

        const selection = this.quill.getSelection(true);
        const index = selection ? selection.index : this.quill.getLength() - 1;

        if (selection && selection.length !== 0) {
            this.quill.deleteText(selection.index, selection.length);
        }

        this.quill.insertText(index, text);
    }

    /**
     * Sets a format in the editor from the cursor point onwards.
     * The format also applies to currently selected content.
     * Valid formats are font, size, and align.
     *
     * @param {object} value A key-value pair with format names and values.
     * @public
     */
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Add bottom toolbar slds class to rich text editor if bottomToolbar is true.
     */
    setupToolbar() {
        if (this.isBottomToolbar) {
            this.template
                .querySelector('.slds-rich-text-editor__toolbar')
                .classList.add('slds-rich-text-editor__toolbar_bottom');
        }
    }

    /**
     * Add User button Click handler - Insert text at cursor "@" symbol
     */
    addUserButtonClickHandler() {
        this.insertTextAtCursor(`@ `);
    }

    /**
     * Add Tag Matchers.
     */
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
                const underline =
                    elementStyle.textDecoration.match(/underline/);
                const strike =
                    elementStyle.textDecoration.match(/line-through/);

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
                // eslint-disable-next-line @lwc/lwc/no-inner-html
                return this.quill.clipboard.convert(element.innerHTML);
            }

            const table = Quill.import('formats/table');

            return new Quill.Delta().insert({
                table: table.value(element)
            });
        });
    }

    /**
     * Set initial dom element classes for rich text editor.
     *
     * @param {Element} element
     */
    addInitialClassesAndAttributesToEditor(element) {
        element.classList.add('slds-rich-text-area__content');
        element.classList.add('slds-grow');
        element.classList.add('slds-text-color_weak');
        this.setAriaAttributesOnEditor(element);
    }

    /**
     * Apply text alignment.
     *
     * @param {object} t
     */
    applyTextAlignment(t) {
        if (!(!isRTL() && t.align && '' !== t.align)) {
            this.quill.format('align', 'left', 'silent');
        }
    }

    /**
     * If custom buttons are present attach an event listener on click.
     */
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

    /**
     * Cancel hyperlink by closing panel.
     */
    cancelLink() {
        this.closeLinkPanel();
    }

    /**
     * Coordinate calculations for hyperlink Panel presentation.
     */
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

    /**
     * Close Panel for hyperlink.
     */
    closeLinkPanel() {
        this.linkPanelOpen = false;
    }

    /**
     * Compute formats via categories and FontMenu.
     *
     * @returns {object} formats
     */
    computeFormats() {
        let formats = [];

        if (this.formats.length > 0) {
            return this.formats;
        }
        {
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

    /**
     * Click on Emoji button handler.
     */
    emojiButtonClickHandler() {
        this.template
            .querySelector('[data-element-id="avonni-emoji-picker"]')
            .classList.remove('slds-hide');
    }

    /**
     * Sets user selection to given range, which will also focus the editor.
     *
     * @param {*} item
     */
    expandSelectionToNode(item) {
        const quill = this.quill;
        const value = quill.constructor.find(item);

        if (value) {
            quill.focus();
            quill.setSelection(quill.getIndex(value), value.length());
        }
    }

    /**
     * Find enclosing parent node to hyperlink in DOM.
     *
     * @param {Element} element
     */
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

    /**
     * Normalize font size method.
     *
     * @param {number} value
     * @returns {number} l
     */
    getNormalizedFontSize(value) {
        const e = value || 3;
        const i = /^[+-]\d/.test(e) ? Number(e) + 3 : Number(e);
        let l = i > 7 ? 7 : i;
        return (l = i < 1 ? 1 : l);
    }

    /**
     * Click on Image button handler.
     */
    imageButtonClickHandler() {
        this.loadNativeFileSelector((fileSelector) => {
            inputRichTextLibrary.uploadAndInsertSelectedFile(
                this.quill,
                fileSelector[0],
                this.shareWithEntityId
            );
        });
    }

    /**
     * Initialize Quill library.
     */
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
                // eslint-disable-next-line @lwc/lwc/no-inner-html
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
            /**
             * The event that fires when setting the focus on the rich text editor.
             *
             * @event
             * @name focus
             * @public
             */
            this.dispatchEvent(new CustomEvent('focus'));
        });

        root.addEventListener('blur', () => {
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.remove('slds-has-focus');
            /**
             * The event that fires when removing focus from the rich text editor.
             *
             * @event
             * @name blur
             * @public
             */
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

    /**
     * Hyperlink Button Click handler.
     */
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

    /**
     * On keyboard 'enter' key press event saveLink and on 'escape' key close the hyperlink Panel.
     *
     * @param {Event} event
     */
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

    /**
     * Local device image file selection. Opens local file explorer.
     *
     * @param {function} container
     */
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

    /**
     * If custom buttons are present merge them to the categories format.
     *
     * @param {object} categories
     * @returns {object} categories
     */
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

    /**
     * Set focus on Next button.
     *
     * @param {NodeListOf<Element>} buttons
     * @param {number} oldIndex
     */
    moveToNextButton(buttons, oldIndex) {
        let index = oldIndex + 1;

        if (index === buttons.length) {
            index = 0;
        }

        this.setButtonTabindex(buttons, index);
        buttons[index].focus();
    }

    /**
     * Set focus on Previous button.
     *
     * @param {NodeListOf<Element>} buttons
     * @param {number} oldIndex
     */
    moveToPreviousButton(buttons, oldIndex) {
        let index = oldIndex - 1;

        if (index === -1) {
            index = buttons.length - 1;
        }

        this.setButtonTabindex(buttons, index);
        buttons[index].focus();
    }

    /**
     * Navigating toolbar logic.
     *
     * @param {Event} value
     */
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

    /**
     * Open new Panel for hyperlink.
     */
    openLinkPanel(linkValue) {
        this.linkValue = linkValue || 'https://';
        this.queueLinkPanelOpen = true;
        this.linkPanelOpen = true;
    }

    /**
     * Save Hyperlink selection.
     */
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

    /**
     * Font selection event handler.
     *
     * @param {Event} event
     */
    selectFont(event) {
        event.stopPropagation();
        if (this.readOnly) return;

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

    /**
     * Font size selection event handler.
     *
     * @param {Event} event
     */
    selectSize(event) {
        event.stopPropagation();
        if (this.readOnly) return;

        const value = event.detail.value;
        const quill = this.quill;

        quill.focus();
        quill.format('size', value);

        this.selectedSizeValue = value;
    }

    /**
     * Set Aria attributes for rich text editor.
     *
     * @param {Element} element
     */
    setAriaAttributesOnEditor(element) {
        if (this.labelVisible || this.label) {
            element.setAttribute('aria-labelledby', this.uniqueLabelId);
        } else {
            element.setAttribute('aria-label', this.i18n.composeText);
        }
    }

    /**
     * Button Tab index method.
     *
     * @param {NodeListOf<Element>} buttons
     * @param {number} index
     */
    setButtonTabindex(buttons, index) {
        buttons.forEach((button) => {
            button.setAttribute('tabindex', -1);
        });

        buttons[index].setAttribute('tabindex', 0);
    }

    /**
     * Set the rich text editor and button state based on disabled.
     */
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

    /**
     * Set the editor validity state if the content is valid/invalid. If invalid, adds slds-has-error and sets the Aria describedby to the error message Id.
     */
    setEditorValidityState() {
        if (!this._valid) {
            this.template
                .querySelector('.slds-rich-text-editor')
                .classList.add('slds-has-error');
            this.quill.root.setAttribute(
                'aria-describedby',
                this.errorMessageId
            );
        }
    }

    /**
     * Setup buttons tab index if buttons are present.
     */
    setupButtons() {
        const buttons = this.template.querySelectorAll(BUTTON_SELECTOR);

        if (buttons.length > 0) {
            this.setButtonTabindex(buttons, 0);
        }
    }

    /**
     * Synchronize Font and Size menus based on current format.
     */
    syncFontMenus() {
        const format = this.quill.getFormat();
        this.updateFontMenu(format);
        this.updateSizeMenu(format);
    }

    /**
     * Update button 'pressed' state.
     *
     * @param {object} item
     */
    updateButtonPressedState(item) {
        const buttons = this.template.querySelectorAll(BUTTON_SELECTOR);
        const format = item ? this.quill.getFormat(item) : {};

        let emojiContainer = this.template.querySelector(
            '[data-element-id="avonni-emoji-picker"]'
        );

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

    /**
     * Update font menu.
     *
     * @param {object} item
     */
    updateFontMenu(item) {
        const font = item && item.font ? item.font : DEFAULT_FONT;
        this.selectedFontValue = font;
    }

    /**
     * Update size menu.
     *
     * @param {object} item
     */
    updateSizeMenu(item) {
        const size = item && item.size ? item.size : DEFAULT_SIZE;
        this.selectedSizeValue = size;
    }

    /**
     * Update Text color button.
     *
     * @param {object} item
     */
    updateTextColorButton(item) {
        const color = item && item.color ? item.color : DEFAULT_COLOR;
        this.selectedTextColorValue = color;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS && DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Activate Editor's intializing parameters.
     *
     * @param {Event} event
     */
    activateEditor(event) {
        if (this.readOnly) return;

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

        if (this.queueLinkPanelOpen) {
            const link = this.template.querySelector(
                '[data-element-id="lightning-input-link"]'
            );
            if (link) link.focus();
        }
    }

    /**
     * Color update to format handler.
     *
     * @param {Event} event
     */
    handleColorUpdate(event) {
        const quill = this.quill;
        this.selectedTextColorValue = event.detail.color;
        quill?.format('color', this.selectedTextColorValue);
    }

    /**
     * Emoji selection event handler.
     *
     * @param {Event} event
     */
    handleEmoji(event) {
        this.insertTextAtCursor(`${event.detail.value} `);
        this.template
            .querySelector('[data-element-id="avonni-emoji-picker"]')
            .classList.add('slds-hide');
    }

    /**
     * Hyperlink Value change handler.
     *
     * @param {Event} event
     */
    handleLinkValueChange(event) {
        event.stopPropagation();

        if (event.detail) {
            this.linkValue = event.detail.value;
        }
    }

    /**
     * Hyperlink Panel is focused handler.
     */
    handleLinkPanelFocusIn() {
        this.linkPanelHasFocus = true;
    }

    /**
     * RAF on hyperlink Panel if focus is lost.
     */
    handleLinkPanelFocusOut() {
        this.linkPanelHasFocus = false;

        requestAnimationFrame(() => {
            // eslint-disable-next-line no-unused-expressions
            this.linkPanelHasFocus || this.closeLinkPanel();
        });
    }

    /**
     * Stand in Click handler.
     *
     * @param {Event} event
     */
    handleStandInClick(event) {
        event.preventDefault();
    }

    /**
     * Change event dispatcher.
     */
    dispatchChangeEvent() {
        /**
         * The event that fires when there is a value change.
         *
         * @event
         * @name change
         * @param {string} value
         * @public
         * @bubbles
         * @cancelable
         * @composed
         */
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
}
