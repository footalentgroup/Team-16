import { Link } from 'react-router-dom'
import { ChevronRightIcon } from './icons'

export default function Breadcrumb() {
    return (
        <div className='flex items-center text-sm text-gray-500 mb-6'>
            <Link
                href='#'
                className='hover:text-gray-700'
            >
                Paciente
            </Link>
            <span className='mx-2'>
                <ChevronRightIcon />
            </span>
            <span className='text-gray-700'>Mi historial</span>
        </div>
    )
}
