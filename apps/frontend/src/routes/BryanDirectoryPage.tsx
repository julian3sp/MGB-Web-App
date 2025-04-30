import React, { useEffect, useRef, useState } from 'react';
import { AppleCardsListing } from '../components/department/AppleCardsListing.tsx';
import FilterIcon from '../../assets/FilterIcon.png';
import { DepartmentContext } from './departmentDirectory/DepartmentContext.tsx';
import { flipCardsData } from '@/data/flipCardData.tsx';
import SearchIcon from '../../assets/SearchIcon.png';

export function BryanDirectoryPage() {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [filters, setFilters] = useState({
        category: [] as string[],
    });

    const [searchItem, setSearchItem] = useState('');

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
    };

    //Close filter menu when you click outside of it
    const useClickOutside = (handler: () => void) => {
        const reference = useRef();

        useEffect(() => {
            const newHandler = (event: MouseEvent) => {
                if (!reference.current?.contains(event.target)) handler();
            };

            document.addEventListener('mousedown', newHandler);

            return () => {
                document.removeEventListener('mousedown', newHandler);
            };
        }, [handler]);
        return reference;
    };

    const handleFilterClick = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    const filterRef = useClickOutside(() => {
        setShowFilterPanel(false);
    });

    //Filter by category (building)
    const filteredDeps = (flipCardsData ?? []).filter(
        (res) =>
            (filters.category.length === 0 || filters.category.includes(res.category)) &&
            res.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    //Pass the filtered departments into context so it can be read by AppleCardsListing
    return (
        <DepartmentContext.Provider value={{ filteredDeps: filteredDeps ?? null }}>
            <div className="rounded-[100px] flex justify-between mt-5 mr-3 ml-3 px-4 pb-1 pt-4 items-center">
                <div className="flex-1 flex justify-start">
                    <h1
                        className="text-5xl text-white text-center pl-3 font-bold font-[Poppins] flex-start  "
                        style={{ color: '#003A96' }}
                    >
                        Department Directory:
                    </h1>
                </div>
                <div className="flex-1 flex justify-center items-center relative">
                    <div className={'w-6/7 relative z-50'}>
                        <input
                            type={'text'}
                            value={searchItem}
                            onChange={handleInputChange}
                            placeholder={'Search departments'}
                            className="pr-10 border rounded-lg px-4 py-2 w-full h-[52px] rounded-3xl text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003a96] text-md"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <img src={SearchIcon} alt="Search icon" className={"w-[25px] h-[25px]"}/>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex justify-between relative" ref={filterRef}>
                    <div className="relative z-50">
                        <button
                            onClick={handleFilterClick}
                            className="px-4 py-[10px] border-2 border-white rounded-4xl text-white hover:bg-blue-950 bg-[#003A96] w-[130px]"
                        >
                            <div className={'container'}>
                                <img
                                    src={FilterIcon}
                                    alt="(Filter icon)"
                                    className="h-7 inline-flex filter invert"
                                />{' '}
                                <p className="inline-flex ml-1">Filters</p>
                            </div>
                        </button>

                        {showFilterPanel && (
                            <div className="absolute top-full mt-2 right-0 z-50 bg-white border-1 border-light-subtle rounded-lg shadow-2xl p-4 pb-0 w-[450px]">
                                <div className="w-full inline-flex items-center justify-between">
                                    <h3 className="font-bold text-xl underline mb-2 text-[#003A96]">
                                        Filter Departments
                                    </h3>

                                    <button
                                        onClick={() =>
                                            setFilters({
                                                category: [],
                                            })
                                        }
                                            className="px-4 py-[10px] border-2 border-[#003a96] rounded-4xl text-[#003a96] hover:bg-gray-200 bg-white w-[130px]"
                                        >
                                        Reset
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold mb-2">Priority:</p>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                        {[
                                            "Brigham & Women's Hospital Main Campus",
                                            'Chestnut Hill',
                                            'Faulkner Hospital',
                                            'Patriot Place',
                                        ].map((level) => (
                                            <label key={level} className="flex items-start text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.category.includes(level)}
                                                    onChange={(e) => {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            category: e.target.checked
                                                                ? [...prev.category, level]
                                                                : prev.category.filter(
                                                                      (item) => item !== level
                                                                  ),
                                                        }));
                                                    }}
                                                    className="mt-[2px] mr-2"
                                                />
                                                {level}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <AppleCardsListing />
        </DepartmentContext.Provider>
    );
}
