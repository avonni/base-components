import { createElement } from 'lwc';
import DualListbox from 'c/dualListbox';

describe('DualListbox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        expect(element.addButtonIconName).toBe('utility:right');
        expect(element.addButtonLabel).toBeUndefined();
        expect(element.buttonSize).toBe('medium');
        expect(element.buttonVariant).toBe('border');
        expect(element.disableReordering).toBe(false);
        expect(element.disabled).toBe(false);
        expect(element.downButtonIconName).toBe('utility:down');
        expect(element.downButtonLabel).toBeUndefined();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBe(false);
        expect(element.label).toBeUndefined();
        expect(element.max).toBeUndefined();
        expect(element.min).toBe(0);
        expect(element.messageWhenRangerOverflow).toBeUndefined();
        expect(element.messageWhenRangerUnderflow).toBeUndefined();
        expect(element.messageWhenValueIsMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toBeUndefined();
        expect(element.required).toBe(false);
        expect(element.requiredOptions).toBeUndefined();
        expect(element.searchEngine).toBe(false);
        expect(element.selectedLabel).toBeUndefined();
        expect(element.selectedPlaceholder).toBeUndefined();
        expect(element.showActivityIndicator).toBe(false);
        expect(element.sourceLabel).toBeUndefined();
        expect(element.upButtonIconName).toBe('utility:up');
        expect(element.upButtonLabel).toBeUndefined();
        expect(element.validity).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('standard');
    });
});
