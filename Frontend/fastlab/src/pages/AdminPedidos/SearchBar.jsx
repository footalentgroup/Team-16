import React, { useState } from "react";
import searchIcon from "../../assets/searchButton.svg"; // Importa el ícono

const SearchBar = ({ onSearch }) => {
  const [fullname, setFullname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ fullname });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      {/* Contenedor del input con el ícono */}
      <div className="flex items-center w-1/2 border rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="flex-grow px-4 py-2 border-none outline-none"
        />
        {/* Ícono de búsqueda */}
        <button
          type="submit"
          className="flex items-center bg-white justify-center px-4 "
        >
          <img src={searchIcon} alt="Buscar" className="w-8 h-8" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
