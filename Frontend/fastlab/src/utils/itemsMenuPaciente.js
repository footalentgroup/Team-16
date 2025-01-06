import { LayoutDashboard, Folder, User } from 'lucide-react';

const arrayItemsMenuPaciente=[
    {name: 'Inicio', route: '/paciente/inicio',  componentIcon:LayoutDashboard},
    {name: 'Mi Historial', route: '/paciente/historial',  componentIcon:Folder},
    {name: 'Mis Datos', route: '/paciente/misdatos', componentIcon:User},
]
export default arrayItemsMenuPaciente;