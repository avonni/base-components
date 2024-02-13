import { ButtonMenuIllustration } from '../__examples__/buttonMenuIllustration';
import { ButtonMenuBase } from '../__examples__/buttonMenuBase';
import ButtonMenuSizesComponent from './sizes/sizes';

export default {
    title: 'Example/Button Menu',
    argTypes: {
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the button menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text for the button menu.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show Menu' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: "If present, the popover can't be opened by users.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        draftAlternativeText: {
            name: 'draft-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Describes the reason for showing the draft indicator. This is required when is-draft is true.',
            table: {
                type: { summary: 'string' }
            }
        },
        hideDownArrow: {
            name: 'hide-down-arrow',
            control: {
                type: 'boolean'
            },
            description:
                'If present the additional down arrow displayed on the right of the custom icon is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'. If an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:down' },
                category: 'icon'
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium or large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
                category: 'icon'
            }
        },
        iconSrc: {
            name: 'icon-src',
            control: {
                type: 'text'
            },
            description: 'URL to set for the image attribute.',
            table: {
                type: { summary: 'string' },
                category: 'icon'
            }
        },
        isDraft: {
            name: 'is-draft',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menu trigger shows a draft indicator.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the popover is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Popover'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the popover is in the loading state.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
            }
        },
        menuAlignment: {
            name: 'menu-alignment',
            control: {
                type: 'select'
            },
            options: [
                'auto',
                'left',
                'center',
                'right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
            description:
                'Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        nubbin: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'Displays title text when the mouse moves over the button menu.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
            }
        },
        tooltip: {
            control: {
                type: 'text'
            },
            description:
                'Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'The value for the button element. This value is optional and can be used when submitting a form.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'bare-inverse',
                'base',
                'border',
                'border-filled',
                'border-inverse',
                'brand',
                'brand-outline',
                'container',
                'destructive',
                'destructive-text',
                'inverse',
                'neutral',
                'success'
            ],
            description:
                'The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled, border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral and success.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        alternativeText: 'Show Menu',
        disabled: false,
        hideDownArrow: false,
        iconName: 'utility:down',
        iconSize: 'medium',
        isDraft: false,
        isLoading: false,
        loadingStateAlternativeText: 'Loading',
        menuAlignment: 'left',
        nubbin: false,
        variant: 'border'
    }
};

const Template = (args) => ButtonMenuBase(args);
const TemplateIllustration = (args) => ButtonMenuIllustration(args);
const darkBackground = {
    backgrounds: {
        default: 'dark'
    }
};
export const Bare = Template.bind({});
Bare.args = {
    variant: 'bare'
};

export const BareWithLabel = Template.bind({});
BareWithLabel.args = {
    label: 'Menu',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.parameters = darkBackground;
BareInverse.args = {
    variant: 'bare-inverse'
};

export const BareInverseWithLabel = Template.bind({});
BareInverseWithLabel.parameters = darkBackground;
BareInverseWithLabel.args = {
    label: 'Menu',
    variant: 'bare-inverse'
};

export const BaseWithImage = Template.bind({});
BaseWithImage.args = {
    iconSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    variant: 'base'
};

export const BaseWithImageLabel = Template.bind({});
BaseWithImageLabel.args = {
    iconSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    label: 'Menu',
    variant: 'base'
};

export const Border = Template.bind({});
Border.args = {
    variant: 'border'
};

export const BorderWithLabel = Template.bind({});
BorderWithLabel.args = {
    label: 'Menu',
    variant: 'border'
};

export const BorderInverse = Template.bind({});
BorderInverse.parameters = darkBackground;
BorderInverse.args = {
    variant: 'border-inverse'
};

export const BorderInverseWithLabel = Template.bind({});
BorderInverseWithLabel.parameters = darkBackground;
BorderInverseWithLabel.args = {
    label: 'Menu',
    variant: 'border-inverse'
};

export const Brand = Template.bind({});
Brand.args = {
    variant: 'brand'
};

export const BrandWithLabel = Template.bind({});
BrandWithLabel.args = {
    label: 'Menu',
    variant: 'brand'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    variant: 'brand-outline'
};

export const BrandOutlineWithLabel = Template.bind({});
BrandOutlineWithLabel.args = {
    label: 'Menu',
    variant: 'brand-outline'
};

export const ContainerWithImage = Template.bind({});
ContainerWithImage.args = {
    iconSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    variant: 'container'
};

export const ContainerWithLabel = Template.bind({});
ContainerWithLabel.args = {
    label: 'Menu',
    variant: 'container'
};

export const Destructive = Template.bind({});
Destructive.args = {
    iconName: 'utility:error',
    variant: 'destructive'
};

export const DestructiveWithLabel = Template.bind({});
DestructiveWithLabel.args = {
    label: 'Menu',
    variant: 'destructive'
};

export const DestructiveTextHideDownArrow = Template.bind({});
DestructiveTextHideDownArrow.args = {
    hideDownArrow: true,
    iconName: 'utility:error',
    variant: 'destructive-text'
};

export const DestructiveTextWithLabel = Template.bind({});
DestructiveTextWithLabel.args = {
    label: 'Menu',
    variant: 'destructive-text'
};

export const InverseXSmall = Template.bind({});
InverseXSmall.parameters = darkBackground;
InverseXSmall.args = {
    iconSize: 'x-small',
    variant: 'inverse'
};

export const InverseWithLabel = Template.bind({});
InverseWithLabel.parameters = darkBackground;
InverseWithLabel.args = {
    variant: 'inverse',
    label: 'Menu'
};

export const NeutralMedium = Template.bind({});
NeutralMedium.args = {
    iconSize: 'medium',
    variant: 'neutral'
};

export const NeutralWithLabel = Template.bind({});
NeutralWithLabel.args = {
    variant: 'neutral',
    label: 'Menu'
};

export const SuccessLarge = Template.bind({});
SuccessLarge.args = {
    iconSize: 'large',
    variant: 'success'
};

export const SuccessWithLabel = Template.bind({});
SuccessWithLabel.args = {
    variant: 'success',
    label: 'Menu'
};
export const Illustration = TemplateIllustration.bind({});

/**
 * Example with different combinations of sizes, fallback icon types.
 * Allows to quickly scan if there is any problems.
 */
customElements.define(
    'ac-base-button-menu-sizes',
    ButtonMenuSizesComponent.CustomElementConstructor
);
const ButtonMenuSizes = ({ label, variant }) => {
    const element = document.createElement('ac-base-button-menu-sizes');
    element.variant = variant;
    element.label = label;
    return element;
};
const TemplateSizes = (args) => ButtonMenuSizes(args);
export const Sizes = TemplateSizes.bind({});
