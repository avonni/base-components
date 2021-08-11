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
    return parseInt((sum(array) / count(array)).toFixed(5), 10);
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

const isNumberType = (type) => {
    return type === 'number' || type === 'percent' || type === 'currency';
};

const isDateType = (type) => {
    return type === 'date' || type === 'date-local';
};

const isStringType = (type) => {
    return type === 'email' || type === 'text' || type === 'url';
};

const isCustomType = (type) => {
    return type === 'slider' || type === 'rating' || type === 'input-counter';
};

const isProgressType = (type) => {
    return (
        type === 'progress-circle' ||
        type === 'progress-ring' ||
        type === 'progress-bar'
    );
};

const isFormattedNumberType = (type) => {
    return isNumberType(type) || isProgressType(type) || isCustomType(type);
};

const computeFilteredDataValues = (columns, data) => {
    let values = [];
    let filteredDataValues = [];
    filteredDataValues = columns.map((column) => {
        const fieldName = column.fieldName;
        const type = column.type;
        values = data.map((row) => {
            return row[fieldName];
        });
        if (isCustomType(type) || isNumberType(type)) {
            return values.map(Number).filter(Number.isFinite);
        } else if (isDateType(type)) {
            return values
                .map((date) => {
                    return Date.parse(date);
                })
                .filter(Number);
        }
        return values.filter((e) => {
            return e !== null && e !== undefined;
        });
    });
    return filteredDataValues;
};

const displaySumType = (summarizeTypes, type) => {
    const allowedStringSummarizeTypes = ['count', 'countUnique', 'mode'];
    const otherAllowedSummarizeTypes = ['count', 'countUnique'];
    if (isStringType(type)) {
        return allowedStringSummarizeTypes.includes(summarizeTypes)
            ? true
            : false;
    } else if (
        !isStringType(type) &&
        !isDateType(type) &&
        !isNumberType(type) &&
        !isCustomType(type) &&
        !isProgressType(type)
    ) {
        return otherAllowedSummarizeTypes.includes(summarizeTypes)
            ? true
            : false;
    }
    return true;
};

const transformComputedValue = (value, progressType) => {
    if (progressType) {
        return value / 100;
    }
    return value;
};

const hasValidSummarizeType = (computedSummarizeArray) => {
    const summarized = [];
    computedSummarizeArray.forEach((column) => {
        const summarizeTypes = column.summarizeTypes;
        if (summarizeTypes) {
            summarizeTypes.forEach((type) => {
                summarized.push(type.displaySumType);
            });
        }
    });
    return summarized.includes(true);
};

const formatNumberType = (type) => {
    if (type === 'number' || isCustomType(type)) {
        return 'decimal';
    } else if (isProgressType(type)) {
        return 'percent';
    }
    return type;
};

const isCountSummarizeType = (type) => {
    return type === 'count' || type === 'countUnique';
};

/**
 *
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
const computeSummarizeArray = (columns, data) => {
    const computedSummarizeArray = columns.map((column, index) => {
        let sumTypes = column.summarizeTypes;
        const filteredDataValues = computeFilteredDataValues(columns, data);
        const cType = column.type;
        const hasSummarizeType = column.summarizeTypes ? true : false;
        const dateType = isDateType(cType);
        const formattedNumberType = isFormattedNumberType(cType);
        const formatType = formatNumberType(cType);
        const className = isNumberType(cType)
            ? 'slds-truncate avonni-datatable-summarize_styling-number'
            : 'slds-truncate avonni-datatable-summarize_styling';
        const hasTypeAttributes = column.typeAttributes
            ? column.typeAttributes
            : [];

        // Formatting of the object that we need to iterate on, in the markup.
        const summarizeColumnObject = {
            fieldName: column.fieldName,
            type: cType,
            hasSummarizeType: hasSummarizeType,
            summarizeTypes: sumTypes,
            values: filteredDataValues[index],
            formattedNumberType: formattedNumberType,
            dateType: dateType,
            formatType: formatType,
            className: className
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
                const stringMode = type === 'mode' && isStringType(cType);
                return {
                    label: type,
                    value: transformComputedValue(
                        computedValue,
                        isProgressType(cType)
                    ),
                    type: formatType,
                    typeAttributes: hasTypeAttributes,
                    mode: stringMode,
                    displaySumType: displaySumType(type, cType),
                    count: isCountSummarizeType(type)
                };
            });
        }
        return summarizeColumnObject;
    });
    return computedSummarizeArray;
};

export { computeSummarizeArray, hasValidSummarizeType };
