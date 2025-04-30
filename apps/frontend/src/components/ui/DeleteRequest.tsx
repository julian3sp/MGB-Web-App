import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover.tsx';
import DeleteIcon from '../../../assets/DeleteIcon.png';
import DeleteIconBlue from '../../../assets/DeleteIconBlue.png';
import { PopoverClose } from '@radix-ui/react-popover';
import { useState } from 'react';
import { ServiceRequest } from '@/types';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/Tooltip.tsx';

export default function DeleteRequest({
    size = 20,
    onClick,
    tooltip = 'Delete',
    errorMessage = 'Error: Insufficient Permissions',
    successMessage = 'Request has been deleted',
    blue = true,
}: {
    size?: number;
    onClick: () => void;
    tooltip?: string;
    errorMessage?: string;
    successMessage?: string;
    blue?: boolean;
}) {
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    return (
        <div>
        <Popover>
            <PopoverTrigger className="p-2 pr-0 select-none cursor-pointer">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div>
                                <img
                                    src={blue ? DeleteIconBlue : DeleteIcon}
                                    alt="Delete"
                                    className={`fill-red-500`}
                                    style={{ maxWidth: size }}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-red-600 border-2 border-red-800 w-auto">
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    <h3
                        className="block text-lg font-semibold font-[Poppins] text-center pb-1"
                        style={{ color: '#003A96' }}
                    >
                        Delete Service Request
                    </h3>
                    <p className="text-center">
                        Are you sure you want to delete this service request? This action cannot be
                        undone.
                    </p>
                    <br />
                    <div className="flex justify-center gap-2 mx-auto w-fit">
                        <PopoverClose asChild>
                            <button className="p-4 pt-1 pb-1 text-base font-medium text-white bg-[#003A96] hover:bg-blue-950 shadow-lg rounded-lg">
                                Go Back
                            </button>
                        </PopoverClose>
                        <PopoverClose asChild>
                            <button
                                className="p-4 pt-1 pb-1 text-base font-medium text-white bg-red-600 hover:bg-red-800 shadow-lg rounded-lg"
                                onClick={(e) => {
                                    onClick();
                                }}
                            >
                                Delete Request
                            </button>
                        </PopoverClose>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
            {showError && (
                <div className="absolute bottom-full left-4 mb-2">
                    <div className="bg-red-100 text-red-800 font-medium px-3 py-2 rounded text-sm relative border border-red-300 shadow-md">
                        {errorMessage}

                        {/* Triangle container div - for positioning */}
                        <div className="absolute top-full left-0 w-full h-0 flex justify-center items-start overflow-visible">
                            {/* border - slightly bigger triangle*/}
                            <div className="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-red-300 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>

                            {/* Inner triangle (background color) */}
                            <div className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-red-100 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>
                        </div>
                    </div>
                </div>
            )}
            {showSuccess && (
                <div className="absolute bottom-full left-4 mb-2">
                    <div className="bg-green-100 text-green-800 font-medium px-3 py-2 rounded text-sm relative border border-green-300 shadow-md">
                        {successMessage}

                        {/* Triangle container div - for positioning */}
                        <div className="absolute top-full left-0 w-full h-0 flex justify-center items-start overflow-visible">
                            {/* border - slightly bigger triangle*/}
                            <div className="w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-green-300 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>

                            {/* Inner triangle (background color) */}
                            <div className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-green-100 absolute top-0 left-[20px] -translate-x-1/2 transform"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
