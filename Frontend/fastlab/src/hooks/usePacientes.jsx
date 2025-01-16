import { useDispatch } from "react-redux";
import { setAllPacientes, addPaciente } from "../features/pacientes/pacientesSlice";
import { useSelector } from "react-redux";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const usePacientes = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    const pacientes=useSelector((state)=>state.pacientes.lista);

    const getAllPacientes = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/patient/get-all`, {
                method: "GET",
                headers: config.headers,
            }
            );

            if (response.ok) {
                const result = await response.json();
                console.log(result.data)

                dispatch(setAllPacientes(result.data));
            } else {
                console.log("Error al cargar los pacientes.");
            }
        } catch (error) {
            console.log("Error de conexión con el servidor.");
            console.error(error);
        };
    }
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const searchPaciente =  (idBuscado) => {
        const pacienteFiltrado = pacientes.filter(paciente => paciente.id === idBuscado);
        if (pacienteFiltrado.length > 0) {
            return 0;
        } else {
            return pacienteFiltrado[0]
         }
    };

    
    
    const addOnePaciente = async (paciente) => {
        const pacienteAEnviar = {
            firstname: paciente?.nombres,
            lastname: paciente?.apellidos,
            phone: paciente?.telefono,
            birth: paciente?.fechaNacimiento?.toISOString(),
            personalIDType: paciente?.tipoDocumento=='DNI'? 0:1,
            personalID: paciente?.documento, 
            email: paciente?.email
        }
        try {
            console.log(JSON.stringify(pacienteAEnviar))
            const response = await fetch(`${BACKEND_URL}/patient`, {
                method: "POST",
                headers: config.headers,
                body: JSON.stringify(pacienteAEnviar),
            }
            );

            if (response.ok) {
                const result = await response.json();
                console.log(result)
                pacienteAEnviar.id=result.data.personalID;
                dispatch(addPaciente(pacienteAEnviar));
                
            } else {
                console.log("Error añadir el paciente.", response.json());
            }
        } catch (error) {
            console.log("Error de conexión con el servidor.");
            console.error(error);
        };
    };

    return {
        getAllPacientes,
        addOnePaciente,
        searchPaciente
    };
};
