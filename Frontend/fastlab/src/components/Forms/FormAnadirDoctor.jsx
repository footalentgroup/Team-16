import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setError } from '../../features/ui/uiSlice'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_API_URL

function FormAnadirDoctor() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const onSubmit = async data => {
        setIsFormSubmitted(true)
        try {
            const response = await fetch(`${BACKEND_URL}/doctor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    lastname: data.lastname,
                    registration: data.registration,
                    title: data.title,
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Se actualizaron los datos correctamente', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                dispatch(setError(result.message || 'Error al iniciar sesión'))
            }
        } catch (error) {
            dispatch(setError('Error de conexión con el servidor.'))
        } finally {
            setIsFormSubmitted(false)
            setTimeout(() => {
                navigate('/admin/configuracion/doctores')
            }, 3000)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                {/* Datos personales */}
                <section>
                    <ToastContainer />
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
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                  ${errors.name ? 'border-red-500 text-red-500 placeholder-red-500' : 'border-gray-300 focus:ring-teal-500'}
                                  `}
                                {...register('name', { required: 'Este campo es requerido' })}
                            />
                        </div>

                        <div>
                            <label htmlFor='lastname' className='block text-sm font-medium text-gray-700 mb-1'>
                                Apellido
                            </label>
                            <input
                                type='text'
                                id='lastname'
                                name='lastname'
                                placeholder='Ejemplo: Campos Estrada'
                                disabled={isFormSubmitted}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                  ${errors.lastname ? 'border-red-500 text-red-500 placeholder-red-500' : 'border-gray-300 focus:ring-teal-500'}
                                  `}
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
                                placeholder='Ingrese el título'
                                disabled={isFormSubmitted}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                  ${errors.title ? 'border-red-500 text-red-500 placeholder-red-500' : 'border-gray-300 focus:ring-teal-500'}
                                  `}
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
                                placeholder='Ingrese la matrícula'
                                disabled={isFormSubmitted}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                                  ${errors.registration ? 'border-red-500 text-red-500 placeholder-red-500' : 'border-gray-300 focus:ring-teal-500'}
                                  `}
                                {...register('registration', { required: 'Este campo es requerido' })}
                            />
                        </div>
                    </div>
                </section>

                <div className='flex justify-end'>
                    <button
                        type='submit'
                        disabled={isFormSubmitted}
                        className='px-6 py-2 bg-[#02807D] text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                    >
                        {isFormSubmitted ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormAnadirDoctor
