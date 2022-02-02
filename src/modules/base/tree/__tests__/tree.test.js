import { createElement } from 'lwc';
import Tree from '../tree';

const DEFAULT_HEADER = 'Sales Records';

const DEFAULT_ITEMS = [
    {
        label: 'Go to Record 1',
        href: '#record1',
        name: 'node1',
        metatext: 'example of metatext',
        items: [
            {
                label: 'Go to Record 1.1',
                href: '#record1',
                name: 'node1-1',
                items: [
                    {
                        label: 'Go to Record 1.1.1',
                        href: '#record1',
                        name: 'node1-1-1',
                        items: [
                            {
                                label: 'Go to Record 1.1.1.1',
                                href: '#record1',
                                name: 'node1-1-1-1',
                                items: [],
                                expanded: true
                            }
                        ],
                        expanded: true
                    }
                ],
                expanded: true
            },
            {
                label: 'Go to Record 1.2',
                href: '#record1',
                name: 'node1-2',
                items: [
                    {
                        label: 'Go to Record 1.2.1',
                        href: '#record1',
                        name: 'node1-2-1',
                        items: [
                            {
                                label: 'Go to Record 1.2.1.1',
                                href: '#record1',
                                name: 'node1-2-1-1',
                                items: [],
                                expanded: true
                            }
                        ],
                        expanded: true
                    }
                ],
                expanded: true
            }
        ],
        expanded: true
    },
    {
        label: 'Go to Record 2',
        href: '#record2',
        name: 'node2',
        items: [],
        expanded: true
    },
    {
        label: 'Go to Record 3',
        href: '#record3',
        name: 'node3',
        items: [],
        expanded: true
    }
];

describe('Tree', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Editing a label', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchNewLabel = 'aNewLabel';
        let branchKey = '1.1.1';

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('labeledit', {
                        detail: {
                            key: branchKey,
                            newLabel: branchNewLabel
                        }
                    })
                );
            })
            .then(() => {
                let path = branchKey.split('.');
                path.forEach((str, i) => {
                    path[i] = parseInt(str, 10);
                });

                let currentItems = element.items;
                path.forEach((node, i) => {
                    if (i === 0) {
                        currentItems = currentItems[node - 1];
                    } else {
                        currentItems = currentItems.items[node - 1];
                    }
                });
                expect(currentItems.label).toEqual(branchNewLabel);
            });
    });

    it('Editing a name', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchNewName = 'newName';
        let branchKey = '1.1';

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('nameedit', {
                        detail: {
                            key: branchKey,
                            newName: branchNewName
                        }
                    })
                );
            })
            .then(() => {
                let path = branchKey.split('.');
                path.forEach((str, i) => {
                    path[i] = parseInt(str, 10);
                });

                let currentItems = element.items;
                path.forEach((node, i) => {
                    if (i === 0) {
                        currentItems = currentItems[node - 1];
                    } else {
                        currentItems = currentItems.items[node - 1];
                    }
                });
                expect(currentItems.name).toEqual(branchNewName);
            });
    });

    it('Editing the href', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchNewHref = 'newHref';
        let branchKey = '1.1';

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('hrefedit', {
                        detail: {
                            key: branchKey,
                            newHref: branchNewHref
                        }
                    })
                );
            })
            .then(() => {
                let path = branchKey.split('.');
                path.forEach((str, i) => {
                    path[i] = parseInt(str, 10);
                });

                let currentItems = element.items;
                path.forEach((node, i) => {
                    if (i === 0) {
                        currentItems = currentItems[node - 1];
                    } else {
                        currentItems = currentItems.items[node - 1];
                    }
                });
                expect(currentItems.href).toEqual(branchNewHref);
            });
    });

    it('Editing the metatext', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchNewMeta = 'newMeta';
        let branchKey = '1.1';

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('metatextedit', {
                        detail: {
                            key: branchKey,
                            newMetatext: branchNewMeta
                        }
                    })
                );
            })
            .then(() => {
                let path = branchKey.split('.');
                path.forEach((str, i) => {
                    path[i] = parseInt(str, 10);
                });

                let currentItems = element.items;
                path.forEach((node, i) => {
                    if (i === 0) {
                        currentItems = currentItems[node - 1];
                    } else {
                        currentItems = currentItems.items[node - 1];
                    }
                });
                expect(currentItems.metatext).toEqual(branchNewMeta);
            });
    });

    it('Editing the expanded property', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchNewExpanded = true;
        let branchKey = '1.1.1';

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('expandededit', {
                        detail: {
                            key: branchKey,
                            newExpanded: branchNewExpanded
                        }
                    })
                );
            })
            .then(() => {
                let path = branchKey.split('.');
                path.forEach((str, i) => {
                    path[i] = parseInt(str, 10);
                });

                let currentItems = element.items;
                path.forEach((node, i) => {
                    if (i === 0) {
                        currentItems = currentItems[node - 1];
                    } else {
                        currentItems = currentItems.items[node - 1];
                    }
                });
                expect(currentItems.expanded).toEqual(branchNewExpanded);
            });
    });

    it('Editing the disabled property', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchNewDisabled = true;
        let branchKey = '1.1.1';

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('disablededit', {
                        detail: {
                            key: branchKey,
                            newDisabled: branchNewDisabled
                        }
                    })
                );
            })
            .then(() => {
                let path = branchKey.split('.');
                path.forEach((str, i) => {
                    path[i] = parseInt(str, 10);
                });

                let currentItems = element.items;
                path.forEach((node, i) => {
                    if (i === 0) {
                        currentItems = currentItems[node - 1];
                    } else {
                        currentItems = currentItems.items[node - 1];
                    }
                });
                expect(currentItems.disabled).toEqual(branchNewDisabled);
            });
    });

    it('Adding a branch', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchKey = '1';
        let path = branchKey.split('.');
        path.forEach((str, i) => {
            path[i] = parseInt(str, 10);
        });
        let currentItems = element.items;
        path.forEach((node, i) => {
            if (i === 0) {
                currentItems = currentItems[node - 1];
            } else {
                currentItems = currentItems.items[node - 1];
            }
        });
        let oldNBranches = currentItems.items.length;

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('addbranch', {
                        detail: {
                            key: branchKey
                        }
                    })
                );
            })
            .then(() => {
                expect(currentItems.items.length).toEqual(oldNBranches + 1);
            });
    });

    it('duplicating a branch', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchKey = '1.2';
        let path = branchKey.split('.');
        path.pop();
        path.forEach((str, i) => {
            path[i] = parseInt(str, 10);
        });
        let currentItems = element.items;
        path.forEach((node, i) => {
            if (i === 0) {
                currentItems = currentItems[node - 1];
            } else {
                currentItems = currentItems.items[node - 1];
            }
        });
        let oldNBranches = currentItems.items.length;

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('branchaction', {
                        detail: {
                            action: 'duplicate',
                            key: branchKey
                        }
                    })
                );
            })
            .then(() => {
                expect(currentItems.items.length).toEqual(oldNBranches + 1);
            });
    });

    it('deleting a branch', () => {
        const element = createElement('avonni-base-tree', {
            is: Tree
        });
        document.body.appendChild(element);

        element.header = DEFAULT_HEADER;
        element.items = DEFAULT_ITEMS;

        let branchKey = '1.2';
        let path = branchKey.split('.');
        path.pop();
        path.forEach((str, i) => {
            path[i] = parseInt(str, 10);
        });
        let currentItems = element.items;
        path.forEach((node, i) => {
            if (i === 0) {
                currentItems = currentItems[node - 1];
            } else {
                currentItems = currentItems.items[node - 1];
            }
        });
        let oldNBranches = currentItems.items.length;

        return Promise.resolve()
            .then(() => {
                element.shadowRoot.dispatchEvent(
                    new CustomEvent('branchaction', {
                        detail: {
                            action: 'delete',
                            key: branchKey
                        }
                    })
                );
            })
            .then(() => {
                expect(currentItems.items.length).toEqual(oldNBranches - 1);
            });
    });
});
