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

import { LightningElement, api } from 'lwc';
import { normalizeArray } from 'c/utilsPrivate';
// import { computeSummarizeArray } from '../datatable/summarizeFunctions';

export default class ProgressGroupByItem extends LightningElement {
    @api columns;
    @api
    get groupBy() {
        return this._groupBy;
    }
    set groupBy(value) {
        this._groupBy = JSON.parse(JSON.stringify(normalizeArray(value)));
        this.groupByRecords(this._records, this._groupBy);
    }

    @api
    get records() {
        return this._records;
    }
    set records(value) {
        this._records = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    _records = [];
    _groupBy = [];

    _groupedByRecords = [];
    formattedGroupedRecords = [];
    formattedResult = [];

    renderedCallback() {
        // console.log(this.formattedGroupedRecords);
    }

    @api
    primitiveGroupedDatatables() {
        return this.template.querySelectorAll(
            'c-primitive-datatable[data-role="grouped"]'
        );
    }

    @api
    primitiveGroupedDatatable() {
        return this.template.querySelector(
            'c-primitive-datatable[data-role="grouped"]'
        );
    }

    groupByRecords(array, fieldName) {
        this._groupedByRecords = array.reduce((previous, currentItem) => {
            const group = currentItem[fieldName];
            if (!previous[group]) previous[group] = [];
            previous[group].push(currentItem);
            return previous;
        }, []);
        Object.keys(this._groupedByRecords).forEach((key) => {
            this.formattedGroupedRecords.push({
                label: key,
                records: this._groupedByRecords[key],
                size: this._groupedByRecords[key].length
            });
        });
    }

    groupByDatas(array, fieldName) {
        const formattedGroupedRecordss = [];
        let groupedData = [];
        groupedData = array.reduce((previous, currentItem) => {
            const group = currentItem[fieldName];
            if (!previous[group]) previous[group] = [];
            previous[group].push(currentItem);
            return previous;
        }, []);
        Object.keys(groupedData).forEach((key) => {
            formattedGroupedRecordss.push({
                label: key,
                data: groupedData[key]
            });
        });
    }

    multiLevelGroupByRecords(records, fieldNames) {
        // if there is only one groupBy and as a string, we convert it to an array.
        if (typeof fieldNames === 'string') {
            fieldNames = fieldNames.split();
        }
        const hasFieldNames = fieldNames.length > 1;
        const result = [];
        const temp = { _: result };
        this.formattedResult = [];
        records.forEach((a) => {
            fieldNames
                .reduce((r, k) => {
                    if (!r[a[k]]) {
                        r[a[k]] = { _: [] };
                        r._.push({ [a[k]]: { [a[k]]: r[a[k]]._ } });
                    }
                    return r[a[k]];
                }, temp)
                ._.push(a);
        });
        // return result;
        result.forEach((res) => {
            Object.keys(res).forEach((key) => {
                this.formattedResult.push({
                    label: key,
                    records: Object.values(res[key]).flat(),
                    dataSize: Object.values(res[key]).flat().length,
                    hasFieldNames: hasFieldNames,
                    nestedRecords: this.result(Object.values(res[key]).flat())
                });
            });
        });
        return this.formattedResult;
    }

    result(results) {
        const formattedResult = [];
        results.forEach((res) => {
            Object.keys(res).forEach((key) => {
                formattedResult.push({
                    label: key,
                    records: Object.values(res[key]).flat(),
                    dataSize: Object.values(res[key]).flat().length
                });
            });
        });
        return formattedResult;
    }

    handleDispatchEvents(event) {
        this.dispatchEvent(
            new CustomEvent(`${event.type}`, {
                detail: event.detail,
                bubbles: event.bubbles,
                composed: event.composed,
                cancelable: event.cancelable
            })
        );
    }

    get hardData() {
        return this.hardCodedData;
    }

    hardCodedData = [
        {
            label: 'Montreal',
            level: 0,
            size: 10,
            group: [
                {
                    label: 'Plateau',
                    level: 1,
                    size: 6,
                    group: [
                        {
                            label: 'House',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        },
                        {
                            label: 'Room',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Outremont',
                    level: 1,
                    size: 5,
                    group: [
                        {
                            label: 'House',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        },
                        {
                            label: 'Room',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            label: 'Laval',
            level: 0,
            size: 10,
            group: [
                {
                    label: 'Vimont',
                    level: 1,
                    size: 6,
                    group: [
                        {
                            label: 'House',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        },
                        {
                            label: 'Room',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Viau',
                    level: 1,
                    size: 5,
                    group: [
                        {
                            label: 'House',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        },
                        {
                            label: 'Room',
                            level: 2,
                            size: 2,
                            data: [
                                {
                                    id: 4,
                                    name: 'Don',
                                    age: '18',
                                    city: 'Longueuil',
                                    district: 'Old Longueuil',
                                    habitation: 'Room'
                                },
                                {
                                    id: 5,
                                    name: 'Donald',
                                    age: '16',
                                    city: 'Longueuil',
                                    district: 'Saint-Hubert'
                                },
                                {
                                    id: 6,
                                    name: 'Jenny',
                                    age: '56',
                                    city: 'Longueuil',
                                    district: 'Greenfield Park',
                                    habitation: 'Apartment'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
}
