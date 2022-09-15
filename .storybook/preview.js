import '@lwc/synthetic-shadow';
import { withScreenshot } from 'storycap';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const decorators = [withScreenshot];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewport: {
        viewports: INITIAL_VIEWPORTS
    },
    screenshot: {
        // TEMP NOTES
        // to capture storycap;
        // launch storybook than get {storybook url}
        // then launch storycap: npx storycap {storybook url}

        fullPage: false, // at false the component is cropped at the height
        viewport: {
            width: 300,
            height: 150,
            deviceScaleFactor: 2 // at 1 the png is pixelated
        },
        interestingOnly: true,
        omitBackground: true,
        captureBeyondViewport: false // at true the png width is double the content width
    }
};
