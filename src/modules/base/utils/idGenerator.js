export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

const READABLE_WORDS = {
    adj: [
        'brisk',
        'calm',
        'daring',
        'eager',
        'fuzzy',
        'gentle',
        'hollow',
        'icy',
        'jolly',
        'keen',
        'lucky',
        'mellow',
        'nimble',
        'quiet',
        'rusty',
        'sunny',
        'tidy',
        'vivid',
        'witty',
        'zesty'
    ],
    animal: [
        'ant',
        'bear',
        'cat',
        'dolphin',
        'eagle',
        'fox',
        'goat',
        'hawk',
        'ibis',
        'jaguar',
        'koala',
        'lynx',
        'moose',
        'newt',
        'otter',
        'panda',
        'quail',
        'ram',
        'seal',
        'tiger',
        'uakari',
        'vole',
        'wolf',
        'yak',
        'zebra'
    ]
};

/**
 * Utility function to generate a readable ID for an instance of a component.
 * Useful for debugging purposes.
 */
export function readableId(prefix = 'cmp') {
    const a =
        READABLE_WORDS.adj[(Math.random() * READABLE_WORDS.adj.length) | 0];
    const n =
        READABLE_WORDS.animal[
            (Math.random() * READABLE_WORDS.animal.length) | 0
        ];
    // 16 bits of randomness → 3–4 hex chars, short but useful
    const r =
        (crypto?.getRandomValues?.(new Uint16Array(1))[0] ??
            Math.random() * 0xffff) | 0;
    return `${prefix}/${a}-${n}-${r.toString(16)}`;
}
