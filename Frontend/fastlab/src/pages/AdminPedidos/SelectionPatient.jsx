import React from "react";
import { useNavigate } from "react-router-dom"; // Importación añadida
import MenuLateral from "../../components/menuLateral/MenuLateral";
import Breadcrumb from "../../components/navigation/breadcrumb";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";

const SelectionPatient = () => {
  const navigate = useNavigate(); // Uso de useNavigate

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      {/* Menú lateral */}
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      {/* Contenido principal */}
      <div className="ml-[266px] h-full p-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { title: "Admin", to: "/admin/pedidos" },
            { title: "Ingresar orden", to: "/admin/ingresar-orden" },
          ]}
        />

        <h1 className="text-2xl text-center font-bold mb-8">Ingresar orden</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          {/* Card 1 */}
          <div
            onClick={() => navigate("/admin/ingresar-orden/paciente-registrado")}
            className="flex items-center justify-center p-6 border border-gray-300 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">Paciente registrado</h2>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate("/admin/ingresar-orden/registrar-paciente")}
            className="flex items-center justify-center p-6 border border-gray-300 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">Registrar paciente</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPatient;
