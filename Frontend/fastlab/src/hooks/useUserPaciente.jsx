import { useDispatch, useSelector } from "react-redux";
import { updateData} from "../features/user/userSlice";
const BACKEND_URL = import.meta.env.VITE_API_URL;

export const useUserPaciente = () => {
    const token = useSelector((state) => state.user.token);
    const dispatch= useDispatch();
    const id=useSelector((state)=>state.user.id);
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    
    const updateUser = async (user) => {
        const dataUser = {
            "id": id,
            "firstName": user?.nombres,
            "lastName": user.apellidos,
            "birth": user?.fechaNacimiento.toISOString(),
            "email": user?.email,
            "phone": user?.telefono
          }
        try {
            const response = await fetch(`${BACKEND_URL}/patient`, {
                method: "PUT",
                headers: config.headers,
                body: JSON.stringify(dataUser),
            }
            );

            if (response.ok) {
                const result = await response.json();

                dispatch(updateData(dataUser));
                
            } else {

            }
        } catch (error) {
        };
    };

    return {
        updateUser
    };
};
