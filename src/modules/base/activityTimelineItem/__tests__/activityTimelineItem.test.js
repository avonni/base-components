import { createElement } from 'lwc';
import ActivityTimelineItem from 'c/activityTimelineItem';

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
        expect(element.iconName).toBeUndefined();
        expect(element.collapsible).toBeFalsy();
        expect(element.closed).toBeFalsy();
        expect(element.groupBy).toBe('week');
        expect(element.items).toMatchObject([]);
        expect(element.actions).toMatchObject([]);
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
                '.slds-section__title'
            );
            expect(title.textContent).toBe('This is an title text');
        });
    });
});
