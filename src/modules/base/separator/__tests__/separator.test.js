

import { createElement } from 'lwc';
import Separator from 'c/separator';

let element;
describe('Separator', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-separator', {
            is: Separator
        });
        document.body.appendChild(element);
    });

    it('Separator: Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition.default).toBe('left');
        expect(element.iconSize.default).toBe('small');
        expect(element.orientation.default).toBe('horizontal');
        expect(element.alignContent.default).toBe('center');
    });

    it('Separator: Label', () => {
        element.label = 'Today';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="h1"]'
            );
            expect(header.textContent).toBe('Today');
        });
    });

    it('Separator: IconName', () => {
        element.iconName = 'utility:check';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(icon.iconName).toBe('utility:check');
        });
    });

    it('Separator: IconPosition', () => {
        element.iconName = 'utility:check';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-separator_content'
            );
            expect(content.classList).toContain('slds-grid_reverse');
        });
    });

    it('Separator: IconSize', () => {
        element.iconName = 'utility:check';
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(content.size).toBe('x-small');
        });
    });

    it('Separator: Orientation', () => {
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-separator__container'
            );
            expect(container.classList).toContain('slds-grid_vertical');
        });
    });

    it('Separator: Align Content start', () => {
        element.iconName = 'utility:check';
        element.iconSize = 'x-small';
        element.alignContent = 'start';

        return Promise.resolve().then(() => {
            const lineOne = element.shadowRoot.querySelector(
                '[data-element-id="line-one"]'
            );
            expect(lineOne.classList).toContain('slds-hide');
        });
    });

    it('Separator: Align Content end', () => {
        element.iconName = 'utility:check';
        element.iconSize = 'x-small';
        element.alignContent = 'end';

        return Promise.resolve().then(() => {
            const lineTwo = element.shadowRoot.querySelector(
                '[data-element-id="line-two"]'
            );
            expect(lineTwo.classList).toContain('slds-hide');
        });
    });

    it('Separator: Icon Margin left', () => {
        element.label = 'Tester';
        element.iconName = 'utility:check';
        element.iconSize = 'small';
        element.iconPosition = 'left';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(icon.classList).toContain('slds-m-right_x-small');
        });
    });

    it('Separator: Icon Margin Right', () => {
        element.label = 'Tester';
        element.iconName = 'utility:check';
        element.iconSize = 'small';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(icon.classList).toContain('slds-m-left_x-small');
        });
    });
});
