Note: Component taken from lightning-base-components. It has the same behaviour as lightning-focus-trap component.

-   The component must accept a default slot
-   When a component within the slot has focus, the focus is trapped, in the following way:
    -   When on the first tabbable (see definition below) element and `Shift-Tab` is pressed, the focus should go to the last tabbable element
    -   When on the last tabbable element and `Tab` is pressed, the focus should go to the first tabbable element
-   Has `focus` method, when invoked:
    -   If the slot within the focus trap already has focus, does nothing
    -   If the slot within the focus trap doesn't have focus, focuses the first tabbable element of its default slot
-   The slot is assumed to have at least one tabbable element
-   Apart from the first and last tabbable elements tabbing order should remain unchanged
-   When there's a new tabbable element that precedes the previously first tabbable element, when pressing `Tab` on the last tabbable element the focus should go to the new tabbable element
-   When there's a new tabbable element that follows the previously last tabbable element, when pressing `Shift-Tab` on the last tabbable element the focus should go to the new tabbable element
-   When there's a new first/last tabbable element, tab navigation from previously first/last tabbable elements should be normal if they're still part of the slot (eg. pressing Tab on the previously last tabbable element should go the next tabbable element)

Definitions:

-   Tabbable element:
    -   Can be part of a custom element
    -   Can be part of a slot
    -   Can be part of an open shadow
    -   Can be part of a same-origin iframe
    -   Doesn't have an ascendant custom element that has `tabindex` attribute set to `-1`
    -   Doesn't have `tabindex` attribute set to `-1` on itself
    -   Doesn't have the computed style `visibility` as `hidden`
    -   Has bounding client rect `height` or `width` greater than zero
    -   Is a `button`, `select`, `textarea` or `input` element and `disabled` property is false
    -   Is not an `input` element with `type=hidden`
    -   Has `tabindex` attribute set to `0` or has the `tabIndex` property as `0` and is not an element that has `tabIndex` set to 0 by default (that's relevant for IE11 as all elements have `tabIndex` as `0` by default) as per
        https://html.spec.whatwg.org/multipage/interaction.html#dom-tabindex
        (`a`, `select`, `textarea`, `input`, `button`, `iframe`, `object`, `area`, `frame`)
