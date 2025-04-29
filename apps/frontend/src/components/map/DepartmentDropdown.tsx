import React, { useEffect, useMemo, useState, useRef } from 'react';
import Department_array from '../DepartmentList';//not needed anymore
import { trpc } from '../../lib/trpc.ts'
import DepartmentIcon from '../../../assets/DepartmentIcon.png';


interface Department {
  id: string;
  name: string;
  services: string[];
  floor: string[];
  building: string;
  phone: string;
}

interface DepartmentDropdownProps {
  building: string;
  onDepartmentSelected: (department: { name: string; floor: string[] }) => void;
  prefill?: string;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({
                                                                 onDepartmentSelected,
                                                                 building,
                                                               }) => {
  const { data: departmentsRaw, isLoading } = trpc.getDirectories.useQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorted, setSorted] = useState<Department[]>([]);


  const departments: Department[] = useMemo(() => {
    if (!departmentsRaw) return [];
    return departmentsRaw.map((dept) => ({
      id: String(dept.id),
      name: dept.name,
      services: dept.services.split(','),
      building: dept.location,
      floor: [],
      phone: dept.telephone,
    }));
  }, [departmentsRaw]);

  useEffect(() => {
    if (searchTerm) {
      setSearchTerm('');
      setSelectedDepartment(null);
    }
  }, [building]);

  useEffect(() => {
    if (departments) {
      setSorted(filterDepartments(departments));
    }
  }, [building, searchTerm, departments]);

  useEffect(() => {
    if (departments) {
      const exactMatch = departments.find(
          (dept) => dept.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (exactMatch) {
        setSelectedDepartment(exactMatch);
        onDepartmentSelected({ name: exactMatch.name, floor: exactMatch.floor });
      }
    }
  }, [searchTerm, departments]);

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

  function filterDepartments(departments: Department[]): Department[] {
    const buildList = departments.filter((d) => d.building === building);
    if (searchTerm) {
      return buildList.filter((d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return buildList;
  }

  const handleSelect = (department: Department) => {
    setSelectedDepartment(department);
    setSearchTerm(department.name);
    setIsOpen(false);
    onDepartmentSelected({ name: department.name, floor: department.floor });
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedDepartment(null);
    setIsOpen(false);
  };

  const depRef = useClickOutside(() => {
    setIsOpen(false);
  });

    return (
        <div>
            <div className={'flex flex-row items-center rows-2 gap-[18px] mr-[17px] ml-[10px]'}>
                <img
                    src={DepartmentIcon}
                    alt="Department Icon"
                    className="w-[30px] h-[30px] mt-1"
                />
                <div ref={depRef} className={'relative w-full'}>
                    <div
                        className={`relative w-full bg-white rounded-3xl shadow-lg mb-0 transition-all duration-200`}
                    >
                        <input
                            type="text"
                            className="w-full py-2.5 px-4 border-none rounded-3xl text-sm outline-none bg-transparent text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003A96] sm:text-sm"
                            value={searchTerm}
                            onClick={() => setIsOpen(true)}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Select a department"
                        />
                        <div className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
                            <span className="material-icons">search</span>
                        </div>
                    </div>
                    {isOpen && (
                        <ul
                            className="absolute top-full left-0 mt-1 w-full max-h-56 overflow-auto rounded-xl border-[#D9D9D9] border-1 bg-white py-1 text-base shadow-xl z-10 focus:outline-none sm:text-sm
[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                            role="listbox"
                        >
                            {sorted.map((department) => (
                                <li
                                    key={department.id}
                                    className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500 hover:bg-blue-50"
                                    role="option"
                                    onClick={() => handleSelect(department)}
                                >
                                    <div className="flex items-center">
                                        <span className="ml-3 block truncate font-normal">
                                            {department.name}
                                        </span>
                                    </div>
                                    {selectedDepartment?.id === department.id && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                            <svg
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    )}
                                </li>
                            ))}
                            {sorted.length === 0 && (
                                <li className="py-2 px-4 text-gray-400">No matches found</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DepartmentDropdown;
