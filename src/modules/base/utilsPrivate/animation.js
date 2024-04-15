import { isCSR } from './ssr';

/**
 * Does the browser display animation.
 * Always returns false for IE11 due to performance.
 */
export function hasAnimation() {
    if (isCSR) {
        if (!window.matchMedia) {
            return true;
        }
        const mediaQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        );
        return !(!mediaQuery || mediaQuery.matches);
    }
    return false;
}
