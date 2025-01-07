import React, { useState } from "react";
import { useForm } from "react-hook-form";
import imgLogin from "../assets/login.png";
import LoginInput from "../components/LoginInput/LoginInput";

const LoginPaciente = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [placeholder, setPlaceholder] = useState("Ejemplo: 12345678");

  const tipoDocumento = watch("tipoDocumento", "");

  React.useEffect(() => {
    if (tipoDocumento === "Pasaporte") {
      setPlaceholder("Ejemplo: AAF532592");
    } else {
      setPlaceholder("Ejemplo: 99.999.999");
    }
  }, [tipoDocumento]);

  const onSubmit = async (data) => {
    setIsFormSubmitted(true); 
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form Submitted Successfully:", data);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="flex justify-around items-center min-h-screen">
      <div className="w-[60%] p-14 ml-14">
        <div className="max-w-[400px]">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ingresar a fastlab</h1>
          <p className="text-gray-500 mb-6">Estás por ingresar como paciente</p>
          <div className="w-full h-[2px] bg-gray-300 mb-6"></div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            {/* Tipo de documento */}
            <div className="mb-4">
              <label htmlFor="tipoDocumento" className="block text-gray-700 text-sm mb-1">
                Tipo de documento
              </label>
              <select
                id="tipoDocumento"
                disabled={isFormSubmitted}
                {...register("tipoDocumento", {
                  required: "Selecciona un tipo de documento",
                })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.tipoDocumento
                    ? "border-red-500 text-red-500 placeholder-red-500"
                    : "border-gray-300 focus:ring-teal-500"
                }`}
              >
                <option value="" hidden>
                  Seleccionar tipo de documento
                </option>
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
              placeholder={placeholder}
              register={register}
              rules={{
                required: "Este campo es obligatorio.",
                pattern: {
                  value: tipoDocumento === "Pasaporte" ? /^[A-Z]{3}\d{6}$/ : /^\d{8}$/,
                  message:
                    tipoDocumento === "Pasaporte"
                      ? "Formato: 3 letras seguidas de 6 números (ej. AAF532592)"
                      : "Formato: 8 dígitos (ej. 12345678)",
                },
              }}
              disabled={isFormSubmitted}
              error={errors.documento}
              errorClass="placeholder-red-500 border-red-500"
            />

            {/* Contraseña */}
            <LoginInput
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              placeholder="*******"
              register={register}
              rules={{
                required: "La contraseña es obligatoria.",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener mínimo 8 caracteres.",
                },
              }}
              disabled={isFormSubmitted}
              error={errors.password}
              errorClass="placeholder-red-500 border-red-500"
            />

            {/* Recordar contraseña */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                disabled={isFormSubmitted}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700 text-sm">
                Recordar contraseña
              </label>
            </div>

         
            <button
              type="submit"
              disabled={isFormSubmitted}
              className={`w-full text-white font-semibold py-2 px-4 rounded-md focus:outline-none ${
                isFormSubmitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#02807D] hover:bg-teal-600 focus:ring-2 focus:ring-teal-500"
              }`}
            >
              {isFormSubmitted ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Cargando...
                </div>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>
        </div>
      </div>

      
      <div className=" relative h-[95vh] my-4 mr-8">
        <div className="absolute inset-0 bg-[#002739] opacity-60 rounded-xl"></div>
        <img
          src={imgLogin}
          alt="Fastlab"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default LoginPaciente;
