import Breadcrumb from "../navigation/breadcrumb";
import AnalisisCard from "../Cards/AnalisisCard";
const NewResults = () => {
    const arrayResults=[
        {
            id: 1,
            title: 'Análisis',
            type: 'de sangre',
            date: 'diciembre 2024',
        },
        {
            id: 2,
            title: 'Análisis',
            type: 'de sangre',
            date: 'diciembre 2024',
        },
        {
            id: 3,
            title: 'Análisis',
            type: 'de sangre',
            date: 'diciembre 2024',
        },
    ];
  const arrayResults0 = [];
  return (
    <section className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <Breadcrumb first={"Paciente"} second={"Inicio"} />

        <h1 className="text-2xl font-semibold text-[#0E1B27] mb-6">
          Nuevos Resultados
        </h1>
        
          {arrayResults.length== 0 ? (
            <header className="w-full h-40 flex flex-col justify-center items-center gap-3">
              <h2 className="font-semibold text-2xl text-[#0E1B27]">No hay resultados nuevos</h2>
              <p className="font-normal text-base text-[#737373]">
                Actualmente no tienes ningún resultado asociado a esta cuenta
              </p>
            </header>
          ) : (
            <div className="flex flex-col justify-center items-center gap-6">
            {arrayResults.map((item) => (
              <AnalisisCard
                key={`new-results-${item.id}`}
                title={item.title}
                type={item.type}
                date={item.date}
              />
            ))}
            </div>
          )
          }
      </div>
    </section>
  );
};
export default NewResults;
