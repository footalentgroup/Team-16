export default function AnalisisCardSkelleton() {
    return (
        <div className='p-4 border rounded-lg bg-white animate-pulse'>
            <div className='flex items-start gap-4'>
                <div className='w-6 h-6 bg-gray-200 rounded-full'></div>
                <div className='flex-grow'>
                    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/2 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-1/4'></div>
                </div>
                <div className='w-24 h-8 bg-gray-200 rounded'></div>
            </div>
        </div>
    )
}
