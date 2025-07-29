import { Card } from '../__examples__/card';
import { CardCenterBottom } from '../__examples__/centerBottom';
import { CardTopMedia } from '../__examples__/cardTopMedia';

export default {
    title: 'Example/Card',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header.',
            table: {
                type: { summary: 'string' }
            }
        },
        mediaAlternativeText: {
            control: {
                type: 'text'
            },
            description: 'The alternative text for the media.',
            table: {
                type: { summary: 'string' },
                category: 'media',
                defaultValue: {
                    summary: 'Card media'
                }
            }
        },
        mediaSrc: {
            control: {
                type: 'text'
            },
            description: 'Media link of the card image.',
            table: {
                type: { summary: 'string' },
                category: 'media'
            }
        },
        mediaPosition: {
            control: {
                type: 'select'
            },
            options: [
                'left',
                'right',
                'top',
                'bottom',
                'center',
                'background',
                'overlay'
            ],
            description: 'Media position.',
            table: {
                type: { summary: 'string' },
                category: 'media',
                defaultValue: { summary: 'top' }
            }
        },
        iconName: {
            control: {
                type: 'text'
            },
            description: 'Media link of the card image.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        mediaAlternativeText: 'Card media',
        mediaPosition: 'top'
    }
};

const BaseTemplate = (args) => Card(args);
const CenterBottomTemplate = (args) => CardCenterBottom(args);
const TopMediaTemplate = (args) => CardTopMedia(args);

export const Base = BaseTemplate.bind({});
Base.args = {
    title: 'Card Title',
    iconName: 'custom:custom102'
};

export const MediaTop = TopMediaTemplate.bind({});
MediaTop.args = {
    title: 'Real-time Collaborative Docs',
    iconName: 'standard:custom_notification',
    mediaSrc:
        'https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg'
};

export const MediaLeft = BaseTemplate.bind({});
MediaLeft.args = {
    title: 'Card Title',
    iconName: 'standard:article',
    mediaPosition: 'left',
    mediaSrc:
        'https://images.unsplash.com/photo-1560141343-966cb5212777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=80'
};

export const MediaRight = BaseTemplate.bind({});
MediaRight.args = {
    title: 'Card Title',
    iconName: 'standard:article',
    mediaPosition: 'right',
    mediaSrc:
        'https://images.unsplash.com/photo-1560141343-966cb5212777?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=180&q=80'
};

export const MediaCenter = CenterBottomTemplate.bind({});
MediaCenter.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'center',
    mediaSrc:
        'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaBottom = CenterBottomTemplate.bind({});
MediaBottom.args = {
    title: 'Card Title',
    iconName: 'custom:custom102',
    mediaPosition: 'bottom',
    mediaSrc:
        'https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg'
};

export const MediaBackground = BaseTemplate.bind({});
MediaBackground.args = {
    title: 'Salesforce Tower',
    iconName: 'standard:store_group',
    mediaPosition: 'background',
    mediaSrc:
        'https://images.unsplash.com/photo-1556038024-07f7daf0b84f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=450&q=80'
};

export const MediaOverlay = BaseTemplate.bind({});
MediaOverlay.args = {
    title: 'Salesforce Tower',
    iconName: 'standard:store_group',
    mediaPosition: 'overlay',
    mediaSrc:
        'https://images.unsplash.com/photo-1556038024-07f7daf0b84f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=450&q=80'
};
