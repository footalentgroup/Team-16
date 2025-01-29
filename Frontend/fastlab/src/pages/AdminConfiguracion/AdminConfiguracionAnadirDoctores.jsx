import { useState } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import FormAnadirDoctor from '../../components/Forms/FormAnadirDoctor'
import { LucideTrash2 } from 'lucide-react'

const doctor = {
    id: 1,
    name: 'Arturo',
    lastname: 'Díaz',
    speciality: 'Dr. Genética',
    registrationNumber: 'N°47774',
}

const AdminConfiguracionAnadirDoctores = () => {
    const [query, setQuery] = useState('')
    const [hasSearched, setHasSearched] = useState('')

    const handleSearch = e => {
        e.preventDefault()
        setQuery(query)
        setHasSearched(true)
    }

    return (
        <>
            <div className='relative h-screen bg-white'>
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
                                    { title: 'Doctores', to: '/admin/configuracion/doctores' },
                                    { title: 'Añadir doctor' },
                                ]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>Añadir doctor</h1>
                            </div>
                            <div className='max-w-2xl mx-auto'>
                                <FormAnadirDoctor />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionAnadirDoctores
