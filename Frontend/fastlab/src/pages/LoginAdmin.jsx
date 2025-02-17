import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/user/userSlice'
import imgLogin from '../assets/login.png'
import LoginInput from '../components/LoginInput/LoginInput'
import { toast, ToastContainer } from 'react-toastify'
const BACKEND_URL = import.meta.env.VITE_API_URL

const LoginAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const onSubmit = async data => {
        setIsFormSubmitted(true)

        try {
            const response = await fetch(`${BACKEND_URL}/auth/admin-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            })

            if (response.ok) {
                const result = await response.json()
               

                dispatch(
                    login({
                        id: result.data.id,
                        phone: '',
                        birth: '',
                        name: result.data.firstName,
                        lastName: result.data.lastName,
                        email: result.data.email,
                        token: result.data.token,
                    })
                )

                navigate('/admin/ingresar-orden')
            } else {

                const errorResult = await response.json()
                toast.error(`${errorResult.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                })
            }
        } catch (error) {
            toast.error(`${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            })
        } finally {
            setIsFormSubmitted(false)
        }
    }

    return (
        <>
        <ToastContainer />
        <div className='flex justify-around items-center min-h-screen'>
            <div className='w-[60%] p-14 ml-14'>
                <div className='max-w-[400px]'>
                    <h1 className='text-2xl font-bold text-gray-800 mb-4'>Ingresar a fastLab</h1>
                    <p className='text-gray-500 mb-6'>Estás por ingresar como administrador</p>
                    <div className='w-full h-[2px] bg-gray-300 mb-6'></div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <LoginInput
                            label='Correo electrónico'
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Ejemplo: admin@gmail.com'
                            register={register}
                            rules={{
                                required: 'El correo electrónico es obligatorio',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Ingresa un correo válido (ej. ejemplo@gmail.com)',
                                },
                            }}
                            disabled={isFormSubmitted}
                            error={errors.email}
                            errorClass='placeholder-red-500 border-red-500'
                        />

                        <LoginInput
                            label='Contraseña'
                            id='password'
                            name='password'
                            type='password'
                            placeholder='*******'
                            register={register}
                            rules={{
                                required: 'La contraseña es obligatoria.',
                                minLength: {
                                    value: 8,
                                    message: 'La contraseña debe tener mínimo 8 caracteres.',
                                },
                            }}
                            disabled={isFormSubmitted}
                            error={errors.password}
                            errorClass='placeholder-red-500 border-red-500'
                        />

                        <label htmlFor="remember" className="text-sm text-gray-500 mb-4 inline-block">
                          <input type="checkbox" id="remember" name="remember" className="mr-2" />
                          Recordar contraseña
                        </label>

                        <button
                            type='submit'
                            disabled={isFormSubmitted}
                            className={`w-full text-white font-semibold py-2 px-4 rounded-md focus:outline-none ${
                                isFormSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#02807D] hover:bg-teal-600 focus:ring-2 focus:ring-teal-500'
                            }`}
                        >
                            {isFormSubmitted ? 'Cargando...' : 'Ingresar'}
                        </button>
                    </form>
                </div>
            </div>

            <div className='relative h-[95vh] my-4 mr-8'>
                <img src={imgLogin} alt='FastLab' className='w-full h-full object-cover rounded-xl' />
            </div>
        </div>
        </>
    )
}

export default LoginAdmin
