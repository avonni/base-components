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

/**
 * Method to count numbers of element in array.
 *
 * @param {object} array Array of elements to count.
 * @returns {number} Number of elements.
 */
const count = (array) => {
    return array.length;
};

/**
 * Method to count unique numbers of element in array.
 *
 * @param {object} array Array of elements to count.
 * @returns {number} Number of unique elements.
 */
const countUnique = (array) => {
    return new Set(array).size;
};

/**
 * Method to sum elements in array.
 *
 * @param {object} array Array of elements to sum.
 * @returns {number} Sum of array.
 */
const sum = (array) => {
    return array.reduce((a, b) => a + b, 0);
};

/**
 * Method to do the average of the array.
 *
 * @param {object} array Array of elements to average.
 * @returns {number} Average of array.
 */
const average = (array) => {
    return (sum(array) / count(array)).toFixed(5);
};

/**
 * Method to find the median of the array.
 *
 * @param {object} array Array of elements.
 * @returns {number} Median of the array.
 */
const median = (array) => {
    const mid = Math.floor(count(array) / 2),
        nums = [...array].sort((a, b) => a - b);
    return count(array) % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

/**
 * Method to find the highest number of the array.
 *
 * @param {object} array Array of elements.
 * @returns {number} Highest number of the array.
 */
const max = (array) => {
    return Math.max(...array);
};

/**
 * Method to find the lowest number of the array.
 *
 * @param {object} array Array of elements.
 * @returns {number} Lowest number of the array.
 */
const min = (array) => {
    return Math.min(...array);
};

/**
 * Method to find which number appears the most often in the array.
 *
 * @param {object} array Array of elements.
 * @returns {number} Most frequent number of the array.
 */
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

/**
 * Method compute the summarization depending on which summarize type.
 *
 * @param {object} array Array of elements.
 * @param {string} type Which summarize type to compute.
 * @returns {number} computed number depending on type.
 */
const summarizations = (array, type) => {
    switch (type) {
        default:
            return count(array);
        case 'countUnique':
            return countUnique(array);
        case 'sum':
            return sum(array);
        case 'average':
            return average(array);
        case 'median':
            return median(array);
        case 'max':
            return max(array);
        case 'min':
            return min(array);
        case 'mode':
            return mode(array);
    }
};

/**
 * Method compute the summarization depending on which summarize type.
 *
 * @param {object} columns Array of object containing the columns with label, fieldName, type and typeAttributes.
 * @param {object} values Array of number containing the different values of each column.
 * @returns {object} Array of object containing the information of each columns with the information needed to iterate in the markup.
 * It contains :
 * * fieldName
 * * type
 * * summarizeTypes
 * * values
 * * numberType
 * * formatType
 */
const computeSummarizeObject = (columns, values) => {
    const computedSummarizeArray = columns.map((column, index) => {
        let sumTypes = column.summarizeTypes;
        const isNumberType =
            column.type === 'number' ||
            column.type === 'percent' ||
            column.type === 'currency';
        const formatType = column.type !== 'number' ? column.type : 'decimal';
        const hasTypeAttributes = column.typeAttributes
            ? column.typeAttributes
            : [];

        // Formating of the object we need to iterate in the markup.
        const summarizeColumnObject = {
            fieldName: column.fieldName,
            type: column.type,
            summarizeTypes: sumTypes,
            values: values[index],
            numberType: isNumberType,
            formatType: formatType
        };

        if (sumTypes) {
            // if there is only one summarizeType and as a string, we convert it to an array.
            if (typeof sumTypes === 'string') {
                sumTypes = sumTypes.split();
            }
            summarizeColumnObject.summarizeTypes = sumTypes.map((type) => {
                // The value is computed depending on what type of summarization.
                const computedValue = summarizations(
                    summarizeColumnObject.values,
                    type
                );

                // Count and countUnique don't need formating since we only need the numbers of occurences.
                // And they are always type decimal.
                return type === 'count' || type === 'countUnique'
                    ? {
                          label: type,
                          value: computedValue,
                          type: 'decimal',
                          typeAttributes: []
                      }
                    : {
                          label: type,
                          value: computedValue,
                          type: formatType,
                          typeAttributes: hasTypeAttributes
                      };
            });
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
