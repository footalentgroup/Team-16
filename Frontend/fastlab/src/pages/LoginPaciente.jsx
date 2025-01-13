import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/user/userSlice"; 
import { setError } from "../features/ui/uiSlice"; 
import LoginInput from "../components/LoginInput/LoginInput";
import imgLogin from "../assets/login.png";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const LoginPaciente = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [placeholder, setPlaceholder] = useState("Ejemplo: 12345678");

  const tipoDocumento = watch("tipoDocumento", "");

  useEffect(() => {
    if (tipoDocumento === "Pasaporte") {
      setPlaceholder("Ejemplo: AAF532592");
    } else {
      setPlaceholder("Ejemplo: 99.999.999");
    }
  }, [tipoDocumento]);

  const onSubmit = async (data) => {
    setIsFormSubmitted(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/patient-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalID: data.documento,
          personalIDType: data.tipoDocumento,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(
          login({
            id: result.data.id,
            name: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email,
            phone: result.data.phone,
            birth: result.data.birth, 
            token: result.data.token,
            role: 'Patient',
          })
        );
        
        navigate("/paciente/inicio");
      } else {
        dispatch(setError(result.message || "Error al iniciar sesión"));
      }
    } catch (error) {
      dispatch(setError("Error de conexión con el servidor."));
    } finally {
      setIsFormSubmitted(false);
    }
  };

  return (
    <div className="flex justify-around items-center min-h-screen">
      <div className="w-[60%] p-14 ml-14">
        <div className="max-w-[400px]">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ingresar a fastLab</h1>
          <p className="text-gray-500 mb-6">Estás por ingresar como paciente</p>
          <div className="w-full h-[2px] bg-gray-300 mb-6"></div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label htmlFor="tipoDocumento" className="block text-gray-700 text-sm mb-1">
                Tipo de documento
              </label>
              <select
                id="tipoDocumento"
                disabled={isFormSubmitted}
                {...register("tipoDocumento", { required: "Selecciona un tipo de documento" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  errors.tipoDocumento
                    ? "border-red-500 text-red-500 placeholder-red-500"
                    : "border-gray-300 focus:ring-teal-500"
                }`}
              >
                <option value="" hidden>Seleccionar tipo de documento</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
              {errors.tipoDocumento && (
                <p className="text-red-500 text-sm mt-1">{errors.tipoDocumento.message}</p>
              )}
            </div>

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
                  message: tipoDocumento === "Pasaporte"
                    ? "Formato: 3 letras seguidas de 6 números (ej. AAF532592)"
                    : "Formato: 8 dígitos (ej. 12345678)",
                },
              }}
              disabled={isFormSubmitted}
              error={errors.documento}
              errorClass="placeholder-red-500 border-red-500"
            />

            <LoginInput
              label="Contraseña"
              id="password"
              name="password"
              type="password"
              placeholder="*******"
              register={register}
              rules={{
                required: "La contraseña es obligatoria.",
                minLength: { value: 8, message: "La contraseña debe tener mínimo 8 caracteres." },
              }}
              disabled={isFormSubmitted}
              error={errors.password}
              errorClass="placeholder-red-500 border-red-500"
            />

            <button
              type="submit"
              disabled={isFormSubmitted}
              className={`w-full text-white font-semibold py-2 px-4 rounded-md focus:outline-none ${
                isFormSubmitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#02807D] hover:bg-teal-600 focus:ring-2 focus:ring-teal-500"
              }`}
            >
              {isFormSubmitted ? "Cargando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>

      <div className="relative h-[95vh] my-4 mr-8">
        <img src={imgLogin} alt="Fastlab" className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  );
};

export default LoginPaciente;
