import { useEffect, useState } from 'react';
import { extractColorsFromMultipleImages } from '@/lib/ColorExtractor';
import { paletteDB, getWeekNumber } from '@/lib/PaletteDB';
import MetaTags from '@/components/SEO/MetaTags';

interface WeekPalette {
    week: number;
    year: number;
    colors: string[];
    docId: string;
    exists: boolean;
}

export default function SaveWeeklyPalette() {
    const [error, setError] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string>('');
    const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
    const [currentWeek, setCurrentWeek] = useState<number>(0);
    const [currentYear, setCurrentYear] = useState<number>(0);
    const [loadingWeek, setLoadingWeek] = useState<number | null>(null);
    const [weekPalettes, setWeekPalettes] = useState<Map<number, WeekPalette>>(new Map());
    const [fetchingPalettes, setFetchingPalettes] = useState<boolean>(true);

    useEffect(() => {
        const now = new Date();
        const week = getWeekNumber(now);
        const year = now.getFullYear();
        setCurrentWeek(week);
        setCurrentYear(year);

        const keyFromStorage = typeof window !== 'undefined' ? localStorage.getItem('paletteApiKey') : null;
        if (keyFromStorage) {
            setApiKey(keyFromStorage);
        }

        fetchAllPalettes(year);
    }, []);

    const fetchAllPalettes = async (year: number) => {
        setFetchingPalettes(true);
        try {
            const palettesMap = new Map<number, WeekPalette>();
            const allPalettes = await paletteDB.getPalettesByYear(year);

            allPalettes.forEach((palette: any) => {
                palettesMap.set(palette.week, {
                    week: palette.week,
                    year: palette.year,
                    colors: palette.colors || [],
                    docId: palette.id,
                    exists: true
                });
            });

            setWeekPalettes(palettesMap);
        } catch (error) {
            console.error('Error fetching palettes:', error);
        } finally {
            setFetchingPalettes(false);
        }
    };

    const saveApiKey = (key: string) => {
        if (key.trim()) {
            setApiKey(key.trim());
            if (typeof window !== 'undefined') {
                localStorage.setItem('paletteApiKey', key.trim());
            }
            setShowApiKeyInput(false);
            setError(null);
        }
    };

    const extractCurrentColors = async () => {
        try {
            const artistsResponse = await fetch('/api/top-artists');
            if (!artistsResponse.ok) {
                throw new Error('Failed to fetch top artists');
            }

            const artistsData = await artistsResponse.json();
            const imageUrls = artistsData.artists
                .map((a: any) => a.image)
                .filter((img: string) => img);

            if (imageUrls.length === 0) {
                throw new Error('No artist images found');
            }

            const colors = await extractColorsFromMultipleImages(imageUrls, 10);

            if (colors.length === 0) {
                throw new Error('Failed to extract colors');
            }

            return colors;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    };

    const extractColorsForWeek = async (week: number, year: number) => {
        try {
            const artistsResponse = await fetch(`/api/palettes/weekly-artists?week=${week}&year=${year}&limit=6`);
            if (!artistsResponse.ok) {
                const errorData = await artistsResponse.json();
                throw new Error(errorData.message || 'Failed to fetch weekly artists');
            }

            const artistsData = await artistsResponse.json();
            const imageUrls = artistsData.artists
                .map((a: any) => a.image)
                .filter((img: string) => img);

            if (imageUrls.length === 0) {
                throw new Error(`No artist images found for Week ${week}. You may not have listened to music during this week.`);
            }

            const colors = await extractColorsFromMultipleImages(imageUrls, 10);

            if (colors.length === 0) {
                throw new Error('Failed to extract colors');
            }

            return colors;
        } catch (err) {
            console.error('Error:', err);
            throw err;
        }
    };

    const saveForWeek = async (week: number) => {
        if (!apiKey) {
            setError('Please set your API key first');
            setShowApiKeyInput(true);
            return;
        }

        try {
            setLoadingWeek(week);
            setError(null);
            let colors: string[];

            if (week === currentWeek) {
                colors = await extractCurrentColors();
            } else {
                colors = await extractColorsForWeek(week, currentYear);
            }

            const saveResponse = await fetch('/api/palettes/save-weekly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({
                    colors: colors,
                    week: week,
                    year: currentYear
                })
            });

            const saveResult = await saveResponse.json();

            if (!saveResponse.ok) {
                if (saveResponse.status === 409) {
                    setError(`Week ${week} already has a saved palette`);
                } else if (saveResponse.status === 401) {
                    setError('Invalid API key');
                    setShowApiKeyInput(true);
                } else {
                    throw new Error(saveResult.message || saveResult.error || 'Failed to save');
                }
                setLoadingWeek(null);
                return;
            }

            setWeekPalettes(prev => {
                const newMap = new Map(prev);
                newMap.set(week, {
                    week: week,
                    year: currentYear,
                    colors: colors,
                    docId: saveResult.docId,
                    exists: true
                });
                return newMap;
            });

            setLoadingWeek(null);
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            setLoadingWeek(null);
        }
    };

    return (
        <>
            <MetaTags title="Save Weekly Palettes | Pranshu05" description="Manage and save weekly color palettes extracted from top artists" keywords="color palette, weekly colors, music visualization, Last.fm" canonicalUrl="/save-weekly-palette" />
            <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-zinc-100">Weekly Color Palettes</h1>
                {!apiKey ? (
                    <div className="mb-6">
                        <p className="text-zinc-300 text-sm mb-3">API key required to save palettes. <button onClick={() => setShowApiKeyInput(!showApiKeyInput)} className="link">Click here</button> to set it up.</p>
                        {showApiKeyInput && (<ApiKeyInput onSave={saveApiKey} />)}
                    </div>
                ) : (
                    <div className="mb-6 flex items-center justify-between">
                        <p className="text-zinc-400 text-sm">✓ API key saved</p>
                        <button onClick={() => setShowApiKeyInput(!showApiKeyInput)} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">{showApiKeyInput ? 'Hide' : 'Change'}</button>
                    </div>
                )}
                {showApiKeyInput && apiKey && (
                    <div className="mb-6"><ApiKeyInput onSave={saveApiKey} initialValue={apiKey} /></div>
                )}
                {error && (<p className="text-sm text-red-400 mb-4">Error: {error}</p>)}
                <h2 className="text-xl font-bold mt-6 mb-4 text-zinc-100">Weeks of {currentYear} {fetchingPalettes && <span className="text-sm text-zinc-500">(Loading...)</span>}</h2>
                <div className="mb-6">
                    {Array.from({ length: currentWeek }, (_, i) => i + 1).map(week => {
                        const palette = weekPalettes.get(week);
                        const exists = palette?.exists || false;
                        const isLoading = loadingWeek === week;

                        return (
                            <div key={week} className="relative">
                                {exists && palette ? (
                                    <div className="p-0 overflow-hidden rounded-none">
                                        <div className="grid grid-cols-10 gap-0">
                                            {palette.colors.slice(0, 10).map((color, idx) => (
                                                <div key={idx} className="aspect-square relative group cursor-pointer transition-transform hover:z-10" style={{ backgroundColor: color }} title={color}>
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm">
                                                        <span className="text-xs text-white font-mono px-1">{color}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-0 overflow-hidden rounded-none">
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => saveForWeek(week)} disabled={isLoading || !apiKey} className={`bg-zinc-800 w-full aspect-[10/1] text-sm font-medium transition-colors ${isLoading ? 'cursor-wait' : !apiKey ? 'cursor-not-allowed' : ''}`}>{isLoading ? 'Saving...' : `Save Palette for Week ${week}`}</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

function ApiKeyInput({ onSave, initialValue = '' }: { onSave: (key: string) => void; initialValue?: string }) {
    const [key, setKey] = useState(initialValue);

    return (
        <div>
            <label className="text-sm text-zinc-300 block mb-2">PALETTE_API_SECRET</label>
            <div className="flex gap-2">
                <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Paste your API key..." className="flex-1 bg-zinc-900 text-white px-3 py-2 rounded text-sm" onKeyPress={(e) => e.key === 'Enter' && onSave(key)} />
                <button onClick={() => onSave(key)} disabled={!key.trim()} className="disabled:cursor-not-allowed font-medium text-sm">Save</button>
            </div>
        </div>
    );
}