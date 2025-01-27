// SearchPatient.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MenuLateral from "../../components/menuLateral/MenuLateral";
import Breadcrumb from "../../components/navigation/breadcrumb";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import { Progress } from "@/components/ui/progress";

import SearchBar from "./SearchBar";
import PatientList from "./PatientList";
import Avatar from "../../assets/ellipse.svg";

// Asegúrate de tener esta variable definida en tu .env (VITE_API_URL)
const BACKEND_URL = import.meta.env.VITE_API_URL;

const SearchPatient = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = useSelector((state) => state.user.token);

  const navigate = useNavigate();

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
          setFilteredPatients(result.data || []);
        } else {
          setError("Error al cargar los pacientes.");
        }
      } catch (err) {
        setError("Error de conexión con el servidor.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [token]);

  // Lógica de búsqueda
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
    <div className="relative max-h-screen h-screen bg-gray-50">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      <div className="ml-[266px] h-full p-6">
        <Breadcrumb
          items={[
            { title: "Admin", to: "/admin/ingresar-orden" },
            { title: "Pacientes", to: "/admin/ingresar-orden" },
          ]}
        />
        <Progress className="[&>*]:bg-[#02807D] mb-6" value={33.3} />

        <h1 className="text-2xl text-center font-bold mb-6">Buscar pacientes</h1>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-6 flex relative">
          <div className="flex-1">
            {loading ? (
              <p className="text-gray-500">Cargando pacientes...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredPatients.length > 0 ? (
              <PatientList
                patients={filteredPatients}
                onSelectPatient={(patient) => setSelectedPatient(patient)}
              />
            ) : (
              <p className="text-gray-500">No se han encontrado pacientes.</p>
            )}
          </div>

          {selectedPatient && (
            <>
              {/* Fondo sombreado */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center"
                onClick={() => setSelectedPatient(null)}
              />
              {/* Pop-up centrado */}
              <div className="fixed inset-0 flex items-center justify-center z-20">
                <div className="bg-white shadow-lg p-6 rounded-md max-w-md w-full">
                  <div className="text-center">
                    <img
                      src={Avatar}
                      alt="Avatar"
                      className="mx-auto w-24 h-24 rounded-full"
                    />
                    <h2 className="text-xl font-bold mt-4">
                      {selectedPatient.firstName} {selectedPatient.lastName}
                    </h2>
                    <p className="text-gray-500">{selectedPatient.email}</p>
                    <p className="text-gray-500">{selectedPatient.phone}</p>
                    <p className="text-gray-500">
                      Fecha de nacimiento:{" "}
                      {new Date(selectedPatient.birth).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      className="w-1/3 bg-gray-500 text-white py-2 rounded"
                      onClick={() => setSelectedPatient(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="w-1/3 bg-teal-500 text-white py-2 rounded"
                      onClick={() => {
                        // Navegamos a AddAnalisis con el ID real del paciente
                        navigate("/admin/ingresar-orden/paciente-registrado/orden-de-analisis", {
                          state: {
                            patientId: selectedPatient.id,
                            patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
                            patientBirth: selectedPatient.birth,
                          },
                        });
                      }}
                    >
                      Seleccionar
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPatient;
