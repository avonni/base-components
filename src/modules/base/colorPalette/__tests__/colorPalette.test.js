import { createElement } from 'lwc';
import ColorPalette from 'c/colorPalette';

describe('Color Palette', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Color Palette Default attributes', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });

        expect(element.disabled).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.colors).toMatchObject([
            '#e3abec',
            '#c2dbf7',
            '#9fd6ff',
            '#9de7da',
            '#9df0bf',
            '#fff099',
            '#fed49a',
            '#d073df',
            '#86b9f3',
            '#5ebbff',
            '#44d8be',
            '#3be281',
            '#ffe654',
            '#ffb758',
            '#bd35bd',
            '#5778c1',
            '#5ebbff',
            '#00aea9',
            '#3bba4c',
            '#f4bc25',
            '#f99120',
            '#580d8c',
            '#001870',
            '#0a2399',
            '#097476',
            '#096a50',
            '#b67d11',
            '#b85d0d'
        ]);
        expect(element.columns).toBe(7);
        expect(element.tileWidth).toBe(20);
        expect(element.tileHeight).toBe(20);
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Color Palette disabled', () => {
        const element = createElement('base-color-palette', {
            is: ColorPalette
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const a = element.shadowRoot.querySelectorAll('a')
            a.forEach((color) => {
                expect(color.getAttribute('is-disabled')).toBe('true');
            })
            const colors = element.shadowRoot.querySelectorAll('a > span')
            colors.forEach((color) => {
                expect(color.style.backgroundColor).toBe('rgb(221, 219, 218)');
            })
        });
    });
});
