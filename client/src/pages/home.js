import React, { useEffect, useState } from 'react';
import Game from '../components/game/game';
import { useAuthContext } from '../utils/authContext';
import { alert as Alert } from '../components/alert/alert';
import { Container } from 'react-bootstrap';
const Home = ({ resReceived }) => {
    const auth = useAuthContext();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // if server has already already responded and user is unauthorized
        if (resReceived && !auth.isAuth) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [auth.isAuth, resReceived]);

    const message = (
        <div>
            <a href="/signin">Sign in</a> to have your scores posted onto the leaderboard.
        </div>
    );

    return (
        <div className="w-100 home-container">
            {showAlert ? (
                <Container className="d-block my-3 p-0">
                    <Alert message={message} showAlert={showAlert} setShowAlert={setShowAlert} />
                </Container>
            ) : <div className="mt-5"></div>}
            <Game />
        </div>
    );
};

export default Home;
