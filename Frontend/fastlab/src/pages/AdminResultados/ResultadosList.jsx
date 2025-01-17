import React, { useEffect, useState } from "react";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import NewResults from "../../components/PacienteInicio/NewResults";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";

const BACKEND_URL = import.meta.env.VITE_API_URL; 

const ResultadosList = () => {
  const [adminOrders, setAdminOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/results/orders/get-all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Error al cargar las órdenes.");
        const data = await response.json();
        setAdminOrders(data.data); 
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Cargando órdenes...</div>;
  }

  return (
    <div className="relative h-screen bg-gray-50">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>
      <div className="ml-[266px] overflow-y-auto h-full p-6">
       
      </div>
    </div>
  );
};

export default ResultadosList;
