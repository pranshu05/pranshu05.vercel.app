import Card from '@/components/UI/Card';

interface ColorPaletteProps {
    colors: string[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
    if (!colors.length) return null;

    return (
        <div className="mt-6 relative">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">This palette showcases the dominant colors extracted from my top artists&apos; images. Each hue represents the visual essence of the music that&apos;s been coloring my week, creating a unique visual fingerprint of my current musical taste.</p>
            <Card className="p-0 overflow-hidden rounded-none">
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-0">
                    {colors.map((color, index) => (
                        <div key={index} className="aspect-square relative group cursor-pointer transition-transform hover:z-10" style={{ backgroundColor: color }} title={color}>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm">
                                <span className="text-xs text-white font-mono px-1">{color}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default ColorPalette;