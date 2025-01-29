import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import Calendario from "../../components/ui/calendar.jsx";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import Breadcrumb from "../../components/navigation/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { FancyMultiSelect } from "../../components/craft/fancy-multi-select";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AddAnalisis = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [analysisOptions, setAnalysisOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/exams`);
        if (!response.ok) {
          throw new Error(`Error al obtener los exámenes: ${response.status}`);
        }
        const data = await response.json();
        const formattedOptions = data.map((exam) => ({
          value: exam.id,
          label: exam.name,
        }));
        setAnalysisOptions(formattedOptions);
      } catch (error) {
        console.error("Error al cargar los exámenes:", error);
      } finally {
        setLoadingExams(false);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/doctor/get-all`);
        if (!response.ok) {
          throw new Error(`Error al obtener los doctores: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          const formattedOptions = result.data.map((doctor) => ({
            value: doctor.id,
            label: `${doctor.name} ${doctor.lastName}`,
          }));
          setDoctorOptions(formattedOptions);
        } else {
          console.error("El formato de respuesta no es válido:", result);
        }
      } catch (error) {
        console.error("Error al cargar los doctores:", error);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const onSubmit = (data) => {
    const examIds = data.tipoAnalisis.map((item) => item.value);
    const doctorId = data.medico[0]?.value;

    const formDataWithExams = {
      ...data,
      examIds,
      patientId: state?.patientId || 0,
      doctorId: parseInt(doctorId, 10),
    };

    navigate(
      "/admin/ingresar-orden/paciente-registrado/orden-de-analisis/metodo-de-envio",
      { state: formDataWithExams }
    );
  };

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      <div className="ml-[266px] overflow-y-auto h-full">
        <main className='flex-1 p-8'>
          <div className='mx-auto'>
            
            <Breadcrumb
              items={[
                { title: "Admin", to: "/admin/ingresar-orden" },
                { title: "Ingresar orden", to: "/admin/ingresar-orden" },
                { title: "Órden de analisis"}, 
              ]}
            />

            <div className="flex mb-4 items-center gap-1">
              <ChevronLeft size={18} />
              <button
                onClick={() => navigate(-1)}
                className="text-[#0E1B27] text-sm font-medium"
              >
                Regresar
              </button>
            </div>

            <Progress className="[&>*]:bg-[#02807D] mb-6" value={66.6} />

            <h1 className="text-xl font-bold mb-4 text-center mt-10 text-[#0E1B27]">
              Órden de análisis
            </h1>

            <div className="w-full flex justify-center">
              <form className="space-y-4 w-1/2" onSubmit={handleSubmit(onSubmit)}>
                {/* Tipo de análisis */}
                <div>
                  <label
                    htmlFor="tipoAnalisis"
                    className="block font-medium mb-1 text-sm text-[#0E1B27]"
                  >
                    Tipo de análisis
                  </label>
                  {loadingExams ? (
                    <p className="text-sm text-gray-500">Cargando exámenes...</p>
                  ) : (
                    <Controller
                      name="tipoAnalisis"
                      control={control}
                      rules={{ required: "Seleccione al menos un análisis." }}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                          <FancyMultiSelect
                            options={analysisOptions}
                            selected={value || []}
                            onSelect={onChange}
                          />
                          {error && (
                            <p className="text-red-500 text-sm mt-1">
                              {error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  )}
                </div>

                {/* Prioridad */}
                <div>
                  <label
                    htmlFor="prioridad"
                    className="block text-sm font-medium mb-1 text-[#0E1B27]"
                  >
                    Prioridad de análisis
                  </label>
                  <select
                    id="prioridad"
                    className={`w-full border bg-gray-50 rounded-md px-3 py-2 ${
                      errors.prioridad ? "border-red-500" : ""
                    }`}
                    {...register("prioridad", {
                      required: "Seleccione la prioridad.",
                    })}
                  >
                    <option value="" disabled>
                      Seleccionar prioridad
                    </option>
                    <option value="normal">Normal</option>
                    <option value="urgente">Urgente</option>
                  </select>
                  {errors.prioridad && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.prioridad.message}
                    </p>
                  )}
                </div>

                {/* Fecha de receta */}
                <div>
                  <label
                    htmlFor="fechaReceta"
                    className="block font-medium mb-1 text-sm text-[#0E1B27]"
                  >
                    Fecha de receta
                  </label>
                  <Calendario
                    control={control}
                    name="fechaReceta"
                    placeholder="Selecciona la fecha"
                    minDate={new Date(state?.patientBirth)}
                  />
                  {errors.fechaReceta && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fechaReceta.message}
                    </p>
                  )}
                </div>

                {/* Médico solicitante */}
                <div>
                  <label
                    htmlFor="medico"
                    className="block font-medium mb-1 text-sm text-[#0E1B27]"
                  >
                    Médico solicitante
                  </label>
                  {loadingDoctors ? (
                    <p className="text-sm text-gray-500">Cargando doctores...</p>
                  ) : (
                    <Controller
                      name="medico"
                      control={control}
                      rules={{ required: "Seleccione un médico." }}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <>
                          <FancyMultiSelect
                            options={doctorOptions}
                            selected={value || []}
                            onSelect={onChange}
                            single // Forzar selección única
                          />
                          {error && (
                            <p className="text-red-500 text-sm mt-1">
                              {error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  )}
                </div>

                {/* Observaciones */}
                <div>
                  <label
                    htmlFor="observaciones"
                    className="block font-medium mb-1 text-sm text-[#0E1B27]"
                  >
                    Observaciones
                  </label>
                  <textarea
                    id="observaciones"
                    className="w-full border bg-gray-50 rounded-md px-3 py-2"
                    placeholder="Escriba sus observaciones aquí"
                    {...register("observaciones")}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 flex items-center"
                  >
                    Siguiente
                    <FaAngleRight className="ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddAnalisis;
