import { useEffect, useState } from "react";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import NewResults from "../../components/PacienteInicio/NewResults";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";

const BACKEND_URL = import.meta.env.VITE_API_URL; 

const ResultadosList = () => {
  const [adminResults, setAdminResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/get-exams`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Error al cargar los exámenes.");
        const data = await response.json();
        setAdminResults(data.exams); 
      } catch (error) {
        console.error("Error al cargar los exámenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Cargando resultados...</div>;
  }

  return (
    <div className="relative h-screen bg-gray-50">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>
      <div className="ml-[266px] overflow-y-auto h-full p-6">
        <NewResults
          arrayResults={adminResults}
          breadcrumbItems={[
            { title: "Admin", to: "/admin/inicio" },
            { title: "Resultados" },
          ]}
          title="Resultados del Administrador"
          role="admin" 
        />
      </div>
    </div>
  );
};

export default ResultadosList;
