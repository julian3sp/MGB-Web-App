import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
{/*mt-4 px-4 py-2 bg-blue-500 text-white rounded*/}

export function FlipCard( { index, key, title, imageSrc } : {
    index: number;
    key: number;
    title: string;
    imageSrc: string;
}) {

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip= () => {
        setIsFlipped(!isFlipped);
    }

    return(
        <div className="flex justify-center items-center h-[400px]">
            <ReactCardFlip isFlipped={isFlipped} infinite={true} flipDirection="horizontal" flipSpeedBackToFront={0.5} flipSpeedFrontToBack={0.5}>
                <div key="front" className="w-[300px] h-[300px] hover:scale-105 duration-300 ease-in-out shadow-md rounded-md bg-white flex-col items-center justify-center">
                    <button onMouseEnter={handleFlip} className="w-[300px] h-[300px] hover:bg-accent cursor-pointer rounded-md">
                        <div className="relative w-[300px] h-[300px]">
                            <img src={imageSrc} alt="images" className="w-[300px] h-[300px] rounded-md" />
                            <div className="absolute inset-0 flex items-center items-justify text-white">
                                <p>Front Side</p>
                                <p>{title}</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div key="back" className="w-[300px] h-[300px] bg-blue-100 shadow-md rounded-md flex-col items-center justify-center">
                    <button onMouseLeave={handleFlip} className="w-[300px] h-[300px]">
                        <p>Back Side</p>
                        {key} {index}
                        <br />
                        <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-whte rounded cursor-pointer">
                            Navigate
                        </button>
                    </button>
                </div>
            </ReactCardFlip>
        </div>
    )
}