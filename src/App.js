import React, { useState } from 'react';
import './App.css';

import bt21 from './images/bt21.png';
import ppulbatu from './images/ppulbatu.png';

const imageUrls = [
    bt21,
    ppulbatu,
];

function getRandomImage() {
    const index = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[index];
}

function App() {
    const [images, setImages] = useState(Array(36).fill().map(getRandomImage));
    const [isClicked, setIsClicked] = useState(Array(36).fill(false));

    const handleClick = (i) => {
        const newClicked = [...isClicked];
        newClicked[i] = true;
        setIsClicked(newClicked);
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
                                style={{ transform: 'scale(1.1)', animation: 'shrinkDown 0.3s ease-out forwards' }}/>
                            ) : (
                                <div className="square hidden">?</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;