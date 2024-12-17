
import React from "react";

const LoginInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  register,
  error,
  rules = {},
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-teal-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default LoginInput;
