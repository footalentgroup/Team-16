import notFound from "../assets/notFound.png";
const NotFound = () => {
  return (
    <section className="w-full h-screen bg-gray-50 flex justify-center 
    items-center flex-wrap">
      <img src={notFound} alt="imagen de pagina no encontrada" />

      <h1 className="text-[3rem] ">Página no encontrada</h1>
    </section>
  );
};
export default NotFound;
