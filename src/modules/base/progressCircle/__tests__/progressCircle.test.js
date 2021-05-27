import { createElement } from 'lwc';
import ProgressCircle from 'c/progressCircle';

const SIZES = ['x-small', 'small', 'medium', 'large', 'x-large'];

describe('ProgressCircle', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        expect(element.color).toBe('#1589ee');
        expect(element.direction).toBe('fill');
        expect(element.label).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.thickness).toBe('medium');
        expect(element.title).toBeUndefined();
        expect(element.titlePosition).toBe('bottom');
        expect(element.value).toBe(0);
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // color
    it('color', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.color = 'tomato';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            const path = element.shadowRoot.querySelector('path');
            expect(span.style.color).toBe('tomato');
            expect(path.getAttribute('fill')).toBe('tomato');
        });
    });

    // direction and value
    it('direction = fill and value = 65', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.direction = 'fill';
        element.value = 65;

        return Promise.resolve().then(() => {
            const path = element.shadowRoot.querySelector('path');
            const arcX = Math.cos(2 * Math.PI * ((100 - 65) / 100));
            const arcY = Math.sin(2 * Math.PI * ((100 - 65) / 100));
            expect(path.getAttribute('d')).toBe(
                `M 1 0 A 1 1 0 1 0 ${arcX} ${arcY} L 0 0`
            );
        });
    });

    it('direction = drain and value = 43', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.direction = 'drain';
        element.value = 43;

        return Promise.resolve().then(() => {
            const path = element.shadowRoot.querySelector('path');
            const arcX = Math.cos(2 * Math.PI * (43 / 100));
            const arcY = Math.sin(2 * Math.PI * (43 / 100));
            expect(path.getAttribute('d')).toBe(
                `M 1 0 A 1 1 0 0 1 ${arcX} ${arcY} L 0 0`
            );
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-label-style'
            );
            expect(label.textContent.trim()).toBe('A string label');
        });
    });

    // size
    // Depends on label
    it('size = medium', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.size = 'medium';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-ring'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-label-style'
            );

            SIZES.forEach((size) => {
                if (size === 'medium') {
                    expect(ring.classList).toContain(`avonni-progress-${size}`);
                    expect(content.classList).toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-label-style-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-label-style-${size}`
                    );
                }
            });
        });
    });

    it('size = x-small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.size = 'x-small';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-ring'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-label-style'
            );

            SIZES.forEach((size) => {
                if (size === 'x-small') {
                    expect(ring.classList).toContain(`avonni-progress-${size}`);
                    expect(content.classList).toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-label-style-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-label-style-${size}`
                    );
                }
            });
        });
    });

    it('size = small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.size = 'small';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-ring'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-label-style'
            );

            SIZES.forEach((size) => {
                if (size === 'small') {
                    expect(ring.classList).toContain(`avonni-progress-${size}`);
                    expect(content.classList).toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-label-style-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-label-style-${size}`
                    );
                }
            });
        });
    });

    it('size = large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.size = 'large';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-ring'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-label-style'
            );

            SIZES.forEach((size) => {
                if (size === 'large') {
                    expect(ring.classList).toContain(`avonni-progress-${size}`);
                    expect(content.classList).toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-label-style-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-label-style-${size}`
                    );
                }
            });
        });
    });

    it('size = x-large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.size = 'x-large';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const ring = element.shadowRoot.querySelector(
                '.avonni-progress-ring'
            );
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            const label = element.shadowRoot.querySelector(
                '.avonni-progress-label-style'
            );

            SIZES.forEach((size) => {
                if (size === 'x-large') {
                    expect(ring.classList).toContain(`avonni-progress-${size}`);
                    expect(content.classList).toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).toContain(
                        `avonni-progress-label-style-${size}`
                    );
                } else {
                    expect(ring.classList).not.toContain(
                        `avonni-progress-${size}`
                    );
                    expect(content.classList).not.toContain(
                        `avonni-progress-content-${size}`
                    );
                    expect(title.classList).not.toContain(
                        `avonni-progress-title-${size}`
                    );
                    expect(label.classList).not.toContain(
                        `avonni-progress-label-style-${size}`
                    );
                }
            });
        });
    });

    // thickness
    // Depends on size
    it('thickness = medium and size = medium', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'medium';
        const testedSize = 'medium';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                expect(content.classList).not.toContain(
                    `avonni-progress-thickness-${thickness}`
                );

                SIZES.forEach((size) => {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}-size-${size}`
                    );
                });
            });
        });
    });

    it('thickness = x-small and size = x-small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'x-small';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = small and size = x-small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'small';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = large and size = x-small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'large';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = x-large and size = x-small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'x-large';
        const testedSize = 'x-small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = x-small and size = small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'x-small';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = small and size = small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'small';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = large and size = small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'large';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = x-large and size = small', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'x-large';
        const testedSize = 'small';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = small and size = large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'small';
        const testedSize = 'large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = large and size = large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'large';
        const testedSize = 'large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = x-large and size = large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'x-large';
        const testedSize = 'large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = small and size = x-large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'small';
        const testedSize = 'x-large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = large and size = x-large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'large';
        const testedSize = 'x-large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    it('thickness = x-large and size = x-large', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        const testedThickness = 'x-large';
        const testedSize = 'x-large';

        element.size = testedSize;
        element.thickness = testedThickness;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.avonni-progress-content'
            );

            SIZES.forEach((thickness) => {
                if (thickness === testedThickness) {
                    expect(content.classList).toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                } else {
                    expect(content.classList).not.toContain(
                        `avonni-progress-thickness-${thickness}`
                    );
                }

                SIZES.forEach((size) => {
                    if (size === testedSize && thickness === testedThickness) {
                        expect(content.classList).toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    } else {
                        expect(content.classList).not.toContain(
                            `avonni-progress-thickness-${thickness}-size-${size}`
                        );
                    }
                });
            });
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    // title-position
    it('titlePosition = bottom', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.titlePosition = 'bottom';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            expect(title).toBeTruthy();
            expect(title.classList).not.toContain(
                'avonni-progress-title-position-top'
            );
        });
    });

    it('titlePosition = top', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.titlePosition = 'top';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-grid.slds-grid_align-center.slds-text-align_center'
            );
            expect(title).toBeTruthy();
            expect(title.classList).toContain(
                'avonni-progress-title-position-top'
            );
        });
    });

    // variant
    it('variant = standard', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector('span');
            expect(value.textContent).toBeTruthy();
        });
    });

    it('variant = value-hidden', () => {
        const element = createElement('base-progress-circle', {
            is: ProgressCircle
        });

        document.body.appendChild(element);

        element.variant = 'value-hidden';

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector('span');
            expect(value).toBeFalsy();
        });
    });
});

// expect(element.variant).toBe('standard');
