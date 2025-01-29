import { useState } from 'react'
import MenuLateral from '../components/menuLateral/MenuLateral'
import Breadcrumb from '../components/navigation/breadcrumb'
import ResultadoAnalisis from '../components/ResultadoAnalisis/ResultadoAnalisis'
import arrayItemsMenuPaciente from '../utils/itemsMenuPaciente'
import { useParams } from 'react-router-dom';

const PacienteHistorialResultadoAnalisis = () => {
    const [patientName] = useState('Juan González Martínez') // Sacar del state
    const { id } = useParams();

    // Array of result data
    const resultData = [
        { label: 'GLUCEMIA:', value: '69 mg/dl', reference: '70 - 110 mg/dl' },
        { label: 'HDL COLESTEROL:', value: '34 mg/dl', reference: 'mayor 35 mg/dl' },
        { label: 'RELACION COL.TOT/HDL COL.:', value: '3.67', reference: '0.0 - 5.0' },
        { label: 'LDL COLESTEROL:', value: '67 mg/dl', reference: '0 - 155 mg/dl' },
        { label: 'TRIGLICERIDOS', value: '116 mg/dl', reference: '10 - 150 mg/dl' },
        { label: 'LIPEMIA:', value: '440 mg/dl', reference: '400 - 800 mg/dl' },
        { label: 'COAGULOGRAMA:', value: '', reference: '' },
        { label: 'TIEMPO DE PROTROMBINA:', value: '', reference: '', isSubItem: true },
        { label: 'Tiempo testigo:', value: '12 seg.', reference: '', isSubItem: true },
        { label: 'Tiempo problema:', value: '12 seg.', reference: '', isSubItem: true },
        { label: 'Porcentaje de actividad:', value: '100 %', reference: '70 a 120 %', isSubItem: true },
        { label: 'R.I.N.', value: '1.00', reference: '', isSubItem: true },
        { label: 'RECUENTO DE PLAQUETAS:', value: '307.000 por mm3', reference: '150.000 - 400.000 por mm3', isSubItem: true },
    ]

    return (
        <>
            <div className='relative h-screen bg-white'>
                <div className='fixed top-0 left-0 min-w-[266px] h-full'>
                    <MenuLateral items={arrayItemsMenuPaciente} />
                </div>
                <div className='ml-[266px] overflow-y-auto'>
                    <div className='flex bg-gray-50'>
                        <div className='flex-1 p-8'>
                            <Breadcrumb
                                items={[{ title: 'Paciente', to: '/' }, { title: 'Mi Historial', to: '/paciente/historial' }, 
                                { title: id }]}
                            />
                            <h1 className='text-2xl font-semibold text-gray-900 '>Resultado para: Orden N° {id}</h1>
                        </div>
                    </div>

                    <ResultadoAnalisis resultData={resultData} patientName={patientName} />
                </div>
            </div>
        </>
    )
}

export default PacienteHistorialResultadoAnalisis
