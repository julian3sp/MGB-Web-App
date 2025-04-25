import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import building from '../../assets/building.jpg';

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
        navigate('/welcome');
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen overflow-hidden text-white text-center p-8"
            onClick={handleClick}
        >
            <div
                className="absolute inset-0 bg-cover bg-center filter scale-105"
                style={{ backgroundImage: `url(${building})` }}
            />

            <div className="relative p-10 rounded-xl max-w-5xl mx-auto bg-white text-[#003a96]">
                <h1 className="text-7xl font-bold mb-5">
                    Welcome to <span className='text-[#003a96]'>Mass General Brigham.</span>
                </h1>
                <p className="text-xl max-w-4xl mx-auto">
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
