import FormDatosPersonales from '../../components/Forms/FormDatosPersonales'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'

const AdminConfiguracionMiCuenta = () => {
    return (
        <>
            <div className='relative h-screen bg-gray-50'>
                <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                    <MenuLateral items={arrayItemsMenuAdmin} />
                </div>
                <div className='ml-[266px] overflow-y-auto h-full'>
                    <main className='flex-1 p-8'>
                        <div className='mx-auto'>
                            <Breadcrumb
                                items={[
                                    { title: 'Admin', to: '/' },
                                    { title: 'Configuración', to: '/admin/configuracion' },
                                    { title: 'Mi cuenta' },
                                ]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>Mi cuenta</h1>
                            </div>

                            <div className='max-w-4xl mx-auto'>
                                <FormDatosPersonales />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionMiCuenta
