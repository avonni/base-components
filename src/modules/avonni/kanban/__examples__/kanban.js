import '@lwc/synthetic-shadow';
import Component from 'avonni/kanban';

customElements.define('ac-avonni-kanban', Component.CustomElementConstructor);

export const Kanban = ({
    groupFieldName,
    groupValues,
    summarizeFieldName,
    fields,
    actions,
    kanbanData,
    iconName,
    isLoading,
    notDraggable,
    onactionselect,
    onchange
}) => {
    const element = document.createElement('ac-avonni-kanban');
    element.groupFieldName = groupFieldName;
    element.groupValues = groupValues;
    element.summarizeFieldName = summarizeFieldName;
    element.fields = fields;
    element.actions = actions;
    element.kanbanData = kanbanData;
    element.iconName = iconName;
    element.isLoading = isLoading;
    element.notDraggable = notDraggable;
    element.onactionselect = onactionselect;
    element.onchange = onchange;
    return element;
};