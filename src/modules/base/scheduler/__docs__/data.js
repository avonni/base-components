const columns = [
    {
        label: 'Staff',
        fieldName: 'avatarSrc',
        type: 'avatar',
        typeAttributes: {
            alternativeText: 'Avatar',
            fallbackIconName: { fieldName: 'avatarFallbackIconName' },
            initials: { fieldName: 'avatarInitials' },
            primaryText: { fieldName: 'firstName' }
        },
        initialWidth: 150
    },
    {
        label: 'Role',
        fieldName: 'role',
        hideDefaultActions: true
    }
];

const rows = [
    {
        id: 1,
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'NG',
        firstName: 'Nina',
        role: 'Lead developer'
    },
    {
        id: 2,
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'DM',
        firstName: 'Dave',
        role: 'UX Specialist'
    },
    {
        id: 3,
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'JP',
        firstName: 'Jung',
        role: 'Product Owner'
    },
    {
        id: 4,
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'LM',
        firstName: 'Lily',
        role: 'Graphic Designer'
    },
    {
        id: 5,
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:person_account',
        avatarInitials: 'RM',
        firstName: 'Reginald',
        role: 'Developer'
    }
];

const headers = [
    {
        unit: 'day',
        span: 1,
        label: 'ddd DD/MM'
    },
    {
        unit: 'hour',
        span: 2,
        label: 'Hh'
    }
];

export { columns, rows, headers };
