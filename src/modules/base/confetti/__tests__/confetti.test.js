import { createElement } from 'lwc';
import Confetti from 'c/confetti';

describe('Confetti', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Confetti Default attributes', () => {
        const element = createElement('base-confetti', {
            is: Confetti
        });

        expect(element.variant).toBe('base');
        expect(element.name).toBeUndefined();
        expect(element.colors).toMatchObject([
            '#529EE0',
            '#F0E442',
            '#FFB03B',
            '#E16032',
            '#4FD2D2',
            '#006699',
            '#E287B2'
        ]);
        expect(element.originX).toBe(0.5);
        expect(element.originY).toBe(0.5);
        expect(element.zIndex).toBe(100);
    });
});
