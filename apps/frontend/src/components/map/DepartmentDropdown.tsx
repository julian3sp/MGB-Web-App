import React, { useState } from 'react';
import DepartmentList from '../DepartmentList';

interface Department {
  id: string;
  name: string;
  specialties: string[];
  floor: string[];
  phone: string;
}

interface DepartmentDropdownProps {
  onDepartmentSelected: (department: { name: string; floor: string[] }) => void;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ onDepartmentSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleSelect = (department: Department) => {
    setSelectedDepartment(department);
    setIsOpen(false);
    onDepartmentSelected({
      name: department.name,
      floor: department.floor
    });
  };

  return (
    <div className="relative right-3">
      <div className="relative w-full bg-white rounded-3xl shadow-lg m-2 transition-all duration-200">
        <button
          type="button"
          className="relative w-full cursor-default rounded-3xl bg-white py-2 pl-3 pr-10 text-left text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            <span className="ml-1 block truncate">
              {selectedDepartment ? selectedDepartment.name : 'Select a department'}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-3xl bg-white py-1 text-base shadow-xl focus:outline-none sm:text-sm
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {DepartmentList.map((department) => (
              <li
                key={department.id}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500 hover:bg-blue-50"
                id={`listbox-option-${department.id}`}
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
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DepartmentDropdown;
