import isIframeInEdge from './isIframeInEdge';

// Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L89-L98
// Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
// Modify at your own risk!
const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
const webkitUA = /\bAppleWebKit\/(\d+)\b/;
const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
const isIE =
    newerIEUA.test(navigator.userAgent) ||
    (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 ||
    (navigator.userAgent.match(webkitUA) || [])[1] < 537;

const supportsSvg = !isIE && !isIframeInEdge;

export default supportsSvg;
