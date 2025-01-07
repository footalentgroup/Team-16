import { useState } from 'react'
import Breadcrumb from '../../components/navigation/breadcrumb'
import SearchBar from '../../components/navigation/searchbar'
import SearchResults from '../../components/navigation/searchResults'

const Historial = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [hasSearched, setHasSearched] = useState(false)

    const handleSearch = query => {
        setSearchQuery(query)
        setHasSearched(true)
    }

    return (
        <div className='flex min-h-screen bg-gray-50'>
            <main className='flex-1 p-8'>
                <Breadcrumb first={'Paciente'} second={'Historial'} />

                <h1 className='text-2xl font-semibold text-gray-900 mb-6'>Mi historial de resultados</h1>

                <div className='max-w-xl mb-8'>
                    <SearchBar onSearch={handleSearch} />
                </div>

                {hasSearched ? (
                    <SearchResults query={searchQuery} />
                ) : (
                    <div className='text-center py-12'>
                        <h2 className='text-xl font-semibold text-gray-900 mb-2'>No se han encontrado resultados</h2>
                        <p className='text-gray-500'>
                            Parece que no podemos encontrar ningún resultado basado en su búsqueda.
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Historial
