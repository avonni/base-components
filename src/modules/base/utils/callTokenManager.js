/**
 * Class used to manage call tokens for async operations. For example,
 * when a subscription or query is started multiple times in quick succession,
 * only the result of the last call is applied; older results are discarded or cleaned up.
 */
export class CallTokenManager {
    constructor() {
        this.callTokens = {};
    }

    /**
     * Generate and store a new call token for a given key.
     * @param {string} key - Identifier for the async operation (e.g., subscription property name).
     * @returns {number} The new call token.
     */
    generate(key) {
        if (!this.callTokens[key]) {
            this.callTokens[key] = 0;
        }
        return ++this.callTokens[key];
    }

    /**
     * Check if a token is still the latest for a given key.
     * @param {string} key - Identifier for the async operation.
     * @param {number} token - The token to validate.
     * @returns {boolean} True if the token is current, false otherwise.
     */
    isCurrent(key, token) {
        return token === this.callTokens[key];
    }
}
