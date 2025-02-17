import { useForm, useWatch } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import LoginInput from '../../components/LoginInput/LoginInput'
import Calendario from '../../components/DatosPersonales/Calendario'
import Breadcrumb from '../../components/navigation/breadcrumb'
import { FaAngleRight } from 'react-icons/fa6'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { usePacientes } from '../../hooks/usePacientes'
const AddPatient = () => {
    const { addOnePaciente } = usePacientes()
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm({mode: 'onBlur'})

    const tipoDocumento = watch('tipoDocumento')

    const navigate = useNavigate()

    const onSubmit = data => {
        addOnePaciente(data)

        navigate('/admin/ingresar-orden/paciente-registrado/orden-de-analisis')
    }

    return (
        <>
            <div className='relative max-h-screen h-screen bg-white'>
                <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                    <MenuLateral items={arrayItemsMenuAdmin} />
                </div>

                <div className='ml-[266px] overflow-y-auto h-full'>
                    <main className='flex-1 p-8'>
                        <div className='mx-auto'>
                            <div className='mb-4'>
                                <Breadcrumb
                                    items={[
                                        { title: 'Admin', to: '/admin/ingresar-orden' },
                                        { title: 'Ingresar orden', to: '/admin/ingresar-orden' },
                                        { title: 'Registrar paciente' },
                                    ]}
                                />
                            </div>

                            <h1 className='text-2xl font-bold text-[#0E1B27]  py-5'>Añadir paciente</h1>

                            <section className='flex justify-center'>
                                <ToastContainer />
                                <div className='w-full max-w-2xl mt-6'>
                                    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                                        <h2 className='text-lg font-semibold text-[#0E1B27] mb-4'>Datos personales</h2>

                                        <LoginInput
                                            label='Nombres'
                                            id='nombres'
                                            name='nombres'
                                            placeholder='Ejemplo: José Manuel'
                                            register={register}
                                            rules={{
                                                required: 'Este campo es obligatorio.',
                                                pattern: {
                                                    value: /^[A-Za-z\s]+$/,
                                                    message: 'El nombre solo puede contener letras y espacios.',
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'El nombre debe tener al menos 2 caracteres.',
                                                },
                                            }}
                                            error={errors.nombres}
                                        />

                                        <LoginInput
                                            label='Apellidos'
                                            id='apellidos'
                                            name='apellidos'
                                            placeholder='Ejemplo: Campos Estrada'
                                            register={register}
                                            rules={{
                                                required: 'Este campo es obligatorio.',
                                                minLength: {
                                                    value: 2,
                                                    message: 'El apellido debe tener al menos 2 caracteres.',
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z\s]+$/,
                                                    message: 'El apellido solo puede contener letras y espacios.',
                                                }
                                            }}
                                            error={errors.apellidos}
                                        />

                                        <LoginInput
                                            label='Teléfono'
                                            id='telefono'
                                            name='telefono'
                                            placeholder='Ejemplo: +54 999 999 999'
                                            register={register}
                                            rules={{
                                                required: 'Formato incorrecto.',
                                                pattern: {
                                                    value: /^\+?\d{9,15}$/,
                                                    message: 'El formato debe ser válido, ej: +54 999 999 999',
                                                },
                                            }}
                                            error={errors.telefono}
                                        />

                                        <Calendario control={control} name='fechaNacimiento' placeholder='Selecciona la fecha de nacimiento' />

                                        <div className='mb-4'>
                                            <label htmlFor='tipoDocumento' className='block text-sm font-medium text-[#0E1B27]'>
                                                Tipo de documento
                                            </label>
                                            <select
                                                id='tipoDocumento'
                                                className='mt-1 block w-full bg-gray-50 p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                                                {...register('tipoDocumento', {
                                                    required: 'Seleccione un tipo de documento.',
                                                })}
                                            >
                                                <option disabled selected>Seleccionar tipo de documento</option>
                                                <option value='0'>DNI</option>
                                                <option value='1'>Pasaporte</option>
                                            </select>
                                            {errors.tipoDocumento && <p className='text-red-500 text-sm mt-1'>{errors.tipoDocumento.message}</p>}
                                        </div>

                                        <LoginInput
                                            label='Documento'
                                            id='documento'
                                            name='documento'
                                            placeholder='Ejemplo: 99.999.999'
                                            register={register}
                                            rules={{
                                                required: 'Este campo es obligatorio.',
                                                pattern: {
                                                    value: tipoDocumento === '1' ? /^[A-Z]{3}\d{6}$/ : /^\d{8}$/,
                                                    message:
                                                        tipoDocumento === '1'
                                                            ? 'Formato: 3 letras seguidas de 6 números (ej. AAF532592)'
                                                            : 'Formato: 8 dígitos (ej. 12345678)',
                                                },
                                            }}
                                            error={errors.documento}
                                        />

                                        <LoginInput
                                            label='Correo electrónico'
                                            id='email'
                                            name='email'
                                            placeholder='Ejemplo: email@email.com'
                                            register={register}
                                            rules={{
                                                required: 'Este campo es obligatorio.',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                    message: 'Ingrese un correo válido.',
                                                },
                                            }}
                                            error={errors.email}
                                        />

                                        <div className='flex justify-end mb-8 w-full ml-20'>
                                            <button
                                                type='submit'
                                                className='bg-teal-500 text-white mt-10 py-2 px-4 rounded-md hover:bg-teal-600 flex items-center justify-center'
                                            >
                                                Siguiente
                                                <FaAngleRight className='ml-2' />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AddPatient
