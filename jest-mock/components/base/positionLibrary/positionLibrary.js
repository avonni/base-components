/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

class AutoPosition {}
function startPositioning() {
    return { reposition: () => Promise.resolve() };
}
function stopPositioning() {}
const Direction = {};

export { AutoPosition, Direction, startPositioning, stopPositioning };
