import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import Breadcrumb from "../navigation/breadcrumb";
import { PDFTemplate } from "./pdfTemplate";
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'; // Importar alert

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ResultadoAnalisisAdmin = () => {
  const { id } = useParams();
  const [examen, setExamen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // Estado para la alerta

  useEffect(() => {
    const fetchExamen = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/results/orders/get-by-id?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Error al cargar el examen.");

        const data = await response.json();
        setExamen(data.data);
      } catch (error) {
        console.error("Error al cargar el examen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamen();
  }, [id]);

  const generatePDF = async () => {
    if (!examen) return;
    const blob = await pdf(<PDFTemplate data={examen} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `examen_${id}.pdf`;
    link.click();
    URL.revokeObjectURL(url);

    // Mostrar alerta después de descargar el PDF
    setShowAlert(true);

    // Ocultar la alerta después de 2 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando examen...</div>;
  }

  if (!examen) {
    return <div className="text-center mt-10">No se encontró el examen.</div>;
  }

  return (
    <>
      <div className="relative h-screen bg-white">
        {/* Menú lateral del administrador */}
        <div className="fixed top-0 left-0 w-[266px] h-full">
          <MenuLateral items={arrayItemsMenuAdmin} />
        </div>

        {/* Contenido principal */}
        <div className="ml-[266px] overflow-y-auto h-full">
          <div className="flex-1 p-8">
            <div className="mx-auto">
              {/* Breadcrumb */}
              <Breadcrumb
                items={[
                  { title: "Admin", to: "/admin" },
                  { title: "Resultados", to: "/admin/resultados" },
                  { title: "Lista de resultados", to: "/admin/resultados/lista-de-resultados" },
                  { title: `N.° ${id}` },
                ]}
              />

              {/* Título */}
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                Resultado para: {examen.patient.firstName} {examen.patient.lastName}
              </h1>

              {/* Mostrar alerta solo si se activó */}
              {showAlert && (
                <Alert className="opacity-100 mb-4">
                  <div>
                    <AlertTitle>Descarga completa</AlertTitle>
                    <AlertDescription>El analisis se descargo correctamente.</AlertDescription>
                  </div>
                </Alert>
              )}

              {/* Botón para descargar PDF */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={generatePDF}
                  className="px-4 py-2 bg-[#02807D] text-white rounded-md hover:bg-gray-500"
                >
                  Descargar
                </button>
              </div>

              {/* Tarjeta de análisis */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                {/* Encabezado */}
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold">
                    Mariano Boedo 23 - Tel.(0387)-4215440 - 4400 Salta
                  </h2>
                </div>

                {/* Información del paciente */}
                <div className="border-b pb-4 mb-4">
                  <p className="mb-2">
                    <strong>Paciente:</strong> {examen.patient.firstName}{" "}
                    {examen.patient.lastName}
                  </p>
                  <p className="mb-2">
                    <strong>Fecha del Examen:</strong>{" "}
                    {new Date(examen.dateExam).toLocaleDateString("es-AR")}
                  </p>
                  <p className="mb-2">
                    <strong>Observaciones:</strong>{" "}
                    {examen.observations || "Sin observaciones"}
                  </p>
                  <p className="mb-2">
                    <strong>Prioridad:</strong> {examen.priority || "Normal"}
                  </p>
                </div>

                {/* Resultados */}
                <div>
                  <div className="flex justify-between font-bold border-b pb-2 mb-4">
                    <span className="w-1/2">Parámetro</span>
                    <span className="w-1/4 text-right">Valores Obtenidos</span>
                    <span className="w-1/4 text-right">Valores de Referencia</span>
                  </div>

                  {examen.results.map((result, index) => (
                    <div
                      key={result.id}
                      className={`flex justify-between py-2 ${
                        index % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                    >
                      <span className="w-1/2 font-medium">{result.parameter}</span>
                      <span className="w-1/4 text-right">{result.valueResult}</span>
                      <span className="w-1/4 text-right text-gray-600">
                        {result.reference}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultadoAnalisisAdmin;
