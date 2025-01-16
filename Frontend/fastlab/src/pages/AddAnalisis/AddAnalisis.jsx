import { FaAngleRight } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import Calendario from "../../components/DatosPersonales/Calendario";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import Breadcrumb from "../../components/navigation/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { FancyMultiSelect } from "../../components/craft/fancy-multi-select";

const AddAnalisis = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Al enviar el formulario
  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);

    // data.tipoAnalisis es un array de objetos { value, label }
    const examIds = data.tipoAnalisis.map((item) => item.value);
    console.log("Exámenes seleccionados (IDs):", examIds);

    // Creamos el nuevo objeto, incluyendo patientId y doctorId numéricos
    const formDataWithExams = {
      ...data,
      examIds,
      patientId: state?.patientId || 0, 
      doctorId: parseInt(data.medico, 10),
    };

    // Navegar a la siguiente pantalla con toda la información
    navigate(
      "/admin/ingresar-orden/paciente-registrado/orden-de-analisis/metodo-de-envio",
      { state: formDataWithExams }
    );
  };

  // Opciones del FancyMultiSelect (usa value y label)
  const analysisOptions = [
    { value: 1, label: "Hemograma Completo" },
    { value: 2, label: "Glucosa en sangre" },
    { value: 3, label: "Perfil Lipido" },
  ];

  // Opciones de médico (usa value para ID)
  const doctors = [
    { value: 1, label: "Ricky Maravilla" },
    { value: 2, label: "Manuel Pascual" },
    { value: 3, label: "Ricardo Forman" },
  ];

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
              { title: "Orden de Análisis", to: "/admin/ingresar-orden" },
            ]}
          />
        </div>

        {/* Botón de regresar */}
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
          Órden de Análisis
        </h1>

        <div className="w-full flex justify-center">
          <form className="space-y-4 w-1/2" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo: Tipo de análisis con FancyMultiSelect */}
            <div>
              <label
                htmlFor="tipoAnalisis"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Tipo de análisis
              </label>
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
                name="prioridad"
                className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none ${
                  errors.prioridad ? "border-red-500" : ""
                }`}
                {...register("prioridad", {
                  required: "Seleccione la prioridad.",
                })}
              >
                <option value="" disabled>
                  Seleccionar Prioridad
                </option>
                <option value="urgente">Urgente</option>
                <option value="normal">Normal</option>
              </select>
              {errors.prioridad && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.prioridad.message}
                </p>
              )}
            </div>

            {/* Fecha de receta */}
            <Calendario
              control={control}
              name="fechaReceta"
              placeholder="Selecciona la fecha de la receta"
              label="Fecha de receta"
              labelClassName="text-sm font-semibold text-[#0E1B27]"
            />

            <h1 className="text-lg font-semibold text-[#0E1B27] mt-6">
              Detalles adicionales de médico/solicitante
            </h1>

            {/* Médico solicitante */}
            <div>
              <label
                htmlFor="medico"
                className="block text-sm font-medium mb-1 text-[#0E1B27]"
              >
                Médico solicitante
              </label>
              <select
                id="medico"
                name="medico"
                className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none ${
                  errors.medico ? "border-red-500" : ""
                }`}
                {...register("medico", {
                  required: "Seleccione un médico.",
                })}
              >
                <option value="" disabled>
                  Buscar médico
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.value} value={doctor.value}>
                    {doctor.label}
                  </option>
                ))}
              </select>
              {errors.medico && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.medico.message}
                </p>
              )}
            </div>

            {/* Observaciones */}
            <div>
              <label
                htmlFor="observaciones"
                className="block text-sm font-medium mb-1 text-[#0E1B27]"
              >
                Observaciones
              </label>
              <textarea
                id="observaciones"
                name="observaciones"
                className={`w-full border bg-slate-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none ${
                  errors.observaciones ? "border-red-500" : ""
                }`}
                placeholder="Escriba sus observaciones aquí"
                rows={4}
                {...register("observaciones")}
              />
              {errors.observaciones && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.observaciones.message}
                </p>
              )}
            </div>

            {/* Botón submit */}
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

export default AddAnalisis;
