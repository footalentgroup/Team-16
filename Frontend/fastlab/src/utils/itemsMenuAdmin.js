import {Syringe, Folder, Settings  } from 'lucide-react';

const arrayItemsMenuAdmin=[
    {name: 'Ingresar pedido médico', route: '/admin/ingresar-orden',  componentIcon:Syringe},
    {name: 'Resultados', route: '/admin/resultados',  componentIcon: Folder},
    {name: 'Configuración', route: '/admin/configuracion', componentIcon:Settings },
]
export default arrayItemsMenuAdmin;