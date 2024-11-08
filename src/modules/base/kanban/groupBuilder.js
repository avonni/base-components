import { deepCopy } from 'c/utils';
import KanbanGroup from './group';
import KanbanTile from './tile';

export default class KanbanGroupsBuilder {
    constructor(props) {
        this._groupValues = props.groupValues;
        this._summarizeValues = props.summarizeValues;
        this._oldSummarizeValues = props.oldSummarizeValues;
        this._records = props.records;
        this.groupFieldName = props.groupFieldName;
        this.summarizeAttributes = props.summarizeAttributes;
        this.subGroupFieldName = props.subGroupFieldName;
        this.hasSubGroups = false;
        this.groups = [];
        this.keyField = props.keyField;
        this.cardAttributes = props.cardAttributes;
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
                    showItemCount: groupValue.showItemCount,
                    avatar: groupValue.avatar,
                    summarizeAttributes: this.summarizeAttributes
                })
            );
        });

        this._records.forEach((record) => {
            const recordGroup = this.groups.find(
                (group) => group.value === record[this.groupFieldName]
            );
            if (recordGroup) {
                const tile = new KanbanTile({
                    index: record[this.keyField],
                    group: record[this.groupFieldName],
                    warningIcon: record.warningIcon,
                    subGroup: this.subGroupFieldName
                        ? record[this.subGroupFieldName]
                        : null,
                    summarizeValue:
                        this.summarizeAttributes &&
                        this.summarizeAttributes.fieldName
                            ? record[this.summarizeAttributes.fieldName]
                            : 0
                });
                Object.keys(this.cardAttributes).forEach((key) => {
                    if (key === 'customFields') {
                        this.cardAttributes[key].forEach((field) => {
                            if (JSON.stringify(record[field.fieldName])) {
                                tile.addField({
                                    ...field,
                                    value: record[field.fieldName]
                                });
                            }
                        });
                    } else if (key !== 'customFieldAttributes') {
                        const fieldDefinition = this.cardAttributes[key];
                        if (
                            fieldDefinition &&
                            fieldDefinition.fieldName &&
                            record[fieldDefinition.fieldName]
                        ) {
                            tile[key] = record[fieldDefinition.fieldName];
                        }
                    }
                });
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
                group.subGroups = deepCopy(subGroups);
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
