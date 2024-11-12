import { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 10 : 100));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-neutral-950">
            <div className="w-4/5 md:w-3/4 lg:w-1/2 h-2 bg-zinc-700 overflow-hidden">
                <div className="h-full bg-zinc-300" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default Preloader;