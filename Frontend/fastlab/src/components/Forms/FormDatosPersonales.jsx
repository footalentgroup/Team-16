import { useState } from 'react'

function FormDatosPersonales() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        if (!/^\+?\d{10,15}$/.test(formData.telefono)) newErrors.telefono = 'El teléfono debe tener un formato válido.'
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido.'
        if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres.'
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.'

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
            <form
                onSubmit={handleSubmit}
                className='space-y-8'
            >
                {/* Datos personales */}
                <section>
                    <h2 className='text-lg font-medium mb-2'>Datos personales</h2>
                    <p className='text-sm text-gray-600 mb-6'>
                        Puedes ver tus datos y modificar los que creas necesarios
                    </p>

                    <div className='space-y-4'>
                        <div>
                            <label
                                htmlFor='nombre'
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
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
                            <label
                                htmlFor='apellido'
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
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
                            <label
                                htmlFor='telefono'
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
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
                        </div>

                        <div>
                            <label
                                htmlFor='correo'
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
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
                        </div>
                    </div>
                </section>

                {/* Modificar contraseña */}
                <section>
                    <h2 className='text-lg font-medium mb-2'>Modificar contraseña</h2>
                    <p className='text-sm text-gray-600 mb-6'>Puedes modificar tu contraseña si lo deseas</p>

                    <div className='space-y-4'>
                        <div>
                            <label
                                htmlFor='contrasena'
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
                                Contraseña
                            </label>
                            <input
                                type='password'
                                id='contrasena'
                                name='contrasena'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.contrasena}
                                onChange={e => setFormData({ ...formData, contrasena: e.target.value })}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='repetirContrasena'
                                className='block text-sm font-medium text-gray-700 mb-1'
                            >
                                Repetir contraseña
                            </label>
                            <input
                                type='password'
                                id='repetirContrasena'
                                name='repetirContrasena'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                                value={formData.repetirContrasena}
                                onChange={e => setFormData({ ...formData, repetirContrasena: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                <div>
                    <button
                        type='submit'
                        className='px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormDatosPersonales
