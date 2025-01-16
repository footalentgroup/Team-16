import Breadcrumb from "../navigation/breadcrumb"
import AnalisisCard from "../Cards/AnalisisCard";

const NewResults = ({data}) => {
  data=[]
  
  return (
    <section className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <Breadcrumb items={[
          {title: "Paciente", to: "/"}, 
          {title: "Inicio"},
        ]} />
        
        <h1 className="text-2xl font-semibold text-[#0E1B27] mb-6">
          Nuevos Resultados
        </h1>
        
        
      </div>
    </section>
  );
};
export default NewResults;