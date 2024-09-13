import React, { useEffect } from 'react';
import useGameStats from '../hooks/useGameStats';
import {Table} from "flowbite-react";

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
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>S. No.</Table.HeadCell>
                            <Table.HeadCell>Score/Moves</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {
                                pastScores.map((score, index) => {
                                    return (
                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>{index + 1}</Table.Cell>
                                        <Table.Cell>{score.score}</Table.Cell>
                                        <Table.Cell>{new Date(score.date).toLocaleDateString()}</Table.Cell>
                                    </Table.Row>
                                    );
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default PastScores;
