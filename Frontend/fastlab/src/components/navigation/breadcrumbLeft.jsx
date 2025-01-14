import React from 'react';
import { ChevronLeftIcon } from './icons'; // Ajusta la ruta según tu estructura de carpetas
import { useNavigate } from 'react-router-dom';

const BreadCrumbLeft = ({ first, second }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="flex items-center text-sm text-gray-500 mb-4">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 text-teal-500 hover:text-teal-600 font-medium"
      >
        <ChevronLeftIcon /> {/* Aquí se incluye el ícono */}
    
      </button>
      <span className="mx-2">Regresar</span>
      <span>{first}</span>
     
    </div>
  );
};

export default BreadCrumbLeft
