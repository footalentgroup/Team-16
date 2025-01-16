import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setError } from '../../features/ui/uiSlice'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_API_URL

function FormAnadirAnalisis() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: { parameters: [{ name: '', reference: '', type: 'qualitative' }] },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'parameters',
    })

    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const onSubmit = async data => {
        setIsFormSubmitted(true)
        console.log(data)

        try {
            const response = await fetch(`${BACKEND_URL}/exams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    sample: data.sample,
                    description: data.description,
                    parameters: data.parameters,
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
                setTimeout(() => {
                    navigate('/admin/configuracion/analisis')
                }, 3000)
            }
        } catch (error) {
            dispatch(setError('Error de conexión con el servidor.'))
        } finally {
            setIsFormSubmitted(false)
        }
    }

    return (
        <div className='w-full max-w-2xl mx-auto rounded-lg overflow-hidden'>
            <ToastContainer />
            <div className='p-6'>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <label htmlFor='name' className='block text-base font-medium text-gray-900'>
                                Nombre
                            </label>
                            <input
                                id='name'
                                type='text'
                                {...register('name', { required: 'Este campo es obligatorio.' })}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                            />
                            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='sample' className='block text-base font-medium text-gray-900'>
                                Muestra
                            </label>
                            <input
                                id='sample'
                                type='text'
                                {...register('sample', { required: 'Este campo es obligatorio.' })}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                            />
                            {errors.sample && <p className='text-sm text-red-500'>{errors.sample.message}</p>}
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='description' className='block text-base font-medium text-gray-900'>
                                Descripción
                            </label>
                            <textarea
                                id='description'
                                {...register('description', { required: 'Este campo es obligatorio.' })}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-h-[100px]'
                            ></textarea>
                            {errors.description && <p className='text-sm text-red-500'>{errors.description.message}</p>}
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-lg font-medium text-gray-900'>Parámetros</h3>

                        <div className='space-y-4'>
                            {fields.map((field, index) => (
                                <div key={field.id} className='p-4 rounded-lg border border-gray-200 space-y-4'>
                                    <input type='hidden' {...register(`parameters.${index}.type`)} value='qualitative' />

                                    <div className='space-y-2'>
                                        <div className='flex items-center justify-between'>
                                            <label htmlFor={`param-name-${index}`} className='block text-sm font-medium text-gray-700'>
                                                Nombre del parámetro
                                            </label>
                                            {index > 0 && (
                                                <button
                                                    type='button'
                                                    onClick={() => remove(index)}
                                                    className='text-red-600 hover:text-red-700 focus:outline-none'
                                                >
                                                    <Trash2 className='h-5 w-5' />
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            id={`param-name-${index}`}
                                            type='text'
                                            {...register(`parameters.${index}.name`, { required: 'Este campo es obligatorio.' })}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                                        />
                                        {errors.parameters?.[index]?.name && (
                                            <p className='text-sm text-red-500'>{errors.parameters[index]?.name?.message}</p>
                                        )}
                                    </div>

                                    <div className='space-y-2'>
                                        <label htmlFor={`param-reference-${index}`} className='block text-sm font-medium text-gray-700'>
                                            Referencia
                                        </label>
                                        <input
                                            id={`param-reference-${index}`}
                                            type='text'
                                            {...register(`parameters.${index}.reference`, { required: 'Este campo es obligatorio.' })}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                                        />
                                        {errors.parameters?.[index]?.reference && (
                                            <p className='text-sm text-red-500'>{errors.parameters[index]?.reference?.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type='button'
                            onClick={() => append({ name: '', reference: '', type: 'qualitative' })}
                            className='w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                        >
                            <Plus className='h-4 w-4' />
                            Añadir parámetro
                        </button>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#02807D] hover:bg-[#026B68] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormAnadirAnalisis
