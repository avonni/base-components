import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';
import { viewports } from 'c/utilsPrivate';

export const decorators = [withScreenshot];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    screenshot: {
        fullPage: false, // at false, it crops viewport to dimensions
        viewport: viewports.default,
    }
};
