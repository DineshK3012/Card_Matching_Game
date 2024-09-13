import React, { useState } from 'react';
import PokemonGame from "../components/PokemonGame.jsx";
import PastScores from "../components/PastScores.jsx";
import { useRecoilValue } from 'recoil';
import { authAtom } from '../recoil/authAtom';

const GamePage = () => {
    const [playGame, setPlayGame] = useState(false);
    // Get user details from authAtom
    const auth = useRecoilValue(authAtom);
    const { user } = auth || {};

    // Use the best score from the user details as the highest score
    const highestScore = user?.bestScore;

    const handlePlayGame = () => {
        setPlayGame(true);
    };

    const handleGameOver = () => {
        setPlayGame(false);
    };

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center py-6 px-4">
            {!playGame ? (
                <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-xl font-semibold mb-4">Your Best Score: {`${highestScore ? highestScore + " moves": "Not Played Yet"}`}</p>
                    <button
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors mb-6"
                        onClick={handlePlayGame}
                    >
                        Play Game
                    </button>
                    <div className="w-full max-w-md">
                        <PastScores />
                    </div>
                </div>
            ) : (
                <PokemonGame gameSize={2} highestScore={highestScore} onGameOver={handleGameOver} />
            )}
        </div>
    );
};

export default GamePage;
