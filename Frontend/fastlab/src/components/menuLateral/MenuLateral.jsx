import Logo from "./../../assets/Logo.svg";
import InfoSesion from "./InfoSesion";
import "./menu-lateral.css";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; 

const MenuLateral = ({ items }) => {
  const location = useLocation(); 

  
  const user = useSelector((state) => state.user);


  return (
    <nav className="sidebar">
      <div className="container-menu">
        <div>
          <div className="h-16 flex justify-center items-center">
            <img src={Logo} alt="Logo" />
          </div>
          <div>
            <h2
              className="uppercase px-6 font-semibold text-[10px] my-3
              text-[#545A61]"
            >
              Navegación
            </h2>
            <ul className="flex flex-col gap-3">
              {items.map((item, i) => (
                <MenuItem
                  key={`menu-item-${i}`}
                  name={item.name}
                
                  icon={item.componentIcon}
                  isSelected={location.pathname.startsWith(item.route)}
                  route={item.route}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full p-5 flex justify-center items-center">
          <InfoSesion
            nameUser={user.name + " " + user.lastName} 
            
            email={user.email || "Sin correo"} 
            imgProfile={"/perfil.png"} 
          />
        </div>
      </div>
    </nav>
  );
};

export default MenuLateral;
