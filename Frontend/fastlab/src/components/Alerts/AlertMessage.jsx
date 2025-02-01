import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Check, Terminal } from 'lucide-react'

const AlertMessage = ({ show, type, message, title }) => {
    if (!show) return null

    return (
        <Alert className={`opacity-100 ${type === 'success' ? 'bg-[#02807D]' : 'bg-red-500'}`}>
            {type === 'success' ? <Check className='h-4 w-4 text-white' /> : <Terminal className='h-4 w-4 text-white' />}
            <div>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </div>
        </Alert>
    )
}

export default AlertMessage
