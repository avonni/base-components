import { LightningElement } from 'lwc';

export default class VisualPickerBotStory extends LightningElement {
    items = [
        {
            value: 'scratch',
            figure: {
                title: 'Start from Scratch',
                titlePosition: 'center',
                description: 'Get started fast with included system dialogs.',
                descriptionPosition: 'center',
                imgSrc: 'https://miro.medium.com/max/400/1*Y1klwgS90g788BD8gf3aLw.png'
            }
        },
        {
            value: 'template',
            figure: {
                title: 'Start from a Template',
                titlePosition: 'center',
                description: 'Automate common use cases for Sales & Service.',
                descriptionPosition: 'center',
                imgSrc: 'https://miro.medium.com/max/400/1*Y1klwgS90g788BD8gf3aLw.png'
            }
        },
        {
            value: 'sales',
            figure: {
                title: 'Sales Prospecting Bot',
                titlePosition: 'center',
                description: 'Gather prospects and add them to sales cadences.',
                descriptionPosition: 'center',
                imgSrc: 'https://miro.medium.com/max/400/1*Y1klwgS90g788BD8gf3aLw.png'
            }
        },
        {
            value: 'marketing',
            figure: {
                title: 'Marketing Prospecting Bot',
                titlePosition: 'center',
                description:
                    'Gather prospects and add them to marketing cadences.',
                descriptionPosition: 'center',
                imgSrc: 'https://miro.medium.com/max/400/1*Y1klwgS90g788BD8gf3aLw.png'
            }
        },
        {
            value: 'finance',
            figure: {
                title: 'Finance Prospecting Bot',
                titlePosition: 'center',
                description:
                    'Gather prospects and add them to finance cadences.',
                descriptionPosition: 'center',
                imgSrc: 'https://miro.medium.com/max/400/1*Y1klwgS90g788BD8gf3aLw.png'
            }
        }
    ];
}
