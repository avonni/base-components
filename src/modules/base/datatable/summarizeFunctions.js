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

const count = (array) => {
    return array.length;
};

// function for countUnique
const countUnique = (array) => {
    let res = 1;
    let n = array.length;

    // Pick all elements one by one
    for (let i = 1; i < n; i++) {
        let j = 0;
        for (j = 0; j < i; j++) if (array[i] === array[j]) break;

        // If not printed earlier, then print it
        if (i === j) res++;
    }
    return res;
};

// function for sum
const sum = (array) => {
    return array.reduce((a, b) => a + b, 0);
};

// function for average
const average = (array) => {
    return (sum(array) / count(array)).toFixed(5);
};

// function for median
const median = (array) => {
    const mid = Math.floor(count(array) / 2),
        nums = [...array].sort((a, b) => a - b);
    return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

// function for max
const max = (array) => {
    return Math.max(...array);
};

// function for min
const min = (array) => {
    return Math.min(...array);
};

// function for mode
const mode = (array) => {
    let modeObj = {};
    let maximum = 0,
        counter = 0;

    array.forEach((e) => {
        if (modeObj[e]) {
            modeObj[e]++;
        } else {
            modeObj[e] = 1;
        }

        if (counter < modeObj[e]) {
            maximum = e;
            counter = modeObj[e];
        }
    });

    return maximum;
};

const summarizations = (array, summarizeType) => {
    let answer;
    if (summarizeType.includes('count')) {
        answer = count(array);
    }
    if (summarizeType.includes('countUnique')) {
        answer = countUnique(array);
    }
    if (summarizeType.includes('sum')) {
        answer = sum(array);
    }
    if (summarizeType.includes('average')) {
        answer = average(array);
    }
    if (summarizeType.includes('median')) {
        answer = median(array);
    }
    if (summarizeType.includes('max')) {
        answer = max(array);
    }
    if (summarizeType.includes('min')) {
        answer = min(array);
    }
    if (summarizeType.includes('mode')) {
        answer = mode(array);
    }
    return answer;
};

const computeSummarizeObject = (columns, values) => {
    const computedSummarizeArray = columns.map((column, index) => {
        let numberType =
            column.type === 'number' ||
            column.type === 'percent' ||
            column.type === 'currency';
        let formatType = column.type !== 'number' ? column.type : 'decimal'
        const summarizeColumnObject = {
            fieldName: column.fieldName,
            type: column.type,
            summarizeTypes: [],
            values: values[index],
            numberType: numberType,
            formatType: formatType
        };
        if (column.summarizeTypes !== undefined) {
            // if there is only one summarizeType and as a string, we convert it to a string.
            if (typeof column.summarizeTypes === 'string') {
                column.summarizeTypes = (column.summarizeTypes).split();
            }
            summarizeColumnObject.summarizeTypes = column.summarizeTypes.map(
                (type) => {
                    let computedValue = summarizations(
                        summarizeColumnObject.values,
                        type
                    );
                    if (type === 'count' || type === 'countUnique') {
                        return {
                            label: type,
                            value: computedValue,
                            type: 'decimal',
                            typeAttributes: []
                        };
                    } else if (column.typeAttributes !== undefined) {
                        return {
                            label: type,
                            value: computedValue,
                            type: formatType,
                            typeAttributes: column.typeAttributes
                        };
                    }
                    return {
                        label: type,
                        value: computedValue,
                        type: formatType,
                        typeAttributes: []
                    };
                }
            );
        }
        return summarizeColumnObject;
    });
    return computedSummarizeArray;
};

export {
    sum,
    count,
    countUnique,
    average,
    median,
    max,
    min,
    mode,
    computeSummarizeObject
};
