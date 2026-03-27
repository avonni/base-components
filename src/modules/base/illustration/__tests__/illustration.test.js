import { createElement } from 'lwc';
import Illustration from 'c/illustration';

// mock isOrgSlds2
jest.mock('c/utilsPrivate', () => ({
    isOrgSlds2: jest.fn(() => true)
}));

let element;
describe('Illustration', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-illustration', {
            is: Illustration
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.alternativeText).toBeUndefined();
            expect(element.size).toBe('small');
            expect(element.title).toBeUndefined();
            expect(element.variant).toBe('text-only');
        });

        describe('alternativeText', () => {
            it('Passed to the component', () => {
                element.alternativeText = 'This is a alternative text';
                return Promise.resolve().then(() => {
                    const assistiveText = element.shadowRoot.querySelector(
                        '[data-element-id="illustration-assistive-text"]'
                    );
                    expect(assistiveText.textContent).toBe(
                        'This is a alternative text'
                    );
                });
            });
        });

        describe('size', () => {
            it('small', () => {
                return Promise.resolve().then(() => {
                    const container =
                        element.shadowRoot.querySelector('.slds-illustration');
                    expect(container.className).toContain(
                        'slds-illustration_small'
                    );
                    expect(container.className).not.toContain(
                        'slds-illustration_large'
                    );
                });
            });

            it('large', () => {
                element.size = 'large';

                return Promise.resolve().then(() => {
                    const container =
                        element.shadowRoot.querySelector('.slds-illustration');
                    expect(container.className).not.toContain(
                        'slds-illustration_small'
                    );
                    expect(container.className).toContain(
                        'slds-illustration_large'
                    );
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'This is a title';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="h3"]'
                    );
                    expect(title.textContent).toBe('This is a title');
                });
            });
        });

        describe('variant', () => {
            it('text-only', () => {
                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img).toBeFalsy();
                });
            });

            it('going-camping', () => {
                element.variant = 'going-camping';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/going-camping.svg'
                    );
                });
            });

            it('maintenance', () => {
                element.variant = 'maintenance';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/maintenance.svg'
                    );
                });
            });

            it('desert', () => {
                element.variant = 'desert';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/desert.svg'
                    );
                });
            });

            it('open-road', () => {
                element.variant = 'open-road';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/open-road.svg'
                    );
                });
            });

            it('no-access', () => {
                element.variant = 'no-access';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/no-access.svg'
                    );
                });
            });

            it('no-connection', () => {
                element.variant = 'no-connection';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/no-connection.svg'
                    );
                });
            });

            it('not-available-in-lightning', () => {
                element.variant = 'not-available-in-lightning';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/not-available-in-lightning.svg'
                    );
                });
            });

            it('page-not-available', () => {
                element.variant = 'page-not-available';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/page-not-available.svg'
                    );
                });
            });

            it('walkthrough-not-available', () => {
                element.variant = 'walkthrough-not-available';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/walkthrough-not-available.svg'
                    );
                });
            });

            it('fishing-deals', () => {
                element.variant = 'fishing-deals';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/fishing-deals.svg'
                    );
                });
            });

            it('lake-mountain', () => {
                element.variant = 'lake-mountain';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/lake-mountain.svg'
                    );
                });
            });

            it('no-events', () => {
                element.variant = 'no-events';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/no-events.svg'
                    );
                });
            });

            it('no-task', () => {
                element.variant = 'no-task';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/no-task.svg'
                    );
                });
            });

            it('setup', () => {
                element.variant = 'setup';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/setup.svg'
                    );
                });
            });

            it('gone-fishing', () => {
                element.variant = 'gone-fishing';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/gone-fishing.svg'
                    );
                });
            });

            it('no-access-2', () => {
                element.variant = 'no-access-2';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/no-access-2.svg'
                    );
                });
            });

            it('no-content', () => {
                element.variant = 'no-content';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/no-content.svg'
                    );
                });
            });

            it('no-preview', () => {
                element.variant = 'no-preview';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/no-preview.svg'
                    );
                });
            });

            it('preview', () => {
                element.variant = 'preview';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/preview.svg'
                    );
                });
            });

            it('research', () => {
                element.variant = 'research';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/research.svg'
                    );
                });
            });

            it('access-deleted', () => {
                element.variant = 'access-deleted';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/access-deleted.svg'
                    );
                });
            });

            it('access-limit', () => {
                element.variant = 'access-limit';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/access-limit.svg'
                    );
                });
            });

            it('access-request', () => {
                element.variant = 'access-request';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/access-request.svg'
                    );
                });
            });

            it('cart-noitems', () => {
                element.variant = 'cart-noitems';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/cart-noitems.svg'
                    );
                });
            });

            it('error-appconnection', () => {
                element.variant = 'error-appconnection';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/error-appconnection.svg'
                    );
                });
            });

            it('error-connectionissue', () => {
                element.variant = 'error-connectionissue';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/error-connectionissue.svg'
                    );
                });
            });

            it('error-recoverable', () => {
                element.variant = 'error-recoverable';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/error-recoverable.svg'
                    );
                });
            });

            it('error-unrecoverable', () => {
                element.variant = 'error-unrecoverable';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/error-unrecoverable.svg'
                    );
                });
            });

            it('maintenance-planned', () => {
                element.variant = 'maintenance-planned';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/maintenance-planned.svg'
                    );
                });
            });

            it('maintenance-unplanned', () => {
                element.variant = 'maintenance-unplanned';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/maintenance-unplanned.svg'
                    );
                });
            });

            it('noresults-filter', () => {
                element.variant = 'noresults-filter';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/noresults-filter.svg'
                    );
                });
            });

            it('noresults-search', () => {
                element.variant = 'noresults-search';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/noresults-search.svg'
                    );
                });
            });

            it('noresults-unknown', () => {
                element.variant = 'noresults-unknown';

                return Promise.resolve().then(() => {
                    const img = element.shadowRoot.querySelector(
                        '[data-element-id="img"]'
                    );
                    expect(img.src).toContain(
                        '/assets/canvas-elements/illustrationLibrary/noresults-unknown.svg'
                    );
                });
            });
        });
    });
});
