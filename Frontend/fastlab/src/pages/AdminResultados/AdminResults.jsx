import { useNavigate } from 'react-router-dom' 
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'


const AdminResults = () => {
    const navigate = useNavigate()

    return (
        <div className='relative max-h-screen h-screen'>
            <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                <MenuLateral items={arrayItemsMenuAdmin} />
            </div>

            <div className='ml-[266px] overflow-y-auto h-full bg-white'>
                <main className='flex-1 p-8'>
                    <div className='mx-auto'>
                        <Breadcrumb items={[{ title: 'Admin', to: '/admin/ingresar-orden' }, { title: 'Resultados' }]} />
               
                        <h1 className='text-2xl text-center font-bold mb-8'>Resultados</h1>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto'>
                            <div
                                onClick={() => navigate('/admin/resultados/lista-de-resultados')}
                                className='flex items-center justify-center p-6 border border-gray-300 rounded-lg shadow hover:bg-gray-100 cursor-pointer'
                            >
                                <h2 className='text-xl font-semibold'>Lista de resultados</h2>
                            </div>

                            <div
                                onClick={() => navigate('/admin/resultados/carga-de-resultados')}
                                className='flex items-center justify-center p-6 border border-gray-300 rounded-lg shadow hover:bg-gray-100 cursor-pointer'
                            >
                                <h2 className='text-xl font-semibold'>Carga de resultados</h2>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminResults
