import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { setError } from '../../features/ui/uiSlice'
import { useDispatch } from 'react-redux'
const BACKEND_URL = import.meta.env.VITE_API_URL

function FormDatosDoctor({ doctor }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isFormSubmitted, setisFormSubmitted] = useState(false)

    const onSubmit = async data => {
        setisFormSubmitted(true)
        try {
            const response = await fetch(`${BACKEND_URL}/doctor`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: doctor.id,
                    name: data.name,
                    lastName: data.lastname,
                    title: data.title,
                    registration: data.registration,
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Se actualizaron los datos correctamente', {
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
        } finally {
            setisFormSubmitted(false)
        }
    }

    useEffect(() => {
        setValue('name', doctor.name || '')
        setValue('lastname', doctor.lastName || '')
        setValue('registration', doctor.registration || '')
        setValue('title', doctor.title || '')
    }, [doctor, setValue])

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                {/* Datos personales */}
                <section>
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                                Nombre
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='Ejemplo: Juan José'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('name', { required: 'Este campo es requerido' })}
                            />
                        </div>

                        <div>
                            <label htmlFor='apellido' className='block text-sm font-medium text-gray-700 mb-1'>
                                Apellido
                            </label>
                            <input
                                type='text'
                                id='lastname'
                                name='lastname'
                                placeholder='Ejemplo: Campos Estrada'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('lastname', { required: 'Este campo es requerido' })}
                            />
                        </div>

                        <div>
                            <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>
                                Título
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                placeholder='Ejemplo: Dr. Genética'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('title', { required: 'Este campo es requerido' })}
                            />
                        </div>

                        <div>
                            <label htmlFor='registration' className='block text-sm font-medium text-gray-700 mb-1'>
                                Matrícula
                            </label>
                            <input
                                type='text'
                                id='registration'
                                name='registration'
                                placeholder='Ejemplo: Matrícula: N°47774'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('registration', { required: 'Este campo es requerido' })}
                            />
                        </div>
                    </div>
                </section>

                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='px-6 py-2 bg-[#02807D] text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                    >
                        {isFormSubmitted ? 'Guardando...' : 'Actualizar'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormDatosDoctor
