import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

const LoginInput = ({ label, id, name, placeholder, register, rules, error, type }) => {
    const [showPassword, setshowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword)
    }

    return (
        <div className='mb-4'>
            <label htmlFor={id} className='block text-sm text-gray-700 mb-1'>
                {label}
                <div className='relative'>
                    <input
                        type={type === 'password' && showPassword ? 'text' : type}
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        {...register(name, rules)}
                        className={`w-full px-4 py-2 bg-gray-50  border rounded-md focus:outline-none focus:ring-2 ${
                            error ? 'border-red-500 placeholder-red-500 focus:ring-red-500' : 'focus:ring-teal-500 border-gray-300'
                        }
                        ${type === 'password' ? 'pr-[50px]' : ''}
                        `}
                    />
                    {type === 'password' && (
                        <span
                            onClick={handleClickShowPassword}
                            className='text-gray-500 text-sm cursor-pointer absolute right-0 bottom-[50%] translate-y-[50%] z-50 h-full w-[50px] text-center flex items-center justify-center'
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    )}
                </div>
            </label>
            {error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
        </div>
    )
}

export default LoginInput
