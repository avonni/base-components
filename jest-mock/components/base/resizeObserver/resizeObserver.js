let callObserver;
class AvonniResizeObserver {
    constructor(_element, callback) {
        callObserver = jest.fn(callback);
    }
    observe() {}
    disconnect() {}
}

export { callObserver, AvonniResizeObserver };
