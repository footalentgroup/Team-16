import { Link } from 'react-router-dom'
import Breadcrumb from './breadcrumb'
import { ChevronRight } from 'lucide-react'

const menuItems = [
    { title: 'Análisis', href: '/admin/configuracion/analisis' },
  
    { title: 'Doctores', href: '/admin/configuracion/doctores' },
]

const accountItems = [{ title: 'Mi cuenta', href: '/admin/configuracion/mi-cuenta' }]

const menuConfiguracion = () => {
    return (
        <>
            <main className='flex-1 p-8'>
                <div className='mx-auto'>
                    <Breadcrumb items={[{ title: 'Admin', to: '/' }, { title: 'Configuración' }]} />

                    <h1 className='text-2xl font-semibold mb-8'>Configuración</h1>

                    <div className='max-w-4xl mx-auto'>
                        <div className='space-y-8'>
                            <section>
                                <h2 className='text-lg font-medium mb-4'>Contenido</h2>
                                <div className='bg-white rounded-lg border shadow-sm divide-y'>
                                    {menuItems.map(item => (
                                        <Link key={item.title} to={item.href} className='flex items-center justify-between p-4 hover:bg-gray-50'>
                                            <span className='text-gray-900'>{item.title}</span>
                                            <ChevronRight className='w-5 h-5 text-gray-400' />
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className='text-lg font-medium mb-4'>Cuenta</h2>
                                <div className='bg-white rounded-lg border shadow-sm divide-y'>
                                    {accountItems.map(item => (
                                        <Link key={item.title} to={item.href} className='flex items-center justify-between p-4 hover:bg-gray-50'>
                                            <span className='text-gray-900'>{item.title}</span>
                                            <ChevronRight className='w-5 h-5 text-gray-400' />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default menuConfiguracion
