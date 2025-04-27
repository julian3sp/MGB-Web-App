import React, { useEffect, useMemo, useState } from 'react';
import Department_array from '../DepartmentList';//not needed anymore
import { trpc } from '../../lib/trpc.ts'

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

  return (
      <div className="relative w-[90%] mx-auto m-2">
        <div className="relative bg-white rounded-3xl shadow-lg transition-all duration-200">
          <input
              type="text"
              className="w-full rounded-3xl py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Select a department"
          />

          {searchTerm && (
              <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Clear"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                  <path
                      fillRule="evenodd"
                      d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z"
                      clipRule="evenodd"
                  />
                </svg>
              </button>
          )}

          {isOpen && (
              <ul
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-3xl bg-white py-1 text-base shadow-xl sm:text-sm
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
                      <span className="block truncate font-normal">{department.name}</span>
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
  );
};

export default DepartmentDropdown;
