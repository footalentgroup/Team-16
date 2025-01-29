import { useState, useEffect, useRef } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { ChevronRight, SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_API_URL

const AdminConfiguracionDoctores = () => {
    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const searchInputRef = useRef()

    const handleSearch = e => {
        e.preventDefault()
        const searchQuery = searchInputRef.current.value

        if (searchQuery === '') {
            setFilteredDoctors(doctors)
        } else {
            const filtered = doctors.filter(doctor => {
                const fullData = `${doctor.name} ${doctor.lastName} ${doctor.registration} ${doctor.title}`
                return fullData.toLowerCase().includes(searchQuery.toLowerCase()) // Solo normalizamos en la comparación
            })
            setFilteredDoctors(filtered)
        }
    }

    const handleClear = () => {
        searchInputRef.current.value = ''
        setFilteredDoctors(doctors)
    }

    const fetchDoctors = async () => {
        const response = await fetch(`${BACKEND_URL}/doctor/get-all`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const result = await response.json()

        if (response.ok) {
            setDoctors(result.data)
            setFilteredDoctors(result.data)
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

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
                                            ref={searchInputRef}
                                            onChange={handleSearch}
                                            placeholder='Buscar doctores'
                                            className='w-full px-4 py-2 border rounded-lg pr-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                        />
                                        {searchInputRef.current && searchInputRef.current.value && (
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

                                {searchInputRef.current && searchInputRef.current.value && (
                                    <div className='mb-4 text-sm text-gray-600'>Resultados para "{searchInputRef.current.value}":</div>
                                )}

                                <div className='rounded-md border overflow-hidden'>
                                    {filteredDoctors.length > 0 ? (
                                        filteredDoctors.map(doctor => (
                                            <div key={doctor.id} className='odd:bg-white even:bg-[rgba(249, 250, 251, 1)] p-4'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='space-y-2'>
                                                        <h3 className='font-semibold text-sm'>
                                                            {doctor.name} {doctor.lastName}
                                                        </h3>
                                                        <div className='text-sm text-gray-600 space-x-4'>
                                                            <span>{doctor.title}</span>
                                                            <span>Matricula: {doctor.registration}</span>
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
                                        ))
                                    ) : (
                                        <div className='p-4 text-sm text-gray-500'>No se encontraron resultados.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionDoctores
