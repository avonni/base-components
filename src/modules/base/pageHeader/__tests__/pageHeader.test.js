

import { createElement } from 'lwc';
import PageHeader from 'c/pageHeader';

let element;
describe('PageHeader', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);
    });

    it('Page header: Default attributes', () => {
        expect(element.iconName).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.info).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.isJoined).toBeFalsy();
    });

    // icon-name
    it('Page header: iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-mobile"]'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // label
    // Depends on variant
    it('Page header: label', () => {
        element.variant = 'object-home';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-page-header__name > .slds-page-header__name-title > span'
            );

            expect(label.textContent).toBe('A string label');
        });
    });

    // title
    it('Page header: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-page-header__title'
            );

            expect(title.textContent).toBe('A string title');
        });
    });

    // info
    // Depends on variant
    it('Page header: info with the default (base) variant', () => {
        element.info = 'A string info';

        return Promise.resolve().then(() => {
            const info = element.shadowRoot.querySelector(
                '.slds-page-header__name-meta'
            );

            expect(info.textContent).toBe('A string info');
        });
    });

    it('Page header: info with the object-home variant', () => {
        element.info = 'A string info';
        element.variant = 'object-home';

        return Promise.resolve().then(() => {
            const info = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );

            expect(info.textContent).toBe('A string info');
        });
    });

    // is-joined
    it('Page header: if-joined with base variant', () => {
        element.variant = 'base';
        element.isJoined = true;

        return Promise.resolve().then(() => {
            const header =
                element.shadowRoot.querySelector('.slds-page-header');

            expect(header.classList).toContain('slds-page-header_joined');
        });
    });

    it('Page header: if-joined with record-home-vertical variant', () => {
        element.variant = 'record-home-vertical';
        element.isJoined = true;

        return Promise.resolve().then(() => {
            const header =
                element.shadowRoot.querySelector('.slds-page-header');

            expect(header.classList).toContain('slds-page-header_vertical');
            expect(header.classList).toContain('slds-page-header_joined');
        });
    });

    // variant
    it('Page header: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeFalsy();
            expect(bodyInfo).toBeFalsy();
            expect(headerInfo).toBeTruthy();
            expect(details).toBeFalsy();

            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('Page header: variant = object-home', () => {
        element.variant = 'object-home';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeFalsy();

            expect(wrapper.classList).toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('Page header: variant = record-home', () => {
        element.variant = 'record-home';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeTruthy();

            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('Page header: variant = record-home-vertical', () => {
        element.variant = 'record-home-vertical';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeTruthy();

            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).toContain('slds-page-header_vertical');
        });
    });
});
