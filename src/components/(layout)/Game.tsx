import { useState, useEffect, useCallback } from 'react';

type Target = { id: number; x: number; y: number };

const Game: React.FC = () => {
    const [showGame, setShowGame] = useState(false);
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [targets, setTargets] = useState<Target[]>([]);

    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setTimeLeft(10);
        generateTargets();
    };

    const generateTargets = useCallback(() => {
        const newTargets: Target[] = [];
        for (let i = 0; i < 3; i++) {
            newTargets.push({
                id: Math.random(),
                x: Math.random() * 80,
                y: Math.random() * 60,
            });
        }
        setTargets(newTargets);
    }, []);

    const hitTarget = (targetId: number) => {
        setScore(prev => prev + 1);
        setTargets(prev => prev.filter(t => t.id !== targetId));
        setTimeout(() => {
            if (gameActive) {
                setTargets(prev => [...prev, {
                    id: Math.random(),
                    x: Math.random() * 80,
                    y: Math.random() * 60,
                }]);
            }
        }, 500);
    };

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameActive(false);
            setTargets([]);
        }
    }, [gameActive, timeLeft]);

    useEffect(() => {
        if (gameActive) {
            const interval = setInterval(() => {
                generateTargets();
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [gameActive, generateTargets]);

    return (
        <>
            <button onClick={() => setShowGame(!showGame)} className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm transition-colors z-20 shadow-lg">{showGame ? '🎮 Good Luck!' : '🎮 Bored? Play!'}</button>
            {showGame && (
                <div className="fixed inset-0 bg-neutral-950 bg-opacity-50 flex items-center justify-center z-30">
                    <div className="bg-neutral-800 p-6 rounded-lg max-w-md w-full mx-4 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Bug Squasher! 🐛</h3>
                            <button onClick={() => setShowGame(false)} className="text-gray-400 hover:text-white text-xl">×</button>
                        </div>
                        {!gameActive ? (
                            <div className="text-center">
                                <p className="text-gray-300 mb-4">Squash the bugs before they escape! Click them as fast as you can!</p>
                                {score > 0 && (<p className="text-green-400 mb-4">Final Score: {score} bugs squashed! 🎉</p>)}
                                <button onClick={startGame} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded transition-colors">Start Game</button>
                            </div>
                        ) : (
                            <div>
                                <div className="flex justify-between mb-4 text-white">
                                    <span>Score: {score}</span>
                                    <span>Time: {timeLeft}s</span>
                                </div>
                                <div className="relative bg-neutral-700 rounded h-48 overflow-hidden">
                                    {targets.map(target => (
                                        <button key={target.id} onClick={() => hitTarget(target.id)} className="absolute w-8 h-8 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer animate-pulse" style={{ left: `${target.x}%`, top: `${target.y}%`, }}>🐛</button>
                                    ))}
                                    {targets.length === 0 && gameActive && (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">Generating bugs...</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Game;