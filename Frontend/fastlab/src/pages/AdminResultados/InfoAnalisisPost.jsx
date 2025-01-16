import React from "react"
import { FaAngleRight } from "react-icons/fa6"
import { useForm, Controller } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"

import Calendar from "../../components/ui/calendar"
import MenuLateral from "../../components/menuLateral/MenuLateral"
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin"
import Breadcrumb from "../../components/navigation/breadcrumb"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft } from "lucide-react"

/**
 * Formulario para la Carga de Resultados
 */
const CargaResultados = () => {
  // Si necesitas leer algo del state, puedes usar useLocation:
  const { state } = useLocation()
  const navigate = useNavigate()

  // Inicialización de react-hook-form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // Al enviar el formulario
  const onSubmit = (data) => {
    console.log("Datos del formulario:", data)

    // Ejemplo: Podrías procesar la info o navegar a otra ruta
    // con la data en el state
    navigate("/admin/resultados/revision-final", { state: data })
  }

  // Opciones de ejemplo para "Tipo de examen"
  const examOptions = [
    { value: "hemograma", label: "Hemograma Completo" },
    { value: "glucemia", label: "Glucemia" },
    { value: "perfil_lipido", label: "Perfil Lipídico" },
  ]

  // Opciones para "Estado del análisis"
  const estadoOptions = [
    { value: "pendiente", label: "Pendiente" },
    { value: "en_proceso", label: "En proceso" },
    { value: "finalizado", label: "Finalizado" },
  ]

  return (
    <div className="relative max-h-screen h-screen bg-gray-50">
      {/* Menú lateral */}
      <div className="fixed top-0 left-0 min-w-[266px] h-full">
        <MenuLateral items={arrayItemsMenuAdmin} />
      </div>

      <div className="bg-gray-50 ml-[266px] overflow-y-auto h-full">
        {/* Breadcrumb */}
        <div className="my-4 mx-4">
          <Breadcrumb
            items={[
              { title: "Admin", to: "/admin/ingresar-orden" },
              { title: "Resultados", to: "/admin/resultados" },
              { title: "Carga de resultados" },
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

        {/* Barra de progreso (opcional) */}
        <Progress className="[&>*]:bg-[#02807D] mb-6" value={66.66} />

        <h1 className="text-xl font-bold mb-4 text-center mt-10 text-[#0E1B27]">
          Información de análisis
        </h1>

        <div className="w-full flex justify-center">
          <form className="space-y-4 w-1/2" onSubmit={handleSubmit(onSubmit)}>
            {/* Número de orden */}
            <div>
              <label
                htmlFor="numeroOrden"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Número de orden
              </label>
              <input
                id="numeroOrden"
                type="text"
                placeholder="Ejemplo: 23434"
                className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.numeroOrden ? "border-red-500" : ""
                }`}
                {...register("numeroOrden", {
                  required: "Este campo es obligatorio.",
                })}
              />
              {errors.numeroOrden && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numeroOrden.message}
                </p>
              )}
            </div>

            {/* Fecha de la toma de muestra */}
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

            {/* Fecha del análisis */}
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

            {/* Tipo de examen */}
            <div>
              <label
                htmlFor="tipoExamen"
                className="block font-medium mb-1 text-sm text-[#0E1B27]"
              >
                Tipo de examen
              </label>
              <select
                id="tipoExamen"
                className={`w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500 ${
                  errors.tipoExamen ? "border-red-500" : ""
                }`}
                {...register("tipoExamen", {
                  required: "Seleccione el tipo de examen.",
                })}
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                {examOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.tipoExamen && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tipoExamen.message}
                </p>
              )}
            </div>

            {/* Estado del análisis */}
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
  )
}

export default CargaResultados
