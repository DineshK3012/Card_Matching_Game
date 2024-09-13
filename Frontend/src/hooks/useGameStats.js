import { useState } from 'react';
import { getPastScores, getLeaderboard, updateUserScore } from '../api/gameStats';
import { toast } from 'react-toastify';

const useGameStats = () => {
    const [pastScores, setPastScores] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user's past scores
    const fetchPastScores = async () => {
        setLoading(true);
        try {
            const {data} = await getPastScores();
            setPastScores(data.pastScores);
            // toast.success('Past scores loaded successfully!');
        } catch (error) {
            toast.error(`Failed to load past scores: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    // Fetch leaderboard stats
    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const {data} = await getLeaderboard();
            setLeaderboard(data);
            // toast.success('Leaderboard loaded successfully!');
        } catch (error) {
            toast.error(`Failed to load leaderboard: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    // Update user's score
    const updateScore = async (score) => {
        setLoading(true);
        try {
            const data = await updateUserScore({score});
            toast.success('Score updated successfully!');
            return data;
        } catch (error) {
            toast.error(`Failed to update score: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return { pastScores, leaderboard, fetchPastScores, fetchLeaderboard, updateScore, loading };
};

export default useGameStats;
