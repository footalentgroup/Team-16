import { useState } from 'react'

function FormAnadirDoctor() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        speciality: '',
        registrationNumber: '',
        // email: datos.email,
    })

    const [errors, setErrors] = useState({})

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido.'
        if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido.'
        if (!formData.speciality.trim()) newErrors.speciality = 'El título es requerido.'
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = 'La matrícula es requerida.'
        // if (!/^\+?\d{10,15}$/.test(formData.telefono)) newErrors.telefono = 'El teléfono debe tener un formato válido.'
        // if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido.'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validateForm()) {
            alert('Formulario enviado correctamente.')
            // Aquí puedes enviar los datos al backend
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Datos personales */}
                <section>
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
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.nombre}
                                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                            />
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
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.apellido}
                                onChange={e => setFormData({ ...formData, apellido: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor='speciality' className='block text-sm font-medium text-gray-700 mb-1'>
                                Título
                            </label>
                            <input
                                type='text'
                                id='speciality'
                                name='speciality'
                                placeholder='Ingrese el título'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.speciality}
                                onChange={e => setFormData({ ...formData, speciality: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor='registrationNumber' className='block text-sm font-medium text-gray-700 mb-1'>
                                Matrícula
                            </label>
                            <input
                                type='text'
                                id='registrationNumber'
                                name='registrationNumber'
                                placeholder='Ingrese la matrícula'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.registrationNumber}
                                onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })}
                            />
                        </div>

                        {/* <div>
                            <label htmlFor='telefono' className='block text-sm font-medium text-gray-700 mb-1'>
                                Teléfono
                            </label>
                            <input
                                type='tel'
                                id='telefono'
                                name='telefono'
                                placeholder='Ejemplo: +54 999 999 999'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.telefono}
                                onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                            />
                        </div> */}

                        {/* <div>
                            <label htmlFor='correo' className='block text-sm font-medium text-gray-700 mb-1'>
                                Correo electrónico
                            </label>
                            <input
                                type='email'
                                id='correo'
                                name='correo'
                                placeholder='Ejemplo: email@email.com'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.correo}
                                onChange={e => setFormData({ ...formData, correo: e.target.value })}
                            />
                        </div> */}
                    </div>
                </section>

                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='px-6 py-2 bg-[#02807D] text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormAnadirDoctor
