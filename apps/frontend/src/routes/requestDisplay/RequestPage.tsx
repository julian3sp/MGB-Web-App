import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Switch } from '../../components/serviceRequest/switch.tsx';
import { trpc } from '@/lib/trpc.ts';
import { RequestDataContext } from '@/routes/requestDisplay/RequestDataContext.tsx';
import { ServiceRequest } from '@/types.tsx';
import FilterIcon from '../../../assets/FilterIcon.png';
import PlusIcon from '../../../assets/PlusIcon.png';
import CustomSwitch from '@/components/serviceRequest/CustomSwitch.tsx';

//Handles closing the filter popup when you click outside the popup
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

export default function RequestPage() {
    const navigate = useNavigate();
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const location = useLocation();

    {
        /*Necessary for switching to detailed view from table, so the main request page knows which you are on and updates the switch accordingly*/
    }
    const currentPage = location.pathname.split('/').pop() ?? 'table';
    const [currentView, setCurrentView] = useState(currentPage);
    const toggleActive = () => setCurrentView(currentPage === 'table' ? 'list' : 'table');

    useEffect(() => {
        setCurrentView(currentPage);
    }, [currentPage]);

    const [filters, setFilters] = useState({
        request_type: [] as string[],
        priority: [] as string[],
        status: [] as string[],
        location: [] as string[],
        department: [] as string[],
    });

    const requestTypeOptions = [
        { label: 'Language Interpreter', value: 'Language' },
        { label: 'Transportation', value: 'Transportation' },
        { label: 'Audio/Visual', value: 'AudioVisual' },
        { label: 'Sanitation', value: 'Sanitation' },
        { label: 'Security', value: 'Security' },
        { label: 'Medical Device', value: 'MedicalDevice' },
        { label: 'Facilities', value: 'Facilities' },
    ];

    const { data, isLoading, error } = trpc.requestList.useQuery();

    const filteredData = (data ?? []).filter(
        (res) =>
            (filters.priority.length === 0 || filters.priority.includes(res.priority)) &&
            (filters.status.length === 0 || filters.status.includes(res.status)) &&
            (filters.request_type.length === 0 ||
                filters.request_type.includes(res.request_type)) &&
            (filters.location.length === 0 || filters.location.includes(res.location)) &&
            (filters.department.length === 0 || filters.department.includes(res.department))
    );

    const handleFilterClick = () => {
        setShowFilterPanel(!showFilterPanel);
    };

    const handleNewRequestClick = () => navigate('/services');

    const filterRef = useClickOutside(() => {
        setShowFilterPanel(false);
    });

    const { data: departmentsRaw } = trpc.getDirectories.useQuery();

    return (
        <RequestDataContext.Provider
            value={{ filteredData, isLoading, error: error as Error | null }}
        >
            <div className=" min-h-screen flex flex-col bg-white   font-[Poppins]"
            >

                <div className="gap-4  rounded-[100px] bg-white   flex justify-between mt-5 mr-3 ml-3 px-4 pb-3 items-end ">
                    <div>
                        <h1
                            className="text-5xl text-[#003a96] text-center p-1 pl-0 font-bold font-[Poppins]  flex-start  "
                        >
                            Service Requests:
                        </h1>
                    </div>
                    <div className="flex items-end gap-10 z-100">
                        <button
                            onClick={handleNewRequestClick}
                            className="px-4 py-[12px] border-2 border-[#003a96] rounded-4xl text-white hover:bg-blue-950 bg-[#003a96] w-fit h-[50px]"
                        >
                            <div className={'container'}>
                                <img
                                    src={PlusIcon}
                                    alt="(Plus icon)"
                                    className="h-7 inline-flex filter invert w-[18px] h-[18px]"
                                />
                                <p className="inline-flex ml-1">New Request</p>
                            </div>
                        </button>

                        <div ref={filterRef} className="flex flex-row gap-4">
                            <div className="relative pt-3">
                                <button
                                    onClick={handleFilterClick}
                                    className="px-4 py-[10px] border-2 border-[#003a96] rounded-4xl text-white hover:bg-blue-950 bg-[#003A96] w-[130px]"
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
                                    <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-light-subtle rounded-lg shadow-2xl p-4 pb-0 w-[450px] max-h-[450px] overflow-y-auto">
                                        <div className="w-full inline-flex items-center justify-between">
                                            <h3 className="font-bold text-xl underline mb-2 text-[#003A96]">
                                                Filter Requests
                                            </h3>

                                            <button
                                                onClick={() =>
                                                    setFilters({
                                                        request_type: [],
                                                        priority: [],
                                                        status: [],
                                                        location: [],
                                                        department: [],
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
                                                {['Low', 'Medium', 'High', 'Emergency'].map(
                                                    (level) => (
                                                        <label
                                                            key={level}
                                                            className="flex items-start text-sm"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={filters.priority.includes(
                                                                    level
                                                                )}
                                                                onChange={(e) => {
                                                                    setFilters((prev) => ({
                                                                        ...prev,
                                                                        priority: e.target.checked
                                                                            ? [
                                                                                  ...prev.priority,
                                                                                  level,
                                                                              ]
                                                                            : prev.priority.filter(
                                                                                  (item) =>
                                                                                      item !== level
                                                                              ),
                                                                    }));
                                                                }}
                                                                className="mt-[2px] mr-2"
                                                            />
                                                            {level}
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-semibold mb-2">Status:</p>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                {['Unassigned', 'Assigned', 'Working', 'Done'].map(
                                                    (progress) => (
                                                        <label
                                                            key={progress}
                                                            className="flex items-start text-sm"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={filters.status.includes(
                                                                    progress
                                                                )}
                                                                onChange={(e) => {
                                                                    setFilters((prev) => ({
                                                                        ...prev,
                                                                        status: e.target.checked
                                                                            ? [
                                                                                  ...prev.status,
                                                                                  progress,
                                                                              ]
                                                                            : prev.status.filter(
                                                                                  (item) =>
                                                                                      item !==
                                                                                      progress
                                                                              ),
                                                                    }));
                                                                }}
                                                                className="mt-[2px] mr-2"
                                                            />
                                                            {progress}
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-semibold mb-2">Request Type:</p>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                {requestTypeOptions.map(({ label, value }) => (
                                                    <label
                                                        key={value}
                                                        className="flex items-start text-sm"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.request_type.includes(
                                                                value
                                                            )}
                                                            onChange={(e) => {
                                                                setFilters((prev) => ({
                                                                    ...prev,
                                                                    request_type: e.target.checked
                                                                        ? [
                                                                              ...prev.request_type,
                                                                              value,
                                                                          ]
                                                                        : prev.request_type.filter(
                                                                              (item) =>
                                                                                  item !== value
                                                                          ),
                                                                }));
                                                            }}
                                                            className="mt-[2px] mr-2"
                                                        />
                                                        {label}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-semibold mb-2">Location:</p>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                {[
                                                    "Brigham & Women's Hospital Main Campus",
                                                    'Chestnut Hill',
                                                    'Faulkner Hospital',
                                                    'Patriot Place',
                                                ].map((place) => (
                                                    <label
                                                        key={place}
                                                        className="flex items-start text-sm"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.location.includes(
                                                                place
                                                            )}
                                                            onChange={(e) => {
                                                                setFilters((prev) => ({
                                                                    ...prev,
                                                                    location: e.target.checked
                                                                        ? [...prev.location, place]
                                                                        : prev.location.filter(
                                                                              (item) =>
                                                                                  item !== place
                                                                          ),
                                                                }));
                                                            }}
                                                            className="mt-[2px] mr-2"
                                                        />
                                                        {place}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <p className="font-semibold mb-2">Department:</p>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                                {[
                                                    ...new Set(
                                                        departmentsRaw?.map((dep) => dep.name)
                                                    ),
                                                ].map((depName) => (
                                                    <label
                                                        key={depName}
                                                        className="flex items-start text-sm"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={filters.department.includes(
                                                                depName
                                                            )}
                                                            onChange={(e) => {
                                                                setFilters((prev) => ({
                                                                    ...prev,
                                                                    department: e.target.checked
                                                                        ? [
                                                                              ...prev.department,
                                                                              depName,
                                                                          ]
                                                                        : prev.department.filter(
                                                                              (item) =>
                                                                                  item !== depName
                                                                          ),
                                                                }));
                                                            }}
                                                            className="mt-[2px] mr-2"
                                                        />
                                                        {depName}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <CustomSwitch
                                checked={currentView === 'list'}
                                onCheckedChange={() => {
                                    toggleActive();
                                    if (currentView === 'table') {
                                        navigate('list');
                                    } else {
                                        navigate('table');
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </RequestDataContext.Provider>
    );
}
