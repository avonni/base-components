import KanbanGroup from './group';
import KanbanTile from './tile';
import { deepCopy } from 'c/utils';

export default class KanbanGroupBuilder {
    constructor(props) {
        this._groupValues = props.groupValues;
        this._summarizeValues = props.summarizeValues;
        this._oldSummarizeValues = props.oldSummarizeValues;
        this._items = props.items;
        this.groupFieldName = props.groupFieldName;
        this.summarizeAttributes = props.summarizeAttributes;
        this.subGroupFieldName = props.subGroupFieldName;
        this.hasSubGroups = false;
        this.groups = [];
        this.keyField = props.keyField;
        this.cardAttributes = props.cardAttributes;
        this.imageAttributes = props.imageAttributes;
        this.avatarAttributes = props.avatarAttributes;
    }

    /**
     * Filters the item array to remove unused fields and separates them in groups
     *
     * @type {object[]}
     */
    computeGroups() {
        this.groups = [];
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

        this._items.forEach((item, index) => {
            const itemGroup = this.groups.find(
                (group) => group.value === item[this.groupFieldName]
            );
            if (itemGroup) {
                const tile = new KanbanTile({
                    index:
                        this.keyField && item[this.keyField]
                            ? item[this.keyField]
                            : index,
                    group: item[this.groupFieldName],
                    warningIcon: item.warningIcon,
                    subGroup: this.subGroupFieldName
                        ? item[this.subGroupFieldName]
                        : null,
                    summarizeValue:
                        this.summarizeAttributes &&
                        this.summarizeAttributes.fieldName
                            ? item[this.summarizeAttributes.fieldName]
                            : 0,
                    linkify: this.cardAttributes.linkify,
                    imageAttributes: this.imageAttributes,
                    avatarAttributes: this.avatarAttributes
                });
                Object.keys(this.cardAttributes).forEach((key) => {
                    const value = this.cardAttributes[key];
                    if (key === 'customFields') {
                        value?.forEach((field) => {
                            const formattedField = this.formatField(
                                item,
                                field
                            );
                            tile.addField(formattedField);
                        });
                    } else if (key === 'icons' && Array.isArray(value)) {
                        tile[key] = value.map((icon) => {
                            return typeof icon === 'object' && icon?.fieldName
                                ? item[icon.fieldName]
                                : icon;
                        });
                    } else if (key === 'infos' && Array.isArray(value)) {
                        tile[key] = value.map((infoObj) => {
                            const computedInfo = {};
                            Object.keys(infoObj).forEach((infoKey) => {
                                const info = infoObj[infoKey];
                                computedInfo[infoKey] =
                                    typeof info === 'object' && info?.fieldName
                                        ? item[info.fieldName]
                                        : info;
                            });
                            return computedInfo;
                        });
                    } else if (key === 'avatar') {
                        const computedAvatar = {};
                        Object.keys(value)?.forEach((avatarKey) => {
                            const avatar = value[avatarKey];
                            computedAvatar[avatarKey] =
                                typeof value === 'object' && avatar?.fieldName
                                    ? item[avatar.fieldName]
                                    : avatar;
                        });
                        tile[key] = computedAvatar;
                    } else if (key !== 'customFieldAttributes') {
                        if (
                            value &&
                            typeof value === 'object' &&
                            value.fieldName
                        ) {
                            tile[key] = item[value.fieldName];
                        }
                    }
                });
                itemGroup.addTile(tile);
            }
        });

        this.computeSubGroups();

        return this.groups;
    }

    computeSubGroups() {
        const subGroups = this.findSubGroups();
        this.hasSubGroups = !!subGroups.length;

        // Splits the tiles in diffenrent subgroups if needed
        if (this.subGroupFieldName) {
            this.groups.forEach((group) => {
                group.subGroups = deepCopy(subGroups);
                group.tiles.forEach((tile) => {
                    const subGroup = tile.subGroup;
                    if (subGroup) {
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

    findSubGroups() {
        let subGroups = [];
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

    formatField(item, field) {
        const type = field.type;
        let itemValue = item[field.fieldName];
        let computedType = field.type;
        if (!itemValue) {
            itemValue = this.isNumberField(field) ? 0 : '-';
            if (type === 'boolean' && itemValue === '-') {
                // For false value, we displayed it as a text '-'
                computedType = 'text';
            }
        }
        let typeAttributes = field.typeAttributes || {};

        // Support hyperlink formula
        let isHyperlinkFormula = false;
        if (type === 'customFormula') {
            const regex =
                /<a\shref=(["'])(.*?)\1\starget=(["'])(.*?)\1>([^>]*?)<\/a>/;
            if (regex.test(itemValue)) {
                isHyperlinkFormula = true;
                typeAttributes = {
                    target: itemValue.match(regex)[4],
                    label: itemValue.match(regex)[5]
                };
                itemValue = itemValue.match(regex)[2];
            }
        }

        if (
            Object.keys(typeAttributes).length === 0 &&
            !isNaN(field.scale) &&
            this.isNumberField(field)
        ) {
            typeAttributes = {
                minimumFractionDigits: field.scale,
                maximumFractionDigits: field.scale
            };
        }

        if (isHyperlinkFormula) {
            computedType = 'url';
        } else if (type === 'int' || type === 'double') {
            computedType = 'number';
        }

        return {
            ...field,
            value: itemValue,
            computedType,
            type,
            typeAttributes,
            linkify: isHyperlinkFormula
        };
    }

    isNumberField(field) {
        return (
            field.type === 'number' ||
            field.type === 'double' ||
            field.type === 'percent' ||
            field.type === 'currency'
        );
    }
}
