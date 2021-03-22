import Component from '../../storybookWrappers/splitter/doubleOrientationSplitter';

customElements.define(
    'ac-avonni-double-orientation-splitter',
    Component.CustomElementConstructor
);

export const DoubleOrientationSplitter = () => {
    const element = document.createElement(
        'ac-avonni-double-orientation-splitter'
    );
    return element;
};
