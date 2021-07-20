/* eslint-disable indent, no-nested-ternary, space-infix-ops */
/**
    @overview Builds a tree-like JSON string from the doclet data.
    @version 0.0.3
    @example
        ./jsdoc scratch/jsdoc_test.js -t templates/haruki -d console -q format=xml
*/
const xml = require('js2xmlparser');

const hasOwnProp = Object.prototype.hasOwnProperty;

function graft(parentNode, childNodes, parentLongname) {
    childNodes
        .filter(({ memberof }) => memberof === parentLongname)
        .forEach((element) => {
            let i;
            let len;
            let thisClass;
            let thisEvent;
            let thisFunction;
            let thisMember;
            let thisNamespace;
            let thisTypeDef;

            if (element.kind === 'namespace') {
                if (!parentNode.namespaces) {
                    parentNode.namespaces = [];
                }

                thisNamespace = {
                    name: element.name,
                    description: element.description || '',
                    access: element.access || ''
                };

                parentNode.namespaces.push(thisNamespace);

                graft(thisNamespace, childNodes, element.longname);
            } else if (element.kind === 'function') {
                if (!parentNode.functions) {
                    parentNode.functions = [];
                }

                thisFunction = {
                    name: element.name,
                    access: element.access || '',
                    description: element.description || '',
                    parameters: []
                };

                parentNode.functions.push(thisFunction);

                if (element.returns) {
                    thisFunction.returns = {
                        type:
                            element.returns[0].type &&
                            element.returns[0].type.names
                                ? element.returns[0].type.names
                                : [],
                        description: element.returns[0].description || ''
                    };
                }

                if (element.params) {
                    for (i = 0, len = element.params.length; i < len; i++) {
                        thisFunction.parameters.push({
                            name: element.params[i].name,
                            type:
                                element.params[i].type &&
                                element.params[i].type.names
                                    ? element.params[i].type.names
                                    : [],
                            description: element.params[i].description || '',
                            default: hasOwnProp.call(
                                element.params[i],
                                'default'
                            )
                                ? element.params[i].default
                                : '',
                            optional:
                                typeof element.params[i].optional === 'boolean'
                                    ? element.params[i].optional
                                    : ''
                        });
                    }
                }
            } else if (element.kind === 'member') {
                if (!parentNode.properties) {
                    parentNode.properties = [];
                }

                thisMember = {
                    name: element.name,
                    access: element.access || '',
                    description: element.description || '',
                    default: element.default || '',
                    required: Boolean(element.required),
                    type:
                        element.type && element.type.names
                            ? element.type.names
                            : []
                };

                if (element.storyId) {
                    thisMember.storyId = element.storyId.value;
                }

                parentNode.properties.push(thisMember);
            } else if (element.kind === 'typedef') {
                if (!parentNode.typedef) {
                    parentNode.typedef = [];
                }

                thisTypeDef = {
                    name: element.name,
                    access: element.access || '',
                    description: element.description || '',
                    default: element.default || '',
                    required: Boolean(element.required),
                    type:
                        element.type && element.type.names
                            ? element.type.names
                            : [],
                    properties: []
                };

                parentNode.typedef.push(thisTypeDef);

                if (element.properties) {
                    for (i = 0, len = element.properties.length; i < len; i++) {
                        thisTypeDef.properties.push({
                            name: element.properties[i].name,
                            type:
                                element.properties[i].type &&
                                element.properties[i].type.names
                                    ? element.properties[i].type.names
                                    : [],
                            description: element.properties[i].description || ''
                        });
                    }
                }
            } else if (element.kind === 'event') {
                if (!parentNode.events) {
                    parentNode.events = [];
                }

                thisEvent = {
                    name: element.name,
                    access: element.access || '',
                    description: element.description || '',
                    parameters: [],
                    bubbles: Boolean(element.bubbles),
                    cancelable: Boolean(element.cancelable),
                    composed: Boolean(element.composed)
                };

                parentNode.events.push(thisEvent);

                if (element.params) {
                    for (i = 0, len = element.params.length; i < len; i++) {
                        thisEvent.parameters.push({
                            name: element.params[i].name,
                            type:
                                element.params[i].type &&
                                element.params[i].type.names
                                    ? element.params[i].type.names
                                    : [],
                            description: element.params[i].description || '',
                            default: hasOwnProp.call(
                                element.params[i],
                                'default'
                            )
                                ? element.params[i].default
                                : ''
                        });
                    }
                }
            } else if (element.kind === 'class') {
                if (!parentNode.classes) {
                    parentNode.classes = [];
                }

                thisClass = {
                    name: element.name,
                    description: element.description || '',
                    descriptor: element.descriptor || '',
                    extends: element.augments || [],
                    access: element.access || '',
                    parameters: []
                };

                parentNode.classes.push(thisClass);

                if (element.params) {
                    for (i = 0, len = element.params.length; i < len; i++) {
                        thisClass.parameters.push({
                            name: element.params[i].name,
                            type:
                                element.params[i].type &&
                                element.params[i].type.names
                                    ? element.params[i].type.names
                                    : [],
                            description: element.params[i].description || '',
                            default: hasOwnProp.call(
                                element.params[i],
                                'default'
                            )
                                ? element.params[i].default
                                : '',
                            optional:
                                typeof element.params[i].optional === 'boolean'
                                    ? element.params[i].optional
                                    : ''
                        });
                    }
                }

                graft(thisClass, childNodes, element.longname);
            }
        });
}

/**
    @param {TAFFY} data
    @param {object} opts
 */
exports.publish = (data, { destination, query }) => {
    let docs;
    const root = {};

    data({ undocumented: true }).remove();
    docs = data().get(); // <-- an array of Doclet objects

    graft(root, docs);

    if (destination === 'console') {
        if (query && query.format === 'xml') {
            console.log(xml.parse('jsdoc', root));
        } else {
            console.log(require('jsdoc/util/dumper').dump(root));
        }
    } else {
        console.log(
            'This template only supports output to the console. Use the option "-d console" when you run JSDoc.'
        );
    }
};