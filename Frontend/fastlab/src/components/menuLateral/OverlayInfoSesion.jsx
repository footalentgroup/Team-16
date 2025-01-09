import { LogOut } from 'lucide-react';


const OverlayInfoSesion = ({ overlayRef, nameUser,lastName, email, imgProfile }) => {
    const onLogout=()=>{

    }
  return (
    <div className="w-full min-w-44 max-w-48 bg-white absolute -right-[100%] 
     -bottom-[50%] rounded-md border border-[#D4D4D4] shadow-md 
    flex flex-col
    " ref={overlayRef}
    >
      <article className="w-full flex flex-col ">
        <header className="w-full h-16 flex justify-center items-center">
          <div className='w-full flex justify-center gap-2 items-center' >
          <div className="w-[32px] h-[32px]
          overflow-hidden rounded-[50%] flex justify-center items-center">
            <img
              className="object-cover h-auto w-full"
              src={imgProfile}
              alt="img profile overlay"
            />
          </div>
          <div className="flex flex-col items-start ">
              <h2 className="text-[#0E1B27] font-medium text-[1rem]">{nameUser} {lastName}</h2>
           
              <p className="text-[#737373] text-[12px] font-normal">{email}</p>
          </div>
          </div>
        </header>
        
        <button className="w-full h-10  text-[#545A61]
        border-t border-[#737373] " onClick={onLogout}>
            <div className='w-full flex justify-start gap-3 items-center px-4'>
                <LogOut size={16}/>
                <span className='text-[14px] font-medium'>Cerrar sesión</span>
            </div>
        </button>
      </article>
    </div>
  );
};
export default OverlayInfoSesion;
