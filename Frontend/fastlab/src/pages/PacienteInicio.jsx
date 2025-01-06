import MenuLateral from "../components/menuLateral/MenuLateral";
import arrayItemsMenuPaciente from "../utils/itemsMenuPaciente";

const PacienteInicio =()=>{
        
    return (
        <>
        <div className="relative h-screen">
            <div className="fixed top-0 left-0 min-w-[266px] h-full">
                <MenuLateral items={arrayItemsMenuPaciente} />
            </div>
            <div className="ml-[266px] bg-[#bc6f6f] overflow-y-auto h-full">

            </div>
        </div>
        </>
    )
}
export default PacienteInicio;