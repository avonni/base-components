import { createElement } from 'lwc';
import ActivityTimelineItem from 'c/activityTimelineItem';

const FIELDS = [
    {
        label: 'Name',
        value: 'Charlie Gomez',
        type: 'url',
        typeAttributes: {
            label: 'Charlie Gomez'
        }
    },
    {
        label: 'Related To',
        value: 'Tesla Cloudhub + Anypoint Connectors',
        type: 'url',
        typeAttributes: {
            label: 'Tesla Cloudhub + Anypoint Connectors'
        }
    },
    {
        label: 'Description',
        value:
            'Need to finalize proposals and brand details before the meeting',
        type: 'text'
    }
]

describe('ActivityTimeline', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-activity-timeline-item', {
            is: ActivityTimelineItem
        });

        expect(element.title).toBeUndefined();
        expect(element.description).toBeUndefined();
        expect(element.datetimeValue).toBeUndefined();
        expect(element.href).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.fields).toMatchObject([]);
        expect(element.hasCheckbox).toBeFalsy();
        expect(element.hasError).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.closed).toBeFalsy();
        expect(element.buttonLabel).toBeUndefined();
        expect(element.buttonIconName).toBeUndefined();
        expect(element.buttonIconPosition).toBe('left');
        expect(element.buttonVariant).toBe('neutral');
        expect(element.buttonDisabled).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Activity timeline item title', () => {
        const element = createElement('base-activity-timeline-item', {
            is: ActivityTimelineItem
        });
        document.body.appendChild(element);

        element.title = 'This is an title text';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                'h3'
            );
            expect(title.textContent).toBe('This is an title text');
        });
    });

    // description
    it('Activity timeline item description', () => {
        const element = createElement('base-activity-timeline-item', {
            is: ActivityTimelineItem
        });
        document.body.appendChild(element);

        element.description = 'This is an description text';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector(
                'p'
            );
            expect(description.textContent).toBe('This is an description text');
        });
    });

    // datetime value
    it('Activity timeline item datetimeValue', () => {
        const element = createElement('base-activity-timeline-item', {
            is: ActivityTimelineItem
        });
        document.body.appendChild(element);

        element.datetimeValue = 1621605600000;

        return Promise.resolve().then(() => {
            const date = element.shadowRoot.querySelector(
                'lightning-formatted-date-time'
            );
            expect(date.value).toBe(1621605600000);
        });
    });

    // href
    it('Activity timeline item href', () => {
        const element = createElement('base-activity-timeline-item', {
            is: ActivityTimelineItem
        });
        document.body.appendChild(element);

        element.title = 'This is an title link text';
        element.href = 'salesforce.com'

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                'a'
            );
            expect(link.href).toContain('salesforce.com');
            expect(link.textContent).toBe('This is an title link text');
        });
    });

    // icon name
    it('Activity timeline item icon name', () => {
        const element = createElement('base-activity-timeline-item', {
            is: ActivityTimelineItem
        });
        document.body.appendChild(element);

        element.iconName = 'standard:case';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '.slds-timeline__icon'
            );
            expect(icon.iconName).toBe('standard:case');
        });
    });

    // fields
    it('Activity timeline item fields', () => {
        const element = createElement('base-activity-timeline-item', {
            is: ActivityTimelineItem
        });
        document.body.appendChild(element);

        element.iconName = 'standard:case';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '.slds-timeline__icon'
            );
            expect(icon.iconName).toBe('standard:case');
        });
    });
});
