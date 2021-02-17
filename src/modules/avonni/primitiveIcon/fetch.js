// Cache for promises that import icon templates
const importPromises = {};
const iconTemplateCache = {};

export function hasIconLibrary(dir, category) {
    const cacheKey = makeCacheKey(dir, category);
    return !!iconTemplateCache[cacheKey];
}

export function getIconLibrary(dir, category) {
    const cacheKey = makeCacheKey(dir, category);
    return iconTemplateCache[cacheKey] || null;
}

export function fetchIconLibrary(dir, category) {
    const cacheKey = makeCacheKey(dir, category);

    // If icon template is being requested, return the cached promise
    if (importPromises[cacheKey]) {
        return importPromises[cacheKey];
    }

    const promise = fetchIconTemplate(dir, category);

    promise
        .then((tmpl) => {
            iconTemplateCache[cacheKey] = tmpl;
            delete importPromises[cacheKey];
        })
        .catch(() => {
            delete importPromises[cacheKey];
        });

    // Cache the promise to import
    importPromises[cacheKey] = promise;

    return promise;
}

function makeCacheKey(dir, category) {
    return `${category}${dir}`;
}

// eslint-disable-next-line @lwc/lwc/no-async-await
async function fetchIconTemplate(dir, category) {
    if (dir === 'rtl') {
        switch (category) {
            case 'utility': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesUtilityRtl'
                );
                return Lib;
            }
            case 'action': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesActionRtl'
                );
                return Lib;
            }
            case 'standard': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesStandardRtl'
                );
                return Lib;
            }
            case 'doctype': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesDoctypeRtl'
                );
                return Lib;
            }
            case 'custom': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesCustomRtl'
                );
                return Lib;
            }
            default:
                return null;
        }
    } else {
        switch (category) {
            case 'utility': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesUtility'
                );
                return Lib;
            }
            case 'action': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesAction'
                );
                return Lib;
            }
            case 'standard': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesStandard'
                );
                return Lib;
            }
            case 'doctype': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesDoctype'
                );
                return Lib;
            }
            case 'custom': {
                // eslint-disable-next-line @lwc/lwc/no-async-await
                const { default: Lib } = await import(
                    'lightning/iconSvgTemplatesCustom'
                );
                return Lib;
            }
            default:
                return null;
        }
    }
}
