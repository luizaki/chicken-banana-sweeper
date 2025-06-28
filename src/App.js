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

    const handleClick = () => {
        setImages(images.map(() => getRandomImage()));
    };

    return (
    <div className="container">
        <div className="content">
            <h1>Ppulbatu-BT21 Game</h1>
            <hr className="divider" />
            <div className="grid">
                {images.map((img, index) => (
                    <img
                    key={index}
                    src={img}
                    alt="Random"
                    className="square"
                    onClick={handleClick}
                    />
                ))}
            </div>
        </div>
    </div>
    );
}

export default App;