import { Button } from '@/components/ui/button'
import { pdf } from '@react-pdf/renderer'
import { useState } from 'react'

const ResultadoAnalisis = ({ resultData, patientName }) => {
    const generatePDF = async () => {
        try {
            const { PDFTemplate } = await import('./pdfTemplate')
            const blob = await pdf(<PDFTemplate data={resultData} patientName={patientName} />).toBlob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = 'resultados-medicos.pdf'
            link.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error generating PDF:', error)
        }
    }

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <main className='flex-1 p-8'>
                <div className='flex justify-between items-start mb-8'>
                    <h1 className='text-xl font-semibold'>Resultado para: {patientName} </h1>
                    <Button onClick={generatePDF} className='bg-emerald-600 hover:bg-emerald-700'>
                        Descargar
                    </Button>
                </div>

                <div className='bg-white border rounded-lg p-6 space-y-6'>
                    <div className='text-center text-sm text-gray-600 mb-4'>Mariano Boedo 23 - Tel.(0387)-4215440 - 4400 Salta</div>

                    <div className='border-b pb-4'>
                        <div className='flex gap-2 font-bold'>
                            <span>Paciente:</span>
                            <span>{patientName}</span>
                            <span>- PROT. 78254</span>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <div className='grid grid-cols-3 gap-4 text-sm'>
                            <div className='flex-4'></div>
                            <div className='flex-1 text-left underline'>Valores Obtenidos</div>
                            <div className='flex-1 text-left text-gray-600 underline'>Valores de Referencia</div>
                        </div>
                        {resultData.map((result, index) => (
                            <ResultRow key={index} {...result} level={0} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

function ResultRow({ label, value, reference, subItems, level }) {
    return (
        <div className={`${level > 0 ? 'ml-4 space-y-2' : ''}`}>
            <div className={`grid grid-cols-3 gap-4 text-sm`}>
                <div className={`flex-4 ${level === 0 ? 'font-semibold' : ''}`}>{label}</div>
                {(value || reference) && (
                    <>
                        <div className='flex-1 text-left'>{value}</div>
                        <div className='flex-1 text-left'>{reference}</div>
                    </>
                )}
            </div>
            {subItems && subItems.map((subItem, index) => <ResultRow key={index} {...subItem} level={level + 1} />)}
        </div>
    )
}

export default ResultadoAnalisis
