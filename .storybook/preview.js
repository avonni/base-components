import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';
import { viewports as viewportList } from 'c/utilsPrivate';

export const decorators = [withScreenshot];
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    screenshot: {
        fullPage: false,
        viewports: {
            smaller: viewportList.small,
            medium: viewportList.medium,
            large: viewportList.large
        }
    }
};
