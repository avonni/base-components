import { createElement } from 'lwc';
import PrimitiveProgressBarReferenceLine from 'c/primitiveProgressBarReferenceLine';

describe('PrimitiveProgressBarReferenceLine', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        expect(element.borderStyle).toBe('dotted');
        expect(element.label).toBeUndefined();
        expect(element.orientation).toBe('horizontal');
        expect(element.thickness).toBeUndefined();
        expect(element.value).toBe(0);
        expect(element.variant).toBe('default');
    });

    // border-style
    // Depends on orientation
    it('borderStyle = solid, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'solid';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'solid') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                );
            });
        });
    });

    it('borderStyle = dashed, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'dashed';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dashed') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                );
            });
        });
    });

    it('borderStyle = dotted, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'dotted';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dotted') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                );
            });
        });
    });

    it('borderStyle = none, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'none';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-style_${border}`
                );
                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                );
            });
        });
    });

    it('borderStyle = solid, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'solid';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'solid') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-style_${border}`
                );
            });
        });
    });

    it('borderStyle = dashed, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'dashed';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dashed') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-style_${border}`
                );
            });
        });
    });

    it('borderStyle = dotted, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'dotted';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dotted') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-style_${border}`
                );
            });
        });
    });

    it('borderStyle = none, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('div');

        element.borderStyle = 'none';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-vertical-style_${border}`
                );
                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-style_${border}`
                );
            });
        });
    });

    // label
    it('label', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const badge = element.shadowRoot.querySelector('lightning-badge');

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            expect(badge.label).toBe('A string label');
        });
    });

    // orientation
    it('orientation = horizontal', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-marker-vertical'
            );
        });
    });

    it('orientation = vertical', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).toContain(
                'avonni-progress-bar-marker-vertical'
            );
        });
    });

    // thickness
    // Depends on orientation
    it('thickness = x-small, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'x-small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    it('thickness = small, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    it('thickness = medium, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'medium';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    it('thickness = large, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'large';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    it('thickness = x-small, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'x-small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    it('thickness = small, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    it('thickness = medium, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'medium';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    it('thickness = large, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.thickness = 'large';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_small'
            );
            expect(div.classList).toContain(
                'avonni-progress-bar-reference-line-border-thickness-vertical_large'
            );
        });
    });

    // value
    // Depends on orientation
    it('value lesser than 0, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'horizontal';
        element.value = -4;

        return Promise.resolve().then(() => {
            expect(div.style.width).toBe('0%');
        });
    });

    it('value greater than 100, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'horizontal';
        element.value = 345;

        return Promise.resolve().then(() => {
            expect(div.style.width).toBe('100%');
        });
    });

    it('value = 35, horizontal orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'horizontal';
        element.value = 35;

        return Promise.resolve().then(() => {
            expect(div.style.width).toBe('35%');
        });
    });

    it('value lesser than 0, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'vertical';
        element.value = -4;

        return Promise.resolve().then(() => {
            expect(div.style.height).toBe('0%');
        });
    });

    it('value greater than 100, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'vertical';
        element.value = 345;

        return Promise.resolve().then(() => {
            expect(div.style.height).toBe('100%');
        });
    });

    it('value = 35, vertical orientation', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');

        element.orientation = 'vertical';
        element.value = 35;

        return Promise.resolve().then(() => {
            expect(div.style.height).toBe('35%');
        });
    });

    // variant
    it('variant = default', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const variants = ['darker', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('div');
        const badge = element.shadowRoot.querySelector('lightning-badge');

        element.variant = 'default';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-color_${variant}`
                );
                expect(div.classList).not.toContain(
                    `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                );
                expect(badge.classList).not.toContain(
                    `avonni-progress-bar-reference-line_${variant}`
                );
            });
        });
    });

    it('variant = darker', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const variants = ['darker', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('div');
        const badge = element.shadowRoot.querySelector('lightning-badge');

        element.variant = 'darker';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'darker') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('variant = success', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const variants = ['darker', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('div');
        const badge = element.shadowRoot.querySelector('lightning-badge');

        element.variant = 'success';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'success') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('variant = warning', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const variants = ['darker', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('div');
        const badge = element.shadowRoot.querySelector('lightning-badge');

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'warning') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('variant = error', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const variants = ['darker', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('div');
        const badge = element.shadowRoot.querySelector('lightning-badge');

        element.variant = 'error';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'error') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('variant = lightest', () => {
        const element = createElement(
            'base-primitive-progress-bar-reference-line',
            {
                is: PrimitiveProgressBarReferenceLine
            }
        );

        document.body.appendChild(element);

        const variants = ['darker', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('div');
        const badge = element.shadowRoot.querySelector('lightning-badge');

        element.variant = 'lightest';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'lightest') {
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `avonni-progress-bar-reference-line_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `avonni-progress-bar-reference-line-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });
});
