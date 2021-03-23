import Component from '../../storybookWrappers/splitter/doubleOrientationSplitter';

customElements.define(
    'ac-base-double-orientation-splitter',
    Component.CustomElementConstructor
);

export const DoubleOrientationSplitter = () => {
    const element = document.createElement(
        'ac-base-double-orientation-splitter'
    );
    return element;
};
