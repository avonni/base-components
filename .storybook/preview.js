import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';

export const decorators = [withScreenshot];
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',

    // These settings fail. It keeps using default viewport [ '800x600' ].
    // screenshot: {
    //     viewports: {
    //         small: {
    //             width: 300,
    //             height: 150,
    //             deviceScaleFactor: 2
    //         },
    //         medium: {
    //             width: 450,
    //             height: 225,
    //             deviceScaleFactor: 2
    //         },
    //         large: {
    //             width: 600,
    //             height: 300,
    //             deviceScaleFactor: 2
    //         }
    //     },
    //     omitBackground: true,
    //     fullPage: false
    // }
};
