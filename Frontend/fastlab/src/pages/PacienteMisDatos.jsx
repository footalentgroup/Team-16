import MenuLateral from "../components/menuLateral/MenuLateral";
import arrayItemsMenuPaciente from "../utils/itemsMenuPaciente";

const PacienteMisDatos =()=>{
    return(
        <>
         <div className="relative h-screen bg-gray-50">
            <div className="fixed top-0 left-0 min-w-[266px] h-full">
                <MenuLateral items={arrayItemsMenuPaciente} />
            </div>
            <div className="ml-[266px]  bg-gray-50 overflow-y-auto h-full">

            </div>
        </div>
        </>
    )
}
export default PacienteMisDatos;