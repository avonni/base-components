import { LightningElement } from 'lwc';

export default class AvatarBaseWithTags extends LightningElement {
    tags = [
        { label: 'default', variant: 'default' },
        { label: 'warning', variant: 'warning' },
        { label: 'error', variant: 'error' },
        { label: 'success', variant: 'success' },
        { label: 'lightest', variant: 'lightest' },
        { label: 'inverse', variant: 'inverse' }
    ];
}
