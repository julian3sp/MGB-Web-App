import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import movide from '../../assets/Mass General Brigham in Your Community - Mass General Brigham (1080p, h264).mp4';

const WaitingScreen = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen overflow-hidden text-white text-center p-8"
            onClick={handleClick}
        >
            <video
                className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-105"
                src={movide}
                autoPlay
                muted
                loop
                playsInline
            />

            {/* Foreground Content */}
            <div className="relative p-10 rounded-3xl max-w-5xl mx-auto">
                <h1 className="text-7xl font-bold mb-5 text-[#003a96]">
                    Welcome to Mass General Brigham.
                </h1>
                <p className="text-xl max-w-3xl mx-auto">
                    This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the 
                    actual Brigham & Women's Hospital website.              
                </p>
                <div className="text-3xl font-bold mt-6">
                    {currentTime}
                </div>
                <p className="mt-10 text-lg">Click anywhere to begin</p>
            </div>
        </div>
    );
};

export default WaitingScreen;
