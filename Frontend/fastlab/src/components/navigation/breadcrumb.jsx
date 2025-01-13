import { Link } from 'react-router-dom';
import { ChevronRightIcon } from './icons';

export default function Breadcrumb({ items = [] }) {
    return (
        <div className='flex items-center text-sm text-gray-500 mb-6'>
            {items.map((item, index) => (
                <div key={index} className='flex items-center'>
                    {item.to ? (
                        <Link
                            to={item.to}
                            className='hover:text-gray-700'
                        >
                            {item.title}
                        </Link>
                    ) : (
                        <span className='text-gray-700'>{item.title}</span>
                    )}
                    {index < items.length - 1 && (
                        <span className='mx-2'>
                            <ChevronRightIcon />
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
