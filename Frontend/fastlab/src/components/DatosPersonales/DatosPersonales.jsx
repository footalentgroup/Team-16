import { useEffect } from "react";
import { useSelector } from "react-redux"; 
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendario from "./Calendario";
import LoginInput from "../LoginInput/LoginInput";
import Breadcrumb from "../navigation/breadcrumb";
import { useUserPaciente } from "../../hooks/useUserPaciente";
const DatosPersonales = () => {

  const {updateUser} =useUserPaciente();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  
  const user = useSelector((state) => state.user);
  

  useEffect(() => {
   
    if (user) {
      setValue("nombres", user.name || "");
      setValue("apellidos", user.lastName || "");
      setValue("telefono", user.phone || "");
      setValue("fechaNacimiento", user.birth ? new Date(user.birth) : null); 
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    updateUser(data);
    toast.success("Se actualizaron los datos correctamente", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  };

  return (
    <>
      <section className="flex min-h-screen ">
        <div className="flex-1 p-8">
          <ToastContainer />
          <Breadcrumb 
            items={[ 
              {title: "Paciente", to: "/"},
              {title: "Mis Datos"}
            ]} />

          <h1 className="text-2xl font-bold text-gray-800 ">
            Mis datos
          </h1>

          <div className="flex flex-col items-center justify-center mt-10">
            <div className="w-full max-w-lg">
              <h1 className="text-lg font-bold text-gray-800 mb-4">
                Datos Personales
              </h1>
              <p className="text-gray-500 mb-4">
                Puedes ver tus datos y modificar los que creas necesarios
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
               
                <LoginInput
                  label="Nombres"
                  id="nombres"
                  name="nombres"
                  placeholder="Ejemplo: Juan José"
                  register={register}
                  defaultValue={user.name} 
                  rules={{
                    required: "Este campo es obligatorio.",
                    minLength: {
                      value: 2,
                      message: "El nombre debe tener al menos 2 caracteres.",
                    },
                  }}
                  error={errors.nombres}
                />

                <LoginInput
                  label="Apellidos"
                  id="apellidos"
                  name="apellidos"
                  placeholder="Ejemplo: Campos Estrada"
                  register={register}
                  defaultValue={user.lastName} 
                  rules={{
                    required: "Este campo es obligatorio.",
                    minLength: {
                      value: 2,
                      message: "El apellido debe tener al menos 2 caracteres.",
                    },
                  }}
                  error={errors.apellidos}
                />




             
                <Calendario
                  control={control}
                  name="fechaNacimiento"
                  placeholder="Selecciona la fecha de nacimiento"
                />

                <LoginInput
                  label="Teléfono"
                  id="telefono"
                  name="telefono"
                  placeholder="Ejemplo: +54 999 999 999"
                  register={register}
                  defaultValue={user.phone || ""}
                  rules={{
                    required: "Formato incorrecto.",
                    pattern: {
                      value: /^\+?\d{9,15}$/,
                      message: "El formato debe ser válido, ej: +54 999 999 999",
                    },
                  }}
                  error={errors.telefono}
                />

                <LoginInput
                  label="Correo electrónico"
                  id="email"
                  name="email"
                  placeholder="Ejemplo: email@email.com"
                  register={register}
                  defaultValue={user.email || ""}
                  rules={{
                    required: "Ingrese tu correo electrónico.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "No parece una dirección de correo electrónico válida.",
                    },
                    maxLength: {
                      value: 100,
                      message: "Máximo 100 caracteres.",
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
        </div>
      </section>
    </>
  );
};

export default DatosPersonales;
