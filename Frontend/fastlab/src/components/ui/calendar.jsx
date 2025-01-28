import React, { forwardRef } from "react";
import { useController } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../ui/calendar.css";

const InputCalendar = forwardRef(({ value, onClick, placeholder, hasError }, ref) => (
  <div className="relative">
    <input
      ref={ref}
      onClick={onClick}
      value={value}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none bg-gray-50 focus:ring-2 ${
        hasError
          ? "border-red-500 placeholder-red-500 focus:ring-red-500"
          : "focus:ring-teal-500 border-gray-300"
      }`}
    />
  </div>
));

const Calendar = ({ control, name, placeholder, label, labelClassName, minDate }) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: "Selecciona una opción." },
  });

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className={`block mb-1 ${labelClassName || "text-sm text-gray-700"}`} 
      >
        {label }
      </label>
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date) => onChange(date)}
        onBlur={onBlur}
        minDate={minDate ? minDate : null}
        maxDate={new Date()} 
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder || "Selecciona una opción"}
        customInput={
          <InputCalendar
            hasError={!!error}
            placeholder={placeholder || "Selecciona una opción"}
          />
        }
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};


export default Calendar;
