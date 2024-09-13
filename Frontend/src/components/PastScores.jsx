import React, { useEffect } from 'react';
import useGameStats from '../hooks/useGameStats';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../recoil/authAtom';

const PastScores = () => {
    const { pastScores, fetchPastScores, loading } = useGameStats();

    useEffect(() => {
        fetchPastScores();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Past Scores</h2>

            {pastScores.length === 0 ? (
                <p>No scores available yet. Play some games!</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Date</th>
                        <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Score (Moves)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pastScores.map((score, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{new Date(score.date).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">{score.score} moves</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PastScores;
