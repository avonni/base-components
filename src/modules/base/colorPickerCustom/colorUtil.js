export function fullHexValue(hex) {
    if (Array.isArray(hex) && hex.length > 0) {
        hex = hex[0];
    }
    if (hex && hex.length <= 6 && hex.charAt(0) !== '#') {
        hex = '#' + hex;
    }
    const isInputValid = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    if (!isInputValid) {
        hex = '#000000';
    }
    // Converting 3 digit hex color to 6 digit hex color
    if (hex.length === 4) {
        hex =
            '#' +
            hex.charAt(1) +
            hex.charAt(1) +
            hex.charAt(2) +
            hex.charAt(2) +
            hex.charAt(3) +
            hex.charAt(3);
    }
    return hex;
}

export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        fullHexValue(hex)
    );
    if (!result) {
        return null;
    }
    return {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
    };
}

export function rgbToHex(rgb) {
    const r = rgb.red;
    const g = rgb.green;
    const b = rgb.blue;

    const bin = (r << 16) | (g << 8) | b;
    return (function (hex) {
        return new Array(7 - hex.length).join('0') + hex;
    })(bin.toString(16).toUpperCase());
}

export function rgbToHsl(rgb) {
    const r1 = rgb.red / 255;
    const g1 = rgb.green / 255;
    const b1 = rgb.blue / 255;
    const maxColor = Math.max(r1, g1, b1);
    const minColor = Math.min(r1, g1, b1);
    // Calculate L:
    let L = (maxColor + minColor) / 2;
    let S = 0;
    let H = 0;
    if (maxColor !== minColor) {
        // Calculate S:
        if (L < 0.5) {
            S = (maxColor - minColor) / (maxColor + minColor);
        } else {
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }

        // Calculate H:
        if (r1 === maxColor) {
            const x = g1 - b1,
                y = maxColor - minColor;
            H = x / y;
        } else if (g1 === maxColor) {
            const x = b1 - r1,
                y = maxColor - minColor,
                z = x / y;
            H = 2.0 + z;
        } else {
            const x = r1 - g1,
                y = maxColor - minColor,
                z = x / y;
            H = 4.0 + z;
        }
    }

    L *= 100;
    S *= 100;
    H *= 60;
    if (H < 0) {
        H += 360;
    }
    const result = {
        hue: H,
        saturation: S,
        lightness: L
    };
    return result;
}

export function rgbToPosition(rgb, canvas) {
    const hsv = rgbToHsv(rgb);
    const saturation = hsv.saturation / 100,
        brightness = hsv.brightness / 100;
    const x = canvas.x * saturation;
    const y = canvas.y * (1 - brightness);
    return { x, y };
}

export function rgbToHsv(rgb) {
    const r = rgb.red / 255;
    const g = rgb.green / 255;
    const b = rgb.blue / 255;

    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    const d = max - min,
        s = max === 0 ? 0 : d / max,
        v = max;
    let h, x, y;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r:
                x = g - b;
                y = x / d;
                h = y + (g < b ? 6 : 0);
                break;
            case g:
                x = b - r;
                y = x / d;
                h = y + 2;
                break;
            case b:
                x = r - g;
                y = x / d;
                h = y + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }

    const result = {
        hue: h * 360,
        saturation: s * 100,
        brightness: v * 100
    };
    return result;
}
