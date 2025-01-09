const LoginInput = ({ label, id, name, placeholder, register, rules, error, type }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error ? "border-red-500 placeholder-red-500 focus:ring-red-500" : "focus:ring-teal-500 border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default LoginInput;
