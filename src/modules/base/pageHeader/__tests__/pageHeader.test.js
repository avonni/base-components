import { createElement } from 'lwc';
import PageHeader from 'c/pageHeader';

describe('PageHeader', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });

        expect(element.iconName).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.info).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.items).toEqual([]);
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

        const icon = element.shadowRoot.querySelector('c-primitive-icon');
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // label
    // Depends on variant
    it('label', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

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
    it('title', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

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
    it('info with the default (base) variant', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

        element.info = 'A string info';

        return Promise.resolve().then(() => {
            const info = element.shadowRoot.querySelector(
                '.slds-page-header__name-meta'
            );

            expect(info.textContent).toBe('A string info');
        });
    });

    it('info with the object-home variant', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

        element.info = 'A string info';
        element.variant = 'object-home';

        return Promise.resolve().then(() => {
            const info = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );

            expect(info.textContent).toBe('A string info');
        });
    });

    // variant
    it('variant = base', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-page-header'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-page-header__name-title > slot[name="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '.slds-page-header__title + .slds-page-header__name-meta'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeFalsy();
            expect(bodyInfo).toBeFalsy();
            expect(headerInfo).toBeTruthy();
            expect(details).toBeFalsy();

            expect(wrapper.classList).not.toContain(
                'slds-page-header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('variant = object-home', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

        element.variant = 'object-home';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-page-header'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-page-header__name-title > slot[name="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '.slds-page-header__title + .slds-page-header__name-meta'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeFalsy();

            expect(wrapper.classList).toContain('slds-page-header_object-home');
            expect(wrapper.classList).not.toContain(
                'slds-page-header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('variant = record-home', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

        element.variant = 'record-home';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-page-header'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-page-header__name-title > slot[name="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '.slds-page-header__title + .slds-page-header__name-meta'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeTruthy();

            expect(wrapper.classList).not.toContain(
                'slds-page-header_object-home'
            );
            expect(wrapper.classList).toContain('slds-page-header_record-home');
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('variant = record-home-vertical', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);

        element.variant = 'record-home-vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-page-header'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-page-header__name-title > slot[name="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '.slds-page-header__title + .slds-page-header__name-meta'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeTruthy();

            expect(wrapper.classList).not.toContain(
                'slds-page-header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_record-home'
            );
            expect(wrapper.classList).toContain('slds-page-header_vertical');
        });
    });

    // items
    // Depends on variant
    it('items with variant = record-home', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);
        const items = [
            {
                label: 'Currency',
                value: 70,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'EUR',
                    currencyDisplayAs: 'name',
                    minimumIntegerDigits: 2
                }
            },
            {
                label: 'Email',
                value: 'Avonni@Avonni.com',
                type: 'email',
                typeAttributes: {
                    hideIcon: 'true'
                }
            }
        ];

        element.items = items;
        element.variant = 'record-home';

        return Promise.resolve().then(() => {
            const detailsSlot = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );
            const primitiveItems = element.shadowRoot.querySelectorAll(
                'c-primitive-page-header-item'
            );

            expect(detailsSlot).toBeFalsy();
            primitiveItems.forEach((item, index) => {
                const correspondingItem = items[index];
                expect(correspondingItem).toBeTruthy();
                expect(item.item).toEqual(correspondingItem);
                expect(item.label).toBe(correspondingItem.label);
                expect(item.value).toBe(correspondingItem.value);
                expect(item.type).toBe(correspondingItem.type);
            });
        });
    });

    it('items with variant = record-home-vertical', () => {
        const element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);
        const items = [
            {
                label: 'Currency',
                value: 70,
                type: 'currency',
                typeAttributes: {
                    currencyCode: 'EUR',
                    currencyDisplayAs: 'name',
                    minimumIntegerDigits: 2
                }
            },
            {
                label: 'Email',
                value: 'Avonni@Avonni.com',
                type: 'email',
                typeAttributes: {
                    hideIcon: 'true'
                }
            }
        ];

        element.items = items;
        element.variant = 'record-home-vertical';

        return Promise.resolve().then(() => {
            const detailsSlot = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );
            const primitiveItems = element.shadowRoot.querySelectorAll(
                'c-primitive-page-header-item'
            );

            expect(detailsSlot).toBeFalsy();
            primitiveItems.forEach((item, index) => {
                const correspondingItem = items[index];
                expect(correspondingItem).toBeTruthy();
                expect(item.item).toEqual(correspondingItem);
                expect(item.label).toBe(correspondingItem.label);
                expect(item.value).toBe(correspondingItem.value);
                expect(item.type).toBe(correspondingItem.type);
            });
        });
    });
});
