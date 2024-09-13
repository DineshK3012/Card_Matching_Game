import React, { useState } from 'react';
import PokemonGame from "../components/PokemonGame.jsx";

const GamePage = () => {
    const [playGame, setPlayGame] = useState(false);
    const highestScore = 12; // Hardcoded highest score for now

    const handlePlayGame = () => {
        setPlayGame(true);
    };

    const handleGameOver = () => {
        setPlayGame(false);
    };

    return (
        <div className="min-h-screen bg-blue-100">
            {!playGame ? (
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <h1 className="text-4xl font-bold mb-6">Welcome to the Pokémon Game!</h1>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handlePlayGame}
                    >
                        Play Game
                    </button>
                </div>
            ) : (
                <PokemonGame gameSize={2} highestScore={highestScore} onGameOver={handleGameOver} />
            )}
        </div>
    );
};

export default GamePage;
