import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover.tsx';
import DeleteIcon from '../../../assets/DeleteIcon.png';
import {PopoverClose} from "@radix-ui/react-popover";
import { useState } from 'react';
import { ServiceRequest } from '@/types';

export default function DeleteRequest({
                                          size = 20,
                                          onClick,
                                      }: {
    size?: number;
    onClick: () => void;
}) {
    return (
        <Popover>
            <PopoverTrigger className="p-2 pr-0">
                <div>
                    <img
                        src={DeleteIcon}
                        alt="Delete"
                        className={`fill-red-500`}
                        style = {{maxWidth: size}}
                        title="Delete Service Request"
                    />
                </div>
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
                                    onClick()
                                }}
                            >
                                Delete Request
                            </button>
                        </PopoverClose>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
