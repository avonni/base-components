import { createElement } from 'lwc';
import PrimitiveReferenceLine from 'c/primitiveReferenceLine';

let element;
describe('PrimitiveReferenceLine', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-reference-line', {
            is: PrimitiveReferenceLine
        });
        document.body.appendChild(element);
    });

    it('Primitive reference line: Default attributes', () => {
        expect(element.borderStyle).toBe('dotted');
        expect(element.label).toBeUndefined();
        expect(element.orientation).toBe('horizontal');
        expect(element.thickness).toBeUndefined();
        expect(element.value).toBe(0);
        expect(element.variant).toBe('default');
    });

    // border-style
    // Depends on orientation
    it('Primitive reference line: borderStyle = solid, horizontal orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'solid';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'solid') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `reference-line__badge-border-vertical-style_${border}`
                );
            });
        });
    });

    it('Primitive reference line: borderStyle = dashed, horizontal orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'dashed';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dashed') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `reference-line__badge-border-vertical-style_${border}`
                );
            });
        });
    });

    it('Primitive reference line: borderStyle = dotted, horizontal orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'dotted';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dotted') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `reference-line__badge-border-vertical-style_${border}`
                );
            });
        });
    });

    it('Primitive reference line: borderStyle = none, horizontal orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'none';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                expect(div.classList).not.toContain(
                    `reference-line__badge-border-style_${border}`
                );
                expect(div.classList).not.toContain(
                    `reference-line__badge-border-vertical-style_${border}`
                );
            });
        });
    });

    it('Primitive reference line: borderStyle = solid, vertical orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'solid';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'solid') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `reference-line__badge-border-style_${border}`
                );
            });
        });
    });

    it('Primitive reference line: borderStyle = dashed, vertical orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'dashed';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dashed') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `reference-line__badge-border-style_${border}`
                );
            });
        });
    });

    it('Primitive reference line: borderStyle = dotted, vertical orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'dotted';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                if (border === 'dotted') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-style_${border}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-style_${border}`
                    );
                }

                expect(div.classList).not.toContain(
                    `reference-line__badge-border-style_${border}`
                );
            });
        });
    });

    it('Primitive reference line: borderStyle = none, vertical orientation', () => {
        const borders = ['solid', 'dashed', 'dotted', 'none'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.borderStyle = 'none';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            borders.forEach((border) => {
                expect(div.classList).not.toContain(
                    `reference-line__badge-border-vertical-style_${border}`
                );
                expect(div.classList).not.toContain(
                    `reference-line__badge-border-style_${border}`
                );
            });
        });
    });

    // label
    it('Primitive reference line: label', () => {
        const badge = element.shadowRoot.querySelector(
            '[data-element-id="lightning-badge"]'
        );

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            expect(badge.label).toBe('A string label');
        });
    });

    // orientation
    it('Primitive reference line: orientation = horizontal', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__line-vertical'
            );
        });
    });

    it('Primitive reference line: orientation = vertical', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).toContain('reference-line__line-vertical');
        });
    });

    // thickness
    // Depends on orientation
    it('Primitive reference line: thickness = x-small, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'x-small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    it('Primitive reference line: thickness = small, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'small';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    it('Primitive reference line: thickness = medium, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'medium';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    it('Primitive reference line: thickness = large, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'large';
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    it('Primitive reference line: thickness = x-small, vertical orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'x-small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    it('Primitive reference line: thickness = small, vertical orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'small';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    it('Primitive reference line: thickness = medium, vertical orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'medium';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    it('Primitive reference line: thickness = large, vertical orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.thickness = 'large';
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness_large'
            );

            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_x-small'
            );
            expect(div.classList).not.toContain(
                'reference-line__badge-border-thickness-vertical_small'
            );
            expect(div.classList).toContain(
                'reference-line__badge-border-thickness-vertical_large'
            );
        });
    });

    // value
    // Depends on orientation
    it('Primitive reference line: value is Nan, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'horizontal';
        element.value = 'hello';

        return Promise.resolve().then(() => {
            expect(div.style.width).toBe('0%');
        });
    });

    it('Primitive reference line: value lesser than 0, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'horizontal';
        element.value = -4;

        return Promise.resolve().then(() => {
            expect(div.style.width).toBe('0%');
        });
    });

    it('Primitive reference line: value greater than 100, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'horizontal';
        element.value = 345;

        return Promise.resolve().then(() => {
            expect(div.style.width).toBe('100%');
        });
    });

    it('Primitive reference line: value = 35, horizontal orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'horizontal';
        element.value = 35;

        return Promise.resolve().then(() => {
            expect(div.style.width).toBe('35%');
        });
    });

    it('Primitive reference line: value lesser than 0, vertical orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'vertical';
        element.value = -4;

        return Promise.resolve().then(() => {
            expect(div.style.height).toBe('0%');
        });
    });

    it('Primitive reference line: value greater than 100, vertical orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'vertical';
        element.value = 345;

        return Promise.resolve().then(() => {
            expect(div.style.height).toBe('100%');
        });
    });

    it('Primitive reference line: value = 35, vertical orientation', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.orientation = 'vertical';
        element.value = 35;

        return Promise.resolve().then(() => {
            expect(div.style.height).toBe('35%');
        });
    });

    // variant
    it('Primitive reference line: variant = default', () => {
        const variants = ['inverse', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        const badge = element.shadowRoot.querySelector(
            '[data-element-id="lightning-badge"]'
        );

        element.variant = 'default';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                expect(div.classList).not.toContain(
                    `reference-line__badge-border-color_${variant}`
                );
                expect(div.classList).not.toContain(
                    `reference-line__badge-border-vertical-color_${variant}`
                );
                expect(badge.classList).not.toContain(
                    `reference-line__badge_${variant}`
                );
            });
        });
    });

    it('Primitive reference line: variant = inverse', () => {
        const variants = ['inverse', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        const badge = element.shadowRoot.querySelector(
            '[data-element-id="lightning-badge"]'
        );

        element.variant = 'inverse';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'inverse') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('Primitive reference line: variant = success', () => {
        const variants = ['inverse', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        const badge = element.shadowRoot.querySelector(
            '[data-element-id="lightning-badge"]'
        );

        element.variant = 'success';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'success') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('Primitive reference line: variant = warning', () => {
        const variants = ['inverse', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        const badge = element.shadowRoot.querySelector(
            '[data-element-id="lightning-badge"]'
        );

        element.variant = 'warning';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'warning') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('Primitive reference line: variant = error', () => {
        const variants = ['inverse', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        const badge = element.shadowRoot.querySelector(
            '[data-element-id="lightning-badge"]'
        );

        element.variant = 'error';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'error') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });

    it('Primitive reference line: variant = lightest', () => {
        const variants = ['inverse', 'success', 'warning', 'error', 'lightest'];

        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        const badge = element.shadowRoot.querySelector(
            '[data-element-id="lightning-badge"]'
        );

        element.variant = 'lightest';

        return Promise.resolve().then(() => {
            variants.forEach((variant) => {
                if (variant === 'lightest') {
                    expect(div.classList).toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                } else {
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-color_${variant}`
                    );
                    expect(badge.classList).not.toContain(
                        `reference-line__badge_${variant}`
                    );
                    expect(div.classList).not.toContain(
                        `reference-line__badge-border-vertical-color_${variant}`
                    );
                }
            });
        });
    });
});
