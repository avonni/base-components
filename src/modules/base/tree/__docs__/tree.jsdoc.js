/**
 * @typedef {object} TreeItem
 * @name items
 * @property {string} label Required. The title and label for the hyperlink.
 * @property {string} metatext Text to provide users with supplemental information and aid with identifiation or diambiguation.
 * @property {object} items Nested item objects.
 * @property {string} name Required. The unique name of the item. It will be returned by the onselect event handler.
 * @property {string} href The URL for the link.
 * @property {boolean} expanded If true, the item branch is expanded. An expanded branch displays its nested items visually. Defaults to false.
 * @property {boolean} disabled If true, the item is disabled. A disabled item is grayed out and can't be focused or perform any action. Defaults to false.
 */
