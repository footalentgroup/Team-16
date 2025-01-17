import { useState, useEffect, useRef } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { ChevronRight, SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
const BACKEND_URL = import.meta.env.VITE_API_URL

const AdminConfiguracionAnalisis = () => {
    const [analisisList, setAnalisisList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const searchInputRef = useRef()

    const handleSearch = e => {
        e.preventDefault()
        const searchQuery = searchInputRef.current.value

        if (searchQuery === '') {
            setFilteredList(analisisList)
        } else {
            const filtered = analisisList.filter(analisis => {
                const fullData = `${analisis.name} ${analisis.lastName} ${analisis.registration}`
                return fullData.toLowerCase().includes(searchQuery.toLowerCase()) // Solo normalizamos en la comparación
            })
            setFilteredList(filtered)
        }
    }

    const handleClear = () => {
        searchInputRef.current.value = ''
        setFilteredList(analisisList)
    }

    const fetchAnalisis = async () => {
        const response = await fetch(`${BACKEND_URL}/exams`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const result = await response.json()

        if (response.ok) {
            setAnalisisList(result)
            setFilteredList(result)
        }
    }

    useEffect(() => {
        fetchAnalisis()
    }, [])

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
                                items={[{ title: 'Admin', to: '/' }, { title: 'Configuración', to: '/admin/configuracion' }, { title: 'Analisis' }]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>Analisis</h1>
                            </div>
                            <div className='mx-auto'>
                                <div className='flex justify-between gap-4 mb-8'>
                                    <form onSubmit={handleSearch} className='relative w-[500px]'>
                                        <input
                                            type='text'
                                            onChange={handleSearch}
                                            ref={searchInputRef}
                                            placeholder='Buscar análisis'
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
                                        to={'/admin/configuracion/analisis/añadir'}
                                        className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                                    >
                                        + Añadir análisis
                                    </Link>
                                </div>

                                {searchInputRef.current && searchInputRef.current.value && (
                                    <div className='mb-4 text-sm text-gray-600'>Resultados para "{searchInputRef.current.value}":</div>
                                )}

                                <div className='rounded-md border overflow-hidden'>
                                    {filteredList.map(analisis => (
                                        <div key={analisis.id} className='odd:bg-white even:bg-[rgba(249, 250, 251, 1)] p-4'>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex align-middle'>
                                                    <img src='/ellipse.png' alt='Icon' className='w-[40px] h-[40px] mr-[16px]' />
                                                    <div>
                                                        <h3 className='font-semibold text-sm'>{analisis.name}</h3>
                                                        <div className='text-sm text-gray-600 space-x-4'>
                                                            <span>Muestra requerida: {analisis.sample}</span>
                                                            {/* <span>Precio: {analisis.price}</span> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/admin/configuracion/analisis/${analisis.id}`}
                                                    className='text-teal-600 inline-flex hover:text-teal-800'
                                                >
                                                    Ver detalles <ChevronRight />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionAnalisis
