import React, { useState } from 'react';
import './App.css';

import bt21_img from './images/bt21b.png';
import ppulbatu_img from './images/ppulbatu.png';

function generateBoard() {
    const imgList = [
        ...Array(18).fill(bt21_img),
        ...Array(18).fill(ppulbatu_img),
    ];

    const shuffledImages = imgList.sort(() => Math.random() - 0.5);

    return shuffledImages;
}

function App() {
    const [images, setImages] = useState(generateBoard());
    const [isClicked, setIsClicked] = useState(Array(36).fill(false));
    const [numRevealed, setNumRevealed] = useState({ p1: 0, p2: 0 });
    const [currentPlayer, setCurrentPlayer] = useState('p1');
    const [scores, setScores] = useState({ p1: 0, p2: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');
    const [playerSelected, setPlayerSelected] = useState(false);

    const handleClick = (i) => {
        if (isClicked[i] || gameOver) return;

        const isP1 = currentPlayer === 'p1';
        const isBt21 = images[i].includes('bt21');

        const newClicked = [...isClicked];
        newClicked[i] = true;
        setIsClicked(newClicked);

        const correct = (isP1 && isBt21) || (!isP1 && !isBt21);

        if (!correct) {
            setTimeout(() => {
                setScores(prevScore => ({
                    ...prevScore,
                    [isP1 ? 'p2' : 'p1']: prevScore[isP1 ? 'p1' : 'p2'] + 1
                }));

                setGameOver(true);
                setMessage(`Game Over! ${currentPlayer === 'p1' ? 'Player 1' : 'Player 2'} clicked the wrong image.`);
            }, 500);
            return;
        }

        const updatedNumRevealed = {
            ...numRevealed,
            [currentPlayer]: numRevealed[currentPlayer] + 1
        };
        setNumRevealed(updatedNumRevealed);

        if (updatedNumRevealed[currentPlayer] === 18) {
            setTimeout(() => {
                setScores(prevScore => ({
                    ...prevScore,
                    [currentPlayer]: prevScore[currentPlayer] + 1
                }));
                setGameOver(true);

                setMessage(`Congratulations! ${currentPlayer === 'p1' ? 'Player 1' : 'Player 2'} clicked all their images!`);
            }, 500);
        } else {
            setCurrentPlayer(isP1 ? 'p2' : 'p1');
        }
    };

    const resetGame = () => {
        setImages(generateBoard());
        setIsClicked(Array(36).fill(false));
        setNumRevealed({ p1: 0, p2: 0 });
        setCurrentPlayer('p1');
        setGameOver(false);
        setMessage('');
    };

    return (
        <div className="container">
            <div className="content">
                <h1>Ppulbatu-BT21 Game</h1>

                {!playerSelected ? (
                    <div className="player-selection">
                        <h2>Select Players</h2>
                        <div className="player-buttons">
                            <button className="player-button" onClick={() => {setCurrentPlayer('p1'); setPlayerSelected(true); }}>Player 1 (BT21)</button>
                            <button className="player-button" onClick={() => { setCurrentPlayer('p2'); setPlayerSelected(true); }}>Player 2 (Ppulbatu)</button>
                        </div>
                    </div>
                ) : (
                    <div className="players">
                        <p className={currentPlayer === 'p1' ? 'current' : ''}>Player 1 (BT21) Score: {scores['p1']}</p>
                        <p className={currentPlayer === 'p2' ? 'current' : ''}>Player 2 (Ppulbatu) Score: {scores['p2']}</p>
                    </div>
                )}

                <hr className="divider" />
                {gameOver && (
                    <div className="gameover-msg">{message}</div>
                )}
                <div className="grid">
                    {images.map((img, index) => (
                        <div
                        key={index}
                        className="box"
                        onClick={() => handleClick(index)}>
                            {isClicked[index] ? (
                                <img src={img} alt="Revealed" className="square" 
                                style={{ transform: 'scale(1.1)', animation: 'shrinkDown 0.5s ease-out forwards' }}/>
                            ) : (
                                <div className="square hidden">{index + 1}</div>
                            )}
                        </div>
                    ))}
                </div>

                <hr className="divider" />

                <button className="reset-button" onClick={resetGame}>Reset Game</button>
            </div>
        </div>
    );
}

export default App;
