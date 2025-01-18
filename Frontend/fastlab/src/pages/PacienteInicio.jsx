import { useEffect, useState } from 'react'
import MenuLateral from '../components/menuLateral/MenuLateral'

import arrayItemsMenuPaciente from '../utils/itemsMenuPaciente'
import AnalisisCard from '../components/Cards/AnalisisCard'
import { useSelector } from 'react-redux'
import Breadcrumb from '../components/navigation/breadcrumb'

const BACKEND_URL = import.meta.env.VITE_API_URL

const PacienteInicio = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const user = useSelector(state => state.user)
    const fetchExams = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/results/orders/get-by-patient-id?id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) throw new Error('Error al cargar los exámenes.')

            const results = await response.json()

            setData(results.data)
        } catch (error) {
            console.error('Error al cargar los exámenes:', error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchExams()
    }, [])

    if (loading) {
        return <div className='text-center mt-10'>Cargando resultados...</div>
    }
    console.log(data)
    return (
        <div className='relative h-screen bg-gray-50'>
            <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                <MenuLateral items={arrayItemsMenuPaciente} />
            </div>
            <div className='ml-[266px] overflow-y-auto h-full p-6'>
                {data.length == 0 ? (
                    <header className='w-full h-40 flex flex-col justify-center items-center gap-3'>
                        <h2 className='font-semibold text-2xl text-[#0E1B27]'>No hay resultados nuevos</h2>
                        <p className='font-normal text-base text-[#737373]'>Actualmente no tienes ningún resultado asociado a esta cuenta</p>
                    </header>
                ) : (
                    <div className='flex flex-col justify-center gap-6'>
                        <div className='flex-1 p-8'>
                            <Breadcrumb
                                items={[
                                    { title: 'Paciente', to: '/' },
                                    { title: 'Inicio', to: '/paciente/inicio' },
                                ]}
                            />
                            <h1 className='text-2xl font-semibold text-gray-900 '>Nuevos resultados</h1>
                        </div>

                        {data.slice(0, 3).map(item => (
                            <AnalisisCard
                                key={`new-results-${item.id}`}
                                title={'Orden N° ' + item.id}
                                type={item.patient.firstName + ' ' + item.patient.lastName}
                                date={new Date(item.dateExam).toLocaleDateString('es-ES')}
                                id={item.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PacienteInicio
