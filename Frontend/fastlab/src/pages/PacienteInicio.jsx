import MenuLateral from "../components/menuLateral/MenuLateral";
import NewResults from "../components/PacienteInicio/NewResults";
import arrayItemsMenuPaciente from "../utils/itemsMenuPaciente";

const PacienteInicio =()=>{
  
    return (
        <>
         <div>
      
    </div>
        <div className="relative h-screen bg-gray-50">
            <div className="fixed top-0 left-0 min-w-[266px] h-full">
                <MenuLateral items={arrayItemsMenuPaciente} />
            </div>
            <div className="ml-[266px] overflow-y-auto h-full">
                <NewResults />
            </div>
        </div>
        </>
    )
}
export default PacienteInicio;