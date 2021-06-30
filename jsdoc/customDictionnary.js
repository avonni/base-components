exports.defineTags = function (dictionnary) {
    dictionnary.defineTag('descriptor', {
        onTagged: function (doclet, tag) {
            doclet.descriptor = tag.value;
        }
    });
    dictionnary.defineTag('default', {
        onTagged: function (doclet, tag) {
            doclet.default = tag.value;
        }
    });
    dictionnary.defineTag('required', {
        onTagged: function (doclet, tag) {
            doclet.required = tag.value;
        }
    });
    dictionnary.defineTag('public', {
        onTagged: function (doclet) {
            doclet.access = 'public';
        }
    });
    dictionnary.defineTag('bubbles', {
        onTagged: function (doclet, tag) {
            doclet.bubbles = tag;
        }
    });
    dictionnary.defineTag('cancelable', {
        onTagged: function (doclet, tag) {
            doclet.cancelable = tag;
        }
    });
    dictionnary.defineTag('composed', {
        onTagged: function (doclet, tag) {
            doclet.composed = tag;
        }
    });
    dictionnary.defineTag('storyId', {
        onTagged: function (doclet, tag) {
            doclet.storyId = tag;
        }
    });
};
