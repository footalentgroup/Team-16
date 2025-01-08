import { Link } from "react-router-dom";
const MenuItem= ({name, route, isSelected, icon})=>{
    const Icono = icon;
    return (
        <li className={(isSelected? 'text-[#02807D] border-l-[3px] border-[#02807D]':'text-[#545A61]')+' font-medium text-[14px] flex justify-start items-center gap-4 px-6 h-9'}>
            <Icono size={16} color={isSelected? '#02807D': '#545A61'}  />
            <Link to={route}>{name}</Link>
        </li>
    )
}
export default MenuItem;