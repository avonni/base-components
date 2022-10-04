import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';
import { viewports as viewportList } from 'c/utilsPrivate';

export const decorators = [withScreenshot];
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    // layout: 'centered', // uncomment before running storycap
    screenshot: {
        fullPage: false,
        // viewports: { ...viewportList }
    }
};
