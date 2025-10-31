/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

let isSlds2;
const SLDS1_ONLY_STYLING_TOKEN = '--slds-g-color-border-base-1';

/**
 * Function to determine if an org is using SLDS1 (not SLDS2).
 * @param {*} element - Any DOM element.
 * @returns {boolean} - True if the element is in an org using SLDS1, false if it uses SLDS2.
 */
export function isOrgSlds2() {
    const hasCachedResult = isSlds2 !== undefined;
    if (hasCachedResult) return isSlds2;

    const computedStyle = getComputedStyle(document.documentElement);
    if (!computedStyle) return false;

    // Heuristic: SLDS1 defines a value for --slds-g-color-border-base-1 but not SLDS2.
    // Ref: https://www.lightningdesignsystem.com/2e1ef8501/p/591960-global-styling-hooks/t/bb830d7441
    const value = computedStyle.getPropertyValue(SLDS1_ONLY_STYLING_TOKEN);
    isSlds2 = !value?.trim();
    return isSlds2;
}
