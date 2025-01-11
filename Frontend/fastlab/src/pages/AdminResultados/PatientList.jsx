import React from "react";

const PatientList = ({ patients }) => {
  return (
    <div className="bg-white shadow rounded-md">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex items-center justify-between p-4 border-b last:border-b-0"
        >
          <div>
            <p className="text-lg font-bold">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-gray-500">{patient.email}</p>
            <p className="text-gray-500">{patient.phone}</p>
            <p className="text-gray-500">{patient.birth}</p>
          </div>
          <button
            className="text-teal-500 font-semibold hover:underline"
            onClick={() => alert(`Detalles del paciente ID: ${patient.id}`)}
          >
            Ver detalles
          </button>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
