import Logo from "./../../assets/Logo.svg";
import InfoSesion from "./InfoSesion";
import "./menu-lateral.css";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Importa el hook useSelector

const MenuLateral = ({ items }) => {
  const location = useLocation(); // Hook para obtener la ruta actual.

  // Obtén el estado del usuario desde el store
  const user = useSelector((state) => state.user);
  console.log("Estado actual del usuario:", user);

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
                  isSelected={item.route == location.pathname}
                  route={item.route}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full p-5 flex justify-center items-center">
          <InfoSesion
            nameUser={user.name + " " + user.lastName} 
             // Usa el nombre del usuario o un valor por defecto
            email={user.email || "Sin correo"} // Usa el correo del usuario o un valor por defecto
            imgProfile={"/src/assets/perfil.png"} // Puedes reemplazarlo con una imagen dinámica si lo deseas
          />
        </div>
      </div>
    </nav>
  );
};

export default MenuLateral;
