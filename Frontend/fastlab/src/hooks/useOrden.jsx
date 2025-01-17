import { useSelector } from "react-redux";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const useOrden = () => {
    const token = useSelector((state) => state.user.token);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    
    
    
    const addOneOrden = async (orden) => {
        const ordenAEnviar = {
            status: '',
            dateExam: '',
            priority: '',
            observations: '',
            patientId: '',
            doctorId: 1,
            examIds: []
        }
        try {
            console.log(JSON.stringify(ordenAEnviar))
            const response = await fetch(`${BACKEND_URL}/results/orders/create`, {
                method: "POST",
                headers: config.headers,
                body: JSON.stringify(ordenAEnviar),
            }
            );

            if (response.ok) {
                const result = await response.json();
                console.log(result)
                ordenAEnviar.id=result.data.personalID;
                
            } else {
                console.log("Error añadir orden.", response.json());
            }
        } catch (error) {
            console.log("Error de conexión con el servidor.");
            console.error(error);
        };
    };

    return {
        addOneOrden
    };
};
