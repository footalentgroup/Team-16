import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuLateral from '../../components/menuLateral/MenuLateral'
import Breadcrumb from '../../components/navigation/breadcrumb'
import arrayItemsMenuAdmin from '../../utils/itemsMenuAdmin'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert.jsx'
import { Terminal, Check } from 'lucide-react'
import AlertMessage from '../../components/Alerts/AlertMessage'

const BACKEND_URL = import.meta.env.VITE_API_URL

const Parameters = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [parameters, setParameters] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState('success')
    const [observations, setObservations] = useState('') // State for observations
    const { state } = location

    const unitOptions = ['mm3', 'mg/dL', 'gr/dL', 'mm3', 'IU/L', 'fl', 'mmHg', 'mL/min', 'g/L', '%','seg']

    useEffect(() => {
        if (!state?.reportId || !state?.selectedExams) {
            console.error('Falta el reportId o los exámenes seleccionados.')
            return
        }

        const fetchParameters = async () => {
            try {
                const fetchedParameters = []
                for (const examId of state.selectedExams) {
                    const response = await fetch(`${BACKEND_URL}/exams/${examId}`)
                    if (!response.ok) {
                        throw new Error(`Error al obtener el examen ${examId}`)
                    }

                    const examData = await response.json()
                    if (examData && examData.parameters) {
                        fetchedParameters.push(
                            ...examData.parameters.map(param => ({
                                parameterId: param.id,
                                parameterName: param.name,
                                reference: param.reference,
                                resultValue: '',
                                unit: '',
                            }))
                        )
                    }
                }
                setParameters(fetchedParameters)
            } catch (error) {
                console.error('Error al cargar los parámetros:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchParameters()
    }, [state])

    const handleInputChange = (index, field, value) => {
        setParameters(prevParameters => {
            const updatedParameters = [...prevParameters]
            updatedParameters[index][field] = value
            return updatedParameters
        })
    }

    const handleObservationsChange = (e) => {
        setObservations(e.target.value) // Update observations state
    }

    const handleGenerateResults = async () => {
        const reportId = state.reportId
        const resultsToPost = parameters.map(param => ({
            parameterId: param.parameterId,
            reportId: reportId,
            type: 'Manual',
            resultValue: param.resultValue,
            dateResult: new Date().toISOString(),
            observations: observations,  // Include observations here
        }))

        try {
            const response = await fetch(`${BACKEND_URL}/results/create-many`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resultsToPost),
            })

            if (!response.ok) {
                const errorBody = await response.text()
                console.error('Error del servidor:', errorBody)
                throw new Error('Error al enviar los resultados')
            }

            setAlertType('success')
            setShowAlert(true)

            setTimeout(() => {
                navigate('/admin/resultados/lista-de-resultados', { state: { results: resultsToPost } })
            }, 2000)
        } catch (error) {
            console.error('Error al generar resultados:', error)

            setAlertType('error')
            setShowAlert(true)
        }
    }

    const columns = [
        { accessorKey: 'parameterName', header: 'Nombre del Parámetro' },
        { accessorKey: 'reference', header: 'Rango de Referencia' },
        {
            accessorKey: 'resultValue',
            header: 'Resultado Obtenido',
            cell: ({ row }) => (
                <input
                    type='text'
                    className='w-full border bg-gray-50 rounded-md px-2 py-1'
                    value={parameters[row.index]?.resultValue || ''}
                    onChange={e => handleInputChange(row.index, 'resultValue', e.target.value)}
                />
            ),
        },
        {
            accessorKey: 'unit',
            header: 'Unidad de Medida',
            cell: ({ row }) => (
                <select
                    className='w-full border bg-gray-50 rounded-md px-2 py-1'
                    value={parameters[row.index]?.unit || ''}
                    onChange={e => handleInputChange(row.index, 'unit', e.target.value)}
                >
                    <option value=''>Seleccione unidad</option>
                    {unitOptions.map((option, idx) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ),
        },
    ]

    return (
        <div className='relative max-h-screen h-screen bg-white'>
            <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                <MenuLateral items={arrayItemsMenuAdmin} />
            </div>

            <div className='ml-[266px] h-full overflow-y-auto p-6'>
                <Breadcrumb
                    items={[
                        { title: 'Admin', to: '/admin/resultados' },
                        { title: 'Resultados', to: '/admin/resultados' },
                        { title: 'Carga de resultados', to: '/admin/resultados/carga-de-resultados' },
                        { title: 'Información de análisis', to: '/admin/resultados/carga-de-resultados/info-analisis' },
                        { title: 'Parámetros' },
                    ]}
                />

                <h1 className='text-2xl text-center font-bold mb-4'>Información de los Parámetros</h1>
                <Progress className='[&>*]:bg-[#02807D] mb-6' value={100} />

                {loading ? <div className='text-center'>Cargando parámetros...</div> : <DataTable columns={columns} data={parameters} />}
                <div className="mt-6">
                    <label
                        htmlFor="bioquimico"
                        className="block font-medium mb-1 text-sm text-[#0E1B27]"
                    >
                        Nombre del Bioquímico
                    </label>
                    <select
                        id="bioquimico"
                        className="w-full border bg-gray-50 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                        <option value="" disabled>
                            Seleccione una opción
                        </option>
                        <option value="bioquimico_1">Bioquímico 1</option>
                        <option value="bioquimico_2">Bioquímico 2</option>
                    </select>
                </div>

                <div className="mt-6">
                    <label
                        htmlFor="observaciones"
                        className="block font-medium mb-1 text-sm text-[#0E1B27]"
                    >
                        Observaciones
                    </label>
                    <textarea
                        id="observaciones"
                        className="w-full border bg-gray-50 rounded-md px-3 py-2"
                        rows="4"
                        value={observations}  // Display the observations state
                        onChange={handleObservationsChange}  // Handle the input change
                        placeholder="Escribe tus observaciones aquí"
                    />
                </div>
                <div className='flex justify-end mt-6'>
                    <Button className='bg-[#02807D] text-white py-2 px-4 rounded-md hover:bg-teal-600' onClick={handleGenerateResults}>
                        Generar Resultados
                    </Button>
                </div>

                <AlertMessage
                    show={showAlert}
                    type={alertType}
                    title={alertType === 'success' ? 'Éxito' : 'Error'}
                    message={alertType === 'success' ? 'Operación realizada correctamente.' : 'Hubo un problema, intenta nuevamente.'}
                />
            </div>
        </div>
    )
}

export default Parameters
