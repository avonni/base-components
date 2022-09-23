import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';
import { viewports as viewportList } from 'c/utilsPrivate';

export const decorators = [withScreenshot];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },

     // Accepts 'fullscreen' and 'centered', default is 'padded', required here for screenshots.
     // 'centered' is preferred for screenshots but 'padded' is preferred for development.
    layout: 'centered',

    screenshot: {

         // If false, it crops viewport to dimensions, otherwise it doubles the width and height of the content.
        fullPage: false,

        // The first viewport is used to render all the screenshot before continuing to the next viewport.
        viewports: {
            smaller: viewportList.small,
            medium: viewportList.medium,
            large: viewportList.large
        }
    }
};
