/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import { NumberOptions } from './numberOptions';

// This is called when the value exceeds the safe length.
// We currently rely on aura to format large numbers
function getNumberFormat() {
    return {
        format: (value) => {
            // eslint-disable-next-line no-console
            console.warn(
                `The current environment does not support large numbers and the original value of ${value} will be returned.`
            );
            return value;
        }
    };
}

export function numberFormatFallback(options) {
    const skeleton = new NumberOptions(options).getSkeleton();
    return {
        format: (value) => {
            return getNumberFormat(skeleton).format(value);
        }
    };
}
