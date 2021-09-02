import { LightningElement, api } from "lwc";

export default class PrimitiveSchedulerHeaderGroup extends LightningElement {
    @api availableDaysOfTheWeek;
    @api availableMonths;
    @api availableTimeFrames;
    @api headers;
    @api scrollLeftOffset;
    @api start;
    @api timeSpan;
    @api visibleInterval;

    connectedCallback() {
        this.dispatchEvent(
            new CustomEvent('privateheaderregister', {
                detail: {
                    callbacks: {
                        scrollHeadersTo: this.scrollHeadersTo.bind(this)
                    }
                }
            })
        );
    }

    scrollHeadersTo() {
        return true;
    }
}
