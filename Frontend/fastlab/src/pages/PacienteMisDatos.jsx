import DatosPersonales from "../components/DatosPersonales/DatosPersonales";
import MenuLateral from "../components/menuLateral/MenuLateral";
import arrayItemsMenuPaciente from "../utils/itemsMenuPaciente";

const PacienteMisDatos =()=>{
    return(
        <>
         <div className="relative h-screen bg-white">
            <div className="fixed top-0 left-0 min-w-[266px] h-full">
                <MenuLateral items={arrayItemsMenuPaciente} />
            </div>
            <div className="ml-[266px] bg-gray-50  overflow-y-auto h-full">
                <DatosPersonales/>
            </div>
        </div>
        </>
    )
}
export default PacienteMisDatos;