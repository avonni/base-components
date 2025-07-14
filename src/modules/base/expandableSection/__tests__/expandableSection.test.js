import { createElement } from 'lwc';
import ExpandableSection from 'c/expandableSection';

let element;
describe('Expandable Section', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.closed).toBeFalsy();
            expect(element.closedIconAlternativeText).toBe('Closed');
            expect(element.collapsible).toBeFalsy();
            expect(element.openedIconAlternativeText).toBe('Opened');
            expect(element.title).toBeUndefined();
            expect(element.variant).toBe('shaded');
        });

        describe('closed', () => {
            it('Passed to the component as true', () => {
                element.closed = true;
                element.collapsible = true;
                element.closedIconAlternativeText = 'Fermé';
                element.title = 'Some title';

                return Promise.resolve().then(() => {
                    const section = element.shadowRoot.querySelector(
                        '[data-element-id="section"]'
                    );
                    expect(section.className).not.toContain('slds-is-open');
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-closed"]'
                    );
                    expect(icon.alternativeText).toBe('Fermé');
                });
            });

            it('Passed to the component as false', () => {
                element.closed = false;
                element.collapsible = true;
                element.openedIconAlternativeText = 'Ouvert';
                element.title = 'Some title';

                return Promise.resolve().then(() => {
                    const section = element.shadowRoot.querySelector(
                        '[data-element-id="section"]'
                    );
                    expect(section.className).toContain('slds-is-open');
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-opened"]'
                    );
                    expect(icon.alternativeText).toBe('Ouvert');
                });
            });
        });

        describe('collapsible', () => {
            it('Passed to the component as true', () => {
                element.title = 'Some title';
                element.collapsible = true;

                return Promise.resolve().then(() => {
                    const section = element.shadowRoot.querySelector(
                        '[data-element-id="section"]'
                    );
                    expect(section.className).toContain('slds-is-open');
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="header"]'
                    );
                    expect(title.className).not.toContain('slds-theme_shade');
                    const spanTitle =
                        element.shadowRoot.querySelector('.slds-truncate');
                    expect(spanTitle.className).not.toContain(
                        'slds-p-horizontal_small'
                    );
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon).toBeTruthy();
                });
            });

            it('Passed to the component as false', () => {
                element.title = 'Some title';
                element.collapsible = false;

                return Promise.resolve().then(() => {
                    const section = element.shadowRoot.querySelector(
                        '[data-element-id="section"]'
                    );
                    expect(section.className).toContain('slds-is-open');
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="header"] span'
                    );
                    expect(title).toBeTruthy();

                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id^="lightning-icon"]'
                    );
                    expect(icon).toBeFalsy();
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'This is a title';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="header"]'
                    );
                    expect(title.textContent).toBe('This is a title');
                });
            });

            it('empty title and no collapsible', () => {
                const header = element.shadowRoot.querySelector(
                    '[data-element-id="header"]'
                );
                expect(header).toBeFalsy();
            });
        });

        describe('variant', () => {
            it('Passed to the component as shaded', () => {
                element.title = 'Some title';
                element.variant = 'shaded';

                return Promise.resolve().then(() => {
                    const header = element.shadowRoot.querySelector(
                        '[data-element-id="header"]'
                    );
                    expect(header.className).toContain('slds-theme_shade');
                });
            });

            it('base variant, with no collapsible', () => {
                element.title = 'Some title';
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const header = element.shadowRoot.querySelector(
                        '[data-element-id="header"]'
                    );
                    expect(header.className).not.toContain('slds-theme_shade');
                });
            });

            it('base variant, with collapsible', () => {
                element.title = 'Some title';
                element.variant = 'base';
                element.collapsible = true;

                return Promise.resolve().then(() => {
                    const header = element.shadowRoot.querySelector(
                        '[data-element-id="header"]'
                    );
                    expect(header.className).not.toContain('slds-theme_shade');

                    const title = header.querySelector(
                        '.slds-section__title-action'
                    );
                    expect(title.classList).toContain(
                        'avonni-expandable-section__title-button_base'
                    );
                });
            });

            it('shaded variant, with collapsible', () => {
                element.title = 'Some title';
                element.variant = 'shaded';
                element.collapsible = true;

                return Promise.resolve().then(() => {
                    const header = element.shadowRoot.querySelector(
                        '[data-element-id="header"]'
                    );
                    expect(header.className).not.toContain('slds-theme_shade');

                    const title = header.querySelector(
                        '.slds-section__title-action'
                    );
                    expect(title.classList).not.toContain('slds-theme_default');
                    expect(title.classList).not.toContain(
                        'avonni-expandable-section__title-button_base'
                    );
                });
            });
        });
    });

    describe('Events', () => {
        describe('toggle event', () => {
            it('Collapsible', () => {
                element.collapsible = true;
                element.title = 'Some title';

                const handler = jest.fn();
                element.addEventListener('toggle', handler);

                const section =
                    element.shadowRoot.querySelector('.slds-section');
                expect(section.classList).toContain('slds-is-open');

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '.slds-section__title-action'
                        );
                        button.click();
                    })
                    .then(() => {
                        expect(handler).toHaveBeenCalledTimes(1);
                        expect(
                            handler.mock.calls[0][0].detail.closed
                        ).toBeTruthy();

                        const button = element.shadowRoot.querySelector(
                            '.slds-section__title-action'
                        );
                        expect(section.classList).not.toContain('slds-is-open');
                        button.click();
                    })
                    .then(() => {
                        expect(section.classList).toContain('slds-is-open');
                        expect(handler).toHaveBeenCalledTimes(2);
                        expect(
                            handler.mock.calls[1][0].detail.closed
                        ).toBeFalsy();
                    });
            });

            it('Not Collapsible', () => {
                element.collapsible = false;
                element.title = 'Some title';

                const handler = jest.fn();
                element.addEventListener('toggle', handler);

                const section =
                    element.shadowRoot.querySelector('.slds-section');
                expect(section.classList).toContain('slds-is-open');

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '.slds-section__title-action'
                        );
                        button.click();
                    })
                    .then(() => {
                        expect(handler).not.toHaveBeenCalled();
                        const button = element.shadowRoot.querySelector(
                            '.slds-section__title-action'
                        );
                        expect(section.classList).toContain('slds-is-open');
                        button.click();
                    })
                    .then(() => {
                        expect(section.classList).toContain('slds-is-open');
                        expect(handler).not.toHaveBeenCalled();
                    });
            });
        });
    });
});
