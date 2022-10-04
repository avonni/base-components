import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';

export const decorators = [withScreenshot];
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' }
};
