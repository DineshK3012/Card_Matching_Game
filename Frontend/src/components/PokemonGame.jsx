import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useGameStats from '../hooks/useGameStats';
import { authAtom } from '../recoil/authAtom'; // Assuming you store the authenticated user details in authAtom
import { getPokemonGrid } from '../../public/pokemon';
import '../flip.css';
import useAuth from "../hooks/useAuth.js"; // Import custom CSS

const PokemonGame = ({ gameSize, highestScore, onGameOver }) => {
    const [pokemonGrid, setPokemonGrid] = useState([]);
    const [flippedStatus, setFlippedStatus] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isFlippingAllowed, setIsFlippingAllowed] = useState(false);
    const [canFlip, setCanFlip] = useState(true);
    const [moves, setMoves] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [auth, setAuth] = useRecoilState(authAtom);
    const {loadCurrentUser} = useAuth();
    const { updateScore} = useGameStats();

    useEffect(() => {
        const grid = getPokemonGrid(gameSize);
        setPokemonGrid(grid);
        setFlippedStatus(Array(gameSize * 2).fill(false));

        const timer = setTimeout(() => {
            setFlippedStatus(Array(gameSize * 2).fill(true));
            setIsFlippingAllowed(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, [gameSize]);

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;
            setCanFlip(false);

            if (firstCard.id === secondCard.id) {
                setFlippedStatus((prevFlippedStatus) =>
                    prevFlippedStatus.map((flip, index) =>
                        index === firstCard.index || index === secondCard.index ? false : flip
                    )
                );

                // Check if all cards are flipped
                if (!flippedStatus.some((status) => status)) {
                    setIsGameComplete(true);

                    // Check for new high score
                    if (moves < highestScore) {
                        setIsNewHighScore(true);
                    }

                    handleScoreUpdate(moves);
                }
            } else {
                setTimeout(() => {
                    setFlippedStatus((prevFlippedStatus) =>
                        prevFlippedStatus.map((flip, index) =>
                            index === firstCard.index || index === secondCard.index ? true : flip
                        )
                    );
                }, 1000);
            }

            setTimeout(() => {
                setSelectedCards([]);
                setCanFlip(true);
            }, 500);
        }
    }, [selectedCards]);

    const handleScoreUpdate = async (moves) => {
        if (auth.isAuthenticated) {
            try{
                await updateScore(moves)
                await loadCurrentUser();
            }catch (e) {
                console.log(e);
            }
        }
    };

    const handleFlip = (index) => {
        if (!isFlippingAllowed || !canFlip || selectedCards.some((card) => card.index === index)) return;

        setMoves((prevMoves) => prevMoves + 1);

        setFlippedStatus((prevFlippedStatus) =>
            prevFlippedStatus.map((flip, i) => (i === index ? false : flip))
        );

        setSelectedCards((prevSelectedCards) => [
            ...prevSelectedCards,
            { index, id: pokemonGrid[index].id },
        ]);
    };

    const handlePlayAgain = () => {
        setPokemonGrid(getPokemonGrid(gameSize));
        setFlippedStatus(Array(gameSize * 2).fill(false));
        setSelectedCards([]);
        setMoves(0);
        setIsGameComplete(false);
        setIsNewHighScore(false);
        setCanFlip(true);
        setIsFlippingAllowed(false);

        setTimeout(() => {
            setFlippedStatus(Array(gameSize * 2).fill(true));
            setIsFlippingAllowed(true);
        }, 1000);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-blue-100">
            <div className="flex justify-between items-center w-full max-w-4xl mb-6 px-4">
                <div className="text-2xl font-bold text-gray-700">Moves: {moves}</div>
                <div className="text-2xl font-bold text-gray-700">Best Score: {highestScore}</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6">
                {pokemonGrid.map((pokemon, index) => (
                    <div
                        key={index}
                        className={`pokemon-card relative w-32 h-40 cursor-pointer ${flippedStatus[index] ? 'flipped' : ''}`}
                        onClick={() => handleFlip(index)}
                    >
                        <div className="flip-card-inner">
                            <div className="flip-card-front absolute inset-0 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
                                <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 object-cover mb-2" />
                                <p className="text-lg font-semibold text-gray-700">{pokemon.name}</p>
                            </div>
                            <div className="flip-card-back absolute inset-0 bg-blue-500 rounded-lg shadow-lg p-4 flex items-center justify-center"></div>
                        </div>
                    </div>
                ))}
            </div>

            {isGameComplete && (
                <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
                    <div className={`popup bg-white p-8 rounded shadow-lg text-center ${isNewHighScore ? 'animate-bounce-twice' : ''}`}>
                        {isNewHighScore ? (
                            <div>
                                <h2 className="text-3xl font-bold mb-4 animate-pulse text-yellow-500">🎉 New High Score! 🎉</h2>
                                <p className="mb-4">You finished in {moves} moves. Congratulations on setting a new record!</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Game Completed!</h2>
                                <p className="mb-4">You finished in {moves} moves. Your best score is {highestScore} moves.</p>
                            </div>
                        )}
                        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={handlePlayAgain}>
                            Play Again
                        </button>
                        <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onGameOver}>
                            Go Back
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonGame;
