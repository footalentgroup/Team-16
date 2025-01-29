import React, { useEffect, useState } from "react";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import Breadcrumb from "../../components/navigation/breadcrumb";
import AdminAnalisisCard from "../../components/Cards/AdminAnalisisCard";
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
    <div className="relative h-screen bg-white">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>
      <div className="ml-[266px] overflow-y-auto h-full">
        <main className="flex-1 p-8">
          <div className='mx-auto'>
            <Breadcrumb
              items={[
                { title: "Admin", to: "/admin" },
                { title: "Resultados", to: "/admin/resultados" },
                { title: "Lista de resultados" },
              ]}
            />
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Lista de Resultados
            </h1>

            {adminOrders.length === 0 ? (
              <div className="text-center">
                <h2 className="font-semibold text-xl text-[#0E1B27]">
                  No hay órdenes disponibles
                </h2>
                <p className="text-gray-500">Actualmente no hay órdenes registradas en el sistema.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {adminOrders.map((order) => (
                  <AdminAnalisisCard
                    key={`order-${order.id}`}
                    title={`Orden N° ${order.id}`}
                    type={`${order.patient?.firstName} ${order.patient?.lastName}`}
                    date={new Date(order.dateExam).toLocaleDateString("es-ES")}
                    id={order.id}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResultadosList;
