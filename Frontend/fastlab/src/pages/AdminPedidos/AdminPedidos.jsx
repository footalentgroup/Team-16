import AddPatient from "../AddPatient/AddPatient";
import MenuLateral from "../../components/menuLateral/MenuLateral";
import arrayItemsMenuAdmin from "../../utils/itemsMenuAdmin";

const AdminPedidos =()=>{
    return(
        <>
            <div className="relative h-screen bg-gray-50">
            <div className="fixed top-0 left-0 min-w-[266px] h-full">
                <MenuLateral items={arrayItemsMenuAdmin} />
            </div>
            <div className="ml-[266px] overflow-y-auto h-full">
            <AddPatient /> 
            </div>
        </div>
        </>
    )
}
export default AdminPedidos;