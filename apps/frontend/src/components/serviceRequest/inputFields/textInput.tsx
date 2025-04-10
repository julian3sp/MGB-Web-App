import React from 'react';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    name?: string;
    className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
                                                 label,
                                                 value,
                                                 onChange,
                                                 placeholder = '',
                                                 type = 'text',
                                                 name,
                                                 className = '',
                                             }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default TextField;
