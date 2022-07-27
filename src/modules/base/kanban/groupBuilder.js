import KanbanGroup from './group';
import KanbanTile from './tile';

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
export default class KanbanGroupsBuilder {
    constructor(props) {
        this._groupValues = props.groupValues;
        this._summarizeValues = props.summarizeValues;
        this._oldSummarizeValues = props.oldSummarizeValues;
        this._records = props.records;
        this._fields = props.fields;
        this.groupFieldName = props.groupFieldName;
        this.summarizeFieldName = props.summarizeFieldName;
        this.coverImageFieldName = props.coverImageFieldName;
        this.subGroupFieldName = props.subGroupFieldName;
        this.hasSubGroups = false;
        this.groups = [];
    }

    /**
     * Filters the record array to remove unused fields and separates them in groups
     *
     * @type {object[]}
     */
    computeGroups() {
        this._groupValues.forEach((groupValue, i) => {
            this.groups.push(
                new KanbanGroup({
                    index: i,
                    label: groupValue.label,
                    value: groupValue.value,
                    headerActions: groupValue.headerActions,
                    footerActions: groupValue.footerActions,
                    backgroundColor: groupValue.backgroundColor,
                    pathColor: groupValue.pathColor,
                    showItemCount: groupValue.showItemCount
                })
            );
        });

        this._records.forEach((record) => {
            const recordGroup = this.groups.find(
                (group) => group.value === record[this.groupFieldName]
            );
            if (recordGroup) {
                const tile = new KanbanTile({
                    index: record.id,
                    group: record[this.groupFieldName],
                    warningIcon: record.warningIcon,
                    subGroup: this.subGroupFieldName
                        ? record[this.subGroupFieldName]
                        : null
                });

                this._fields.forEach((field) => {
                    if (JSON.stringify(record[field.fieldName])) {
                        tile.addField({
                            label: field.label,
                            value: record[field.fieldName],
                            type: field.type,
                            typeAttributes: field.typeAttributes
                        });
                    }
                });

                if (
                    Object.keys(record).find(
                        (key) => key === this.coverImageFieldName
                    )
                ) {
                    tile.coverImage = record[this.coverImageFieldName];
                }

                recordGroup.addTile(tile);
            }
        });

        this.computeSubGroups();

        return this.groups;
    }

    findSubGroups() {
        const subGroups = [];

        this.groups.forEach((group) => {
            group.tiles.forEach((tile) => {
                if (tile.subGroup) {
                    if (
                        !subGroups.find(
                            (subGroup) => subGroup.label === tile.subGroup
                        )
                    ) {
                        subGroups.push({
                            label: tile.subGroup,
                            tiles: [],
                            isCollapsed: false
                        });
                    }
                }
            });
        });

        subGroups.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            }
            if (a.label > b.label) {
                return 1;
            }
            return 0;
        });

        return subGroups;
    }

    computeSubGroups() {
        const subGroups = this.findSubGroups();

        // Splits the tiles in diffenrent subgroups if needed
        if (this.subGroupFieldName) {
            this.groups.forEach((group) => {
                group.subGroups = JSON.parse(JSON.stringify(subGroups));
                group.tiles.forEach((tile) => {
                    const subGroup = tile.subGroup;
                    if (subGroup) {
                        this.hasSubGroups = true;
                        const subGroupIndex = group.subGroups.findIndex(
                            (subTile) => subTile.label === subGroup
                        );
                        if (subGroupIndex === -1) {
                            group.subGroups.push({
                                label: subGroup,
                                tiles: [tile]
                            });
                        } else {
                            group.subGroups[subGroupIndex].tiles.push(tile);
                        }
                    }
                });
            });
        }
    }
}
