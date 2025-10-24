import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: "text" | "number" | "email" | "password";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number | string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  className = "",
  required = false,
  min,
  max,
  step,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        min={min}
        max={max}
        step={step}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm
                   placeholder:text-gray-400 text-black
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   focus:outline-none transition"
        {...props}
      />
    </div>
  );
};
