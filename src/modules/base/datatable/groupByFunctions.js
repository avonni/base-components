// const countPerObject = (records, key, value, undefinedGroup) => {
//     if (value === 'undefined') {
//         return undefinedGroup;
//     }
//     return records.reduce((accumulator, currentVal) => {
//         if (currentVal[key] === value) {
//             accumulator += 1;
//         }
//         return accumulator;
//     }, 0);
// }

const isUndefined = (value) => {
    return value === undefined ? 'undefined' : value;
};

// const removeUndefinedRow = (result) => {
//     if (result.label !== 'undefined') {
//         return result;
//     }
//     return undefined;
// }

const removeUndefined = (formattedResult) => {
    const noUndefinedResult = [];
    formattedResult.forEach((result) => {
        if (result.label === 'undefined') {
            noUndefinedResult.push();
        } else {
            noUndefinedResult.push(result);
        }
    });
    return noUndefinedResult;
};

const recursiveGroupBy = (records, groupBy, level) => {
    if (typeof groupBy === 'string') {
        groupBy = groupBy.split();
    }
    let field = groupBy[0];
    if (!field) return records;
    let recursiveData = Object.values(
        records.reduce((obj, current) => {
            if (!obj[current[field]])
                obj[current[field]] = {
                    label: isUndefined(current[field]),
                    group: [],
                    multiLevelGroupBy: groupBy.length !== 1,
                    level: level
                };
            obj[current[field]].group.push(current);
            return obj;
        }, {})
    );

    if (groupBy.length) {
        recursiveData.forEach((obj) => {
            obj.size = obj.group.length;
            obj.group = recursiveGroupBy(
                obj.group,
                groupBy.slice(1),
                level + 1
            );
        });
    }
    return recursiveData;
};

const recursiveGroupByNoUndefined = (records, groupBy, level) => {
    if (typeof groupBy === 'string') {
        groupBy = groupBy.split();
    }
    let field = groupBy[0];
    if (!field) return records;
    let recursiveData = Object.values(
        records.reduce((obj, current) => {
            if (!obj[current[field]])
                obj[current[field]] = {
                    label: isUndefined(current[field]),
                    group: [],
                    multiLevelGroupBy: groupBy.length !== 1,
                    level: level
                };
            obj[current[field]].group.push(current);
            return obj;
        }, {})
    );

    if (groupBy.length) {
        recursiveData.forEach((obj) => {
            obj.size = obj.group.length;
            obj.group = recursiveGroupByNoUndefined(
                obj.group,
                groupBy.slice(1),
                level + 1
            );
        });
    }
    return removeUndefined(recursiveData);
};

export { recursiveGroupBy, recursiveGroupByNoUndefined };
