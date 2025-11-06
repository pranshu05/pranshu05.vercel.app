export const extractColorsFromImage = async (imageUrl: string, colorCount: number = 10): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Canvas context not available'));
                    return;
                }

                const size = 100;
                canvas.width = size;
                canvas.height = size;
                ctx.drawImage(img, 0, 0, size, size);

                const imageData = ctx.getImageData(0, 0, size, size);
                const pixels = imageData.data;

                const colors: { r: number; g: number; b: number; count: number }[] = [];
                const colorMap = new Map<string, number>();

                for (let i = 0; i < pixels.length; i += 4) {
                    const r = pixels[i];
                    const g = pixels[i + 1];
                    const b = pixels[i + 2];
                    const a = pixels[i + 3];

                    if (a < 128) continue;

                    const key = `${Math.floor(r / 8)},${Math.floor(g / 8)},${Math.floor(b / 8)}`;

                    colorMap.set(key, (colorMap.get(key) || 0) + 1);
                }

                const sortedColors = Array.from(colorMap.entries())
                    .map(([key, count]) => {
                        const [r, g, b] = key.split(',').map(Number);
                        return {
                            r: r * 8 + 4,
                            g: g * 8 + 4,
                            b: b * 8 + 4,
                            count,
                        };
                    })
                    .sort((a, b) => b.count - a.count);

                const selectedColors: string[] = [];
                const minDistance = 50;

                for (const color of sortedColors) {
                    if (selectedColors.length >= colorCount) break;

                    const isDiverse = selectedColors.every((hexColor) => {
                        const existing = hexToRgb(hexColor);
                        if (!existing) return true;

                        const distance = Math.sqrt(
                            Math.pow(color.r - existing.r, 2) +
                            Math.pow(color.g - existing.g, 2) +
                            Math.pow(color.b - existing.b, 2)
                        );

                        return distance > minDistance;
                    });

                    if (isDiverse) {
                        selectedColors.push(rgbToHex(color.r, color.g, color.b));
                    }
                }

                resolve(selectedColors);
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageUrl;
    });
};

const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b]
        .map(x => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

export const extractColorsFromMultipleImages = async (imageUrls: string[], totalColors: number = 10): Promise<string[]> => {
    const colorsPerImage = Math.ceil(totalColors / imageUrls.length);

    try {
        const colorPromises = imageUrls.map(url =>
            extractColorsFromImage(url, colorsPerImage).catch(() => [])
        );

        const allColors = await Promise.all(colorPromises);
        const flattenedColors = allColors.flat();

        // Remove duplicates and return desired number of colors
        const uniqueColors = Array.from(new Set(flattenedColors));
        return uniqueColors.slice(0, totalColors);
    } catch (error) {
        console.error('Error extracting colors:', error);
        return [];
    }
};