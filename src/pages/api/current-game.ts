import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_KEY = process.env.STEAM_KEY;
const STEAM_ID = '76561199519078335';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const playerSummariesUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/`;
    const params = {
        key: API_KEY,
        steamids: STEAM_ID,
    };

    try {
        const response = await axios.get(playerSummariesUrl, { params });
        const players = response.data.response.players;

        if (players.length > 0) {
            const player = players[0];
            const gameId = player.gameid;
            if (gameId) {
                const gameDetailsUrl = `https://store.steampowered.com/api/appdetails?appids=${gameId}`;
                const gameDetailsResponse = await axios.get(gameDetailsUrl);
                const gameDetails = gameDetailsResponse.data[gameId].data;
                res.status(200).json({ currentGame: player.gameextrainfo, gameDetails });
                return;
            }
        }

        res.status(200).json({ currentGame: null, gameDetails: null });
    } catch (error) {
        console.error('Error fetching current game:', error);
        res.status(500).json({ error: 'Error fetching current game' });
    }
};

export default handler;