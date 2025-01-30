import Avatar from "../../assets/ellipse.svg";
import { ChevronRight } from 'lucide-react';
import iconResults from "../../assets/icon-results.png";

const PatientList = ({ patients, onSelectPatient }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-md border overflow-hidden cursor-pointer">
      {patients.map((patient, index) => (
          <div
            key={patient?.id}
            className="p-4 hover:bg-gray-50 "
          >
            <div
             onClick={() => onSelectPatient(patient)}

              className="text-sm hover:text-teal-800 
                           "
            >
              <div className="flex justify-between items-center ">
                <div className="flex align-middle gap-4">
                 
                  <div className="flex items-center gap-x-4">
              <img src={Avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
              <div>
                <p className="text-lg font-bold">
                  {patient.firstName} {patient.lastName}
                </p>
                <div className="flex gap-x-4 text-xs text-gray-500">
                  <p>{patient.email}</p>
                  <p>{patient.phone}</p>
                  <p>{formatDate(patient.birth)}</p>
                </div>
              </div>
            </div>
                </div>

                <div className="w-[200px] gap-1 flex justify-center text-[#02807D] font-medium items-center hover:underline">
                  <p>Ver detalles </p>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
      ))}
    </div>
  );
};

export default PatientList;
