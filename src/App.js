import React, { useState } from 'react';
import './App.css';

import bt21_img from './images/bt21.png';
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

    const handleClick = (i) => {
        const newClicked = [...isClicked];
        newClicked[i] = true;
        setIsClicked(newClicked);
    };

    const resetGame = () => {
        setImages(generateBoard());
        setIsClicked(Array(36).fill(false));
    };

    return (
        <div className="container">
            <div className="content">
                <h1>Ppulbatu-BT21 Game</h1>
                <hr className="divider" />
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
                                <div className="square hidden">?</div>
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