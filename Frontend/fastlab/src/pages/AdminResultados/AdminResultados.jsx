import React from "react";
import { useNavigate } from "react-router-dom";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import Breadcrumb from "../../components/navigation/breadcrumb";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";

const AdminResultados = () => {
  const navigate = useNavigate(); 

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>
      

      {/* Contenido principal */}
      <div className="ml-[266px] h-full p-6">
       
        <Breadcrumb
          items={[
            { title: "Admin", to: "/admin/pedidos" },
            { title: "Ingresar orden", to: "/admin/ingresar-orden" },
          ]}
        />
        <h1 className="text-2xl text-center font-bold mb-8">Ingresar orden</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          
          <div
            onClick={() => navigate("/admin/resultados/lista-de-resultados")}
            className="flex items-center justify-center p-9 border border-gray-300 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">Lista de resultados</h2>
          </div>

          
          <div
            onClick={() => navigate("/admin/ingresar-orden/registrar-paciente")}
            className="flex items-center justify-center p-9 border border-gray-300 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
          >
            <h2 className="text-xl font-semibold">Carga de resultados</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResultados;
