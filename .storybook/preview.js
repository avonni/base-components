import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';

export const decorators = [withScreenshot];
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
    screenshot: {
        fullPage: false,
        viewports: {
            small: { width: 500, height: 300 },
            large: { width: 700, height: 500 }
        }
    }
};
