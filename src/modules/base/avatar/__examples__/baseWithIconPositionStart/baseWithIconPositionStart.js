import { LightningElement } from 'lwc';

export default class AvatarBaseWithIconPositionStart extends LightningElement {
    tags = [
        { label: 'base', variant: 'base' },
        { label: 'brand', variant: 'brand' },
        { label: 'inverse', variant: 'inverse' },
        { label: 'alt-inverse', variant: 'alt-inverse' },
        { label: 'success', variant: 'success' },
        { label: 'info', variant: 'info' },
        { label: 'warning', variant: 'warning' },
        { label: 'error', variant: 'error' },
        { label: 'offline', variant: 'offline' },
        { label: 'outline', variant: 'brand', outline: true }
    ];
}
