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
import DataList from 'c/dataList';

/**
 * Not tested:
 * Reset function, since calling the reset() method from the List component throws an error.
 * Popover absolute position, since runAllTimers on setTimeout loses the given parameter.
 */

const actions = [
    {
        name: 'delete-action',
        iconName: 'utility:close'
    }
];

const listActions = [
    {
        label: 'Add Lightning Accordion',
        name: 'addLightningAccordion'
    },
    {
        label: 'Section',
        name: 'section',
        iconName: 'utility:list',
        disabled: true
    }
];

const fields = [
    {
        label: 'Label',
        name: 'label',
        type: 'text'
    },
    {
        label: 'Title',
        name: 'title',
        type: 'text'
    },
    {
        label: 'Name',
        name: 'name',
        type: 'text'
    }
];

const data = [
    {
        label: 'Accordion Title A',
        title: 'Lightning Accodion Section',
        name: 'A'
    },
    {
        label: 'Accordion Title B',
        title: 'Lightning Accodion Section',
        name: 'B'
    },
    {
        label: 'Accordion Title C',
        title: 'Lightning Accodion Section',
        name: 'C'
    }
];

describe('DataList', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /* ----- ATTRIBUTES ----- */

    it('Default attributes', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        expect(element.actions).toEqual([]);
        expect(element.alternativeText).toBeUndefined();
        expect(element.data).toEqual([]);
        expect(element.divider).toBe('around');
        expect(element.fields).toEqual([]);
        expect(element.label).toBeUndefined();
        expect(element.listActions).toEqual([]);
        expect(element.popoverPosition).toBe('bottom');
        expect(element.sortable).toBeFalsy();
        expect(element.sortableIconName).toBeUndefined();
        expect(element.sortableIconPosition).toBe('left');
    });

    it('divider attribute', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.divider = 'top';
        element.sortableIconPosition = 'utility:drag_and_drop';
        element.sortableIconPosition = 'right';

        return Promise.resolve().then(() => {
            const listComponent = element.shadowRoot.querySelector(
                'avonni-list'
            );
            expect(listComponent.divider).toBe('top');
        });
    });

    it('popoverPosition attribute', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.popoverPosition = 'right';
        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title A',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover.classList).toContain('slds-nubbin_left-top');
            });
    });

    /* ----- EVENTS ----- */

    it('List actions event', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.fields = fields;
        element.data = data;
        element.listActions = listActions;

        return Promise.resolve()
            .then(() => {
                const listActionButton = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                listActionButton.addEventListener('click', handler);
                listActionButton.click();
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
            });
    });

    it('Reorder event', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        element.fields = fields;
        element.data = data;
        element.sortable = true;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('reorder', {
                        detail: {
                            items: [
                                {
                                    label: 'Accordion Title B',
                                    description: 'Lightning Accodion Section'
                                },
                                {
                                    label: 'Accordion Title A',
                                    description: 'Lightning Accodion Section'
                                },
                                {
                                    label: 'Accordion Title C',
                                    description: 'Lightning Accodion Section'
                                }
                            ]
                        }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
            });
    });

    it('Invalid reorder event', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('reorder', handler);
        element.fields = fields;
        element.data = data;
        element.sortable = true;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('reorder', {
                        detail: {
                            items: [
                                {
                                    label: 'Accordion Title D',
                                    description: 'Lightning Accodion Section'
                                }
                            ]
                        }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
            });
    });

    it('Actionclick event', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);
        element.fields = fields;
        element.data = data;
        element.sortable = true;
        element.popoverPosition = 'left';

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('actionclick', {
                        detail: {
                            name: 'delete-action',
                            item: {
                                label: 'Accordion Title A',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
            });
    });

    it('Item click event', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.fields = fields;
        element.data = data;
        element.actions = actions;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.addEventListener('itemclick', handler);
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title A',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
            });
    });

    it('Item click event on item without description', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.fields = [
            {
                label: 'Label',
                name: 'label',
                type: 'text'
            }
        ];
        element.data = [
            { label: 'Accordion Title A' },
            { label: 'Accordion Title B' },
            { label: 'Accordion Title C' }
        ];

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.addEventListener('itemclick', handler);
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: { item: { label: 'Accordion Title A' } }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
            });
    });

    /* ----- POPOVER BEHAVIOR ----- */

    it('Input change', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector('c-data-input');
                input.value = 'New Accordion Title B';
                input.dispatchEvent(new CustomEvent('commit')); // Will dispatch a save event
                input.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector('c-data-input');
                expect(input.value).toBe('New Accordion Title B');
            });
    });

    it('Input focus without change', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const input = element.shadowRoot.querySelector('c-data-input');
                input.value = 'Accordion Title B';
                input.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const input = element.shadowRoot.querySelector('c-data-input');
                expect(input.value).toBe('Accordion Title B');
            });
    });

    it('Close popover on blur', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(new CustomEvent('mouseleave'));
            })
            .then(() => {
                element.shadowRoot.dispatchEvent(new CustomEvent('mousedown'));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                element.shadowRoot.dispatchEvent(new CustomEvent('click'));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover).toBeNull();
            });
    });

    it('Close and reset popover with the Done button', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const doneButton = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                doneButton.click();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover).toBeNull();
            });
    });

    it('Close popover when clicking opened item', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                element.shadowRoot.dispatchEvent(new CustomEvent('mousedown'));
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
                element.shadowRoot.dispatchEvent(new CustomEvent('click'));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover).toBeNull();
            });
    });

    it('Trap focus when pressing Tab from Done button', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const doneButton = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                doneButton.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 9 })
                );
                const doneButton = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                doneButton.dispatchEvent(
                    new CustomEvent('blur', { target: doneButton })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 9 })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover).not.toBeNull();
            });
    });

    it('Trap focus when pressing Shift+Tab from first input', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 16 })
                );
                popover.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 9 })
                );
                const input = element.shadowRoot.querySelector('c-data-input');
                input.dispatchEvent(new CustomEvent('blur', { target: input }));
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 9 })
                );
                popover.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 16 })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover).not.toBeNull();
            });
    });

    it('Invalid keypress', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 1 })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(
                    new KeyboardEvent('keyup', { keyCode: 1 })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover).not.toBeNull();
            });
    });

    it('Close popover when pressing ESC key', () => {
        const element = createElement('avonni-data-list', {
            is: DataList
        });
        document.body.appendChild(element);

        element.fields = fields;
        element.data = data;

        return Promise.resolve()
            .then(() => {
                const listComponent = element.shadowRoot.querySelector(
                    'avonni-list'
                );
                listComponent.dispatchEvent(
                    new CustomEvent('itemclick', {
                        detail: {
                            item: {
                                label: 'Accordion Title B',
                                description: 'Lightning Accodion Section'
                            }
                        }
                    })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                popover.dispatchEvent(
                    new KeyboardEvent('keydown', { keyCode: 27 })
                );
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector('section');
                expect(popover).toBeNull();
            });
    });
});
