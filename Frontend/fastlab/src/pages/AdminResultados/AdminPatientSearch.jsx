import React, { useState, useEffect } from "react";
import MenuLateral from "../components/menuLateral/MenuLateral";
import SearchBar from "../components/SearchBar";
import PatientList from "../components/PatientList";
import arrayItemsMenuAdmin from "../utils/itemsMenuAdmin";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminPatientSearch = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchAllPatients = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${BACKEND_URL}/patient/get-all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setPatients(result.data || []);
          setFilteredPatients(result.data || []); 
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

    fetchAllPatients();
  }, []);

  
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
      {/* Menú lateral */}
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      {/* Contenido principal */}
      <div className="ml-[266px] overflow-y-auto h-full p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Pacientes</h1>

        {/* Barra de búsqueda */}
        <SearchBar onSearch={handleSearch} />

        {/* Resultados */}
        <div className="mt-6">
          {loading && <p className="text-gray-500">Cargando pacientes...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && filteredPatients.length > 0 && (
            <PatientList patients={filteredPatients} />
          )}
          {!loading && !error && filteredPatients.length === 0 && (
            <p className="text-gray-500">No se encontraron pacientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPatientSearch;
