import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import imgLogin from "../assets/login.png";
import LoginInput from "../components/LoginInput/LoginInput";

const BACKEND_URL = import.meta.env.VITE_API_URL; 

const LoginAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    setIsFormSubmitted(true); 
    let text = "";

    try {
      const response = await fetch(`${BACKEND_URL}/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email, // Correcto
          password: data.password, // Correcto
        }),
      });

      let result;

      try {
        text = await response.text(); // Captura la respuesta como texto
        result = JSON.parse(text); // Intenta convertirlo a JSON
      } catch (error) {
        console.error("Respuesta no es JSON, manejando como texto");
        result = { message: text }; // Usa el texto como mensaje si no es JSON
      }

      if (response.ok) {
        console.log("Login exitoso:", result);
        localStorage.setItem("token", result.token); // Guarda el token si existe
        alert("¡Login exitoso!");
        navigate("/dashboard"); // Redirige a la página deseada (ejemplo: /dashboard)
      } else {
        console.error("Error de autenticación:", result);
        alert(result.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setIsFormSubmitted(false); // Reactiva el formulario
    }
  };

  return (
    <div className="flex justify-around items-center min-h-screen">
      <div className="w-[60%] p-14 ml-14">
        <div className="max-w-[400px]">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ingresar a fastLab</h1>
          <p className="text-gray-500 mb-6">Estás por ingresar como administrador</p>
          <div className="w-full h-[2px] bg-gray-300 mb-6"></div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <LoginInput
              label="Correo electrónico"
              id="email"
              name="email"
              type="email"
              placeholder="Ejemplo: fastlab@gmail.com"
              register={register}
              rules={{
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Ingresa un correo válido (ej. ejemplo@gmail.com)",
                },
              }}
              disabled={isFormSubmitted}
              error={errors.email}
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
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener mínimo 8 caracteres.",
                },
              }}
              disabled={isFormSubmitted}
              error={errors.password}
              errorClass="placeholder-red-500 border-red-500"
            />

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

      <div className="relative h-[95vh] my-4 mr-8">
        <img
          src={imgLogin}
          alt="Fastlab"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default LoginAdmin;
