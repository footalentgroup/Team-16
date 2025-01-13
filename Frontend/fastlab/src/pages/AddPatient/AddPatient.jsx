import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginInput from "../../components/LoginInput/LoginInput";
import Calendario from "../../components/DatosPersonales/Calendario";
import Breadcrumb from "../../components/navigation/breadcrumb";
import ImageUploader from "./ImageUploader";
import { FaAngleRight } from "react-icons/fa6";

const AddPatient = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  // const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (user) {
  //     setValue("nombres", user.name || "");
  //     setValue("apellidos", user.lastName || "");
  //     setValue("telefono", user.phone || "");
  //     setValue("fechaNacimiento", user.birth ? new Date(user.birth) : null);
  //     setValue("email", user.email || "");
  //   }
  // }, [user, setValue]);

  const onSubmit = (data) => {
    toast.success("Paciente añadido exitosamente", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.log("Datos del formulario:", data);
  };

  return (
    <>
      <section className="flex min-h-screen bg-gray-50">
        <ToastContainer />
        <div className="w-full flex flex-col p-8">
          <Breadcrumb first="Admin" second="Pacientes" third="Añadir" />
          <h1 className="text-2xl font-bold text-[#0E1B27] mb-6 mt-5">Añadir paciente</h1>
          <div className="flex">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 p-8 mr-8">
              <h2 className="text-lg font-semibold text-[#0E1B27] mb-4">Datos personales</h2>

              {/* Nombres */}
              <LoginInput
                label="Nombres"
                id="nombres"
                name="nombres"
                placeholder="Ejemplo: José Manuel"
                register={register}
                rules={{
                  required: "Este campo es obligatorio.",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres.",
                  },
                }}
                error={errors.nombres}
              />

              {/* Apellidos */}
              <LoginInput
                label="Apellidos"
                id="apellidos"
                name="apellidos"
                placeholder="Ejemplo: Campos Estrada"
                register={register}
                rules={{
                  required: "Este campo es obligatorio.",
                  minLength: {
                    value: 2,
                    message: "El apellido debe tener al menos 2 caracteres.",
                  },
                }}
                error={errors.apellidos}
              />

              {/* Teléfono */}
              <LoginInput
                label="Teléfono"
                id="telefono"
                name="telefono"
                placeholder="Ejemplo: +54 999 999 999"
                register={register}
                rules={{
                  required: "Formato incorrecto.",
                  pattern: {
                    value: /^\+?\d{9,15}$/,
                    message: "El formato debe ser válido, ej: +54 999 999 999",
                  },
                }}
                error={errors.telefono}
              />

              {/* Fecha de nacimiento */}
              <Calendario
                control={control}
                name="fechaNacimiento"
                placeholder="Selecciona la fecha de nacimiento"
              />

              {/* Tipo de documento */}
              <div className="mb-4">
                <label htmlFor="tipoDocumento" className="block text-sm font-medium text-[#0E1B27]">
                  Tipo de documento
                </label>
                <select
                  id="tipoDocumento"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  {...register("tipoDocumento", { required: "Seleccione un tipo de documento." })}
                >
                  <option value="">Seleccionar tipo de documento</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                {errors.tipoDocumento && (
                  <p className="text-red-500 text-sm mt-1">{errors.tipoDocumento.message}</p>
                )}
              </div>

              {/* Documento */}
              <LoginInput
                label="Documento"
                id="documento"
                name="documento"
                placeholder="Ejemplo: 99.999.999"
                register={register}
                rules={{
                  required: "Este campo es obligatorio.",
                  pattern: {
                    value: /^\d{7,10}$/,
                    message: "Ingrese un número de documento válido.",
                  },
                }}
                error={errors.documento}
              />

              {/* Correo electrónico */}
              <LoginInput
                label="Correo electrónico"
                id="email"
                name="email"
                placeholder="Ejemplo: email@email.com"
                register={register}
                rules={{
                  required: "Este campo es obligatorio.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingrese un correo válido.",
                  },
                }}
                error={errors.email}
              />
            </form>

            {/* Foto del paciente */}
            <div className="w-1/2 p-8">
              <h1 className="mb-4">Foto de Paciente</h1>
              <ImageUploader />
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-end mr-6">
        <button
         type="submit"
        className="mt-4 w-1/6 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 flex items-center justify-center"
        >
         Siguiente
       <FaAngleRight className="ml-2" />
  </button>
</div>
        </div>
      </section>
    </>
  );
};

export default AddPatient;
