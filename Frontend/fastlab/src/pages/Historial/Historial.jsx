import { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../components/navigation/breadcrumb";
import { useSelector } from "react-redux";
import AnalisisCard from "../../components/Cards/AnalisisCard.jsx";
import { SearchIcon } from "../../components/navigation/icons.jsx";
const BACKEND_URL = import.meta.env.VITE_API_URL;

const Historial = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false); // Agregado para verificar si se ha realizado búsqueda
  const searchInputRef = useRef();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = searchInputRef.current.value;

    setSearchPerformed(true); // Marcar que se realizó una búsqueda

    if (searchQuery === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => {
        const fullData = `${item.patient.firstName} ${item.patient.lastName} ${item.id} ${item.status} ${new Date(item.dateExam).toLocaleDateString('es-ES')}`;
        return fullData.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredItems(filtered);
    }
  };

  const handleClear = () => {
    searchInputRef.current.value = "";
    setFilteredItems(items);
    setSearchPerformed(false); // Resetear búsqueda si se limpia el campo
  };

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
      return null;
    }
  };

  const getResults = async () => {
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
    }

    setLoading(false);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
   
     
    
        <section className="flex min-h-screen">
          <div className="flex-1">
            <div className="flex-1 p-8">
              <Breadcrumb
                items={[{ title: "Paciente", to: "/" }, { title: "Mi Historial" }]}
              />
              <h1 className="text-2xl font-semibold text-gray-900 ">Mi historial de resultados</h1>
            </div>

            <div className="flex justify-center mb-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  ref={searchInputRef}
                  onChange={handleSearch}
                  placeholder="Buscar orden"
                  className="w-[500px] px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {searchInputRef.current && searchInputRef.current.value && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 rounded text-white"
                >
                  <SearchIcon />
                </button>
              </form>
            </div>

            {/* Mostrar "Resultados encontrados" solo si se ha realizado una búsqueda */}
            {searchPerformed && filteredItems.length > 0 && (
              <div className="flex justify-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Resultados encontrados
                </h2>
              </div>
            )}

            {/* Carga de resultados */}
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
      

  );
};

export default Historial;
