import { Illustration } from '../__examples__/illustration';
import { IllustrationWithSlot } from '../__examples__/illustrationWithSlot';

export default {
    title: 'Example/Illustration',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            description:
                'The size of the illustration. Valid values include small and large.',
            options: ['small', 'large'],
            table: {
                defaultValue: { summary: 'small' },
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            description:
                'Illustration name of the illustration. Valid values include text-only, going-camping, maintenance, desert, open-road, no-access, no-connection, not-available-in-lightning, page-not-available, walkthrough-not-available, fishing-deals, lake-mountain, no-events, no-task, setup, gone-fishing, no-access-2, no-content, no-preview, preview, research, access-deleted, access-limit, access-request, cart-noitems, error-appconnection, error-connectionissue, error-recoverable, error-unrecoverable, maintenance-planned, maintenance-unplanned, noresults-filter, noresults-search, noresults-unknown, success-assigned, success-new, success-selfassigned',
            options: [
                'text-only',
                'desert',
                'fishing-deals',
                'going-camping',
                'gone_fishing',
                'gone-fishing',
                'lake-mountain',
                'maintenance',
                'no-access-2',
                'no-access',
                'no-connection',
                'no-content',
                'no-events-2',
                'no-events',
                'no-preview',
                'no-task-2',
                'no-task',
                'not-available-in-lightning',
                'open-road',
                'page-not-available',
                'preview',
                'research',
                'setup',
                'walkthrough-not-available',
                // new variants
                'access-deleted',
                'access-limit',
                'access-request',
                'cart-noitems',
                'error-appconnection',
                'error-connectionissue',
                'error-recoverable',
                'error-unrecoverable',
                'maintenance-planned',
                'maintenance-unplanned',
                'noresults-filter',
                'noresults-search',
                'noresults-unknown',
                'success-assigned',
                'success-new',
                'success-selfassigned'
            ],
            table: {
                defaultValue: { summary: 'text-only' },
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description:
                "Assistive text that describes the illustration. Provide this text for assistive devices if the meaning of the surrounding content isn't sufficient.",
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        size: 'small',
        variant: 'text-only'
    }
};

const Template = (args) => Illustration(args);
const TemplateWithSlots = (args) => IllustrationWithSlot(args);

export const SmallSize = Template.bind({});
SmallSize.args = {
    title: 'Going camping',
    variant: 'going-camping'
};

export const LargeSize = Template.bind({});
LargeSize.args = {
    title: 'Going camping',
    size: 'large',
    variant: 'going-camping'
};

export const WithSlot = TemplateWithSlots.bind({});
WithSlot.args = {
    title: 'Going camping',
    size: 'large',
    variant: 'going-camping'
};

export const VariantTextOnly = TemplateWithSlots.bind({});
VariantTextOnly.args = {
    title: 'Text only',
    size: 'large',
    variant: 'text-only'
};

export const VariantGoingCamping = TemplateWithSlots.bind({});
VariantGoingCamping.args = {
    title: 'Going camping',
    size: 'large',
    variant: 'going-camping'
};

export const VariantGoneFishing = TemplateWithSlots.bind({});
VariantGoneFishing.args = {
    title: 'Gone Fishing',
    size: 'large',
    variant: 'gone_fishing'
};

export const VariantMaintenance = TemplateWithSlots.bind({});
VariantMaintenance.args = {
    title: 'Maintenance',
    size: 'large',
    variant: 'maintenance'
};

export const VariantDesert = TemplateWithSlots.bind({});
VariantDesert.args = {
    title: 'Desert',
    size: 'large',
    variant: 'desert'
};

export const VariantOpenRoad = TemplateWithSlots.bind({});
VariantOpenRoad.args = {
    title: 'Open Road',
    size: 'large',
    variant: 'open-road'
};

export const VariantNoAccess = TemplateWithSlots.bind({});
VariantNoAccess.args = {
    title: 'No access',
    size: 'large',
    variant: 'no-access'
};

export const VariantNoAccess2 = TemplateWithSlots.bind({});
VariantNoAccess2.args = {
    title: 'No access 2',
    size: 'large',
    variant: 'no-access-2'
};

export const VariantNoConnection = TemplateWithSlots.bind({});
VariantNoConnection.args = {
    title: 'No connection',
    size: 'large',
    variant: 'no-connection'
};

export const VariantNotAvailableInLightning = TemplateWithSlots.bind({});
VariantNotAvailableInLightning.args = {
    title: 'Not Available In Lightning',
    size: 'large',
    variant: 'not-available-in-lightning'
};

export const VariantPageNotAvailable = TemplateWithSlots.bind({});
VariantPageNotAvailable.args = {
    title: 'Variant Page Not Available',
    size: 'large',
    variant: 'page-not-available'
};

export const VariantWalkthroughNotAvailable = TemplateWithSlots.bind({});
VariantWalkthroughNotAvailable.args = {
    title: 'Walkthrough Not Available',
    size: 'large',
    variant: 'walkthrough-not-available'
};

export const VariantFishingDeals = TemplateWithSlots.bind({});
VariantFishingDeals.args = {
    title: 'Fishing Deals',
    size: 'large',
    variant: 'fishing-deals'
};

export const VariantLakeMountain = TemplateWithSlots.bind({});
VariantLakeMountain.args = {
    title: 'Lake Mountain',
    size: 'large',
    variant: 'lake-mountain'
};

export const VariantNoEvents = TemplateWithSlots.bind({});
VariantNoEvents.args = {
    title: 'No Events',
    size: 'large',
    variant: 'no-events'
};

export const VariantNoEvents2 = TemplateWithSlots.bind({});
VariantNoEvents2.args = {
    title: 'No Events 2',
    size: 'large',
    variant: 'no-events-2'
};

export const VariantNoTask = TemplateWithSlots.bind({});
VariantNoTask.args = {
    title: 'No Task',
    size: 'large',
    variant: 'no-task'
};

export const VariantNoTask2 = TemplateWithSlots.bind({});
VariantNoTask2.args = {
    title: 'No Task 2',
    size: 'large',
    variant: 'no-task-2'
};

export const VariantSetup = TemplateWithSlots.bind({});
VariantSetup.args = {
    title: 'Setup',
    size: 'large',
    variant: 'setup'
};

export const VariantNoContent = TemplateWithSlots.bind({});
VariantNoContent.args = {
    title: 'No Content',
    size: 'large',
    variant: 'no-content'
};

export const VariantNoPreview = TemplateWithSlots.bind({});
VariantNoPreview.args = {
    title: 'No Preview',
    size: 'large',
    variant: 'no-preview'
};

export const VariantPreview = TemplateWithSlots.bind({});
VariantPreview.args = {
    title: 'Preview',
    size: 'large',
    variant: 'preview'
};

export const VariantResearch = TemplateWithSlots.bind({});
VariantResearch.args = {
    title: 'Research',
    size: 'large',
    variant: 'research'
};

export const VariantAccessDeleted = TemplateWithSlots.bind({});
VariantAccessDeleted.args = {
    title: 'Access Deleted',
    size: 'large',
    variant: 'access-deleted'
};

export const VariantAccessLimit = TemplateWithSlots.bind({});
VariantAccessLimit.args = {
    title: 'Access Limit',
    size: 'large',
    variant: 'access-limit'
};

export const VariantAccessRequest = TemplateWithSlots.bind({});
VariantAccessRequest.args = {
    title: 'Access Request',
    size: 'large',
    variant: 'access-request'
};

export const VariantCartNoItems = TemplateWithSlots.bind({});
VariantCartNoItems.args = {
    title: 'Cart No Items',
    size: 'large',
    variant: 'cart-noitems'
};

export const VariantErrorAppConnection = TemplateWithSlots.bind({});
VariantErrorAppConnection.args = {
    title: 'Error App Connection',
    size: 'large',
    variant: 'error-appconnection'
};

export const VariantErrorConnectionIssue = TemplateWithSlots.bind({});
VariantErrorConnectionIssue.args = {
    title: 'Error Connection Issue',
    size: 'large',
    variant: 'error-connectionissue'
};

export const VariantErrorRecoverable = TemplateWithSlots.bind({});
VariantErrorRecoverable.args = {
    title: 'Error Recoverable',
    size: 'large',
    variant: 'error-recoverable'
};

export const VariantErrorUnrecoverable = TemplateWithSlots.bind({});
VariantErrorUnrecoverable.args = {
    title: 'Error Unrecoverable',
    size: 'large',
    variant: 'error-unrecoverable'
};

export const VariantMaintenancePlanned = TemplateWithSlots.bind({});
VariantMaintenancePlanned.args = {
    title: 'Maintenance Planned',
    size: 'large',
    variant: 'maintenance-planned'
};

export const VariantMaintenanceUnplanned = TemplateWithSlots.bind({});
VariantMaintenanceUnplanned.args = {
    title: 'Maintenance Unplanned',
    size: 'large',
    variant: 'maintenance-unplanned'
};

export const VariantNoResultsFilter = TemplateWithSlots.bind({});
VariantNoResultsFilter.args = {
    title: 'No Results Filter',
    size: 'large',
    variant: 'noresults-filter'
};

export const VariantNoResultsSearch = TemplateWithSlots.bind({});
VariantNoResultsSearch.args = {
    title: 'No Results Search',
    size: 'large',
    variant: 'noresults-search'
};

export const VariantNoResultsUnknown = TemplateWithSlots.bind({});
VariantNoResultsUnknown.args = {
    title: 'No Results Unknown',
    size: 'large',
    variant: 'noresults-unknown'
};

export const VariantSuccessAssigned = TemplateWithSlots.bind({});
VariantSuccessAssigned.args = {
    title: 'Success Assigned',
    size: 'large',
    variant: 'success-assigned'
};

export const VariantSuccessNew = TemplateWithSlots.bind({});
VariantSuccessNew.args = {
    title: 'Success New',
    size: 'large',
    variant: 'success-new'
};

export const VariantSuccessSelfAssigned = TemplateWithSlots.bind({});
VariantSuccessSelfAssigned.args = {
    title: 'Success Self Assigned',
    size: 'large',
    variant: 'success-selfassigned'
};
