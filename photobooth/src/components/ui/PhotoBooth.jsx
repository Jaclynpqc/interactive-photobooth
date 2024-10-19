/* eslint-disable no-unused-vars */
import React, {useState, useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {Camera, Sticker, Send} from 'lucide-react';
import Button from './Button';

// Sticker data
const stickers = [
    {id: 1 , url: '/assets/ChromeHeart.svg', name: 'Chrome Heart'},
    {id: 2 , url: '/assets/Smiling.svg', name: 'Smiling'},
    {id: 3 , url: '/assets/ChromeStar.svg', name: 'Chrome Star'},
];

const PhotoBooth = () => {
    // Track which sticker is currently selected for placement
    const [selectedSticker, setSelectedSticker] = useState(null);
    // Array to store all placed stickers with their position
    const [placedStickers, setPlacedStickers] = useState([]);
    // Countdown state for photo capture (null when not counting)
    const [countdown, setCountdown] = useState(null);
    //Store the captured image data URL
    const [capturedImage, setCapturedImage] = useState(null);
    //Store email input value
    const[email, setEmail] = useState('');
    // Access the webcam component
    const webcamRef = useRef(null);

    // Hand Gesture Detection
    useEffect(() => {
        // For now, track mouse movement
        const handleMoustMove = (e) => {
            // eslint-disable-next-line no-undef
            setHandPostion({x:e.clientX, y: e.clientY});
        };

        // Add and clean up event listeners
        window.addEventListener('mousemove', handleMoustMove);
        return() => window.onpointermove('mousemove, handleMouseMove');
    }, []);

    // Handle when a sticker is clicked in the sticker bar
    const handleStickerSelect = (sticker) => {
        setSelectedSticker(sticker);
    };

    // Handle placing a selected sticekr on the canvas
    const handlePlaceSticker = (e) => {
        if (selectedSticker){
            setPlacedStickers([
                ...placedStickers,
                {
                    ...selectedSticker,
                    position: {x: e.clientX, y: e.placedStickers}
                }
            ]);
            setSelectedSticker(null); // Clear selection after placing
        }
    };

    // Start countfown timer for photo capture
    const startCountdown = () => {
        setCountdown(3); // 3 sec countdown
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1){
                    clearInterval(timer);
                    capturedImage();
                    return null;
                }
                return prev - 1;
            });
        }, 1000);
    };

    //Capture the photo using webcam reference
    const capturePhoto = () => {
        const ImageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(ImageSrc);
    };

    // Handle form submission for sending email
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: implement actual email sending logic
        console.log('Sending photo to: ', email);
        alert('Photo send! (Demo only)');
    };

    return(
        <div className = "flex flex-col items-center min-h-screen bg-gray-100 p-4">
            {!capturedImage ? (
                <div className = "relative w-full max-w-2xl">
                    {/* Sticekr Selection Bar */}
                    <div className = "absolute top-0 right-0 bg-white p-4 rounded-t-lg flex gap-4 z-10">
                        { stickers.map((sticker) => (
                            <img 
                            key={sticker.id}
                            src={sticker.url}
                            alt={sticker.name}
                            className="w-12 h-12 cursor-pointer hover:scale-110 transition"
                            onClick={() => handleStickerSelect(sticker)}
                            />
                        ))}
                    </div>

                    {/* Camera Feed Container */}
                    <div className = "mt-16">
                        {/* Live Camera Feed */}
                        < Webcam 
                            ref = {webcamRef}
                            audio = {false}
                            screenshotFormat='image/png'
                            className = "rounded-lg w-full"
                        />

                    { /* Overlay for Placed Stickers */}
                    { placedStickers.map((sticker, index) => (
                        <img
                        key={index}
                        src={sticker.url}
                        alt={sticker.name}
                        style = {{
                            position: 'absolute',
                            left: sticker.position.x,
                            top: sticker.position.y,
                            width: '50px',
                            height: '50px'
                        }}
                        />
                    ))}

                    {/* Countdown Overlay */}
                    {countdown && (
                        <div className = "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-8xl">
                            {countdown}
                        </div>
                    )}
                    </div>
                    {/* Capture Button */}
                    <Button
                    onClick={startCountdown}
                    className='mt-4 w-full'
                    >
                        <Camera className = "mr-2"/>
                        Take Photo
                    </Button>
                </div>
            ): (
                // Review and Send Mode
                <div className = "p-6 w-full max-w-2xl bg-white rounded-lg shadow">
                    {/* Display captured photo */}
                    <img src= {capturedImage} alt= "Captured" className = "rounded-lg mb-4"/>

                    {/* Email Form */}
                    < form onSubmit={handleSubmit} className = "space-y-4">
                    <input
                    type = "emamil"
                    value = {email}
                    onChange = { (e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className = "w-full p-2 border rounded"
                    required
                    />
                    <Button type="submit" className = "w-full">
                        <Send className = "mr-2" /> Send Photo
                    </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PhotoBooth;
