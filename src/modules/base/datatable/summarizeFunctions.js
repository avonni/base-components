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

export function count(array) {
    return array.length;
}

// function for countUnique
export function countUnique(array, n) {
    let res = 1;

    // Pick all elements one by one
    for (let i = 1; i < n; i++) {
        let j = 0;
        for (j = 0; j < i; j++) if (array[i] === array[j]) break;

        // If not printed earlier, then print it
        if (i === j) res++;
    }
    return res;
}

// function for sum
export function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}

// function for average
export function average(array) {
    return sum(array) / count(array);
}

// function for median
export function median(array) {
    const mid = Math.floor(count(array) / 2),
        nums = [...array].sort((a, b) => a - b);
    return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

// function for max
export function max(array) {
    return Math.max(...array);
}

// function for min
export function min(array) {
    return Math.min(...array);
}

// function for mode
export function mode(array) {
    const store = {};
    let maxCount = 0;

    array.forEach((item) => {
        if (!store[item]) {
            store[item] = 0;
        }
        store[item] += 1;
        if (store[item] > maxCount) {
            maxCount = store[item];
        }
    });
    const modes = Object.keys(store).filter((key) => store[key] === maxCount);

    return modes;
}
