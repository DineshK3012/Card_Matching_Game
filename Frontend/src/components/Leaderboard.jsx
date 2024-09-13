import React, { useEffect } from 'react';
import useGameStats from '../hooks/useGameStats';

const Leaderboard = () => {
    const { leaderboard, fetchLeaderboard, loading } = useGameStats();

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    if (loading) return <div className="text-center text-gray-600">Loading leaderboard...</div>;

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center py-6 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leaderboard</h2>
                {leaderboard.length === 0 ? (
                    <p className="text-center text-gray-600">No leaderboard data available yet.</p>
                ) : (
                    <ul className="list-none">
                        {leaderboard.map((user, index) => (
                            <li
                                key={index}
                                className="py-2 px-4 border-b border-gray-200 last:border-b-0"
                            >
                                <span className="font-semibold">{index + 1}.</span> {user.username} - {user.bestScore} moves
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
