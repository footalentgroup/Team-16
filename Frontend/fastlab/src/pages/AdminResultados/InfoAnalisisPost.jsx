import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import Calendar from "../../components/ui/calendar";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import Breadcrumb from "../../components/navigation/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { FancyMultiSelect } from "../../components/craft/fancy-multi-select";

const BACKEND_URL = import.meta.env.VITE_API_URL; // Configurado en tu .env

const CargaResultados = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [orderOptions, setOrderOptions] = useState([]);
  const [examOptions, setExamOptions] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [allExams, setAllExams] = useState([]); // Lista de todos los exámenes
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingExams, setLoadingExams] = useState(false);

  const estadoOptions = [
    { value: "pendiente", label: "Pendiente" },
    { value: "en_proceso", label: "En proceso" },
    { value: "finalizado", label: "Finalizado" },
  ];

  useEffect(() => {
    if (!state?.patientId) {
      console.error("No se proporcionó un ID de paciente válido.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/results/orders/get-by-patient-id?id=${state.patientId}`);
        if (!response.ok) {
          throw new Error(`Error al obtener las órdenes: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !data.data) {
          throw new Error("Formato de respuesta no válido del backend.");
        }

        setOrdersData(data.data);
        const formattedOptions = data.data.map((order) => ({
          value: order.id,
          label: `Orden #${order.id}`,
        }));
        setOrderOptions(formattedOptions);
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    const fetchAllExams = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/exams`);
        if (!response.ok) {
          throw new Error(`Error al obtener los exámenes: ${response.status}`);
        }
        const data = await response.json();
        setAllExams(data); // Guardar todos los exámenes en el estado
      } catch (error) {
        console.error("Error al cargar los exámenes:", error);
      }
    };

    fetchOrders();
    fetchAllExams();
  }, [state?.patientId]);

  const handleOrderSelection = (selectedOrderId) => {
    const selectedOrder = ordersData.find((order) => order.id === selectedOrderId);

    if (selectedOrder) {
      const formattedExams = selectedOrder.examIds
        .map((examId) => {
          const exam = allExams.find((e) => e.id === examId);
          return exam ? { value: exam.id, label: exam.name } : null;
        })
        .filter((exam) => exam !== null);

      setExamOptions(formattedExams);
    } else {
      setExamOptions([]);
    }
  };

  const onSubmit = (data) => {
    const selectedExams = data.tipoExamen.map(item => item.value);
    const reportId = data.numeroOrden?.[0]?.value; // Extraer el reportId de la selección.
  
    if (!reportId) {
      console.error("No se seleccionó un número de orden.");
      return;
    }
  
    const formDataWithExams = {
      reportId,
      selectedExams,
    };
  
    console.log("Datos enviados al siguiente componente:", formDataWithExams);
  
    navigate("/admin/resultados/carga-de-resultados/parametros", {
      state: { ...formDataWithExams, reportId },
    });
  };
  

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      <div className="bg-gray-50 ml-[266px] overflow-y-auto h-full">
        <div className="my-4 mx-4">
          <Breadcrumb
            items={[
              { title: "Admin", to: "/admin/ingresar-orden" },
              { title: "Resultados", to: "/admin/resultados" },
              { title: "Carga de resultados" },
            ]}
          />
        </div>

        <div className="flex mb-4 items-center gap-1">
          <ChevronLeft size={18} />
          <button
            onClick={() => navigate(-1)}
            className="text-[#0E1B27] text-sm font-medium"
          >
            Regresar
          </button>
        </div>

        <Progress className="[&>*]:bg-[#02807D] mb-6" value={66.66} />

        <h1 className="text-xl font-bold mb-4 text-center mt-10 text-[#0E1B27]">
          Información de análisis
        </h1>

        <div className="w-full flex justify-center">
          <form className="space-y-4 w-1/2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="numeroOrden"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Número de orden
              </label>
              {loadingOrders ? (
                <p className="text-sm text-gray-500">Cargando órdenes...</p>
              ) : (
                <Controller
                  name="numeroOrden"
                  control={control}
                  rules={{ required: "Seleccione una orden." }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                      <FancyMultiSelect
                        options={orderOptions}
                        selected={value || []}
                        onSelect={(selected) => {
                          onChange(selected);
                          if (selected.length > 0) {
                            handleOrderSelection(selected[0].value);
                          } else {
                            setExamOptions([]);
                          }
                        }}
                        single
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

            <div>
              <label
                htmlFor="fechaToma"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Fecha de la toma de muestra
              </label>
              <Calendar
                control={control}
                name="fechaToma"
                placeholder="Selecciona la fecha"
                label=""
              />
              {errors.fechaToma && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fechaToma.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="fechaAnalisis"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Fecha del análisis
              </label>
              <Calendar
                control={control}
                name="fechaAnalisis"
                placeholder="Selecciona la fecha"
                label=""
              />
              {errors.fechaAnalisis && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fechaAnalisis.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="tipoExamen"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Tipo de examen
              </label>
              <Controller
                name="tipoExamen"
                control={control}
                rules={{ required: "Seleccione al menos un examen." }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <FancyMultiSelect
                    options={examOptions}
                    selected={value || []}
                    onSelect={onChange}
                  />
                )}
              />
            </div>

            <div>
              <label
                htmlFor="estadoAnalisis"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Estado del análisis
              </label>
              <select
                id="estadoAnalisis"
                className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.estadoAnalisis ? "border-red-500" : ""
                }`}
                {...register("estadoAnalisis", {
                  required: "Seleccione el estado del análisis.",
                })}
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                {estadoOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.estadoAnalisis && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.estadoAnalisis.message}
                </p>
              )}
            </div>

            <div className="flex justify-end w-full ml-20 mb-8">
              <button
                type="submit"
                className="bg-teal-500 text-white mb-8 mt-10 py-2 px-4 rounded-md hover:bg-teal-600 flex items-center justify-center"
              >
                Siguiente
                <FaAngleRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CargaResultados;
