import { useEffect, useState } from 'react'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import FormDatosDoctor from '../../components/Forms/FormDatosDoctor'
import { Button } from '@/components/ui/button'
import { LucideTrash2 } from 'lucide-react'
import { toast } from 'react-toastify'
const BACKEND_URL = import.meta.env.VITE_API_URL
import { useDispatch } from 'react-redux'
import { setError } from '../../features/ui/uiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import AlertDialogComponent from '../../components/Buttons/AlertDialogComponent'

const AdminConfiguracionDoctores = () => {
    const dispatch = useDispatch()
    const doctorId = useParams().id
    const [doctor, setDoctor] = useState([])
    const [isDialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()
    const getDoctor = async () => {
        const response = await fetch(`${BACKEND_URL}/doctor?id=${doctorId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        const result = await response.json()

        if (response.ok) {
            setDoctor(result.data)
        } else {
            dispatch(setError(result.message || 'Error al iniciar sesión'))
        }
    }

    useEffect(() => {
        getDoctor()
        return () => {}
    }, [])

    const handleDelete = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/doctor?id=${doctorId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: doctorId,
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Perfil eliminado correctamente.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                })

                setTimeout(() => {
                    navigate('/admin/configuracion/doctores')
                }, 3000)
            } else {
                dispatch(setError(result.message || 'Error al iniciar sesión'))
            }
        } catch (error) {
            toast.error(error.message)
            dispatch(setError('Error de conexión con el servidor.'))
        }
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
                                    { title: 'Doctores', to: '/admin/configuracion/doctores' },
                                    { title: doctor?.name },
                                ]}
                            />

                            <div className='flex justify-between items-center mb-8'>
                                <h1 className='text-2xl font-semibold'>
                                    {doctor.name} {doctor.lastName}
                                </h1>

                                {/* <Button onClick={handleDelete} variant='outline'>
                                    {' '}
                                    <LucideTrash2 /> Eliminar
                                </Button> */}
                                <Button onClick={() => setDialogOpen(true)} variant='outline'>
                                    <LucideTrash2 /> Eliminar
                                </Button>

                                <AlertDialogComponent
                                    isOpen={isDialogOpen}
                                    onClose={() => setDialogOpen(false)}
                                    onDelete={handleDelete}
                                    title={'¿Estas seguro de borrar este perfil?'}
                                    description={'Este perfil y sus datos seran eliminados de forma permanente'}
                                />
                            </div>
                            <div className='max-w-4xl mx-auto'>
                                <FormDatosDoctor doctor={doctor} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default AdminConfiguracionDoctores
