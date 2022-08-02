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
import RelationshipGraph from 'c/relationshipGraph';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// avatarFallbackIconName
// avatarSrc

const actions = [
    {
        label: 'Add relationship',
        name: 'add-relationship',
        iconName: 'utility:add'
    },
    {
        label: 'Remove relationship',
        name: 'remove-relationship',
        disabled: true
    }
];

const groups = [
    {
        // Group
        label: 'Group Relationships with a very long label',
        name: 'group-relationships',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        // Items
        items: [
            {
                label: 'Symonds Household',
                name: 'symonds-household',
                avatarSrc:
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                avatarFallbackIconName: 'standard:user',
                href: 'https://www.avonni.app/',
                data: [
                    {
                        label: 'Account Name',
                        value: 'Symonds Household'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$324,700.00'
                    }
                ],
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'symonds-household-group-relationships',
                        items: [
                            {
                                label: 'Amine Benachraf',
                                name: 'amine-benachraf',
                                hideDefaultActions: true
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'symonds-household-related-accounts'
                    },
                    {
                        label: 'Members',
                        name: 'symonds-household-members',
                        items: [
                            {
                                label: 'Neil Symonds',
                                name: 'neil-symonds',
                                avatarFallbackIconName: 'standard:user',
                                href: 'https://www.avonni.app/',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Neil Symonds'
                                    },
                                    {
                                        label: 'Account phone number',
                                        value: '(628) 391-9393'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // Group
    {
        label: 'Related Accounts',
        name: 'related-accounts',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        expanded: false,
        // Items
        items: [
            {
                label: 'Cumulus Restaurants',
                name: 'cumulus-restaurants',
                avatarFallbackIconName: 'custom:custom51',
                data: [
                    {
                        label: 'Account name',
                        value: 'Cumulus Restaurants'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                groups: [
                    {
                        label: 'Group relationships',
                        name: 'related-accounts-cumulus-restaurants-group-relationships'
                    },
                    {
                        label: 'Related contacts',
                        name: 'related-accounts-cumulus-restaurants-related-contacts'
                    }
                ]
            }
        ],
        hideDefaultActions: true
    },
    // Group
    {
        label: 'Member Relationships',
        name: 'member-relationships2',
        items: [
            {
                label: 'Community Recreation',
                name: 'community-recreation',
                avatarFallbackIconName: 'standard:campaign',
                data: [
                    {
                        label: 'Account name',
                        value: 'Community Recreation'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$1,330'
                    }
                ]
            },
            {
                label: 'Northern Trails Outfitter',
                name: 'northern-trail-outfitter',
                avatarFallbackIconName: 'standard:case',
                data: [
                    {
                        label: 'Account name',
                        value: 'Northern Trails Outfitter'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                // Groups
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'northern-trails-outfitter-group-relationships',
                        avatarSrc:
                            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                        avatarFallbackIconName: 'standard:account'
                    },
                    {
                        label: 'Related Contacts',
                        name: 'northern-trails-outfitter-related-contacts',
                        href: 'https://www.avonni.app/',
                        items: [
                            {
                                label: 'Ines Akwan',
                                name: 'ines-akwan',
                                groups: [
                                    {
                                        label: 'Related Accounts',
                                        name: 'related-accounts-adams-household',
                                        items: [
                                            {
                                                label: 'Lin Akwan',
                                                name: 'lin-akwan'
                                            },
                                            {
                                                label: 'Northern Trails Outfitter',
                                                name: 'related-accounts-adams-household-northern-trails-outfitter',
                                                groups: [
                                                    {
                                                        label: 'Group Relationships',
                                                        name: 'northern-trails-outfitter-group-relationships2',
                                                        items: [
                                                            {
                                                                label: 'Neil Symonds',
                                                                name: 'northern-trails-outfitter-neil-symonds',
                                                                avatarFallbackIconName:
                                                                    'standard:user',
                                                                href: 'https://www.avonni.app/',
                                                                data: [
                                                                    {
                                                                        label: 'Account name',
                                                                        value: 'Neil Symonds'
                                                                    },
                                                                    {
                                                                        label: 'Account phone number',
                                                                        value: '(628) 391-9393'
                                                                    }
                                                                ],
                                                                groups: [
                                                                    {
                                                                        label: 'Related Accounts',
                                                                        name: 'northern-trails-outfitter-neil-symonds-related-accounts',
                                                                        items: [
                                                                            {
                                                                                label: 'Mary James',
                                                                                name: 'mary-james'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        label: 'Related Accounts',
                                                        name: 'northern-trails-outfitter-related-accounts2'
                                                    },
                                                    {
                                                        label: 'Members',
                                                        name: 'northern-trails-outfitter-members'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'northern-trails-outfitter-related-accounts',
                        avatarFallbackIconName: 'standard:account',
                        href: 'https://www.avonni.app/',
                        // Items
                        items: [
                            {
                                label: 'Alpine Group',
                                name: 'alpine-group',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Alpine Group'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$0'
                                    }
                                ]
                            },
                            {
                                label: 'Member Relationships',
                                name: 'member-relationships',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Action Plans',
                                name: 'action-plans',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Adams Household',
                                name: 'adams-household',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Adams Household'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$1,778,911.21'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

const groupsWithNeilSymondsSelection = [
    {
        // Group
        label: 'Group Relationships with a very long label',
        name: 'group-relationships',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        selected: true,
        // Items
        items: [
            {
                label: 'Symonds Household',
                name: 'symonds-household',
                avatarSrc:
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                avatarFallbackIconName: 'standard:user',
                href: 'https://www.avonni.app/',
                data: [
                    {
                        label: 'Account Name',
                        value: 'Symonds Household'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$324,700.00'
                    }
                ],
                selected: true,
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'symonds-household-group-relationships',
                        items: [
                            {
                                label: 'Amine Benachraf',
                                name: 'amine-benachraf',
                                hideDefaultActions: true
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'symonds-household-related-accounts'
                    },
                    {
                        label: 'Members',
                        name: 'symonds-household-members',
                        selected: true,
                        items: [
                            {
                                label: 'Neil Symonds',
                                name: 'neil-symonds',
                                avatarFallbackIconName: 'standard:user',
                                href: 'https://www.avonni.app/',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Neil Symonds'
                                    },
                                    {
                                        label: 'Account phone number',
                                        value: '(628) 391-9393'
                                    }
                                ],
                                activeSelection: true,
                                selected: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    // Group
    {
        label: 'Related Accounts',
        name: 'related-accounts',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        expanded: false,
        // Items
        items: [
            {
                label: 'Cumulus Restaurants',
                name: 'cumulus-restaurants',
                avatarFallbackIconName: 'custom:custom51',
                data: [
                    {
                        label: 'Account name',
                        value: 'Cumulus Restaurants'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                groups: [
                    {
                        label: 'Group relationships',
                        name: 'related-accounts-cumulus-restaurants-group-relationships'
                    },
                    {
                        label: 'Related contacts',
                        name: 'related-accounts-cumulus-restaurants-related-contacts'
                    }
                ]
            }
        ],
        hideDefaultActions: true
    },
    // Group
    {
        label: 'Member Relationships',
        name: 'member-relationships2',
        items: [
            {
                label: 'Community Recreation',
                name: 'community-recreation',
                avatarFallbackIconName: 'standard:campaign',
                data: [
                    {
                        label: 'Account name',
                        value: 'Community Recreation'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$1,330'
                    }
                ]
            },
            {
                label: 'Northern Trails Outfitter',
                name: 'northern-trail-outfitter',
                avatarFallbackIconName: 'standard:case',
                data: [
                    {
                        label: 'Account name',
                        value: 'Northern Trails Outfitter'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                // Groups
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'northern-trails-outfitter-group-relationships',
                        avatarSrc:
                            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                        avatarFallbackIconName: 'standard:account'
                    },
                    {
                        label: 'Related Contacts',
                        name: 'northern-trails-outfitter-related-contacts',
                        href: 'https://www.avonni.app/',
                        items: [
                            {
                                label: 'Ines Akwan',
                                name: 'ines-akwan',
                                groups: [
                                    {
                                        label: 'Related Accounts',
                                        name: 'related-accounts-adams-household',
                                        items: [
                                            {
                                                label: 'Lin Akwan',
                                                name: 'lin-akwan'
                                            },
                                            {
                                                label: 'Northern Trails Outfitter',
                                                name: 'related-accounts-adams-household-northern-trails-outfitter',
                                                groups: [
                                                    {
                                                        label: 'Group Relationships',
                                                        name: 'northern-trails-outfitter-group-relationships2',
                                                        items: [
                                                            {
                                                                label: 'Neil Symonds',
                                                                name: 'northern-trails-outfitter-neil-symonds',
                                                                avatarFallbackIconName:
                                                                    'standard:user',
                                                                href: 'https://www.avonni.app/',
                                                                data: [
                                                                    {
                                                                        label: 'Account name',
                                                                        value: 'Neil Symonds'
                                                                    },
                                                                    {
                                                                        label: 'Account phone number',
                                                                        value: '(628) 391-9393'
                                                                    }
                                                                ],
                                                                groups: [
                                                                    {
                                                                        label: 'Related Accounts',
                                                                        name: 'northern-trails-outfitter-neil-symonds-related-accounts',
                                                                        items: [
                                                                            {
                                                                                label: 'Mary James',
                                                                                name: 'mary-james'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        label: 'Related Accounts',
                                                        name: 'northern-trails-outfitter-related-accounts2'
                                                    },
                                                    {
                                                        label: 'Members',
                                                        name: 'northern-trails-outfitter-members'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'northern-trails-outfitter-related-accounts',
                        avatarFallbackIconName: 'standard:account',
                        href: 'https://www.avonni.app/',
                        // Items
                        items: [
                            {
                                label: 'Alpine Group',
                                name: 'alpine-group',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Alpine Group'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$0'
                                    }
                                ]
                            },
                            {
                                label: 'Member Relationships',
                                name: 'member-relationships',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Action Plans',
                                name: 'action-plans',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Adams Household',
                                name: 'adams-household',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Adams Household'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$1,778,911.21'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

describe('RelationshipGraph', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Relationship graph: Default attributes', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        expect(element.actions).toMatchObject([]);
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarSrc).toBeUndefined();
        expect(element.expandIconName).toBe('utility:chevronright');
        expect(element.groupActions).toMatchObject([]);
        expect(element.groups).toMatchObject([]);
        expect(element.hideItemsCount).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.itemActions).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.selectedItemName).toBeUndefined();
        expect(element.shrinkIconName).toBe('utility:chevrondown');
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Relationship graph: actions', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.actions = actions;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button, index) => {
                expect(button.name).toBe(actions[index].name);
                expect(button.disabled).toBe(actions[index].disabled || false);
                expect(button.value).toBe(actions[index].name);

                if (actions[index].iconName) {
                    const icon = button.querySelector('lightning-icon');
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(icon.iconName).toBe(actions[index].iconName);
                }
            });
        });
    });

    // expand-icon-name
    it('Relationship graph: expandIconName', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.expandIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.expandIconName).toBe('standard:user');
        });
    });

    // group-actions
    it('Relationship graph: groupActions', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.groupActions = actions;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.groupActions).toMatchObject(actions);
        });
    });

    // groups
    it('Relationship graph: groups', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.groups = groups;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.groups).toMatchObject(groups);
        });
    });

    // hide-items-count
    it('Relationship graph: hideItemsCount', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.hideItemsCount = true;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.hideItemsCount).toBeTruthy();
        });
    });

    // href
    it('Relationship graph: href', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('h1 a');
            expect(link).toBeTruthy();
            expect(link.href).toBe('https://www.avonni.app/');
        });
    });

    // item-actions
    it('Relationship graph: itemActions', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.itemActions = actions;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.itemActions).toMatchObject(actions);
        });
    });

    // label
    it('Relationship graph: label', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('h1');
            expect(label.textContent).toBe('A string label');
        });
    });

    // selected-item-name
    // Depends on groups
    it('Relationship graph: selectedItemName', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.groups = groups;
        element.selectedItemName = 'neil-symonds';

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.groups).toMatchObject(groupsWithNeilSymondsSelection);
        });
    });

    // shrink-icon-name
    it('Relationship graph: shrinkIconName', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.shrinkIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.shrinkIconName).toBe('utility:apps');
        });
    });

    // variant
    // Depends on actions
    it('Relationship graph: variant = horizontal', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.variant = 'horizontal';
        element.actions = actions;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            const wrapper =
                element.shadowRoot.querySelector('div:nth-of-type(3)');
            const header = element.shadowRoot.querySelector('div');
            const actionsWrapper =
                element.shadowRoot.querySelector('div:nth-of-type(2)');
            const actionButtons = element.shadowRoot.querySelectorAll('button');
            const line = element.shadowRoot.querySelector(
                '[data-element-id="div-line"]'
            );

            expect(level.variant).toBe('horizontal');
            expect(wrapper.classList).toContain('slds-grid');
            expect(wrapper.classList).toContain('slds-m-left_medium');
            expect(header.classList).not.toContain('slds-box');
            expect(header.classList).not.toContain('group');
            expect(actionsWrapper.classList).not.toContain('actions_vertical');
            expect(actionsWrapper.classList).toContain('slds-p-vertical_small');
            expect(actionsWrapper.classList).not.toContain(
                'slds-p-vertical_large'
            );
            expect(line.classList).toContain('line_vertical');
            expect(line.classList).not.toContain('line_horizontal');

            actionButtons.forEach((button) => {
                expect(button.classList).not.toContain('slds-button_stretch');
                expect(button.classList).toContain('slds-m-bottom_xx-small');
            });
        });
    });

    it('Relationship graph: variant = vertical', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        element.variant = 'vertical';
        element.actions = actions;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            const wrapper =
                element.shadowRoot.querySelector('div:nth-of-type(3)');
            const header = element.shadowRoot.querySelector('div');
            const actionsWrapper =
                element.shadowRoot.querySelector('div:nth-of-type(2)');
            const actionButtons = element.shadowRoot.querySelectorAll('button');
            const line = element.shadowRoot.querySelector(
                '[data-element-id="div-line"]'
            );

            expect(level.variant).toBe('vertical');
            expect(wrapper.classList).not.toContain('slds-grid');
            expect(wrapper.classList).not.toContain('slds-m-left_medium');
            expect(header.classList).toContain('slds-box');
            expect(header.classList).toContain('group');
            expect(actionsWrapper.classList).toContain('actions_vertical');
            expect(actionsWrapper.classList).not.toContain(
                'slds-p-vertical_small'
            );
            expect(actionsWrapper.classList).toContain('slds-p-vertical_large');
            expect(line.classList).not.toContain('line_vertical');
            expect(line.classList).toContain('line_horizontal');

            actionButtons.forEach((button) => {
                expect(button.classList).toContain('slds-button_stretch');
                expect(button.classList).not.toContain(
                    'slds-m-bottom_xx-small'
                );
            });
        });
    });

    /* ----- EVENTS ----- */

    // select
    it('Relationship graph: select event', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('select', handler);

        const level = element.shadowRoot.querySelector(
            'c-primitive-relationship-graph-level'
        );

        level.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: 'neil-symonds'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.name).toBe('neil-symonds');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // actionclick
    it('Relationship graph: actionclick event', () => {
        const element = createElement('data-relationship-graph', {
            is: RelationshipGraph
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        const level = element.shadowRoot.querySelector(
            'c-primitive-relationship-graph-level'
        );

        level.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: 'add-relationship',
                    targetName: 'neil-symonds',
                    itemData: {
                        label: 'A string label',
                        value: 450
                    }
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.name).toBe('add-relationship');
        expect(handler.mock.calls[0][0].detail.targetName).toBe('neil-symonds');
        expect(handler.mock.calls[0][0].detail.itemData).toMatchObject({
            label: 'A string label',
            value: 450
        });
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
