import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendario from "./Calendario";
import LoginInput from "../LoginInput/LoginInput";

const DatosPersonales = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({}); 
  const onSubmit = (data) => {
    setFormData(data); 
    toast.success("Se actualizaron los datos correctamente", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("Formulario enviado:", data);
  };

  return (
    <>
      
      <ToastContainer />

      <h1 className="text-2xl font-bold text-gray-800  w-1/4  flex justify-center mt-14">
        Mis datos
      </h1>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white p-8">
          <h1 className="text-lg font-bold text-gray-800 mb-4 ">Datos Personales</h1>
          <p className="text-gray-500 mb-4">
            Puedes ver tus datos y modificar los que creas necesarios
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombres */}
            <LoginInput
              label="Nombres"
              id="nombres"
              name="nombres"
              placeholder="Ejemplo: Juan José"
              defaultValue={formData.nombres || ""}
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
              defaultValue={formData.apellidos || ""}
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
              defaultValue={formData.telefono || ""}
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

            {/* Correo electrónico */}
            <LoginInput
              label="Correo electrónico"
              id="email"
              name="email"
              placeholder="Ejemplo: email@email.com"
              defaultValue={formData.email || ""}
              register={register}
              rules={{
                required: "Ingrese tu correo electrónico.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "No parece una dirección de correo electrónico válida.",
                },
                maxLength: {
                  value: 100,
                  message: "Utiliza una dirección de correo electrónico más corta (máximo 100 caracteres).",
                },
              }}
              error={errors.email}
            />

            <div className="flex w-full justify-end mt-8">
              <button
                type="submit"
                className="w-2/5 bg-[#02807D] text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-500 focus:ring-2 focus:ring-teal-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DatosPersonales;
