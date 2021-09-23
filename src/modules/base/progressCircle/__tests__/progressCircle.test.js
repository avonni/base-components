/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { createElement } from 'lwc';
import ProgressCircle from 'c/progressCircle';

const SIZES = ['x-small', 'small', 'medium', 'large', 'x-large'];

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

    it('Default attributes', () => {
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
        element.color = 'tomato';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            const path = element.shadowRoot.querySelector('path');
            expect(span.style.color).toBe('tomato');
            expect(path.getAttribute('fill')).toBe('tomato');
        });
    });

    it('color number', () => {
        element.color = 3;

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.style.color).toBe('rgb(21, 137, 238)');
        });
    });

    // direction and value
    it('direction = fill and value = 65', () => {
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

    it('value > 100', () => {
        element.value = 110;

        return Promise.resolve().then(() => {
            expect(element.value).toBe(100);
        });
    });

    it('value < 0', () => {
        element.value = -110;

        return Promise.resolve().then(() => {
            expect(element.value).toBe(0);
        });
    });

    it('value NaN', () => {
        element.value = 'a';

        return Promise.resolve().then(() => {
            expect(element.value).toBe(0);
        });
    });

    // label
    it('label', () => {
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
        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector('span');
            expect(value.textContent).toBeTruthy();
        });
    });

    it('variant = value-hidden', () => {
        element.variant = 'value-hidden';

        return Promise.resolve().then(() => {
            const value = element.shadowRoot.querySelector('span');
            expect(value).toBeFalsy();
        });
    });
});
