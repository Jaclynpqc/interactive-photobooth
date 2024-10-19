/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Sticker, Send } from 'lucide-react';
import Button from './components/ui/Button';

// Sticker data
const stickers = [
    { id: 1, url: 'assets/ChromeHeart.svg', name: 'Chrome Heart' },
    { id: 2, url: '/assets/Smiling.svg', name: 'Smiling' },
    { id: 3, url: '/assets/ChromeStar.svg', name: 'Chrome Star' },
];

const PhotoBooth = () => {
    const [selectedSticker, setSelectedSticker] = useState(null);
    const [placedStickers, setPlacedStickers] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [email, setEmail] = useState('');
    const webcamRef = useRef(null);
    const [handPosition, setHandPosition] = useState({ x: 0, y: 0 }); // Added missing state

    useEffect(() => {
        const handleMouseMove = (e) => {
            setHandPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleStickerSelect = (sticker) => {
        setSelectedSticker(sticker);
    };

    const handlePlaceSticker = (e) => {
        if (selectedSticker) {
            setPlacedStickers([
                ...placedStickers,
                {
                    ...selectedSticker,
                    position: { x: e.clientX, y: e.clientY } // Fixed y coordinate
                }
            ]);
            setSelectedSticker(null);
        }
    };

    const startCountdown = () => {
        setCountdown(3);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    capturePhoto(); // Fixed function name
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sending photo to: ', email);
        alert('Photo sent! (Demo only)');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            {!capturedImage ? (
                <div className="relative w-full max-w-2xl">
                    <div className="absolute top-0 right-0 bg-white p-4 rounded-t-lg flex gap-4 z-10">
                        {stickers.map((sticker) => (
                            <img
                                key={sticker.id}
                                src={sticker.url}
                                alt={sticker.name}
                                className="w-12 h-12 cursor-pointer hover:scale-110 transition"
                                onClick={() => handleStickerSelect(sticker)}
                            />
                        ))}
                    </div>

                    <div className="mt-16" onClick={handlePlaceSticker}>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/png"
                            className="rounded-lg w-full"
                        />

                        {placedStickers.map((sticker, index) => (
                            <img
                                key={index}
                                src={sticker.url}
                                alt={sticker.name}
                                style={{
                                    position: 'absolute',
                                    left: sticker.position.x,
                                    top: sticker.position.y,
                                    width: '50px',
                                    height: '50px'
                                }}
                            />
                        ))}

                        {countdown && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-8xl">
                                {countdown}
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={startCountdown}
                        className="mt-4 w-full"
                    >
                        <Camera className="mr-2" />
                        Take Photo
                    </Button>
                </div>
            ) : (
                <div className="p-6 w-full max-w-2xl bg-white rounded-lg shadow">
                    <img src={capturedImage} alt="Captured" className="rounded-lg mb-4" />

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded"
                            required
                        />
                        <Button type="submit" className="w-full">
                            <Send className="mr-2" /> Send Photo
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <PhotoBooth />
        </div>
    );
}

export default App;