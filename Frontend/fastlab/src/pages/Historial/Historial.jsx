import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/navigation/breadcrumb'
import { useSelector } from 'react-redux'
import AnalisisCard from '../../components/Cards/AnalisisCard.jsx'
import { SearchIcon } from '../../components/navigation/icons.jsx'
const BACKEND_URL = import.meta.env.VITE_API_URL

const Historial = () => {
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const searchInputRef = useRef()

    const handleSearch = e => {
        e.preventDefault()
        const searchQuery = searchInputRef.current.value

        if (searchQuery === '') {
            setFilteredItems(items)
        } else {
            const filtered = items.filter(item => {
                const fullData = `${item.patient.firstName} ${item.patient.lastName} ${item.id} ${item.status}`
                return fullData.toLowerCase().includes(searchQuery.toLowerCase())
            })
            setFilteredItems(filtered)
        }
    }

    const handleClear = () => {
        searchInputRef.current.value = ''
        setFilteredItems(items)
    }

    const token = useSelector(state => state.user.token)

    const getResults = async () => {
        const response = await fetch(`${BACKEND_URL}/results/orders/get-by-patient-id?id=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.ok) {
            const result = await response.json()
            setItems(result.data)
            setFilteredItems(result.data)
        } else {
            console.error('Error al obtener los resultados.')
        }
    }

    const user = useSelector(state => state.user)

    useEffect(() => {
        getResults()
    }, [])

    return (
        <div className='flex  min-h-screen bg-gray-50'>
            <main className='flex-1 p-8'>
                <Breadcrumb items={[{ title: 'Paciente', to: '/' }, { title: 'Historial' }]} />
                <h1 className='text-2xl  font-semibold text-gray-900 mb-6'>Mi historial de resultados</h1>
                <div className='flex justify-center  mb-8'>
                    {/* <SearchBar onSearch={handleSearch} /> */}
                    <form onSubmit={handleSearch} className='relative'>
                        <input
                            type='text'
                            ref={searchInputRef}
                            onChange={handleSearch}
                            placeholder='Análisis de sangre'
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
                        <button type='submit' className='absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-teal-600 rounded-lg text-white'>
                            <SearchIcon />
                        </button>
                    </form>
                </div>

                {filteredItems.length > 0 ? (
                    <div>
                        {searchInputRef.current.value ? (
                            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Resultados para "{searchInputRef.current.value}"</h2>
                        ) : (
                            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Resultados encontrados</h2>
                        )}
                        <div className='space-y-4'>
                            {filteredItems.map(item => (
                                <AnalisisCard
                                    key={`new-results-${item.id}`}
                                    id={item.id}
                                    title={'Orden N° ' + item.id}
                                    type={item.patient.firstName + ' ' + item.patient.lastName}
                                    date={new Date(item.dateExam).toLocaleDateString('es-ES')}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='text-center py-12'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-2'>No se han encontrado resultados</h2>
                        <p className='text-gray-500'>Parece que no podemos encontrar ningún resultado basado en su búsqueda.</p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Historial
