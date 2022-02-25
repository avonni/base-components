export default class PillContainerPill {
    constructor(props) {
        Object.assign(this, props);
    }

    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = value instanceof Object ? value : null;
    }
}
