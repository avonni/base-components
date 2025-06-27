import { createElement } from 'lwc';
import ProgressCircle from 'c/progressCircle';

const SIZES = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large'];
const THICKNESSES = ['x-small', 'small', 'medium', 'large', 'x-large'];

let element;
describe('ProgressCircle', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-progress-circle', {
            is: ProgressCircle
        });
        document.body.appendChild(element);
    });

    it('Progress Circle: Default attributes', () => {
        expect(element.alternativeText).toBeUndefined();
        expect(element.direction).toBe('fill');
        expect(element.label).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.thickness).toBe('medium');
        expect(element.title).toBeUndefined();
        expect(element.titlePosition).toBe('bottom');
        expect(element.value).toBe(0);
        expect(element.variant).toBe('standard');
        expect(element.isLoading).toBe(false);
    });

    /* ----- ATTRIBUTES ----- */

    it('Progress Circle: alternative text', () => {
        element.alternativeText = 'Loading progress';

        return Promise.resolve().then(() => {
            const progressCircle = element.shadowRoot.querySelector(
                '.slds-progress-ring__progress'
            );
            expect(progressCircle.ariaLabel).toBe('Loading progress');
        });
    });

    // direction and value
    it('Progress Circle: direction = fill and value = 65', () => {
        element.direction = 'fill';
        element.value = 65;

        return Promise.resolve().then(() => {
            const path = element.shadowRoot.querySelector(
                '[data-element-id="path"]'
            );
            const arcX = Math.cos(2 * Math.PI * ((100 - 65) / 100));
            const arcY = Math.sin(2 * Math.PI * ((100 - 65) / 100));
            expect(path.getAttribute('d')).toBe(
                `M 1 0 A 1 1 0 1 0 ${arcX} ${arcY} L 0 0`
            );
        });
    });

    it('Progress Circle: direction = drain and value = 43', () => {
        element.direction = 'drain';
        element.value = 43;

        return Promise.resolve().then(() => {
            const path = element.shadowRoot.querySelector(
                '[data-element-id="path"]'
            );
            const arcX = Math.cos(2 * Math.PI * (43 / 100));
            const arcY = Math.sin(2 * Math.PI * (43 / 100));
            expect(path.getAttribute('d')).toBe(
                `M 1 0 A 1 1 0 0 1 ${arcX} ${arcY} L 0 0`
            );
        });
    });

    it('Progress Circle: value > 100', () => {
        element.value = 110;

        return Promise.resolve().then(() => {
            expect(element.value).toBe(100);
        });
    });

    it('Progress Circle: value < 0', () => {
        element.value = -110;

        return Promise.resolve().then(() => {
            expect(element.value).toBe(0);
        });
    });

    it('Progress Circle: value NaN', () => {
        element.value = 'a';

        return Promise.resolve().then(() => {
            expect(element.value).toBe(0);
        });
    });

    // label
    it('Progress Circle: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            expect(label.textContent.trim()).toBe('A string label');
        });
    });

    // loading
    it('Progress Circle: is-loaoding', () => {
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const valueLabel = element.shadowRoot.querySelector(
                '[data-element-id="span"]'
            );
            const dots = element.shadowRoot.querySelector(
                '[data-element-id="dots"]'
            );
            expect(label).toBeFalsy();
            expect(valueLabel).toBeFalsy();
            expect(dots).toBeTruthy();
        });
    });

    // size
    // Depends on label
    it('Progress Circle: size = medium', () => {
        element.size = 'medium';
        element.label = 'A string label';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-circle'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            SIZES.forEach((size) => {
                if (size === 'medium') {
                    expect(ring.classList).toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                }
            });
        });
    });

    it('Progress Circle: size = xx-small', () => {
        element.size = 'xx-small';
        element.label = 'A string label';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-circle'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            SIZES.forEach((size) => {
                if (size === 'xx-small') {
                    expect(ring.classList).toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                }
            });
        });
    });

    it('Progress Circle: size = x-small', () => {
        element.size = 'x-small';
        element.label = 'A string label';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-circle'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            SIZES.forEach((size) => {
                if (size === 'x-small') {
                    expect(ring.classList).toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                }
            });
        });
    });

    it('Progress Circle: size = small', () => {
        element.size = 'small';
        element.label = 'A string label';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-circle'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            SIZES.forEach((size) => {
                if (size === 'small') {
                    expect(ring.classList).toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                }
            });
        });
    });

    it('Progress Circle: size = large', () => {
        element.size = 'large';
        element.label = 'A string label';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-circle'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            SIZES.forEach((size) => {
                if (size === 'large') {
                    expect(ring.classList).toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                }
            });
        });
    });

    it('Progress Circle: size = x-large', () => {
        element.size = 'x-large';
        element.label = 'A string label';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-circle'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );

            SIZES.forEach((size) => {
                if (size === 'x-large') {
                    expect(ring.classList).toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-circle_size-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle__content_size-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-circle__title_size-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-circle__label_size-${size}`
                    );
                }
            });
        });
    });

    // thickness
    // Depends on size
    it('Progress Circle: thickness = medium and size = medium', () => {
        const testedThickness = 'medium';
        const testedSize = 'medium';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                expect(content.classList).not.toContain(
                    `avonni-progress-circle_thickness-${thickness}`
                );

                SIZES.forEach((size) => {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}-size-${size}`
                    );
                });
            });
        });
    });

    it('Progress Circle: thickness = x-small and size = x-small', () => {
        const testedThickness = 'x-small';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = small and size = x-small', () => {
        const testedThickness = 'small';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = large and size = x-small', () => {
        const testedThickness = 'large';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = x-large and size = x-small', () => {
        const testedThickness = 'x-large';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = x-small and size = small', () => {
        const testedThickness = 'x-small';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = small and size = small', () => {
        const testedThickness = 'small';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = large and size = small', () => {
        const testedThickness = 'large';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = x-large and size = small', () => {
        const testedThickness = 'x-large';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = small and size = large', () => {
        const testedThickness = 'small';
        const testedSize = 'large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = large and size = large', () => {
        const testedThickness = 'large';
        const testedSize = 'large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = x-large and size = large', () => {
        const testedThickness = 'x-large';
        const testedSize = 'large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = small and size = x-large', () => {
        const testedThickness = 'small';
        const testedSize = 'x-large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = large and size = x-large', () => {
        const testedThickness = 'large';
        const testedSize = 'x-large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('Progress Circle: thickness = x-large and size = x-large', () => {
        const testedThickness = 'x-large';
        const testedSize = 'x-large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-circle__content'
            );

            THICKNESSES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-circle_thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-circle_thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    // title
    it('Progress Circle: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    // title-position
    it('Progress Circle: titlePosition = bottom', () => {
        element.titlePosition = 'bottom';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            expect(title).toBeTruthy();
            expect(title.classList).not.toContain(
                'avonni-progress-circle__title-top_position'
            );
        });
    });

    it('Progress Circle: titlePosition = top', () => {
        element.titlePosition = 'top';
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            expect(title).toBeTruthy();
            expect(title.classList).toContain(
                'avonni-progress-circle__title-top_size-medium'
            );
        });
    });

    // variant
    it('Progress Circle: variant = standard', () => {
        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '[data-element-id="span"]'
            );
            expect(value.textContent).toBeTruthy();
        });
    });

    it('Progress Circle: variant = value-hidden', () => {
        element.variant = 'value-hidden';

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector(
                '[data-element-id="span"]'
            );
            expect(value).toBeFalsy();
        });
    });
});
