import { useState } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { ChevronRight, SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const doctores = [
    {
        id: 1,
        name: 'Pedro Martines',
        specialty: 'Dr. Dermatología',
        registrationNumber: 'Matrícula: N°33659',
    },
    {
        id: 2,
        name: 'Arturo Dias',
        specialty: 'Dr. Genética',
        registrationNumber: 'Matrícula: N°47774',
    },
    {
        id: 3,
        name: 'Arturo Sánchez',
        specialty: 'Dr. Neurología',
        registrationNumber: 'Matrícula: N°47454',
    },
]

const AdminConfiguracionDoctores = () => {
    const [query, setQuery] = useState('')
    const [hasSearched, setHasSearched] = useState('')

    const handleSearch = e => {
        e.preventDefault()
        setQuery(query)
        setHasSearched(true)
    }

    const handleClear = () => {
        setQuery('')
        handleSearch('')
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
                                items={[{ title: 'Admin', to: '/' }, { title: 'Configuración', to: '/admin/configuracion' }, { title: 'Doctores' }]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>Doctores</h1>
                            </div>
                            <div className='mx-auto'>
                                <div className='flex justify-between gap-4 mb-8'>
                                    <form onSubmit={handleSearch} className='relative w-[500px]'>
                                        <input
                                            type='text'
                                            value={query}
                                            onChange={e => setQuery(e.target.value)}
                                            placeholder='Buscar doctores'
                                            className='w-full px-4 py-2 border rounded-lg pr-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                        />
                                        {query && (
                                            <button
                                                type='button'
                                                onClick={handleClear}
                                                className='absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                            >
                                                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                                    <line x1='18' y1='6' x2='6' y2='18'></line>
                                                    <line x1='6' y1='6' x2='18' y2='18'></line>
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            type='submit'
                                            className='absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-teal-600 rounded-lg text-white'
                                        >
                                            <SearchIcon />
                                        </button>
                                    </form>

                                    <Link
                                        to={'/admin/configuracion/doctores/añadir'}
                                        className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                                    >
                                        + Añadir doctor
                                    </Link>
                                </div>

                                <div className='mb-4 text-sm text-gray-600'>Resultados para "José Armando":</div>

                                <div className='rounded-md border overflow-hidden'>
                                    {doctores.map(doctor => (
                                        <div key={doctor.id} className='odd:bg-white even:bg-[rgba(249, 250, 251, 1)] p-4'>
                                            <div className='flex justify-between items-center'>
                                                <div className='space-y-2'>
                                                    <h3 className='font-semibold text-sm'>{doctor.name}</h3>
                                                    <div className='text-sm text-gray-600 space-x-4'>
                                                        <span>{doctor.specialty}</span>
                                                        <span>{doctor.registrationNumber}</span>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/admin/configuracion/doctores/${doctor.id}`}
                                                    className='text-teal-600 inline-flex hover:text-teal-800'
                                                >
                                                    Ver detalles <ChevronRight />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* <div className='flex justify-center gap-2 mt-8'>
                                    <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>← Anterior</button>
                                    <button className='px-3 py-1 border rounded text-sm bg-teal-50'>1</button>
                                    <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>2</button>
                                    <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>3</button>
                                    <button className='px-3 py-1 border rounded text-sm text-gray-400' disabled>
                                        ...
                                    </button>
                                    <button className='px-3 py-1 border rounded text-sm hover:bg-gray-50'>Siguiente →</button>
                                </div> */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionDoctores
