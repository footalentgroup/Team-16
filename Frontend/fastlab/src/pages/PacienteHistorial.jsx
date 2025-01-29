import MenuLateral from '../components/menuLateral/MenuLateral'
import arrayItemsMenuPaciente from '../utils/itemsMenuPaciente'
import Historial from './Historial/Historial'
const PacienteHistorial = () => {
    return (
        <>
            <div className='relative h-screen bg-white'>
                <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                    <MenuLateral items={arrayItemsMenuPaciente} />
                </div>

                <div className='ml-[266px] overflow-y-auto h-full'>
                    <Historial />
                </div>
            </div>
        </>
    )
}
export default PacienteHistorial
