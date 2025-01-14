import React from "react";
import Avatar from "../../assets/ellipse.svg";

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
    <div className="bg-white shadow rounded-md max-h-[350px] overflow-hidden">
      {patients.map((patient, index) => (
        <div
          key={patient.id}
          className={`flex items-center justify-between p-4 border-b last:border-b-0 ${
            index % 2 === 0 ? "bg-gray-100" : "bg-white"
          }`}
        >
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
          <button
            className="text-teal-500 font-semibold hover:underline"
            onClick={() => onSelectPatient(patient)}
          >
            Ver detalles
          </button>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
