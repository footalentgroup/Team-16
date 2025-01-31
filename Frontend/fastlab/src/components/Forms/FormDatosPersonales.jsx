import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { updateData } from '../../features/user/userSlice'
const BACKEND_URL = import.meta.env.VITE_API_URL

function FormDatosPersonales() {
    const user = useSelector(state => state.user)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({ mode: 'onBlur' })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isFormSubmitted, setisFormSubmitted] = useState(false)

    useEffect(() => {
        setValue('nombre', user?.name || '')
        setValue('apellido', user?.lastName || '')
        setValue('telefono', user?.phone || '')
        setValue('email', user?.email || '')
    }, [user])

    const password = watch('password')
    const confirmPassword = watch('confirmPassword')

    const onSubmit = async data => {
        setisFormSubmitted(true)
        try {
            const response = await fetch(`${BACKEND_URL}/admin`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: user?.id || '',
                    name: data.nombre,
                    lastName: data.apellido,
                    email: data.email,
                    password: data.password,
                }),
            })

            const result = await response.json()

            if (response.ok) {
                toast.success('Se actualizaron los datos correctamente', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                })

                const userAdminUpdated={
                    email: result?.email,
                    id: user?.id,
                    firstName: result?.name,
                    lastName: result?.lastName
                }
                dispatch(updateData(userAdminUpdated))

                setTimeout(() => {
                    navigate('/admin/configuracion')
                }, 3000)
            } else {
                toast.error(`${result.message}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setisFormSubmitted(false)
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <section>
                    <h2 className='text-lg font-medium mb-2'>Datos personales</h2>
                    <p className='text-sm text-gray-600 mb-6'>Puedes ver tus datos y modificar los que creas necesarios</p>

                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='nombre' className='block text-sm font-medium text-gray-700 mb-1'>
                                Nombre
                            </label>
                            <input
                                type='text'
                                id='nombre'
                                name='nombre'
                                placeholder='Ejemplo: Juan José'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('nombre', {
                                    required: 'Este campo es requerido',
                                    pattern: { value:  /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/ , message: 'El nombre solo puede contener letras y espacios.' },
                                })}
                            />
                            {errors.nombre && <p className='text-red-500 text-sm mt-1'>{errors.nombre.message}</p>}
                        </div>

                        <div>
                            <label htmlFor='apellido' className='block text-sm font-medium text-gray-700 mb-1'>
                                Apellido
                            </label>
                            <input
                                type='text'
                                id='apellido'
                                name='apellido'
                                placeholder='Ejemplo: Campos Estrada'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('apellido', {
                                    required: 'Este campo es requerido',
                                    pattern: { value:  /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/ , message: 'El apellido solo puede contener letras y espacios.' },
                                })}
                            />
                            {errors.apellido && <p className='text-red-500 text-sm mt-1'>{errors.apellido.message}</p>}
                        </div>

                        <div>
                            <label htmlFor='correo' className='block text-sm font-medium text-gray-700 mb-1'>
                                Correo electrónico
                            </label>
                            <input
                                type='email'
                                id='correo'
                                name='correo'
                                placeholder='Ejemplo: email@email.com'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: 'Ingrese un correo válido.' },
                                })}
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                                Contraseña
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Contraseña'
                                disabled={isFormSubmitted}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 8, message: 'La contraseña debe tener mínimo 8 caracteres.' },
                                })}
                            />
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                        </div>

                        <div>
                            <label htmlFor='password2' className='block text-sm font-medium text-gray-700 mb-1'>
                                Confirmar contraseña
                            </label>
                            <input
                                type='password'
                                id='password2'
                                name='password2'
                                placeholder='Confirmar contraseña'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                disabled={isFormSubmitted}
                                {...register('confirmPassword', {
                                    required: 'Este campo es requerido',
                                    validate: value => {
                                        if (password !== value) {
                                            return 'Las contraseñas no coinciden'
                                        }
                                    },
                                })}
                            />
                            {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
                        </div>
                    </div>
                </section>

                <div>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                        disabled={isFormSubmitted}
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormDatosPersonales
