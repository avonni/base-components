exports.defineTags = function (dictionary) {
    dictionary.defineTag('descriptor', {
        onTagged: function (doclet, tag) {
            doclet.descriptor = tag.value;
        }
    });
    dictionary.defineTag('default', {
        onTagged: function (doclet, tag) {
            doclet.default = tag.value;
        }
    });
    dictionary.defineTag('required', {
        onTagged: function (doclet, tag) {
            doclet.required = tag.value;
        }
    });
    dictionary.defineTag('public', {
        onTagged: function (doclet) {
            doclet.access = 'public';
        }
    });
    dictionary.defineTag('bubbles', {
        onTagged: function (doclet, tag) {
            doclet.bubbles = tag;
        }
    });
    dictionary.defineTag('cancelable', {
        onTagged: function (doclet, tag) {
            doclet.cancelable = tag;
        }
    });
    dictionary.defineTag('composed', {
        onTagged: function (doclet, tag) {
            doclet.composed = tag;
        }
    });
    dictionary.defineTag('storyId', {
        onTagged: function (doclet, tag) {
            doclet.storyId = tag;
        }
    });
};