import { Link } from 'react-router-dom'
import { ChevronRightIcon } from './icons'

export default function Breadcrumb({first, second}) {
    return (
        <div className='flex items-center text-sm text-gray-500 mb-6'>
            <Link
                href='#'
                className='hover:text-gray-700'
            >
                {first}
            </Link>
            <span className='mx-2'>
                <ChevronRightIcon />
            </span>
            <span className='text-gray-700'>{second}</span>
        </div>
    )
}
