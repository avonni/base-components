/**
This polyfill injects SVG sprites into the document for clients that don't
fully support SVG. We do this globally at the document level for performance
reasons. This causes us to lose namespacing of IDs across sprites. For example,
if both #image from utility sprite and #image from doctype sprite need to be
rendered on the page, both end up as #image from the doctype sprite (last one
wins). SLDS cannot change their image IDs due to backwards-compatibility
reasons so we take care of this issue at runtime by adding namespacing as we
polyfill SVG elements.

For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
replace the "#approval" id with "#${namespace}-approval" and a similar
operation is done on the corresponding symbol element.
**/

import fetchSvg from './fetchSvg';
import supportsSvg from './supportsSvg';

const svgTagName = /svg/i;
const isSvgElement = (el) => el && svgTagName.test(el.nodeName);

const requestCache = {};
const symbolEls = {};
const svgFragments = {};

const spritesContainerId = 'slds-svg-sprites';
let spritesEl;

export function polyfill(el) {
    if (!supportsSvg && isSvgElement(el)) {
        if (!spritesEl) {
            spritesEl = document.createElement('svg');
            spritesEl.xmlns = 'http://www.w3.org/2000/svg';
            spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
            spritesEl.style.display = 'none';
            spritesEl.id = spritesContainerId;

            document.body.insertBefore(spritesEl, document.body.childNodes[0]);
        }

        Array.from(el.getElementsByTagName('use')).forEach((use) => {
            // We access the href differently in raptor and in aura, probably
            // due to difference in the way the svg is constructed.
            const src =
                use.getAttribute('xlink:href') || use.getAttribute('href');

            if (src) {
                // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
                // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
                const parts = src.split('#');
                const url = parts[0];
                const id = parts[1];
                const namespace = url.replace(/[^\w]/g, '-');
                const href = `#${namespace}-${id}`;

                if (url.length) {
                    // set the HREF value to no longer be an external reference
                    if (use.getAttribute('xlink:href')) {
                        use.setAttribute('xlink:href', href);
                    } else {
                        use.setAttribute('href', href);
                    }

                    // only insert SVG content if it hasn't already been retrieved
                    if (!requestCache[url]) {
                        requestCache[url] = fetchSvg(url);
                    }

                    requestCache[url].then((svgContent) => {
                        // create a document fragment from the svgContent returned (is parsed by HTML parser)
                        if (!svgFragments[url]) {
                            const svgFragment = document
                                .createRange()
                                .createContextualFragment(svgContent);

                            svgFragments[url] = svgFragment;
                        }
                        if (!symbolEls[href]) {
                            const svgFragment = svgFragments[url];
                            const symbolEl = svgFragment.querySelector(
                                `#${id}`
                            );

                            symbolEls[href] = true;
                            symbolEl.id = `${namespace}-${id}`;
                            spritesEl.appendChild(symbolEl);
                        }
                    });
                }
            }
        });
    }
}
