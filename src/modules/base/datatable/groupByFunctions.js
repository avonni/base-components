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

const countingRows = ([first, ...rest], condition, acc = 0) => {
    return (
        condition(first) && ++acc,
        rest.length ? countingRows(rest, condition, acc) : acc
    );
};

const isUndefined = (value) => {
    return value === undefined ? 'undefined' : value;
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
            obj.size = countingRows(records, (row) => {
                let noUndefined = true;
                for (let i = 1; i < groupBy.length; i++) {
                    if (row[groupBy[i]] === undefined) {
                        noUndefined = false;
                        break;
                    }
                }
                return row[groupBy[0]] === obj.label && noUndefined;
            });
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
