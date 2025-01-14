import notauthorized from "../assets/no-autorizado.png";
import { useSelector } from "react-redux";
const Notauthorized =()=>{
    const { isAuthenticated, birth } = useSelector((state) => state.user);
    let role='';
    if(birth===''){
        role='admin';
    }else{
        role="paciente";
    }
    
    return(
    <section className="w-full h-screen bg-gray-50 flex flex-col justify-center 
        items-center flex-wrap">
          <img src={notauthorized} alt="imagen de pagina no autorizada" />
    
          <h1 className="text-[3rem] ">Página no autorizada</h1>
          {isAuthenticated? <p>Usted debe iniciar sesión como {role=='paciente'? 'ADMINISTRADOR': 'PACIENTE'}</p>:
          <p>Usted debe iniciar sesión de la manera adecuada</p>}
          
        </section>
)
}
export default Notauthorized;