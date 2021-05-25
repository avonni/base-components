import { createElement } from 'lwc';
import ExpandableSection from 'c/expandableSection';

describe('Expandable Section', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Expandable Section Default attributes', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });

        expect(element.title).toBeUndefined();
        expect(element.closed).toBeFalsy();
        expect(element.collapsible).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Expandable Section title', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        element.title = 'This is a title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h3');
            expect(title.textContent).toBe('This is a title');
        });
    });

    // closed
    it('Expandable Section closed', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        element.closed = true;
        element.collapsible = true;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).not.toContain('slds-is-open');
        });
    });

    // collapsible
    it('Expandable Section collapsible true', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        element.collapsible = true;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).toContain('slds-is-open');
            const title = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(title.className).not.toContain('slds-theme_shade');
            const spanTitle = element.shadowRoot.querySelector(
                '.slds-truncate'
            );
            expect(spanTitle.className).not.toContain(
                'slds-p-horizontal_small'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon).toBeTruthy();
        });
    });

    it('Expandable Section collapsible false', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).toContain('slds-is-open');
            const title = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(title.className).toContain('slds-theme_shade');
            const spanTitle = element.shadowRoot.querySelector(
                '.slds-truncate'
            );
            expect(spanTitle.className).toContain('slds-p-horizontal_small');
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon).toBeFalsy();
        });
    });
});
