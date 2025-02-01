import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import SearchBar from '../AdminPedidos/SearchBar'
import PatientList from '../AdminPedidos/PatientList'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { useDispatch } from 'react-redux'
import { setAllPacientes } from '../../features/pacientes/pacientesSlice'
import { Progress } from '@/components/ui/progress'
import Breadcrumb from '../../components/navigation/breadcrumb'
import { ChevronLeft, SearchIcon } from 'lucide-react'
import Avatar from '../../assets/ellipse.svg'
const BACKEND_URL = import.meta.env.VITE_API_URL

const AdminResultados = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [allPatients, setAllPatients] = useState([])
    const [filteredPatients, setFilteredPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const searchInputRef = useRef()

    const [selectedPatient, setSelectedPatient] = useState(null)

    const token = useSelector(state => state.user.token)

    const handleSearch = e => {
        e.preventDefault()
        const searchQuery = searchInputRef.current.value

        if (searchQuery === '') {
            setFilteredPatients(allPatients)
        } else {
            const filtered = allPatients.filter(patient => {
                const fullQuery = `${patient.firstName} ${patient.lastName} ${patient.email} ${patient.phone}`.toLowerCase()
                return fullQuery.includes(searchQuery.toLowerCase()) // Solo normalizamos en la comparación
            })
            setFilteredPatients(filtered)
        }
    }

    const handleClear = () => {
        searchInputRef.current.value = ''
        setFilteredPatients(allPatients)
    }

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true)
            setError('')

            try {
                const response = await fetch(`${BACKEND_URL}/patient/get-all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (response.ok) {
                    const result = await response.json()
                    setAllPatients(result.data || [])
                    setFilteredPatients(result.data || [])

                    dispatch(setAllPacientes(result.data))
                } else {
                    setError('Error al cargar los pacientes.')
                }
            } catch (error) {
                setError('Error de conexión con el servidor.')
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPatients()
    }, [token, dispatch])

    // const handleSearch = query => {
    //     const { fullname } = query

    //     if (!fullname) {
    //         setFilteredPatients(allPatients)
    //         return
    //     }

    //     const filtered = allPatients.filter(patient => {
    //         const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase()
    //         return fullName.includes(fullname.toLowerCase())
    //     })

    //     setFilteredPatients(filtered)
    // }

    return (
        <div className='relative h-screen bg-white'>
            <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                <MenuLateral items={arrayItemsMenuAdmin} />
            </div>

            <div className='ml-[266px] overflow-y-auto h-full p-6 bg-white'>
                <Breadcrumb
                    items={[
                        { title: 'Admin', to: '/admin/ingresar-orden' },
                        { title: 'Resultados', to: '/admin/ingresar-orden' },
                        { title: 'Carga de resultados' },
                    ]}
                />

                <div className='flex mb-4 items-center gap-1'>
                    <ChevronLeft size={18} />
                    <button onClick={() => navigate(-1)} className='text-[#0E1B27] text-sm font-medium'>
                        Regresar
                    </button>
                </div>

                <Progress className='[&>*]:bg-[#02807D] mb-6' value={33.33} />
                <h1 className='text-2xl text-center font-bold mb-6'>Buscar pacientes</h1>

                <form onSubmit={handleSearch} className='relative w-[500px] mx-auto'>
                    <input
                        type='text'
                        onChange={handleSearch}
                        ref={searchInputRef}
                        placeholder='Buscar el nombre del paciente'
                        className='w-full px-4 py-2 border rounded-lg pr-20 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                    />
                    {searchInputRef.current && searchInputRef.current.value && (
                        <button
                            type='button'
                            onClick={handleClear}
                            className='absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                        >
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                <line x1='18' y1='6' x2='6' y2='18'></line>
                                <line x1='6' y1='6' x2='18' y2='18'></line>
                            </svg>
                        </button>
                    )}
                    <button type='submit' className='absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-teal-600 rounded-lg text-white'>
                        <SearchIcon />
                    </button>
                </form>

                {/* <SearchBar onSearch={handleSearch} /> */}

                <div className='mt-6 flex relative'>
                    <div className='flex-1'>
                        {loading ? (
                            <p className='text-gray-500'>Cargando pacientes...</p>
                        ) : error ? (
                            <p className='text-red-500'>{error}</p>
                        ) : filteredPatients.length > 0 ? (
                            <PatientList patients={filteredPatients} onSelectPatient={patient => setSelectedPatient(patient)} />
                        ) : (
                            <p className='text-gray-500'>No se han encontrado pacientes.</p>
                        )}
                    </div>

                    {selectedPatient && (
                        <>
                            <div
                                className='fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center'
                                onClick={() => setSelectedPatient(null)}
                            />

                            <div className='fixed inset-0 flex items-center justify-center z-20'>
                                <div className='bg-white shadow-lg p-6 rounded-md max-w-md w-full'>
                                    <div className='text-center'>
                                        <img src={Avatar} alt='Avatar' className='mx-auto w-24 h-24 rounded-full' />
                                        <h2 className='text-xl font-bold mt-4'>
                                            {selectedPatient.firstName} {selectedPatient.lastName}
                                        </h2>
                                        <p className='text-gray-500'>{selectedPatient.email}</p>
                                        <p className='text-gray-500'>{selectedPatient.phone}</p>
                                        <p className='text-gray-500'>
                                            Fecha de nacimiento: {new Date(selectedPatient.birth).toLocaleDateString('es-ES')}
                                        </p>
                                    </div>
                                    <div className='flex justify-between mt-6'>
                                        <button className='w-1/3 bg-gray-500 text-white py-2 rounded' onClick={() => setSelectedPatient(null)}>
                                            Cancelar
                                        </button>
                                        <button
                                            className='w-1/3 bg-teal-500 text-white py-2 rounded'
                                            onClick={() => {
                                                navigate('/admin/resultados/carga-de-resultados/info-analisis', {
                                                    state: {
                                                        patientId: selectedPatient.id,
                                                        patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
                                                    },
                                                })
                                            }}
                                        >
                                            Seleccionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminResultados
