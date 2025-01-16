import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import MenuLateral from '../../components/menuLateral/MenuLateral';
import arrayItemsMenuPaciente from '../../utils/itemsMenuPaciente';
import { PDFTemplate } from './pdfTemplate';

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ResultadoAnalisis = () => {
  const { id } = useParams();
  const [examen, setExamen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamen = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/results/orders/get-by-id?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Error al cargar el examen.');

        const data = await response.json();
        setExamen(data.data);
      } catch (error) {
        console.error('Error al cargar el examen:', error);
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
    const link = document.createElement('a');
    link.href = url;
    link.download = `examen_${id}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando examen...</div>;
  }

  if (!examen) {
    return <div className="text-center mt-10">No se encontró el examen.</div>;
  }

  return (
    <div className="relative h-screen bg-gray-50 flex">
      {/* Menú lateral */}
      <div className="fixed top-0 left-0 w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuPaciente} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        {/* Botón para descargar PDF */}
        <div className="flex justify-end mb-4">
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Descargar PDF
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6 max-w-4xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold">Mariano Boedo 23 - Tel.(0387)-4215440 - 4400 Salta</h2>
          </div>

          {/* Información del paciente */}
          <div className="border-b pb-4 mb-4">
            <p className="mb-2"><strong>Paciente:</strong> {examen.patient.firstName} {examen.patient.lastName}</p>
            <p className="mb-2"><strong>Fecha del Examen:</strong> {new Date(examen.dateExam).toLocaleDateString('es-AR')}</p>
            <p className="mb-2"><strong>Observaciones:</strong> {examen.observations || 'Sin observaciones'}</p>
            <p className="mb-2"><strong>Prioridad:</strong> {examen.priority || 'Normal'}</p>
          </div>

          {/* Resultados */}
          <div>
            <div className="flex justify-between font-bold border-b pb-2 mb-4">
              <span className="w-1/2">Parámetro</span>
              <span className="w-1/4 text-right">Valores Obtenidos</span>
              <span className="w-1/4 text-right">Valores de Referencia</span>
            </div>

            {examen.results.map((result, index) => (
              <div key={result.id} className={`flex justify-between py-2 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                <span className="w-1/2 font-medium">{result.parameter}</span>
                <span className="w-1/4 text-right">{result.valueResult}</span>
                <span className="w-1/4 text-right text-gray-600">{result.reference}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultadoAnalisis;
