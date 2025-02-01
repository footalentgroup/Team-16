import { useEffect, useRef, useState } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import AdminAnalisisCard from '../../components/Cards/AdminAnalisisCard'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { SearchIcon } from 'lucide-react'
const BACKEND_URL = import.meta.env.VITE_API_URL

const ResultadosList = () => {
    const [adminOrders, setAdminOrders] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const searchInputRef = useRef()

    const [loading, setLoading] = useState(true)

    const handleSearch = e => {
        e.preventDefault()
        const searchQuery = searchInputRef.current.value

        if (searchQuery === '') {
            setFilteredList(adminOrders)
        } else {
            const filtered = adminOrders.filter(order => {
                const fullData = `${order.patient?.firstName} ${order.patient?.lastName} Orden N° ${order.id} ${new Date(
                    order.dateExam
                ).toLocaleDateString('es-ES')}`
                return fullData.toLowerCase().includes(searchQuery.toLowerCase()) // Solo normalizamos en la comparación
            })
            setFilteredList(filtered)
        }
    }

    const handleClear = () => {
        searchInputRef.current.value = ''
        setFilteredList(adminOrders)
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/results/orders/get-all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (!response.ok) throw new Error('Error al cargar las órdenes.')
                const data = await response.json()
                setAdminOrders(data.data)
                setFilteredList(data.data)
            } catch (error) {
                console.error('Error al cargar las órdenes:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    if (loading) {
        return <div className='text-center mt-10'>Cargando órdenes...</div>
    }

    return (
        <div className='relative h-screen bg-white'>
            <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                <MenuLateral items={arrayItemsMenuAdmin} />
            </div>
            <div className='ml-[266px] overflow-y-auto h-full'>
                <main className='flex-1 p-8'>
                    <div className='mx-auto'>
                        <Breadcrumb
                            items={[
                                { title: 'Admin', to: '/admin' },
                                { title: 'Resultados', to: '/admin/resultados' },
                                { title: 'Lista de resultados' },
                            ]}
                        />
                        <h1 className='text-2xl font-semibold text-gray-900 mb-6'>Lista de Resultados</h1>

                        <div className='flex justify-between gap-4 mb-8'>
                            <form onSubmit={handleSearch} className='relative w-[500px]'>
                                <input
                                    type='text'
                                    onChange={handleSearch}
                                    ref={searchInputRef}
                                    placeholder='Buscar orden'
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

                        {filteredList.length === 0 ? (
                            <div className='text-center'>
                                <h2 className='font-semibold text-xl text-[#0E1B27]'>No hay órdenes disponibles</h2>
                                <p className='text-gray-500'>Actualmente no hay órdenes registradas en el sistema.</p>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                {filteredList.map(order => (
                                    <AdminAnalisisCard
                                        key={`order-${order.id}`}
                                        title={`Orden N° ${order.id}`}
                                        type={`${order.patient?.firstName} ${order.patient?.lastName}`}
                                        date={new Date(order.dateExam).toLocaleDateString('es-ES')}
                                        id={order.id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ResultadosList
