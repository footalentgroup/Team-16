import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [fullname, setFullname] = useState(""); // Solo necesitamos un campo para buscar por nombre/apellido.

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ fullname }); // Pasamos el texto al buscar.
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="Buscar por nombre o apellido"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
