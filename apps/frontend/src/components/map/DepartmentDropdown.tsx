import React, {useEffect, useState} from 'react';
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
  prefill?: string;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ onDepartmentSelected, prefill = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (prefill) {
      setSearchTerm(prefill);
    }
  }, [prefill]);

  const filteredDepartments = DepartmentList.filter((department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const exactMatch = DepartmentList.find(
        (department) => department.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (exactMatch) {
      setSelectedDepartment(exactMatch);
      onDepartmentSelected({ name: exactMatch.name, floor: exactMatch.floor });
    }
  }, [searchTerm]);

  const handleSelect = (department: Department) => {
    setSelectedDepartment(department);
    setSearchTerm(department.name);
    setIsOpen(false);
    onDepartmentSelected({ name: department.name, floor: department.floor });
  };

  return (
      <div className="relative right-3">
        <div className="relative w-full bg-white rounded-3xl shadow-lg m-2 transition-all duration-200">
          <input
              type="text"
              className="w-full rounded-3xl py-2 pl-3 pr-10 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Select a department"
          />

          {isOpen && (
              <ul
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-3xl bg-white py-1 text-base shadow-xl focus:outline-none sm:text-sm
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                  role="listbox"
              >
                {filteredDepartments.map((department) => (
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
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                      )}
                    </li>
                ))}
                {filteredDepartments.length === 0 && (
                    <li className="py-2 px-4 text-gray-400">No matches found</li>
                )}
              </ul>
          )}
        </div>
      </div>
  );
};

export default DepartmentDropdown;
