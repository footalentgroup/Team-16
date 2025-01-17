import { useState, useEffect } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import Breadcrumb from '../../components/navigation/breadcrumb'
import FormDatosAnalisis from '../../components/Forms/FormDatosAnalisis'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const BACKEND_URL = import.meta.env.VITE_API_URL

import { Button } from '@/components/ui/button'
import { LucideTrash2 } from 'lucide-react'

const AdminConfiguracionEditarAnalisis = () => {
    const dispatch = useDispatch()
    const analisisId = useParams().id
    const [analisis, setAnalisis] = useState([])

    const getAnalisis = async () => {
        const response = await fetch(`${BACKEND_URL}/exams/${analisisId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const result = await response.json()

        if (response.ok) {
            setAnalisis(result)
        } else {
            dispatch(setError(result.message || 'Error al iniciar sesión'))
        }
    }

    useEffect(() => {
        getAnalisis()
        return () => {}
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
                                items={[
                                    { title: 'Admin', to: '/' },
                                    { title: 'Configuración', to: '/admin/configuracion' },
                                    { title: 'Analisis', to: '/admin/configuracion/analisis' },
                                    { title: analisis?.name },
                                ]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>{analisis?.name}</h1>

                                {/* <Button variant='outline'>
                                    {' '}
                                    <LucideTrash2 /> Eliminar
                                </Button> */}
                            </div>
                            <div className='max-w-4xl mx-auto'>
                                <FormDatosAnalisis analisis={analisis} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionEditarAnalisis
