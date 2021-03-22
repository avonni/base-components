import { Slides } from '../__examples__/slides';

export default {
    title: 'Example/Slides',
    argTypes: {
        slidesPerView: {
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: '1' }
            }
        },
        spaceBetween: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: '0',
            table: {
                defaultValue: { summary: '0' }
            }
        },
        autoplayDelay: {
            control: {
                type: 'number',
                min: 0
            }
        },
        initialSlide: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: '0',
            table: {
                defaultValue: { summary: '0' }
            }
        },
        speed: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 300,
            table: {
                defaultValue: { summary: '300' }
            }
        },
        buttonPreviousIconName: {
            control: {
                type: 'text'
            },
            defaultValue: 'utility:left',
            table: {
                defaultValue: { summary: 'utility:left' }
            }
        },
        buttonPreviousLabel: {
            control: {
                type: 'text'
            }
        },
        buttonNextIconName: {
            control: {
                type: 'text'
            },
            defaultValue: 'utility:right',
            table: {
                defaultValue: { summary: 'utility:right' }
            }
        },
        buttonNextLabel: {
            control: {
                type: 'text'
            }
        },
        fractionPrefixLabel: {
            control: {
                type: 'text'
            }
        },
        fractionLabel: {
            control: {
                type: 'text'
            },
            defaultValue: '/',
            table: {
                defaultValue: { summary: '/' }
            }
        },
        width: {
            control: {
                type: 'text'
            }
        },
        height: {
            control: {
                type: 'text'
            }
        },
        coverflowSlideWidth: {
            control: {
                type: 'text'
            }
        },
        coverflowSlideHeight: {
            control: {
                type: 'text'
            }
        },
        direction: {
            control: {
                type: 'select',
                options: ['horizontal', 'vertical']
            },
            defaultValue: 'horizontal',
            table: {
                defaultValue: { summary: 'horizontal' }
            }
        },
        effect: {
            control: {
                type: 'select',
                options: ['slide', 'fade', 'cube', 'coverflow', 'flip', 'none']
            },
            defaultValue: 'slide',
            table: {
                defaultValue: { summary: 'slide' }
            }
        },
        buttonPreviousIconPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        buttonPreviousVariant: {
            control: {
                type: 'select',
                options: [
                    'bare',
                    'neutral',
                    'brand',
                    'brand-outline',
                    'inverse',
                    'destructive',
                    'destructive-text',
                    'success'
                ]
            },
            defaultValue: 'neutral',
            table: {
                defaultValue: { summary: 'neutral' }
            }
        },
        buttonNextIconPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
            defaultValue: 'right',
            table: {
                defaultValue: { summary: 'right' }
            }
        },
        buttonNextVariant: {
            control: {
                type: 'select',
                options: [
                    'bare',
                    'neutral',
                    'brand',
                    'brand-outline',
                    'inverse',
                    'destructive',
                    'destructive-text',
                    'success'
                ]
            },
            defaultValue: 'neutral',
            table: {
                defaultValue: { summary: 'neutral' }
            }
        },
        buttonPosition: {
            control: {
                type: 'select',
                options: ['top', 'middle', 'bottom']
            },
            defaultValue: 'middle',
            table: {
                defaultValue: { summary: 'middle' }
            }
        },
        indicatorType: {
            control: {
                type: 'select',
                options: [
                    'progress-bar',
                    'bullets',
                    'dynamic-bullets',
                    'fractions'
                ]
            },
            defaultValue: 'bullets',
            table: {
                defaultValue: { summary: 'bullets' }
            }
        },
        indicatorPosition: {
            control: {
                type: 'select',
                options: [
                    'top-left',
                    'bottom-left',
                    'top-right',
                    'bottom-right',
                    'top-center',
                    'bottom-center'
                ]
            },
            defaultValue: 'bottom-center',
            table: {
                defaultValue: { summary: 'bottom-center' }
            }
        },
        navigation: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        buttonInner: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        indicators: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        indicatorInner: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        loop: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => Slides(args);

export const EffectSlide = Template.bind({});
EffectSlide.args = {
    effect: 'slide',
    height: '300px'
};

export const EffectFade = Template.bind({});
EffectFade.args = {
    effect: 'fade',
    height: '300px'
};

export const EffectCube = Template.bind({});
EffectCube.args = {
    effect: 'cube',
    height: '300px',
    width: '300px'
};

export const EffectCoverflow = Template.bind({});
EffectCoverflow.args = {
    effect: 'coverflow',
    height: '320px',
    coverflowSlideHeight: '300',
    coverflowSlideWidth: '300'
};

export const EffectFlip = Template.bind({});
EffectFlip.args = {
    effect: 'flip',
    height: '300px',
    width: '300px'
};

export const EffectNone = Template.bind({});
EffectNone.args = {
    effect: 'none',
    height: '300px'
};
