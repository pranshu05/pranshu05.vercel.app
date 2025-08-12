import React, { useEffect, useState, useRef } from "react";

interface ColorAsciiProps {
    src: string;
    char?: string;
    fontSize?: number;
    lineHeight?: number;
    colorMode?: "color" | "bw";
    maxPixels?: number;
    style?: React.CSSProperties;
    density?: number;
}

const DEFAULT_CHAR = "█";
const DEFAULT_CHARSET = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export default function ColorAscii({ src, char = DEFAULT_CHAR, fontSize = 2, lineHeight = 2, colorMode = "color", maxPixels = 500000, style, density = 1 }: ColorAsciiProps) {
    const [rows, setRows] = useState<React.ReactNode[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions(prev => {
                    if (prev.width !== rect.width) {
                        return { width: rect.width, height: 0 };
                    }
                    return prev;
                });
            }
        };

        updateDimensions();
        const resizeObserver = new ResizeObserver(updateDimensions);

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        if (dimensions.width === 0) return;

        let cancelled = false;
        setIsLoading(true);
        setError(null);
        setRows(null);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onerror = (ev) => {
            if (cancelled) return;
            setError("Failed to load image (CORS or invalid path).");
            setIsLoading(false);
        };

        img.onload = () => {
            if (cancelled) return;

            try {
                const aspect = img.height / img.width;
                const charWidth = fontSize * 0.6;
                const availableWidth = dimensions.width;
                const targetCharsWidth = Math.floor(availableWidth / charWidth);
                const tgtWidth = Math.max(20, Math.min(targetCharsWidth, Math.floor(Math.sqrt(maxPixels / aspect))));
                const tgtHeight = Math.max(10, Math.floor(tgtWidth * aspect));

                let finalWidth = tgtWidth;
                let finalHeight = tgtHeight;

                if (tgtWidth * tgtHeight > maxPixels) {
                    const scale = Math.sqrt(maxPixels / (tgtWidth * tgtHeight));
                    finalWidth = Math.floor(tgtWidth * scale);
                    finalHeight = Math.floor(tgtHeight * scale);
                }

                const canvas = document.createElement("canvas");
                canvas.width = finalWidth;
                canvas.height = finalHeight;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    setError("Canvas not supported in this environment.");
                    setIsLoading(false);
                    return;
                }

                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

                const imageData = ctx.getImageData(0, 0, finalWidth, finalHeight).data;
                const outRows: React.ReactNode[] = [];
                let index = 0;
                const bwChars = DEFAULT_CHARSET;

                for (let y = 0; y < finalHeight; y++) {
                    const rowSpans: React.ReactNode[] = [];
                    for (let x = 0; x < finalWidth; x++) {
                        const r = imageData[index++];
                        const g = imageData[index++];
                        const b = imageData[index++];
                        const a = imageData[index++];

                        if (colorMode === "color") {
                            if (a < 10) {
                                rowSpans.push(
                                    <span key={`${x}-${y}`} style={{ display: "inline-block", color: `rgba(0,0,0,0)`, fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: 'monospace', width: `${dimensions.width / finalWidth}px`, textAlign: 'center', height: `${lineHeight}px` }}>{char}</span>
                                );
                            } else {
                                const opacity = a / 255;
                                rowSpans.push(
                                    <span key={`${x}-${y}`} style={{ display: "inline-block", color: `rgba(${r}, ${g}, ${b}, ${opacity})`, fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: 'monospace', width: `${dimensions.width / finalWidth}px`, textAlign: 'center', height: `${lineHeight}px` }}>{char}</span>
                                );
                            }
                        } else {
                            const lum = Math.pow(0.2126 * Math.pow(r / 255, 2.2) + 0.7152 * Math.pow(g / 255, 2.2) + 0.0722 * Math.pow(b / 255, 2.2), 1 / 2.2) * 255;
                            const opacity = a / 255;

                            if (opacity < 0.1) {
                                rowSpans.push(
                                    <span key={`${x}-${y}`} style={{ display: "inline-block", fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: 'monospace', width: `${dimensions.width / finalWidth}px`, textAlign: 'center', opacity: 0, height: `${lineHeight}px` }}>{' '}</span>
                                );
                            } else {
                                const idx = Math.floor((lum / 255) * (bwChars.length - 1));
                                const c = bwChars[Math.max(0, bwChars.length - 1 - idx)];
                                rowSpans.push(
                                    <span key={`${x}-${y}`} style={{ display: "inline-block", fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: 'monospace', width: `${fontSize * 0.6}px`, textAlign: 'center', opacity: opacity }}>{c}</span>
                                );
                            }
                        }
                    }
                    outRows.push(
                        <div key={`row-${y}`} style={{ margin: 0, padding: 0, height: `${lineHeight}px`, display: 'flex' }}>{rowSpans}</div>
                    );
                }

                if (!cancelled) {
                    setRows(outRows);
                    setIsLoading(false);
                }
            } catch (err) {
                if (!cancelled) {
                    setError("Failed to process image. Please check the image source.");
                    setIsLoading(false);
                }
            }
        };

        return () => {
            cancelled = true;
        };
    }, [src, char, fontSize, lineHeight, colorMode, maxPixels, dimensions.width, density]);

    const containerStyle: React.CSSProperties = { width: '100%', height: 'auto', fontFamily: 'Courier New, Consolas, Monaco, monospace', lineHeight: `${lineHeight}px`, fontSize: `${fontSize}px`, margin: 0, padding: 0, display: 'block', backgroundColor: colorMode === "color" ? "#000" : "transparent", overflow: 'hidden', ...style, };

    return (
        <div ref={containerRef} style={containerStyle}>
            {isLoading && (
                <div style={{ color: "#666", textAlign: 'center', padding: '20px', fontSize: '14px' }}>Converting to ASCII art...</div>
            )}
            {error && (
                <div style={{ color: "#e74c3c", fontSize: '12px', padding: '10px', backgroundColor: '#fdf2f2', border: '1px solid #fecaca', borderRadius: '4px' }}>{error}</div>
            )}
            {rows && (
                <div style={{ display: 'inline-block', width: '100%', height: 'auto' }}>{rows}</div>
            )}
        </div>
    );
}