import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import OverlayInfoSesion from "./OverlayInfoSesion";


const InfoSesion = ({ nameUser, email, imgProfile ,lastName}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleButtonRef = useRef(null); 

  const overlayRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
  
    if (
      overlayRef.current &&
      !overlayRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target)
    ) {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full cursor-pointer relative"         
    ref={toggleButtonRef} 
    onClick={handleToggle}>
      <article className="flex justify-center items-center">
        <header className="w-5/6 flex justify-start items-center gap-3">
          <div className="w-[25px] h-[25px] overflow-hidden rounded-[50%] flex justify-center items-center">
            <img
              className="object-cover h-auto w-full"
              src={imgProfile}
              alt="img profile"
            />
          </div>
          <h2 className="text-[#0E1B27] font-medium text-[1rem]">{nameUser}</h2>
        </header>
        <ChevronsUpDown size={16} color={"#737373"} />
      </article>
      {isOpen && <OverlayInfoSesion 
      nameUser={nameUser}
      lastName={lastName}
      email={email}
      overlayRef={overlayRef} 
        imgProfile={imgProfile}
      />}
    </div>
  );
};

export default InfoSesion;
