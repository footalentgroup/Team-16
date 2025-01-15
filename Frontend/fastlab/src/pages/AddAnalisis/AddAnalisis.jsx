import { FaAngleRight } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Calendario from "../../components/DatosPersonales/Calendario";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";
import Breadcrumb from "../../components/navigation/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from 'lucide-react';

const AddAnalisis = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const navigate = useNavigate();

  const doctors = [
    { value: "doctor1", label: "Ricky Maravilla" },
    { value: "doctor2", label: " Manuel Pascual " },
    { value: "doctor3", label: "Ricardo Forman" }
  ];

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>
    <div className=" bg-gray-50 ml-[266px] overflow-y-auto h-full">
    
    <div className="my-4 mx-4">
    <Breadcrumb
          items={[
            { title: "Admin", to: "/admin/ingresar-orden" },
            { title: "Orden de Analisis", to: "/admin/ingresar-orden" },
          ]}
        />
        </div>
        {/* boton de regresar */}
        <div className="flex mb-4 items-center gap-1">
        <ChevronLeft size={18}/>
        <button onClick={() => navigate(-1)} className="text-[#0E1B27] text-sm font-medium">Regresar</button>
        </div>

        <Progress className="[&>*]:bg-[#02807D] mb-6" value={33.3}  />
      <h1 className="text-xl font-bold mb-4 text-center  mt-10 text-[#0E1B27]">Órden de Análisis</h1>
      <div className="w-full flex justify-center">
        <form className="space-y-4 w-1/2" onSubmit={handleSubmit(onSubmit)}>
          {/* Tipo de análisis */}
          <div>
            <label htmlFor="tipoAnalisis" className="block font-medium mb-1 text-sm text-[#0E1B27]">
              Tipo de análisis
            </label>
            <select
              id="tipoAnalisis"
              name="tipoAnalisis"
              className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none appearance-none ${errors.tipoAnalisis ? 'border-red-500' : ''}`}
              {...register("tipoAnalisis", { required: "Seleccione un tipo de análisis." })}
            >
              <option value="" disabled selected>
                Buscar análisis
              </option>
              <option value="sangre">Hemograma Completo</option>
              <option value="imagen">Glucosa en sangre</option>
              <option value="orina">Perfil Lipido</option>
            </select>
            {errors.tipoAnalisis && (
              <p className="text-red-500 text-sm mt-1">{errors.tipoAnalisis.message}</p>
            )}
          </div>

          {/* Prioridad */}
          <div>
            <label htmlFor="prioridad" className="block text-sm font-medium mb-1 text-[#0E1B27]">
              Prioridad de análisis
            </label>
            <select
              id="prioridad"
              name="prioridad"
              className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none ${errors.prioridad ? 'border-red-500' : ''}`}
              {...register("prioridad", { required: "Seleccione la prioridad." })}
            >
              <option value="" disabled selected>
                Seleccionar Prioridad
              </option>
              <option value="urgente">Urgente</option>
              <option value="normal">Normal</option>
            </select>
            {errors.prioridad && (
              <p className="text-red-500 text-sm mt-1">{errors.prioridad.message}</p>
            )}
          </div>

          {/* Calendario */}
          <Calendario
            control={control}
            name="fechaReceta"
            placeholder="Selecciona la fecha de la receta"
            label="Fecha de receta"
            labelClassName="text-sm font-semibold text-[#0E1B27] "
          />

          <h1 className="text-lg font-semibold text-[#0E1B27]  mt-6">Detalles adicionales de médico/solicitante</h1>

          {/* Médico solicitante */}
          <div>
            <label htmlFor="medico" className="block text-sm font-medium mb-1 text-[#0E1B27]">
              Médico solicitante
            </label>
            <select
              id="medico"
              name="medico"
              className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none ${errors.medico ? 'border-red-500' : ''}`}
              {...register("medico", { required: "Seleccione un médico." })}
            >
              <option value="" disabled selected>
                Buscar médico
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.value} value={doctor.value}>
                  {doctor.label}
                </option>
              ))}
            </select>
            {errors.medico && (
              <p className="text-red-500 text-sm mt-1">{errors.medico.message}</p>
            )}
          </div>

          {/* Observaciones */}
          <div>
            <label htmlFor="observaciones" className="block text-sm font-medium mb-1 text-[#0E1B27]">
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              className={`w-full border bg-slate-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none ${errors.observaciones ? 'border-red-500' : ''}`}
              placeholder="Escriba sus observaciones aquí"
              rows="4"
              {...register("observaciones")}
            />
            {errors.observaciones && (
              <p className="text-red-500 text-sm mt-1">{errors.observaciones.message}</p>
            )}
          </div>

          {/* Botón */}
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
