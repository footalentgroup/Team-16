import { useEffect, useState } from 'react'
import AnalisisCard from '../Cards/AnalisisCard'
import AnalisisCardSkelleton from '../Cards/AnalisisCardSkelleton'

export default function SearchResults({ query }) {
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState([])

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setResults([
                {
                    id: 1,
                    title: 'Análisis',
                    type: 'de sangre',
                    date: 'diciembre 2024',
                },
                {
                    id: 2,
                    title: 'Análisis',
                    type: 'de sangre',
                    date: 'diciembre 2024',
                },
                {
                    id: 3,
                    title: 'Análisis',
                    type: 'de sangre',
                    date: 'diciembre 2024',
                },
            ])
            setLoading(false)
        }, 1500)
    }, [query])

    if (loading) {
        return (
            <div>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Buscando resultados para "{query}"...</h2>
                <div className='space-y-4'>
                    {[...Array(3)].map((_, index) => (
                        <AnalisisCardSkelleton key={index} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>Resultados encontrados</h2>
            <div className='space-y-4'>
                {results.map(result => (
                    <AnalisisCard key={result.id} id={result.id} title={result.title} type={result.type} date={result.date} />
                ))}
            </div>
        </div>
    )
}
