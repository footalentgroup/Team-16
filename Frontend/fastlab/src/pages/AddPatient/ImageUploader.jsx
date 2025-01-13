import React, { useState } from "react";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Área de carga */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-base text-gray-700 mb-2">
              Seleccione un archivo o arrástrelo y suéltelo aquí
            </p>
            <span className="text-sm text-gray-500 mb-4">
              JPG, PNG o PDF, tamaño de archivo no mayor a 10 MB
            </span>
            {/* Botón para seleccionar archivo */}
            <button
              type="button"
              className="px-4 py-2  text-sm border text-gray-700 border-gray-300 rounded bg-white hover:text-teal-600"
              onClick={() => document.getElementById("dropzone-file").click()}
            >
              Seleccionar archivo
            </button>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".jpg,.png,.pdf"
            onChange={handleFileChange}
          />
 {/* Nombre del archivo seleccionado */}
 {selectedFile && (
        <div className="mt-2 mb-6">
          <p className="text-sm text-gray-500">Archivo seleccionado:</p>
          <p className="text-sm font-medium text-gray-700">
            {selectedFile.name}
          </p>
        </div>
      )}
        </label>
      </div>

     
    </div>
  );
};

export default ImageUploader;
