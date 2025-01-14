import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import SearchBar from "../AdminResultados/SearchBar";
import PatientList from "../AdminResultados/PatientList";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminResultados = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${BACKEND_URL}/patient/get-all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPatients(result.data || []);
          setFilteredPatients(result.data || []); // Mostrar todos al inicio.
        } else {
          setError("Error al cargar los pacientes.");
        }
      } catch (error) {
        setError("Error de conexión con el servidor.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  // Nueva función para buscar por nombre/apellido.
  const handleSearch = (query) => {
    const { fullname } = query;

    if (!fullname) {
      setFilteredPatients(allPatients);
      return;
    }

    const filtered = allPatients.filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(fullname.toLowerCase());
    });

    setFilteredPatients(filtered);
  };

  return (
    <div className="relative h-screen bg-gray-50">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      <div className="ml-[266px] overflow-y-auto h-full p-6">
        <h1 className="text-2xl text-center font-bold mb-6">Buscar pacientes</h1>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-6">
          {loading ? (
            <p className="text-gray-500">Cargando pacientes...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredPatients.length > 0 ? (
            <PatientList patients={filteredPatients} />
          ) : (
            <p className="text-gray-500">No se han encontrado pacientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminResultados;
