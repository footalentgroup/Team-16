import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MenuLateral from "../../components/menuLateral/MenuLateral";
import Breadcrumb from "../../components/navigation/breadcrumb";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table"; // Importamos el componente DataTable

// Opciones para cada campo
const options = {
  nombre: ["Glucemia", "LDL COLESTEROL", "Triglicéridos"],
  unidad: ["mg/dl", "seg.", "mm3"],
  rango: ["70-110 mg/dl", "mayor a 35 mg/dl", "150.000 a 40000 por mm3"],
  bioquimico: ["Ricky Maravilla", "Manuel Pascual", "Ricardo Forman"],
};

// Definición de columnas
const columns = [
  {
    accessorKey: "nombre",
    header: "Nombre del Parámetro",
    cell: ({ row, column }) => (
      <select
        className="w-full border bg-gray-50 rounded-md px-2 py-1"
        value={row.original[column.id]}
        onChange={(e) =>
          row.update({
            ...row.original,
            [column.id]: e.target.value,
          })
        }
      >
        <option value="">Seleccione un parámetro</option>
        {options.nombre.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ),
  },
  {
    accessorKey: "resultado",
    header: "Resultado obtenido",
    cell: ({ row, column }) => (
      <select
        className="w-full border bg-gray-50 rounded-md px-2 py-1"
        value={row.original[column.id]}
        onChange={(e) =>
          row.update({
            ...row.original,
            [column.id]: e.target.value,
          })
        }
      >
        <option value="">Ingrese resultado</option>
        {options.rango.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ),
  },
  {
    accessorKey: "unidad",
    header: "Unidad de Medida",
    cell: ({ row, column }) => (
      <select
        className="w-full border bg-gray-50 rounded-md px-2 py-1"
        value={row.original[column.id]}
        onChange={(e) =>
          row.update({
            ...row.original,
            [column.id]: e.target.value,
          })
        }
      >
        <option value="">Seleccione una unidad</option>
        {options.unidad.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ),
  },
  
  {
    accessorKey: "reference",
    header: "Rango de referencia",
    cell: ({ row, column }) => (
      <select
        className="w-full border bg-gray-50 rounded-md px-2 py-1"
        value={row.original[column.id]}
        onChange={(e) =>
          row.update({
            ...row.original,
            [column.id]: e.target.value,
          })
        }
      >
        <option value="">Seleccione rango de referencia</option>
        {options.bioquimico.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ),
  },
];

const Parameters = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Datos iniciales para los parámetros
  const [data, setData] = useState([
    { id: 1, nombre: "", unidad: "", rango: "", bioquimico: "" },
    { id: 2, nombre: "", unidad: "", rango: "", bioquimico: "" },
    { id: 3, nombre: "", unidad: "", rango: "", bioquimico: "" },
    { id: 4, nombre: "", unidad: "", rango: "", bioquimico: "" },
    { id: 5, nombre: "", unidad: "", rango: "", bioquimico: "" },
  ]);

  const handleGenerateResults = () => {
    console.log("Datos generados:", data);
    navigate("/admin/resultados/generar-reporte", { state: { data } });
  };

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      {/* Menú lateral */}
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      <div className="ml-[266px] h-full overflow-y-auto p-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: "Admin", to: "/admin/resultados" },
            { title: "Carga de resultados", to: "/admin/resultados/carga" },
          ]}
        />

        <h1 className="text-2xl text-center font-bold mb-4">
          Información de los parámetros
        </h1>

        <Progress className="[&>*]:bg-[#02807D] mb-6" value={66} />

        {/* Tabla con DataTable */}
        <DataTable columns={columns} data={data} />

        <div className="mt-6">
          <label
            htmlFor="bioquimico"
            className="block font-medium mb-1 text-sm text-[#0E1B27]"
          >
            Nombre del Bioquímico
          </label>
          <select
            id="bioquimico"
            className="w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option value="bioquimico_1">Bioquímico 1</option>
            <option value="bioquimico_2">Bioquímico 2</option>
          </select>
        </div>

        <div className="mt-6">
          <label
            htmlFor="observaciones"
            className="block font-medium mb-1 text-sm text-[#0E1B27]"
          >
            Observaciones
          </label>
          <textarea
            id="observaciones"
            className="w-full border bg-gray-50 rounded-md px-3 py-2"
            rows="4"
            placeholder="Escribe tus observaciones aquí"
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
            onClick={handleGenerateResults}
          >
            Generar resultados
          </Button>
        </div>
      </div>
        
      </div>
    
  );
};

export default Parameters;

