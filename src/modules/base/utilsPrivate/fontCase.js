function camelCase(string) {
    if (typeof string !== 'string') {
        return string;
    }

    // Replace all non-alphanumeric characters with spaces
    const stringWithSpaces = string.replace(/[^0-9a-zA-Z]/g, ' ');

    // Split the string into words
    const words = stringWithSpaces.split(' ');

    // Convert the first letter of each word to uppercase, except for the first word
    const capitalizedWords = words.map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();
        return `${firstLetter}${restOfWord}`;
    });

    // Join the words together without spaces
    return capitalizedWords.join('');
}

function capitalize(string) {
    if (typeof string !== 'string') {
        return string;
    }
    const firstLetter = string.charAt(0).toUpperCase();
    const restOfWord = string.slice(1).toLowerCase();

    return `${firstLetter}${restOfWord}`;
}

function kebabCase(string) {
    if (typeof string !== 'string') {
        return string;
    }

    // Replace all non-alphanumeric characters with hyphens
    const stringWithHyphens = string.replace(/[^0-9a-zA-Z]/g, '-');

    // Replace all consecutive hyphens with a single hyphen
    const stringWithSingleHyphens = stringWithHyphens.replace(/-+/g, '-');

    // Remove hyphens from the beginning and end of the string
    const stringWithoutLeadingOrTrailingHyphens =
        stringWithSingleHyphens.replace(/^-+|-+$/g, '');

    // Convert the string to lowercase
    return stringWithoutLeadingOrTrailingHyphens.toLowerCase();
}

function lowerCase(string) {
    if (typeof string !== 'string') {
        return string;
    }
    return string.toLowerCase();
}

function startCase(string) {
    if (typeof string !== 'string') {
        return string;
    }
    // Replace all non-alphanumeric characters with spaces
    const stringWithSpaces = string.replace(/[^0-9a-zA-Z]/g, ' ');

    // Split at the capitalized letters and at spaces
    const words = stringWithSpaces
        .split(/(?=[A-Z][a-z])|(?=[0-9])|(?<=[0-9])| /)
        .filter(Boolean);

    // Capitalize the first letter of each word
    const capitalizedWords = words.map((word) => {
        return capitalize(word);
    });

    // Join the words together with spaces
    return capitalizedWords.join(' ');
}

function upperCase(string) {
    if (typeof string !== 'string') {
        return string;
    }
    return string.toUpperCase();
}

function upperFirst(string) {
    if (typeof string !== 'string') {
        return string;
    }
    const firstLetter = string.charAt(0).toUpperCase();
    const restOfWord = string.slice(1);
    return `${firstLetter}${restOfWord}`;
}

export {
    camelCase,
    capitalize,
    kebabCase,
    lowerCase,
    startCase,
    upperCase,
    upperFirst
};
