/* eslint-disable inclusive-language/use-inclusive-words */
const fs = require('fs');
const componentName = process.argv[2];

fs.mkdirSync(`./src/modules/base/${componentName}`);
fs.mkdirSync(`./src/modules/base/${componentName}/__docs__`);
fs.mkdirSync(`./src/modules/base/${componentName}/__examples__`);
fs.mkdirSync(`./src/modules/base/${componentName}/__tests__`);

const upperCamelName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);
const spacedName = upperCamelName.replace(/([A-Z])/g, ' $1').trim();
const kebabName = componentName.replace(/([A-Z])/g, '-$1').toLowerCase();

const javascript = `import { LightningElement, api } from 'lwc';

export default class ${upperCamelName} extends LightningElement {

}
`;

const html = `<template>

</template>
`;

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>56.0</apiVersion>
    <isExposed>false</isExposed>
    <masterLabel>Avonni ${spacedName}</masterLabel>
</LightningComponentBundle>
`;

const example = `import Component from '../${componentName}';

customElements.define(
    'ac-${kebabName}',
    Component.CustomElementConstructor
);

export const ${upperCamelName} = ({
    // title
}) => {
    const element = document.createElement('ac-${kebabName}');
    // element.title = title;
    return element;
};
`;

const docs = `import { ${upperCamelName} } from '../__examples__/${componentName}';

export default {
    title: 'Example/${spacedName}',
    argTypes: {
        // title: {
        //     control: {
        //         type: 'text'
        //     },
        //     description:
        //         'The title can include text, and is displayed in the header.',
        //     table: {
        //         type: { summary: 'string' }
        //     }
        // }
    }
};

const Template = (args) => ${upperCamelName}(args);

export const Base = Template.bind({});
Base.args = {
    // title: '${spacedName}'
};
`;

const test = `import { createElement } from 'lwc';
import ${upperCamelName} from '../${componentName}';

let element;
describe('${spacedName}', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-${kebabName}', {
            is: ${upperCamelName}
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        // expect(element.title).toBeUndefined();
    });

    /*
    * ------------------------------------------------------------
    *  ATTRIBUTES
    * -------------------------------------------------------------
    */

    // title
    it('${spacedName}: title', () => {
        // element.title = 'This is a title text';

        // return Promise.resolve().then(() => {
        //     const title = element.shadowRoot.querySelector(
        //         '[data-element-id="div-title"]'
        //     );
        //     expect(title.textContent).toBe('This is a title text');
        // });
    });
});
`;

fs.writeFile(
    `./src/modules/base/${componentName}/${componentName}.js`,
    javascript,
    (err) => {
        if (err) throw err;
    }
);

fs.writeFile(
    `./src/modules/base/${componentName}/${componentName}.html`,
    html,
    (err) => {
        if (err) throw err;
    }
);

fs.writeFile(
    `./src/modules/base/${componentName}/${componentName}.js-meta.xml`,
    xml,
    (err) => {
        if (err) throw err;
    }
);

fs.writeFile(
    `./src/modules/base/${componentName}/__examples__/${componentName}.js`,
    example,
    (err) => {
        if (err) throw err;
    }
);

fs.writeFile(
    `./src/modules/base/${componentName}/__docs__/${componentName}.stories.js`,
    docs,
    (err) => {
        if (err) throw err;
    }
);

fs.writeFile(
    `./src/modules/base/${componentName}/__tests__/${componentName}.test.js`,
    test,
    (err) => {
        if (err) throw err;
    }
);

console.log('\x1b[7m%s\x1b[7m', `\nNew component ${spacedName} created!\n`);
