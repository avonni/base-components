import { LightningElement, api } from 'lwc';
import { generateUniqueId } from 'c/utils';
import { normalizeBoolean } from 'c/utilsPrivate';

const TEMPORARY_DATA = [
    {
        label: 'Group Relationships',
        name: 'northern-trails-outfitter-group-relationships',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/welcome-mat/bg-info@2x.png',
        avatarFallbackIconName: 'standard:account'
    },
    {
        label: 'Related Contacts',
        name: 'northern-trails-outfitter-related-contacts',
        href: 'https://www.avonni.app/'
    },
    {
        label: 'Related Accounts',
        name: 'northern-trails-outfitter-related-accounts',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        items: [
            {
                label: 'Adams Household',
                avatarSrc:
                    'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                avatarFallbackIconName: 'standard:user',
                data: [
                    {
                        label: 'Account name',
                        value: 'Adams Household'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$1,778,911.21'
                    }
                ]
            },
            {
                label: 'Alpine Group',
                avatarSrc:
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                avatarFallbackIconName: 'standard:user',
                data: [
                    {
                        label: 'Account name',
                        value: 'Alpine Group'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$0'
                    }
                ]
            },
            {
                label: 'Member Relatoionships',
                avatarFallbackIconName: 'standard:account'
            },
            {
                label: 'Action Plans',
                avatarFallbackIconName: 'standard:account'
            }
        ]
    }
];

// QUESTIONS:
// Option to hide empty groups?

export default class RelationshipGraph extends LightningElement {
    @api label;
    @api groups;

    selectedGroups;
    _isRoot = true;

    @api get isRoot() {
        return this._isRoot;
    }
    set isRoot(boolean) {
        this._isRoot = normalizeBoolean(boolean);
    }

    get generateKey() {
        return generateUniqueId();
    }

    handleSelect() {
        this.selectedGroups = TEMPORARY_DATA;
    }
}
