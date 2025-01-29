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

                dispatch(setAllPacientes(result.data));
            } else {
            }
        } catch (error) {
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
            firstName: paciente?.nombres,
            lastName: paciente?.apellidos,
            phone: paciente?.telefono,
            birth: paciente?.fechaNacimiento?.toISOString(),
            personalIDType: paciente?.tipoDocumento=='DNI'? 0:1,
            personalID: paciente?.documento, 
            email: paciente?.email
        }
        console.log(pacienteAEnviar);
        
        try {
            const response = await fetch(`${BACKEND_URL}/patient`, {
                method: "POST",
                headers: config.headers,
                body: JSON.stringify(pacienteAEnviar),
            });

            if (response.ok) {
                const result = await response.json();
                pacienteAEnviar.id=result.data.personalID;
                dispatch(addPaciente(pacienteAEnviar));
                
            } else {
            }
        } catch (error) {
        };
    };

    return {
        getAllPacientes,
        addOnePaciente,
        searchPaciente
    };
};
