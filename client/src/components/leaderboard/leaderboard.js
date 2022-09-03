import React, { useState, useEffect } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { getLevels } from '../../utils/levelAction';

const Leaderboard = () => {
    const [levelData, setLevelData] = useState(null);

    useEffect(() => {
        let mounted = true;
        const getLevelsData = async () => {
            const data = await getLevels();
            if (data) {
                //sort data
                const compare = (a, b) => {
                    if (a.level < b.level) {
                        return -1;
                    } else if (a.level === b.level && a.bestTime < b.bestTime) {
                        return -1;
                    } else if (a.level === b.level && a.bestTime > b.bestTime) {
                        return 1;
                    }
                    return 0;
                };
                const sortedLevelData = data.levels.sort(compare);
                //set states
                if (mounted) setLevelData(sortedLevelData);
            }
        };
        getLevelsData();
        return () => {
            mounted = false;
        };
    }, []);

    if (!levelData)
        return (
            <Container className="h-100 flex-xy-center">
                <Spinner variant="primary" animation="border" role="status" className="mr-2" />
                Loading Leaderboard...
            </Container>
        );

    return (
        <div className="p-5">
            <div className="text-center m-1">
                <h2>Leaderboard</h2>
                <p className="text-muted">
                    Best time and number of moves are updated when time and moves are less than or
                    equal to previous attempt.
                </p>
            </div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Username</th>
                        <th>Best Time (seconds)</th>
                        <th>Number of Moves</th>
                    </tr>
                </thead>
                <tbody>
                    {levelData.map((data) => {
                        return (
                            <tr>
                                <td>{data.level}</td>
                                <td>{data.username}</td>
                                <td>{data.bestTime}</td>
                                <td>{data.bestMoves}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Leaderboard;
