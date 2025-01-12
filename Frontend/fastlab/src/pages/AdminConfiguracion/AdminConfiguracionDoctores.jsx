import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { Search, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const doctores = [
    {
        id: 1,
        name: 'Pedro Martines',
        specialty: 'Dr.Dermatología',
        registrationNumber: 'Matrícula: N°33659',
    },
    {
        id: 2,
        name: 'Arturo Dias',
        specialty: 'Dr.Genética',
        registrationNumber: 'Matrícula: N°47774',
    },
    {
        id: 3,
        name: 'Arturo Sánchez',
        specialty: 'Dr.Neurología',
        registrationNumber: 'Matrícula: N°47454',
    },
]

const AdminConfiguracion = () => {
    return (
        <>
            <div className='relative h-screen bg-gray-50'>
                <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                    <MenuLateral items={arrayItemsMenuAdmin} />
                </div>
                <div className='ml-[266px] overflow-y-auto h-full'>
                    <main className='flex-1 p-8'>
                        <div className='max-w-6xl mx-auto'>
                            <Breadcrumb
                                items={[
                                    { title: 'Admin', to: '/' },
                                    { title: 'Configuración', to: '/admin/configuracion' },
                                    { title: 'Doctores' },
                                ]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>Doctores</h1>
                            </div>

                            <div className='flex justify-between gap-4 mb-8'>
                                <div className='relative flex-1'>
                                    <input
                                        type='search'
                                        placeholder='Buscar doctores'
                                        className='w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                    />
                                    <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
                                </div>
                                <button className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'>
                                    + Añadir doctor
                                </button>
                            </div>

                            <div className='mb-4 text-sm text-gray-600'>Resultados para "José Armando":</div>

                            <div className='space-y-4'>
                                {doctores.map(doctor => (
                                    <div
                                        key={doctor.id}
                                        className='bg-white p-4 rounded-lg border shadow-sm'
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <h3 className='font-semibold text-lg'>{doctor.name}</h3>
                                                <div className='text-sm text-gray-600 space-x-4'>
                                                    <span>{doctor.specialty}</span>
                                                    <span>{doctor.registrationNumber}</span>
                                                </div>
                                            </div>
                                            <button className='text-teal-600 hover:text-teal-800'>
                                                Ver detalles →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex justify-center gap-2 mt-8'>
                                <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>
                                    ← Anterior
                                </button>
                                <button className='px-3 py-1 border rounded text-sm bg-teal-50'>1</button>
                                <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>2</button>
                                <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>3</button>
                                <button
                                    className='px-3 py-1 border rounded text-sm text-gray-400'
                                    disabled
                                >
                                    ...
                                </button>
                                <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>
                                    Siguiente →
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracion
