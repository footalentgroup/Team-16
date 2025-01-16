import { useState } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { LucideTrash2 } from 'lucide-react'
import FormAnadirAnalisis from '../../components/Forms/FormAnadirAnalisis'

const analisis = {
    id: 3,
    name: 'Hemograma completo',
    sample: '5ml de sangre',
    price: '20',
}

const AdminConfiguracionAnadirAnalisis = () => {
    const [query, setQuery] = useState('')
    const [hasSearched, setHasSearched] = useState('')

    const handleSearch = e => {
        e.preventDefault()
        setQuery(query)
        setHasSearched(true)
    }

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
                                    { title: 'Analisis', to: '/admin/configuracion/analisis' },
                                    { title: 'Añadir análisis' },
                                ]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>Añadir análisis</h1>
                            </div>
                            <div className='max-w-2xl mx-auto'>
                                <FormAnadirAnalisis />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionAnadirAnalisis
