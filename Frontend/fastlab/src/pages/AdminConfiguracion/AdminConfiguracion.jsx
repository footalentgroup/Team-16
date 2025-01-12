import MenuLateral from "../../components/menuLateral/MenuLateral";
import MenuConfiguracion from "../../components/navigation/menuConfiguracion";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";

const AdminConfiguracion =()=>{
    return(
        <>
            <div className="relative h-screen bg-gray-50">
            <div className="fixed top-0 left-0 min-w-[266px] h-full">
                <MenuLateral items={arrayItemsMenuAdmin} />
            </div>
            <div className="ml-[266px] overflow-y-auto h-full">
              <MenuConfiguracion />
            </div>
        </div>
        </>
    )
}
export default AdminConfiguracion;