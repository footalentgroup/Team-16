import { useEffect, useState, useRef } from "react";
import MenuLateral from "../components/menuLateral/MenuLateral";
import arrayItemsMenuPaciente from "../utils/itemsMenuPaciente";
import AnalisisCard from "../components/Cards/AnalisisCard";
import { useSelector } from "react-redux";
import Breadcrumb from "../components/navigation/breadcrumb";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const PacienteInicio = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const searchInputRef = useRef();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);

 
  const getOrderDetails = async (orderId) => {
    const response = await fetch(
      `${BACKEND_URL}/results/orders/get-by-id?id=${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const orderData = await response.json();
      return orderData.data; 
    } else {
      console.error("Error al obtener los detalles de la orden.");
      return null;
    }
  };

  const getResults = async () => {
    setLoading(true); 

    const response = await fetch(
      `${BACKEND_URL}/results/orders/get-by-patient-id?id=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const ordersWithPatientDetails = await Promise.all(
        result.data.map(async (order) => {
         
          const orderDetails = await getOrderDetails(order.id);
          return orderDetails; 
        })
      );
      setItems(ordersWithPatientDetails); 
      setFilteredItems(ordersWithPatientDetails); 
    } else {
      console.error("Error al obtener los resultados.");
    }

    setLoading(false); 
  };

  useEffect(() => {
    getResults();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current?.value || ""; 

    if (searchQuery === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => {
        const fullData = `${item.patient.firstName} ${item.patient.lastName} ${item.id} ${item.status}`;
        return fullData.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  };


  const handleClear = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ""; 
    }
    setFilteredItems(items);
  };

  return (
    <div className="relative h-screen bg-white">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuPaciente} />
      </div>
      <div className="ml-[266px] overflow-y-auto h-full">
        <section className="flex min-h-screen">
          <div className="flex-1">
            <div className="flex-1 p-8">
              <Breadcrumb
                items={[{ title: "Paciente", to: "/" }, { title: "Inicio", to: "/paciente/inicio" }]}
              />
              <h1 className="text-2xl font-semibold text-gray-900 ">Nuevos resultados</h1>
            </div>

            {loading ? ( 
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Cargando resultados...
                </h2>
              </div>
            ) : filteredItems.length > 0 ? (
              <div>
                <div className="flex justify-center">
                  <div className="w-[70%] flex flex-col gap-y-6">
                    {filteredItems.map((item) => {
                      const patientName =
                        item.patient && item.patient.firstName && item.patient.lastName
                          ? `${item.patient.firstName} ${item.patient.lastName}`
                          : "Paciente no encontrado"; 
                      return (
                        <AnalisisCard
                          key={`new-results-${item.id}`}
                          id={item.id}
                          title={`Orden N° ${item.id}`}
                          type={patientName} 
                          date={new Date(item.dateExam).toLocaleDateString("es-ES")}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No se han encontrado resultados
                </h2>
                <p className="text-gray-500">
                  Parece que no podemos encontrar ningún resultado basado en su búsqueda.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PacienteInicio;
