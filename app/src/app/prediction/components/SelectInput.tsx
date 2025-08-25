import React from 'react';

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  required?: boolean;
  placeholder?: string; // 👈 new prop
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  className = '',
  required = false,
  placeholder,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        required={required}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
