import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const CurrentGame: React.FC = () => {
    const [currentGame, setCurrentGame] = useState<string | null>(null);
    const [gameImage, setGameImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentGame = async () => {
            try {
                const response = await axios.get('/api/current-game');
                const { currentGame, gameDetails } = response.data;
                setCurrentGame(currentGame);
                if (gameDetails) {
                    setGameImage(gameDetails.capsule_image);
                } else {
                    setGameImage(null);
                }
            } catch (error) {
                console.error('Error fetching current game:', error);
                setCurrentGame(null);
                setGameImage(null);
            }
        };

        fetchCurrentGame();
    }, []);

    return (
        <a href='https://steamcommunity.com/id/pranshu05/' target='_blank'>
            {currentGame && (
                <div className='w-fit mx-auto my-4 bg-transparent outline outline-[2px] outline-zinc-700 rounded-lg p-3 flex gap-3 align-middle items-center'>
                    {gameImage && <Image className='rounded-md grayscale' width={231} height={87} src={gameImage} alt={`${currentGame} logo`} />}
                    <div className='flex flex-col'>
                        <p className='text-zinc-400'>Currently playing</p>
                        <p className='font-bold'>{currentGame}</p>
                    </div>
                </div>
            )}
        </a>
    );
};

export default CurrentGame;