import React, { useEffect, useState } from 'react';
import { trpc } from '../../lib/trpc';

interface DepartmentDropdownProps {
  onDepartmentSelected: (department: { name: string }) => void;
  prefill?: string;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ onDepartmentSelected, prefill }) => {
  const { data: departmentNames, isLoading, error } = trpc.getAllNamesArray.useQuery();
  const [selected, setSelected] = useState<string | undefined>(prefill);

  useEffect(() => {
    if (prefill && departmentNames?.some(d => d.name === prefill)) {
      onDepartmentSelected({ name: prefill });
    }
  }, [prefill, departmentNames]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setSelected(selectedName);
    onDepartmentSelected({ name: selectedName });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading departments</p>;

  return (
      <select value={selected} onChange={handleChange}>
        <option value="" disabled>Select a department</option>
        {departmentNames?.map((dept, idx) => (
            <option key={idx} value={dept.name}>
              {dept.name}
            </option>
        ))}
      </select>
  );
};

export default DepartmentDropdown;
